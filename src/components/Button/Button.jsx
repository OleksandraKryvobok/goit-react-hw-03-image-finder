import PropTypes from 'prop-types';
import { LoadMoreButton } from "./Button.styled";

const Button = ({ onBtnClick }) => {
    return (
        <LoadMoreButton onClick={onBtnClick}>Load more</LoadMoreButton>
    );
};

export default Button;

Button.propTypes = {
    onBtnClick: PropTypes.func.isRequired,
}