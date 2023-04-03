import styled from "styled-components";

const StyledErrorMsgBox = styled.div`
  position: fixed;
  left: 50%;
  bottom: 40px;
  transform: translateX(-50%);
  z-index: 100;
  height: 60px;
  line-height: 60px;
  padding-left: 10px;
  min-width: 200px;
  background: var(--error-box-color);
  border-radius: 8px;
  color: var(--black-color);
  display: flex;
  font-size: 16px;

  span {
    flex: 1;
    text-align: center;
  }
  
  button {
    border: none;
    background: transparent;
    color: var(--error-color);
    font-size: 24px;
    padding: 0 20px;
  }
`;

type Props = {
  msg: string;
};

const ErrorMsgBox = ({ msg = "에러가 발생했습니다." }: Props) => {
  return (
    <StyledErrorMsgBox>
      <span>{msg}</span>
      <button>×</button>
    </StyledErrorMsgBox>
  )
};

export default ErrorMsgBox;
