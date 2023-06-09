import styled from "styled-components";

export const StyledMainLinkBtn = styled.div`
  & a {
    display: inline-block;
    height: 34px;
    width: 100px;
    font-size: 16px;
    border-radius: 8px;
    background-color: var(--point-color);
    color: #fff;
    text-align: center;
    line-height: 34px;
    text-decoration: none;
  }
  &.disabled a {
    pointer-events: none;
    background-color: var(--dark-gray);
  }

  &:not(:last-of-type) {
    margin-right: 10px;
  }
`;

export const StyledSubLinkBtn = styled(StyledMainLinkBtn)`
  & a {
    color: var(--black-color);
    background-color: #fff;
    border: 1px solid var(--point-color);
  }
`;

export const StyledMainBtn = styled.button`
  height: 34px;
  width: 100px;
  font-size: 16px;
  border-radius: 8px;
  background-color: var(--point-color);
  color: #fff;
  text-align: center;
  line-height: 34px;
  border: none;

  &.disabled {
    pointer-events: none;
    background-color: var(--dark-gray);
  }

  &:not(:last-of-type) {
    margin-right: 10px;
  }
`;

export const StyledSubBtn = styled(StyledMainBtn)`
  color: var(--black-color);
  background-color: #fff;
  border: 1px solid var(--point-color);
`;

export const StyledSmallMainBtn = styled(StyledMainBtn)`
  padding: 0 4px;
  font-size: 14px;
  width: 40px;
  height: 24px;
  line-height: 24px;

  &:not(:last-of-type) {
    margin-right: 6px;
  }
`;

export const StyledSmallSubBtn = styled(StyledSmallMainBtn)`
  color: var(--black-color);
  background-color: #fff;
  border: 1px solid var(--point-color);
`;

export const StyledSmallDeleteBtn = styled(StyledSmallMainBtn)`
  background-color: var(--error-box-color);
  color: var(--black-color);
  border: 1px solid var(--error-color);
`;