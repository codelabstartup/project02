import { useEffect, useState } from "react"
import styled from "@emotion/styled"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

export default function BoardDetail() {
  const [form, setForm] = useState({
    title: "",
    writer: "",
    content: "",
    password: "", // 보통은 안 보여주지만 형식 맞추려고 남겨둠
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const { id } = useParams() // /board/:id

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/board/${id}`
        )

        const data = res.data
        // ✅ 백엔드에서 반환하는 키 이름에 맞게 매핑
        setForm({
          title: data.ip_title ?? "",
          writer: data.ip_writer ?? "",
          content: data.ip_content ?? "",
          password: "", // 비밀번호는 보통 안 내려줌
        })
      } catch (err) {
        console.error("게시판 상세 조회 오류:", err)
        setError("게시글을 불러오는 중 오류가 발생했습니다.")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchPost()
    }
  }, [id])

  if (loading) {
    return <Wrapper>게시글을 불러오는 중입니다...</Wrapper>
  }

  if (error) {
    return <Wrapper>{error}</Wrapper>
  }

  return (
    <Wrapper>
      <Title>게시글</Title>
      {/* ✅ onSubmit 없음 → 글 작성/수정 불가 */}
      <Form>
        <Label>제목</Label>
        <Input name="title" value={form.title} readOnly />

        <Label>작성자</Label>
        <Input name="writer" value={form.writer} readOnly />

        <Label>내용</Label>
        <Textarea name="content" value={form.content} readOnly />

        {/* 비밀번호는 상세 페이지에서 보통 안 보여주니까 주석 처리하거나 제거해도 됨 */}
        {/* 
        <Label>비밀번호</Label>
        <Input
          type="password"
          name="password"
          value={form.password}
          readOnly
        />
        */}

        <ButtonRow>
          <Button type="button" onClick={() => navigate("/board")}>
            목록으로
          </Button>
        </ButtonRow>
      </Form>
    </Wrapper>
  )
}

/* -------------------------------
   styled-components 정의 (그대로 사용)
-------------------------------- */

const Wrapper = styled.div`
  max-width: 500px;
  margin: 40px auto;
`

const Title = styled.h2`
  text-align: center;
  margin-bottom: 24px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 4px;
`

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 15px;
  background-color: #f5f5f5; /* 읽기 전용 느낌 살짝 */
  &:focus {
    border-color: #0077ff;
    outline: none;
  }
`

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 15px;
  height: 120px;
  resize: vertical;
  background-color: #f5f5f5;
  &:focus {
    border-color: #0077ff;
    outline: none;
  }
`

const ButtonRow = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
`

const Button = styled.button`
  padding: 12px;
  background-color: #0077ff;
  color: white;
  font-size: 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #005fcc;
  }
`
