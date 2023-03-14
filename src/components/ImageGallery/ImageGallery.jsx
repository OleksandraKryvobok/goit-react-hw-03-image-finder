import PropTypes from 'prop-types';
import { Component } from 'react';

import fetchGallery from 'services/pokemon-api';

import ImageGalleryItem from 'components/ImageGalleryItem';
import Loader from 'components/Loader';
import Button from 'components/Button';

import { List, ErrorMessage } from './ImageGallery.styled';

class ImageGallery extends Component {
    state = {
        page: 1,
        searchResult: [],
        total: null,
        error: null,
        loading: false,
    };

    componentDidUpdate(prevProps, prevState) {
        const { page } = this.state;
        const { searchValue } = this.props;

        if(prevProps.searchValue !== searchValue) {
            prevState.searchResult = [];
        }
        
        if(prevProps.searchValue !== searchValue || prevState.page !== page) {
            this.setState({ loading: true, searchResult: null });

            fetchGallery(searchValue, page)
            .then(photos => {
                if(photos.hits.length === 0) {
                    return Promise.reject(
                        new Error('Зображень за вашим пошуком не знайдено')
                    );
                };
    
                this.setState({ searchResult: [...prevState.searchResult, ...photos.hits] });
                this.setState({ total: potos.total });
            })
            .catch(error => this.setState({ error }))
            .finally(this.setState({ loading: false }));
        };
    };

    handleBtnClick = () => {
        this.setState(prevState => ({
            page: prevState.page + 1
        }));
    };

    render() {
        const { searchResult, total, error, loading } = this.state;
        const { toggleModal } = this.props;
        const handleBtnClick = this.handleBtnClick;
       
        return(
            <>
                {loading && <Loader />}
                {error && <ErrorMessage>{error.message}</ErrorMessage>}
                
                <List toggleModal={toggleModal} >
                    {searchResult !== null && 
                        searchResult.map(img => {
                            return (
                                <ImageGalleryItem key={img.id} imageInfo={img} toggleModal={toggleModal} />
                            )
                        })
                    }
                </List>
                {searchResult && searchResult.length < total && <Button onBtnClick={handleBtnClick} />}
            </>
            
        );
        
    };
};

export default ImageGallery;

ImageGallery.propTypes = {
    searchValue: PropTypes.string.isRequired,
    toggleModal: PropTypes.func.isRequired,
};