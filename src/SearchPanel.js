import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import CloseIcon from "./assets/search-close";
import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";
import ErrorMessageText from "./ErrorMessageText";

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

const SearchViewContainer = styled.div`
  font-family: "GT-Walsheim", "Roboto", Arial, sans-serif;
  font-weight: normal;
  padding: 20px 20px 0px 20px;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  max-width: 560px;
  background-color: #fff;
  border-radius: 20px 20px 0px 0px;
`;

const ResultsCointainer = styled.div`
  overflow-y: scroll;
  flex: 1;
`;

const CloseSearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const CloseButton = styled.button`
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  cursor: pointer;
  -webkit-tap-highlight-color: #c4c4c4;
  &:active {
    opacity: 50%;
  }
  padding: 0;
`;

const SearchErrorMessage = styled.div`
  color: #121212;
  font-size: 17px;
  margin-bottom: 7px;
  padding: 15px 0px 15px 0px;
  border: none;
`;

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

export default function Search({ isOpen, closeSearch, moveToSelectedPlace }) {
  Modal.setAppElement("#root");
  Modal.defaultStyles = {};

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    setError(null);
    query === "" && setResults([]);
    if (debouncedQuery) {
      const normalisedDebouncedQuery = debouncedQuery.replace(
        /[^A-zА-яЁё0-9 ]/gm,
        ""
      );
      console.log(normalisedDebouncedQuery);
      searchPlaces(normalisedDebouncedQuery);
    } else {
      // setResults([]);
    }
  }, [query, debouncedQuery]);

  const searchPlaces = async query => {
    const encodedQuery = encodeURIComponent(query);
    const SEARCH_REQUEST = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedQuery}.json?bbox=30.185430,59.815006,30.523818,60.09106&access_token=${MAPBOX_TOKEN}&types=address,poi&country=ru&limit=5`;
    try {
      await fetch(SEARCH_REQUEST)
        .then(response => response.json())
        .then(data => {
          const firstFoundPlace = data.features[0];
          if (firstFoundPlace) {
            setResults(data.features);
          } else {
            setError("nothing_found");
            setResults(data.features);
          }
        });
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  return (
    <Modal
      key="SearchView"
      className="SearchView"
      overlayClassName="SearchView__overlay"
      closeTimeoutMS={300}
      isOpen={isOpen}
      shouldCloseOnEsc
      onRequestClose={() => {
        closeSearch();
      }}
      contentLabel="Search window"
      ariaHideApp={false}
    >
      <SearchViewContainer key="SearchViewContainer">
        <CloseSearchWrapper>
          <CloseButton
            onClick={() => {
              closeSearch();
            }}
          >
            <CloseIcon />
          </CloseButton>
        </CloseSearchWrapper>
        <SearchInput
          query={query}
          onChange={newQuery => {
            setQuery(newQuery);
          }}
        />
        <ResultsCointainer>
          {error && (
            <SearchErrorMessage>{ErrorMessageText(error)}</SearchErrorMessage>
          )}
          {results.map(place => (
            <SearchResult
              key={place.id}
              text={place.text}
              details={place.context[0].text}
              POIaddress={place.properties.address}
              center={place.center}
              onClick={place => {
                moveToSelectedPlace(place);
              }}
            />
          ))}
        </ResultsCointainer>
      </SearchViewContainer>
    </Modal>
  );
}
