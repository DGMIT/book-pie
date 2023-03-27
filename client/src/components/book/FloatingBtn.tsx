import styled from "styled-components";
import { useState } from "react";
import Modal from "react-modal";
import BookModal from "./BookModal";

const StyledFloatingBtn = styled.button`
    position: fixed;
    right: 60px;
    bottom: 60px;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    border: 0;
    font-size: 50px;
    cursor: pointer;
`;

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "700px",
        height: "500px"
    },
    overlay: {
        background: "rgba(0, 0, 0, 0.5)"
    }
};

const FloatingBtn = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <>
            <StyledFloatingBtn onClick={openModal}>+</StyledFloatingBtn>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                ariaHideApp={false}
            >
                <BookModal closeModal={closeModal}/>
            </Modal>
        </>
    );
};

export default FloatingBtn;
