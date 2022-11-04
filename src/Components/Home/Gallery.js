import React from 'react';
import { useContext } from 'react';
import { GalleryContext } from '../../GallryContext';
import Image from '../Image';

function Gallery() {
  const { photos } = useContext(GalleryContext);

  const imageElements = photos.map(photo => (
    <Image photo={photo} key={photo.id} />
  ));

  return <section className="gallery">{imageElements}</section>;
}

export default Gallery;
