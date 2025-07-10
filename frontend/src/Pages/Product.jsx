import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import Breadcrum from '../Components/Breadcrums/Breadcrum.jsx'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay.jsx'
import DescriptioBox from '../Components/DescriptionBox/DescriptionBox.jsx'
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts.jsx'

const Product = () => {
    const {all_product}=useContext(ShopContext)
    const {productId}=useParams();
    const product=all_product.find((e)=>e.id==Number(productId)); 
    if (!product) return <div>Loading...</div>;
    return (
    <div>
      <Breadcrum product={product}/>
      <ProductDisplay product={product}/>
      <DescriptioBox />
      <RelatedProducts/>
    </div>
  )
}

export default Product
