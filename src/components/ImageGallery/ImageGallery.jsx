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
        total: 0,
        error: null,
        loading: false,
    };

    

    componentDidUpdate(prevProps, prevState) {
        const { page } = this.state;
        const { searchValue } = this.props;
        
        if(prevProps.searchValue !== searchValue) {
            this.setState({ 
                loading: true,
                page: 1,
                searchResult: [],
            });

            fetchGallery(searchValue, 1)
            .then(photos => {
                if(photos.hits.length === 0) {
                    return Promise.reject(
                        new Error('Зображень за вашим пошуком не знайдено')
                    );
                };

                this.setState({
                    searchResult: photos.hits,
                    total: photos.total,
                    error: null
                });
            })
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({ loading: false }));
        } else if (prevState.page !== page && page > 1) {
            fetchGallery(searchValue, page)
            .then(photos => {
                if(photos.hits.length === 0) {
                    return Promise.reject(
                        new Error('Зображень за вашим пошуком не знайдено')
                    );
                };

                this.setState({
                    searchResult: [...prevState.searchResult, ...photos.hits],
                    total: photos.total,
                    error: null
                });
            })
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({ loading: false }));
        }
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
                    {searchResult.map(img => {
                            return (
                                <ImageGalleryItem key={img.id} imageInfo={img} toggleModal={toggleModal} />
                            )
                        })
                    }
                </List>
                {searchResult && searchResult.length < total && !error && <Button onBtnClick={handleBtnClick} />}
            </>
            
        );
        
    };
};

export default ImageGallery;

ImageGallery.propTypes = {
    searchValue: PropTypes.string.isRequired,
    toggleModal: PropTypes.func.isRequired,
};