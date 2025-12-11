import React, { useEffect, useState } from "react"
import { Box, Typography } from "@mui/material"
import styled from "@emotion/styled"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"

const API_BASE_URL = "http://localhost:8000" // ⚠️ 백엔드 주소에 맞게 수정

export default function BoardDetail() {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { id } = useParams() // ✅ /board/:id 에서 id 꺼내기

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        setError(null)

        // 📌 서버 라우터:
        // @router.get("/") 이고, main.py 에서
        // app.include_router(board_router, prefix="/board") 라면:
        //   -> `${API_BASE_URL}/board`
        // prefix 없이 include 했다면:
        //   -> `${API_BASE_URL}/`
        const res = await axios.get(`${API_BASE_URL}/board/${id}`) // 필요하면 / 로 수정

        setPost(res.data)
      } catch (err) {
        console.error("게시판 상세페이지 조회 오류:", err)
        setError("게시판 상세페이지를 불러오는 중 오류가 발생했습니다.")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchPost()
    }
  }, [id])

  if (loading) {
    return <Container>게시글을 불러오는 중입니다...</Container>
  }

  if (error) {
    return <Container>{error}</Container>
  }

  if (!post) {
    return <Container>게시글을 찾을 수 없습니다.</Container>
  }

  return (
    <Container>
      {/* 제목 + 메타 정보 영역 */}
      <TitleWrapper>
        <TitleBox>{post.ip_title}</TitleBox>

        <MetaRow>
          <InfoBox>{post.ip_writer}</InfoBox>
          <InfoBox>{post.ip_created_at}</InfoBox>
          <InfoBox>{post.ip_view_count}</InfoBox>
        </MetaRow>
      </TitleWrapper>

      {/* 본문 영역 */}
      <ContentWrapper>
        <ContentBox>{post.ip_content}</ContentBox>
      </ContentWrapper>

      {/* 하단 수정/삭제 버튼 */}
      <FootWrapper>
        <ReviseBox>수정</ReviseBox>
        <DeleteBox>삭제</DeleteBox>
      </FootWrapper>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  min-height: 80vh;
  border: 4px solid #000;
  padding: 2.5em 3em;
  box-sizing: border-box;
  background-color: #fff;
`

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2em;
`

// 가운데 긴 제목 박스
const TitleBox = styled.div`
  width: 60%;
  height: 50px;
  border: 3px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  margin-bottom: 1.5em;
`

// 작성자 / 작성일 / 조회수 가로 줄
const MetaRow = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  gap: 1.5em;
`

const InfoBox = styled.div`
  flex: 1;
  height: 45px;
  border: 3px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.95rem;
`

// 본문 전체 영역
const ContentWrapper = styled.div`
  margin-top: 2em;
  display: flex;
  justify-content: center;
`

// 가운데 큰 본문 박스
const ContentBox = styled.div`
  width: 85%;
  min-height: 300px;
  border: 3px solid #000;
  padding: 1.5em;
  box-sizing: border-box;
  font-size: 1rem;
  line-height: 1.6;
`

// 하단 버튼 영역
const FootWrapper = styled.div`
  margin-top: 2.5em;
  display: flex;
  justify-content: flex-end;
  gap: 1em;
`

const ReviseBox = styled.button`
  width: 80px;
  height: 45px;
  border: 3px solid #000;
  background-color: #fff;
  cursor: pointer;
  font-size: 0.95rem;
`

const DeleteBox = styled(ReviseBox)``
