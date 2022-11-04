import React from 'react';
import { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { GalleryContext } from '../../GallryContext';

function NavBar() {
  const { countCartItems } = useContext(GalleryContext);
  return (
    <>
      <Outlet />
      <nav>
        <h1 className="logo">
          <Link to="/">Pic Some</Link>
        </h1>

        <Link to="/cart">
          {countCartItems > 0 ? (
            <i className="ri-shopping-cart-fill">
              <span>{countCartItems}</span>
            </i>
          ) : (
            <i className="ri-shopping-cart-line"></i>
          )}
        </Link>
      </nav>
    </>
  );
}

export default NavBar;
