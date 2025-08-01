import React, { useContext } from 'react';
import './CartItems.css';
import remove_icon from '../Assets/cart_cross_icon.png';
import { ShopContext } from '../../Context/ShopContext';

const CartItems = () => {
  const { getTotalCartAmount,all_product, cartItems,addToCart,removeFromCart } = useContext(ShopContext);

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {
        all_product.map((e) => {
          if (cartItems[e.id] > 0) {
            return (
              <div >
                <div className="cartitems-format-main">
                  <img src={e.image} alt={e.name} className='carticon-product-icon' />
                  <p>{e.name}</p>
                  <p>₹{e.new_price}</p>
                  <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                  <p>₹{e.new_price}</p>
                  <img
                    src={remove_icon}
                    onClick={() => removeFromCart(e.id)}
                    alt="remove"
                    className='cartitems-remove-icon'
                  />
                </div>
                <hr />
              </div>
            );
          } else {
            return null;
          }
        })
      }
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
            </div>
            <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promocode, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder='promocode' />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
