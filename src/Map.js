import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactMapGL, { Marker, FlyToInterpolator } from "react-map-gl";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Pin from "./assets/pin";
import Button from "./Button";
import SearchPanel from "./SearchPanel";
import ErrorMessageText from "./ErrorMessageText";

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
const DELIVERY_TIME = 15; // Delivery time has to be specified in minutes

const MapOverflow = styled(ReactCSSTransitionGroup)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
`;

const CurrentAddressWrapper = styled.div`
  height: calc(50% - 102px); /* 102px = offset of the pin */
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
`;

const CurrentAddress = styled.div`
  text-transform: uppercase;
  text-align: center;
  font-size: 26px;
  padding: 17px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 150px;
  margin-bottom: 5px; /* additional bottom margin of the buttons block */
`;

const ButtonContainer = styled.div`
  flex-grow: 1;
  justify-content: space-between;
  align-items: stretch;
  max-width: 560px;
  margin: 20px;
  display: flex;
  flex-direction: column;
`;

function Map() {
  const [viewport, setViewport] = useState({
    latitude: 59.94445258315937,
    longitude: 30.358288015867043,
    zoom: 14
  });
  const [address, setAddress] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isInTransition, setIsInTransition] = useState(false);
  const [error, setError] = useState(null);
  const [POI, setPOI] = useState("");
  const isAddressKnown = address === "" ? false : true;

  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    window.addEventListener("online", () => {
      setError(null);
    });
    window.addEventListener("offline", () => {
      setError("offline");
    });
    if (!isInTransition) {
      if (POI !== "") {
        setAddress(POI);
        setPOI("");
      } else {
        getAddress();
      }
    } else {
      setAddress("");
      setError(null);
    }

    return () => {
      window.removeEventListener("online", () => {
        setError(null);
      });
      window.removeEventListener("offline", () => {
        setError("offline");
      });
    };
  }, [isInTransition, isSearchOpen]);

  const handleTransition = interactionState => {
    const { isPanning, isZooming } = interactionState;
    if (isPanning || isZooming) {
      !isInTransition && setIsInTransition(true);
    } else {
      isInTransition && setIsInTransition(false);
    }
  };

  const moveToSelectedPlace = selectedPlace => {
    setIsSearchOpen(false);
    setPOI(true);
    const selectedLongitude = selectedPlace.center[0];
    const selectedLatitude = selectedPlace.center[1];
    const selectedName = selectedPlace.text;
    setPOI(selectedName);
    setViewport({
      ...viewport,
      zoom: 13,
      longitude: selectedLongitude,
      latitude: selectedLatitude,
      transitionDuration: "auto",
      transitionInterpolator: new FlyToInterpolator({ speed: 1 })
    });
  };

  const getAddress = async () => {
    const ADDRESS_REQUEST = `https://api.mapbox.com/geocoding/v5/mapbox.places/${
      viewport.longitude
    },${
      viewport.latitude
    }.json?limit=1&types=address&access_token=${MAPBOX_TOKEN}`;
    try {
      await fetch(ADDRESS_REQUEST)
        .then(response => response.json())
        .then(data => {
          const firstFoundPlace = data.features[0];
          if (firstFoundPlace) {
            const street = firstFoundPlace.text
              ? firstFoundPlace.text
              : "Неизвестная улица";
            const house = firstFoundPlace.address
              ? `, ${firstFoundPlace.address}`
              : "";
            setAddress(`${street}${house}`);
          } else {
            setError("parsing_error");
          }
        });
    } catch (err) {
      console.log(err);
      setError("parsing_error");
    }
  };

  return (
    <div style={{ flexGrow: 1 }} key="MapContainer">
      <ReactMapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/light-v10"
        onViewportChange={setViewport}
        onInteractionStateChange={handleTransition}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <Marker
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          offsetTop={-102}
          offsetLeft={-31.5}
        >
          <Pin disable={error}>{isAddressKnown && DELIVERY_TIME}</Pin>
        </Marker>
        <MapOverflow
          transitionName="map-overflow"
          transitionAppear
          transitionAppearTimeout={200}
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}
        >
          <CurrentAddressWrapper key="CurrentAddressWrapper">
            <CurrentAddress key="CurrentAddress">
              {error ? ErrorMessageText(error) : address}
            </CurrentAddress>
          </CurrentAddressWrapper>
          {(isAddressKnown || error) && (
            <ButtonWrapper>
              <ButtonContainer>
                <Button
                  key="SearchButton"
                  onClick={() => {
                    setIsSearchOpen(true);
                  }}
                >
                  Куда доставить?
                </Button>
                <Button key="DeliverButton" primary disabled={error}>
                  Доставить сюда
                </Button>
              </ButtonContainer>
            </ButtonWrapper>
          )}
        </MapOverflow>
      </ReactMapGL>
      <SearchPanel
        isOpen={isSearchOpen}
        closeSearch={() => {
          setIsSearchOpen(false);
        }}
        moveToSelectedPlace={moveToSelectedPlace}
      />
    </div>
  );
}

export default Map;
