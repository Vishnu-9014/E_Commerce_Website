const port=process.env.PORT||4000;
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const multer=require('multer');
const path=require('path');
const cors=require('cors');
const dotenv=require('dotenv');
const { type } = require('os');
dotenv.config();


app.use(express.json());

app.use(cors({
    origin: [
          'https://e-commerce-frontend-rigc.onrender.com',
        'https://e-commerce-website-admin-7lcj.onrender.com'
], // your frontend port
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));



//Database connection with MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Connection error:", err));


  //API Creation
app.get("/",(req,res)=>{
    res.send("Express App is running")
})


//Image Storage using Multer
const storage=multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
}) 

const upload=multer({storage:storage})


//Creating upload endpoint for images
app.use('/images',express.static('upload/images'));
app.post("/upload",upload.single('product'),(req,res)=>{
    if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }
    res.json({
        success:1,
        image_url:`https://e-commerce-backend-r3ez.onrender.com/images/${req.file.filename}`,
    })
})

//Shcema for creating Products
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: { 
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  avilable: {
    type: Boolean,
    default: true,
  },
});
app.post("/addproduct",async (req,res)=>{
    let products=await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array=products.slice(-1);
        let last_product=last_product_array[0];
        id=last_product.id+1;
    }else {
        id=1;
    }

    const product=new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})



//Creating an API for deleting products
app.post("/removeproduct",async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("removed");
    res.json({
        success:true,
        name:req.body.name,
    })
})

//Creating an API to get all rpoducts
app.get("/allproducts",async (req,res)=>{
    let products=await Product.find({});
    console.log("All products fetched");
    res.send(products);
})

//Creating schema for user model
const Users=mongoose.model('Users',{
    name:{
      type:String,
    },
    email:{
      type:String,
      unique:true,
    },
    password:{
      type:String,
    },
    cartData:{
      type:Object,
    },
    date:{
      type:Date,
      default:Date.now,
    }
})


//Creating endpoint for registering 

app.post('/signup', async (req,res)=>{

    let check=await Users.findOne({email:req.body.email});
    if(check){
      return res.status(400).json({success:false,errors:"existing user found with same email"})
    }
    let cart={};
    for (let i = 0; i < 300; i++) {
      cart[i]=0;
    }
    const user=new Users({
      name:req.body.username,
      email:req.body.email,
      password:req.body.password,
      cartData:cart,
    })
  await user.save();
    
    const data ={
      user:{
        id:user.id
      }
    }

    const token=jwt.sign(data,"secret_ecom");
    res.json({success:true,token});
})


//Creating endpoint for LOGIN page

app.post('/login',async (req,res)=>{
    let user=await Users.findOne({email:req.body.email});
    if(user){
      const passCompare=req.body.password ===user.password;
      if(passCompare){
        const data = {
          user:{
            id:user.id
          }
        }
        const token=jwt.sign(data,'secret_ecom');
        res.json({success:true,token});
      }else {
        res.json({success:false,errors:"Wrong  password"});
      }
    }
    else {
      res.json({success:false,errors:"Wrong Email Id"})
    }
})

//Creating end point for new collection 

app.get('/newcollections',async (req,res)=>{
  let products=await Product.find({});
  let newcollection =products.slice(1).slice(-8);
  console.log("New collection fetched")
  res.send(newcollection);
})


//creating end point for popular in women section

app.get('/popularinwomen',async (req,res)=>{
  let products=await Product.find({category:"women"});
  let popular_in_women =products.slice(0,4);
  console.log("Popular in women fetched");
  res.send(popular_in_women);
})


//Creating middleware to fetch user 
    const fetchUser=async (req,res)=>{
      const token=req.header('auth-token');
      if(!token){
        res.status(401).send({errors:"Please authenticate using valid token"})
      }
      else {
        try{
          const data=jwt.verify(token,'secret_ecom');
          req.user=data.user;
          next();
        }catch (error){
          res.status(401).send({errors:"Please authenticate using a valid token"})
        }
      }
    }

//creating endpoint for adding products in cartdata

app.post('/addtocart',fetchUser, async (req,res)=>{
  console.log("Added",req.body.itemId)
    let userData=await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId]+=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData});
    res.send("Added");
})


//Creating endpoint to remove from cartData
app.post('/removefromcart',fetchUser,async (req,res)=>{
  console.log("removed",req.body.itemId);
  let userData=await Users.findOne({_id:req.user.id});

    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId]-=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData});
    res.send("Removed");
})


//creating an endpoint to get cartdata
app.post('/getcart',fetchUser,async(req,res)=>{
  console.log("GetCart");
  let userData=await Users.find({_id:req.user.id});
  res.json(userData.cartData);
})



//API Creation 
app.listen(port,(error)=>{
    if(!error){
        console.log("Server Running on Port "+port)
        console.log("MongoDB connected")
    }
    else {
        console.log("Error: "+error);
    }
})
