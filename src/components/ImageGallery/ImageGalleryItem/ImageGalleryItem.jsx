import PropTypes from 'prop-types';

const ImageGalleryItem = ({ images, openModal, getLargeImage }) => (
    images.map(({webformatURL, id, tags, largeImageURL}) => {
        return (
            <li className="ImageGalleryItem" key={id} onClick={openModal}>
                <img className="ImageGalleryItem-image" data-large={largeImageURL} onClick={getLargeImage} src={webformatURL} alt={tags} />
            </li>
        )
    })
)

ImageGalleryItem.propTypes = {
    images: PropTypes.array,
    toggleModal: PropTypes.func,
    webformatURL: PropTypes.string,
    id: PropTypes.string,
    tags: PropTypes.string,
    largeImageURL: PropTypes.string,
} 

export default ImageGalleryItem;