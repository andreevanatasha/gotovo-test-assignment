import styled from "styled-components";

const StyledButton = styled.button`
  font-family: "GT-Walsheim";
  font-size: 20px;
  padding: 0px 20px;
  min-height: 50px;
  margin-bottom: 25px;
  background: ${props => (props.primary ? "#121212" : "#FFFFFF")};
  color: ${props => (props.primary ? "#FFFFFF" : "#808080")};
  box-shadow: ${props =>
    props.primary ? "none" : "0px 0px 10px rgba(0, 0, 0, 0.15)"};
  border: none;
  border-radius: 45.5px;
  outline: none;
  cursor: pointer;
  &:active {
    opacity: 50%;
  }
  &:disabled {
    background: #c4c4c4;
    color: #eeeeee;
  }
`;

export default StyledButton;
