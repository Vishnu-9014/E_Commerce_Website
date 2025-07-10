import React, { useEffect, useState } from 'react'
import './NewCollections.css'
import Item from '../Items/Item'

const NewCollections = () => {

  const [new_collection,setNew_collection]=useState([]);

    useEffect(()=>{
      fetch('https://e-commerce-backend-r3ez.onrender.com/newcollections')
      .then((response)=>response.json())
      .then((data)=>setNew_collection(data));
    },[]);

  return (
    <div className='new_collections' >
        <h1>NEW COLLECTIONS</h1>
      <hr/>
      <div className="collections">
            {new_collection.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image}
         new_price={item.new_price} old_price={item.old_price}/>
            })}
      </div>
    </div>
  )
}

export default NewCollections
