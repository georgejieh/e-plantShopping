import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items); // Access cart items from Redux store
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart
      .reduce((total, item) => {
        const itemCost = parseFloat(item.cost.replace('$', ''));
        return total + itemCost * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const calculateTotalCost = (item) => {
    const itemCost = parseFloat(item.cost.replace('$', ''));
    return (itemCost * item.quantity).toFixed(2);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(); // Navigate back to the product list
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 })); // Increase quantity
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 })); // Decrease quantity
    } else {
      dispatch(removeItem({ name: item.name })); // Remove item if quantity reaches 0
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name })); // Remove item from cart
  };

  const handleAddItem = (item) => {
    dispatch(addItem(item)); // Re-add item to cart (optional use case)
  };

  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    alert('Checkout functionality to be added in the future.');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.length > 0 ? (
          cart.map((item) => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">Price: {item.cost}</div>
                <div className="cart-item-quantity">
                  <button
                    className="cart-item-button cart-item-button-dec"
                    onClick={() => handleDecrement(item)}
                  >
                    -
                  </button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button
                    className="cart-item-button cart-item-button-inc"
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-total">Subtotal: ${calculateTotalCost(item)}</div>
                <button
                  className="cart-item-delete"
                  onClick={() => handleRemove(item)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', color: 'gray' }}>Your cart is empty.</p>
        )}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className="total_cart_amount">
        Total Items: {cart.reduce((total, item) => total + item.quantity, 0)}
      </div>
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={(e) => handleCheckoutShopping(e)}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;