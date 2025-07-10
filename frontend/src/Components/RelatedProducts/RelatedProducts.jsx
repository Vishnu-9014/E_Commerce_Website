import React,{useEffect,useState} from 'react'
import './RelatedProducts.css'

import Item from '../Items/Item'

const RelatedProducts = () => {

  const [all_product,setAll_Product]=useState([]);
  useEffect(()=>{
        fetch('https://e-commerce-backend-r3ez.onrender.com/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAll_Product(data));
      })

  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {all_product.map((item,i)=>{
            return <Item  key={i} id={item.id} name={item.name} image={item.image}
         new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default RelatedProducts
