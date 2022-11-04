import React, { useState } from 'react';
import { useContext } from 'react';
import { GalleryContext } from '../GallryContext';
import PropTypes from 'prop-types';

function Image({ photo }) {
  const [hovered, setHovered] = useState(false);
  const { toggleFavorite, addToCart } = useContext(GalleryContext);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={photo.download_url} alt={photo.author} />

      {/* hover icons */}
      {hovered ? (
        <div className="icons">
          <i
            className="ri-heart-line favorite"
            onClick={() => toggleFavorite(photo.id)}
          ></i>
          <i
            className="ri-add-circle-line cart"
            onClick={() => addToCart(photo.id)}
          ></i>
        </div>
      ) : (
        ''
      )}

      {/* toggle favourite icon */}
      {photo.isFavourite ? (
        <div className="icons">
          <i
            className="ri-heart-fill favorite"
            onClick={() => toggleFavorite(photo.id)}
          ></i>
        </div>
      ) : (
        ''
      )}
    </article>
  );
}

Image.prototype = {
  photo: PropTypes.object,
};

export default Image;
