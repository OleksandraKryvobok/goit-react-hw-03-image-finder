import PropTypes from 'prop-types';
import { Component } from 'react';
import { Overlay, ModalImg } from './Modal.styled';

class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown = e => {
        if(e.code === 'Escape') {
            this.props.onClose();
        }
    }

    handleOverlayClck = (e) => {
        if(e.target === e.currentTarget) {
            this.props.onClose();
        }
    }

    render() {
        const { src, alt } = this.props;
        const handleOverlayClck = this.handleOverlayClck;

        return (
            <Overlay onClick={handleOverlayClck}>
                <ModalImg>
                    <img src={src} alt={alt} />
                </ModalImg>
            </Overlay>
        );
    }
};

export default Modal;

Modal.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
};