import { BrowserRouter } from "react-router-dom"
import Containers from "./Containers"
import "./App.css"
import { ResultDataProvider } from "./context/ResultDataContext"

import BoardList from "./Pages/BoardList"
import BoardDetail from "./Pages/BoardDetail"
import BoardWrite from "./Pages/BoardDetail"

function App() {
  return (
    <BrowserRouter>
      <ResultDataProvider>
        <Containers>
      <Routes>
          <Route path="/" element={<div>메인 페이지</div>} />
          <Route path="/board" element={<BoardList />} />
          <Route path="/board/write" element={<BoardWrite />} />
          <Route path="/board/:id" element={<BoardDetail />} />
        </Routes>
        </Containers>
      </ResultDataProvider>
    </BrowserRouter>
  )
}

export default App
