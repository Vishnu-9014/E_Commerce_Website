import React from 'react'
import './DescriptionBox.css'

const DescriptioBox = () => {
  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
      <div className="descriptionbox-nav-box ">Description</div>
      <div className="descriptionbox-nav-box fade">Reviews(122)</div>
    </div>
    <div className="descriptionbox-description">
      <p>
        Our Ecommerce platform is a modern and user-friendly online shopping destination
         that offers a wide range of products including clothing, accessories,
         and lifestyle essentials. Designed with performance, accessibility,
          and intuitive navigation in mind, it provides a seamless shopping experience for users across all devices.
      </p>
      <p>
        An E-commerce website is a digital platform that 
        allows users to buy and sell products or services over
         the internet. It serves as a virtual storefront, 
         enabling businesses to reach a broader audience and 
         customers to shop from the comfort of their homes.
      </p>
    </div>
    </div>
  )
}

export default DescriptioBox
