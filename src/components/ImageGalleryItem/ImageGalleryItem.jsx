import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ imageInfo, toggleModal }) => {
    return (
        <GalleryItem>
            <GalleryImage 
                src={imageInfo.webformatURL} 
                onClick={()=> toggleModal(imageInfo)} 
                alt={imageInfo.tags} 
            />
        </GalleryItem>
    );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    imageInfo: PropTypes.shape({
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired
    }).isRequired,
};