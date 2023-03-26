import styled from "styled-components";

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

const FloatingBtn = () => {
    return (
        <StyledFloatingBtn>+</StyledFloatingBtn>
    )
}

export default FloatingBtn;