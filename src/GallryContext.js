import React from 'react';
import { createContext } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const GalleryContext = createContext('');

function GallryContextProvider({ children }) {
  const [photos, setPhotos] = useState([]);
  const [cart, setCart] = useState([]);
  const [countCartItems, setCountCartItems] = useState(0);

  //toggle isFavourite
  const toggleFavorite = id => {
    setPhotos(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              isFavourite: !item.isFavourite,
            }
          : item
      )
    );
  };

  //add to cart
  const addToCart = id => {
    setCart(prev => {
      if (prev.find(elm => elm.id === id) == null) {
        return [...prev, photos.find(photo => photo.id === id)];
      } else {
        return prev.map(elm => {
          if (elm.id === id) {
            return { ...elm, Qty: elm.Qty + 1 };
          } else {
            return elm;
          }
        });
      }
    });
  };

  useEffect(() => {
    const getPhotos = async () => {
      const response = await axios.get('https://picsum.photos/v2/list');
      const rendredPhotos = response.data.slice(0, 21);
      const price = 100;
      setPhotos(() =>
        rendredPhotos.map((item, index) => ({
          ...item,
          isFavourite: false,
          price: price * (index + 1),
          Qty: 1,
        }))
      );
    };

    getPhotos();
  }, []);

  useEffect(() => {
    setCountCartItems(() =>
      cart.map(item => item.Qty).reduce((curr, acc) => curr + acc, 0)
    );
  }, [cart]);

  return (
    <GalleryContext.Provider
      value={{
        photos,
        toggleFavorite,
        addToCart,
        cart,
        countCartItems,
        setCart,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
}

export { GallryContextProvider, GalleryContext };
