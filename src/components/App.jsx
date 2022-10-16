import React from "react";
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGallery/ImageGalleryItem/ImageGalleryItem';
// import Button from './Button/Button';
import { Watch } from 'react-loader-spinner';
import Modal from './Modal/Modal'
import PropTypes from 'prop-types'; // ES6
import '../styles.css';
import {fetchUrl} from '../services/fetchApi'

class App extends React.Component {
  state = {
    modal: false,
    images: [],
    currentPage: 1,
    query: '',
  }

  componentDidUpdate(_, prev) {
    console.log('prev.currentPage', prev.currentPage);
    console.log('this.state.currentPage', this.state.currentPage);
    if (prev.currentPage !== this.state.currentPage || prev.query !== this.state.query) {
      this.fetchImages();
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState(({
      query: e.target.elements.query.value,
      currentPage: 1,
      images: [],
      loadingButton: false,
      spinner: false,
      modalImage: '',
    }))
    e.target.reset();
  }

  fetchImages = async () => {
    this.setState(prevState => ({
      spinner: !prevState.spinner,
    }) )
    const perPage = 12;
    const response = await fetchUrl(this.state.query, this.state.currentPage, perPage);

    this.setState(prevState => ({
        images: prevState.images.concat(response.hits),
        loadingButton: response.total - this.state.images.length > perPage,
        spinner: !prevState.spinner,
    }))
  }

  nextPage = () => {
  this.setState(prevState => ({
        currentPage: prevState.currentPage + 1,
  }))
  }

  handleLargeImage = (e) => {
      this.setState(({
        modalImage: e.target.dataset.large,
      }))
  }

  toggleModal = (e) => {
      this.setState(prevState => ({
        modal: !prevState.modal,
      }))
  }


  render() {
    const { modal, images, modalImage,spinner } = this.state;
    const { handleSubmit, toggleModal, handleLargeImage } = this;
    // const loadButton = images.length > 0 && loadingButton;
    return (
      <div className="App">
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery>
          <ImageGalleryItem openModal={toggleModal} getLargeImage={handleLargeImage} images={images} />
        </ImageGallery>
        <button type='button' onClick={()=>{this.setState(prevState => ({        currentPage: prevState.currentPage += 1,  }))  }}>load</button>
        {spinner && <Watch
          height="80"
          width="80"
          radius="48"
          color="#4fa94d"
          ariaLabel="watch-loading"
          wrapperStyle={{'margin': '0 auto'}}
          wrapperClassName=""
          visible={true}
        />}
        {modal && <Modal modalImage={modalImage} toggleModal={toggleModal} />}
      </div>
    )
}
};

App.propTypes = {
  modal: PropTypes.bool,
  images: PropTypes.array,
  currentPage: PropTypes.number,
  query: PropTypes.string
}

export default App;
