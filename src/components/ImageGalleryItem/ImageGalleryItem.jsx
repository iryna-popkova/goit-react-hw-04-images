import { useState } from 'react';
import { ModalWindow } from '../Modal/Modal';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ img, tags, largeImage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <GalleryItem className="gallery-item">
      <GalleryImage onClick={openModal} src={img} alt={tags} />
      <ModalWindow
        modalIsOpen={isModalOpen}
        closeModal={closeModal}
        largeImage={largeImage}
        topic={tags}
      />
    </GalleryItem>
  );
};
