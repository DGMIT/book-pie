import styled from "styled-components";
import { useState } from "react";
import BookModal from "./BookModal";

const StyledFloatingBtn = styled.button`
  position: fixed;
  right: 60px;
  bottom: 40px;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  border: 0;
  font-size: 50px;
  cursor: pointer;
  color: var(--point-color);
`;

const FloatingBtn = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  return (
    <>
      <StyledFloatingBtn onClick={() => setModalIsOpen(true)}>
        +
      </StyledFloatingBtn>
      <BookModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
    </>
  );
};

export default FloatingBtn;
