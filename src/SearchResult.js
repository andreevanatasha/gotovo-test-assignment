import React from "react";
import styled from "styled-components";

const SearchResultContainer = styled.div`
  padding: 15px 0px 15px 0px;
  border: none;
  border-bottom: 1px solid #eeeeee;
  cursor: pointer;
  -webkit-tap-highlight-color: #c4c4c4;
  &:active {
    opacity: 50%;
  }
`;

const SearchResultMain = styled.div`
  color: #121212;
  font-size: 17px;
  margin-bottom: 7px;
`;

const SearchResultDetails = styled.div`
  font-size: 13px;
  color: #c4c4c4;
`;

export default function SearchResult(props) {
  const handleClick = () => {
    props.onClick(props);
  };
  return (
    <SearchResultContainer onClick={handleClick}>
      <SearchResultMain>{props.text}</SearchResultMain>
      <SearchResultDetails>
        {props.POIaddress
          ? `${props.POIaddress} · ${props.details}`
          : props.details}
      </SearchResultDetails>
    </SearchResultContainer>
  );
}
