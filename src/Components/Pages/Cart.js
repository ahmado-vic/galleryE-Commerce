import React from 'react';
import { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GalleryContext } from '../../GallryContext';
import CartItems from '../CartItems';

function Cart() {
  const { cart, countCartItems, setCart } = useContext(GalleryContext);
  const [total, setTotal] = useState([]);
  const [totalCart, setTotalCart] = useState(0);
  const [placed, setPlaced] = useState(false);
  const submitRef = useRef();

  //calculate total cart item price per item
  useEffect(() => {
    setTotal(() => cart.map(item => item.price * item.Qty));
  }, [countCartItems]);

  //calculate total cart items prices
  useEffect(() => {
    setTotalCart(() => total.reduce((cur, acc) => cur + acc, 0));
  }, [total]);

  // place order
  const handleSubmit = () => {
    submitRef.current.textContent = 'Loading...';
    setTimeout(() => {
      setPlaced(true);
      setCart([]);
      setTotalCart(0);
    }, 4500);
  };

  const cartElements = cart.map((item, index) => (
    <CartItems
      setCart={setCart}
      item={item}
      index={index}
      total={total}
      key={item.id}
    />
  ));

  return (
    <>
      {!placed && !countCartItems ? (
        <section className="cart-wrapper">
          <p className="empty-cart">
            <strong>You cart is empty</strong>
          </p>
          <Link to="/">Shop Now</Link>
        </section>
      ) : (
        <section className="cart-wrapper">
          {!placed && cartElements}
          {!placed ? (
            <>
              <hr />
              <p className="total">
                <strong>Total: $ {totalCart}</strong>
              </p>
              <button className="submit" ref={submitRef} onClick={handleSubmit}>
                Place Order
              </button>
            </>
          ) : (
            <p>
              <strong>Your order has been placed completely !</strong>
            </p>
          )}
        </section>
      )}
    </>
  );
}

export default Cart;
