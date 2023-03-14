import { Component } from "react";
import { Toaster } from 'react-hot-toast';

import { GlobalStyle } from "./GlobalStyle";
import { Layout } from "./Layout";
import ImageGallery from "./ImageGallery";
import Searchbar from "./Searchbar";
import Modal from "./Modal";

export class App extends Component {
  state={
    searchValue: '',
    showModal: false,
    imageInfo: null,
  };

  handleSubmit = (searchValue) => {
    this.setState({searchValue});
  };
  
  toggleModal = (imageInfo) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    this.setState({ imageInfo });
  };

  render() {
    const { searchValue, showModal, imageInfo } = this.state
    const handleSubmit = this.handleSubmit;
    const toggleModal = this.toggleModal;

    return (
      <Layout>
          <Toaster />
          <GlobalStyle />
          <Searchbar onSearch={handleSubmit} />
          <ImageGallery 
            searchValue={searchValue} 
            toggleModal={toggleModal} />
          {showModal && <Modal 
            onClose={toggleModal} 
            src={imageInfo.largeImageURL} 
            alt={imageInfo.tags} />}
      </Layout>
    );
  };
};
