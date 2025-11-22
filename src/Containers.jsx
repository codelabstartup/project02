import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import styled from "styled-components";
import HeaderWrapper from "./Header/HeaderWrapper";
import HomePage from "./Pages/HomePage";

const RoutesWrapper = styled.div``;

export default function Containers() {
  return (
    <Container>
      <HeaderWrapper />
      <RoutesWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </RoutesWrapper>
    </Container>
  );
}
