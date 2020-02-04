import React, { useRef, useEffect } from "react";
import styled from "styled-components";

const SearchBarContainer = styled.div`
  height: 44px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const SearchHeading = styled.h2`
  font-size: 13px;
  color: #c4c4c4;
  font-weight: normal;
  margin: 0px 0px 2px 0px;
  visibility: ${props => (props.showHeading ? "visible" : "hidden")};
`;

const SearchBar = styled.input`
  font-family: "GT-Walsheim", "Roboto", Arial, sans-serif;
  font-weight: normal;
  font-size: 17px;
  color: #121212;
  border: none;
  outline: none;
  border-bottom: 1px solid #eeeeee;
  border-radius: 0;
  padding: 0;
  &:focus {
    border-bottom: 1px solid #efb8af;
  }
  ::placeholder {
    color: #c4c4c4;
  }
`;

export default function SearchInput({ query, onChange }) {
  const searchInputRef = useRef();

  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  const showHeading = query === "" ? false : true;

  return (
    <SearchBarContainer key="SearchBarContainer">
      <SearchHeading showHeading={showHeading}>Куда доставить?</SearchHeading>
      <SearchBar
        key="SearchBar"
        type="text"
        value={query}
        onChange={event => {
          onChange(event.target.value);
        }}
        placeholder="Куда доставить?"
        ref={searchInputRef}
      />
    </SearchBarContainer>
  );
}
