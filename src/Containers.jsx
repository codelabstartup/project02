import { Routes, Route } from "react-router-dom"
import styled from "@emotion/styled"
import HeaderWrapper from "./Components/HeaderWrapper"
import HomePage from "./Pages/HomePage"
import ResultPage from "./Pages/ResultPage"
import StatusPage from "./Pages/StatusPage"
import BoardPage from "./Pages/BoardPage"
import Footer from "./Components/Footer"

const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: auto;
  padding-top: 50px;
`
const RoutesWrapper = styled.div`
  width: 100%;
`

export default function Containers() {
  return (
    <Container>
      <HeaderWrapper />
      <RoutesWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/status" element={<StatusPage />} />
          <Route path="/board" element={<BoardPage />} />
        </Routes>
      </RoutesWrapper>
      <Footer />
    </Container>
  )
}
