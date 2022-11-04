import React, { useState } from 'react';
import Cart from './Pages/Cart';

function CartItems({ setCart, item, total, index }) {
  const [hovered, setHovered] = useState(false);

  const remove = id => {
    setCart(prev => {
      const target = prev.find(item => item.id === id);
      if (target && target.Qty > 1) {
        return prev.map(item => {
          if (item.id === id && item.Qty > 1) {
            return { ...item, Qty: item.Qty - 1 };
          } else {
            return item;
          }
        });
      } else {
        return prev.filter(item => item.id !== id);
      }
    });
  };

  return (
    <article
      key={item.id}
      className="cart-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={item.download_url} alt={item.author} key={item.id} />
      {hovered ? (
        <div className="icons">
          <i className="ri-close-line" onClick={() => remove(item.id)}></i>
        </div>
      ) : (
        ''
      )}
      <aside>
        <p>QTY: {item.Qty}</p>
        <p>Price: $ {item.price}</p>
        <hr />
        <p>Total: $ {total[index]}</p>
      </aside>
    </article>
  );
}

export default CartItems;
