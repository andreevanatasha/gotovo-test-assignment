import React from "react";
import styled from "styled-components";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

const outline =
  "M34.0539 62.7981C50.2565 61.5002 63 47.9609 63 31.45C63 14.0806 48.897 0 31.5 0C14.103 0 0 14.0806 0 31.45C0 47.9608 12.7433 61.5 28.9458 62.7981V99.446C28.9458 100.857 30.0893 102 31.4999 102C32.9104 102 34.0539 100.857 34.0539 99.446V62.7981Z";

const outlineStyle = {
  stroke: "none",
  fillRule: "evenodd",
  clipRule: "evenodd"
};

const StyledDeliveryTime = styled.text`
  fill: #ffffff;
  text-anchor: middle;
  dominant-baseline: middle;
  letter-spacing: 0.5px;
`;

const ActivePin = props => {
  const receivedTime = props.children[1];
  return (
    <svg height="102" viewBox="0 0 63 102">
      <path d={outline} style={{ ...outlineStyle, fill: "#D95640" }} />
      <ReactCSSTransitionGroup
        component="g"
        transitionName="map-overflow"
        transitionAppear
        transitionAppearTimeout={200}
        transitionEnterTimeout={200}
        transitionLeaveTimeout={200}
      >
        <StyledDeliveryTime x="49%" y="29.5%" fontSize="32">
          {receivedTime}
        </StyledDeliveryTime>
        <StyledDeliveryTime
          x="49%"
          y="46.5%"
          fontSize="15"
          fontWeight="regular"
        >
          {receivedTime && "мин"}
        </StyledDeliveryTime>
      </ReactCSSTransitionGroup>
    </svg>
  );
};

const DisabledPin = () => {
  return (
    <svg height="102" viewBox="0 0 63 102">
      <path d={outline} style={outlineStyle} />
      <path
        d="M22.002 43.9306L44.002 21.9652L41.002 18.9699L19.002 40.9353L22.002 43.9306Z"
        style={{ fillRule: "evernodd", fill: "white" }}
      />
      <path
        d="M19.0024 21.9675L40.985 43.9504L43.9826 40.9527L22 18.9698L19.0024 21.9675Z"
        style={{ fillRule: "evernodd", fill: "white" }}
      />
    </svg>
  );
};

export default function Pin(props) {
  return props.disable ? (
    <DisabledPin />
  ) : (
    <ActivePin> {props.children} </ActivePin>
  );
}
