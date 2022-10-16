import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            this.props.toggleModal();
        }
    }

    handleBackDrop = (e) => {
        e.target === e.currentTarget && this.props.toggleModal();
    }

    render() {
        return (
            <div className="Overlay" onClick={this.handleBackDrop}>
                <div className="Modal" >
                    <img src={this.props.modalImage} alt="" />
                </div>
            </div>
        )
    }
}

Modal.propTypes = {
    toggleModal: PropTypes.func,
    modalImage: PropTypes.string,
}

export default Modal;