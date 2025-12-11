import { useEffect, useState } from "react"
import { Typography, Button } from "@mui/material"
import styled from "@emotion/styled"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const API_BASE_URL = "http://localhost:8000" // ⚠️ 백엔드 주소에 맞게 수정

export default function BoardPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        setError(null)

        // 📌 서버 라우터:
        // @router.get("/") 이고, main.py 에서
        // app.include_router(board_router, prefix="/board") 라면:
        //   -> `${API_BASE_URL}/board`
        // prefix 없이 include 했다면:
        //   -> `${API_BASE_URL}/`
        const res = await axios.get(`${API_BASE_URL}/board`) // 필요하면 / 로 수정

        setPosts(res.data)
      } catch (err) {
        console.error("게시판 목록 조회 오류:", err)
        setError("게시판 목록을 불러오는 중 오류가 발생했습니다.")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <Container>
      <Title>
        <H5>차자조 AI의 서울시 상권 추천 서비스</H5>
        <H1> 정보 공유 게시판</H1>
        <H6>
          “서울에서 창업을 희망하는 사람들이 소통할 수 있는 공간을 제공합니다.”
        </H6>
      </Title>

      <BoxWrap>
        <BoardListWrapper>
          {loading && (
            <Typography>게시판 목록을 불러오는 중입니다...</Typography>
          )}
          {!loading && error && <Typography color="error">{error}</Typography>}

          {!loading && !error && posts.length === 0 && (
            <Typography>등록된 게시글이 없습니다.</Typography>
          )}
          {!loading &&
            !error &&
            posts.length > 0 &&
            posts.map((post) => (
              <PostRow
                key={post.ip_id}
                onClick={() => navigate(`/board/${post.ip_id}`)}
              >
                <PostTitle>{post.ip_title}</PostTitle>
                <PostMeta>
                  <span>작성자: {post.ip_writer}</span>
                  <span>조회수: {post.ip_view_count}</span>
                  <span>
                    작성일:{" "}
                    {post.ip_created_at ? post.ip_created_at.slice(0, 10) : "-"}
                  </span>
                </PostMeta>
              </PostRow>
            ))}
        </BoardListWrapper>
        {/* ✅ 글쓰기 버튼에 onClick 추가 */}
        <Button
          variant="contained"
          onClick={() => navigate("/boardwriter")}
          sx={{ marginLeft: "1rem", height: "40px" }}
        >
          글쓰기
        </Button>
      </BoxWrap>
    </Container>
  )
}

/* ------------------ styled components ------------------ */

const Container = styled.div`
  background-color: #f9f9f9;
`

const Title = styled.div`
  padding-top: 4em;
  margin-bottom: 4em;
  text-align: center;
`

const H5 = styled.h5`
  font-size: 1em;
  margin-bottom: 1em;
`

const H1 = styled.h1`
  font-size: 3em;
  margin-bottom: 0.4em;
`

const H6 = styled.h6`
  font-size: 1em;
`

const BoxWrap = styled.div`
  padding: 2em 2em;
`

const BoardListWrapper = styled.div`
  width: 100%;
  background-color: #ffffff;
  border-radius: 15px;
  padding: 1.5em;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
`

const PostRow = styled.div`
  padding: 0.9em 0.4em;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;

  &:last-of-type {
    border-bottom: none;
  }

  &:hover {
    background-color: #f5f9ff;
  }
`

const PostTitle = styled.div`
  font-weight: 600;
  margin-bottom: 0.3em;
`

const PostMeta = styled.div`
  font-size: 0.8rem;
  color: #757575;
  display: flex;
  gap: 1.5em;
`
