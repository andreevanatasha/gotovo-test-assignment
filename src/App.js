import React from "react";
import "./styles.css";
import styled from "styled-components";
import Map from "./Map";
import BackButton from "./assets/back-button";
import BurgerButton from "./assets/burger-button";
import Logo from "./assets/logo";

const Header = styled.header`
  background-color: #fff;
  border-bottom: 1px solid #f7f7f7;
  height: 48px;
  display: flex;
  justify-content: center;
`;

const NavigationContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
  max-width: 580px;
`;

const NavigationButton = styled.button`
  background-color: transparent;
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  cursor: pointer;
  -webkit-tap-highlight-color: #ffffff;
  &:active {
    opacity: 50%;
  }
  padding: 0;
`;

const PageContainer = styled.div`
  flex-grow: 1;
  display: flex;
`;

const StyledApp = styled.div`
  font-family: "GT-Walsheim", "Arial Narrow", Arial, sans-serif;
  font-weight: medium;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 100%;
`;

export default function App() {
  return (
    <StyledApp key="StyledApp">
      <Header>
        <NavigationContainer>
          <NavigationButton>
            <BackButton />
          </NavigationButton>
          <Logo />
          <NavigationButton>
            <BurgerButton />
          </NavigationButton>
        </NavigationContainer>
      </Header>
      <PageContainer key="PageContainer">
        <Map />
      </PageContainer>
    </StyledApp>
  );
}
