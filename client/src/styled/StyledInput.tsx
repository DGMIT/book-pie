import styled from "styled-components";

export const StyledInput = styled.input`
  border: 1px solid var(--gray-border-color);
  border-radius: 6px;
  width: ${props => props.width || 'auto'};
  height: 40px;
  line-height: ${props => props.width || '40px'};
  margin: 10px 0;
  padding: 10px;
`;

export const StyledTextarea = styled.div`
  & > textarea {
    display: block;
    border: 1px solid var(--gray-border-color);
    border-radius: 6px;
    padding: 10px;
    line-height: 1.6;
    font-size: 16px;
  }
  & > span {
    margin-top: 4px;
    display: block;
    text-align: right;
  }
`;

