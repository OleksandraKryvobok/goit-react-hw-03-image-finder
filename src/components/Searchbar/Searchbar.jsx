import PropTypes from 'prop-types';
import { Component } from "react";
import toast from 'react-hot-toast';
import Icon from 'components/Icon';

import { SearchBar, SearchForm, Button, ButtonLabel, Input } from "./Searchbar.styled";

class Searchbar extends Component {
    state = {
        value: '',
    }

    inputChange = ({ target: { value } }) => { 
        this.setState({ value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { onSearch } = this.props;

        if(this.state.value.trim() === '') {
            toast.error('Введіть ключове слово в поле для пошуку', {
                duration: 3000,
                position: 'top-right',
            });
        }

        onSearch(this.state.value.trim());
        this.setState({ value: '' });
        e.currentTarget.reset();
    }

    render() {
        const handleSubmit = this.handleSubmit;
        const inputChange = this.inputChange;

        return (
            <SearchBar>
                <SearchForm onSubmit={handleSubmit}>
                    <Button type="submit">
                        <ButtonLabel>Search</ButtonLabel>
                        <Icon />
                    </Button>

                    <Input
                        type="text"
                        autocomplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={inputChange}
                    />
                </SearchForm>
            </SearchBar>
        );
    };
};

export default Searchbar;

Searchbar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};