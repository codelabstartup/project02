import { Routes, Route } from "react-router-dom";
import styled from "@emotion/styled";
import HeaderWrapper from "./Components/HeaderWrapper";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import ResultPage from "./Pages/ResultPage";
import MarketPage from "./Pages/MarketPage";
import BoardPage from "./Pages/BoardPage";
import Footer from "./Components/Footer";

const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: auto;
`;
const RoutesWrapper = styled.div`
  width: 100%;
`;

export default function Containers() {
  return (
    <Container>
      <HeaderWrapper />
      <RoutesWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/market" element={<MarketPage />} />
          <Route path="/board" element={<BoardPage />} />
        </Routes>
      </RoutesWrapper>
      <Footer />
    </Container>
  );
}
