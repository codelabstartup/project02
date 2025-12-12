import { useEffect, useState, useRef } from "react"
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
  // 삭제용 비밀번호
  const [deletePassword, setDeletePassword] = useState("")

  const navigate = useNavigate()
  const { id } = useParams() // /board/:id

  const hasFetched = useRef(false)

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

    if (!id) return

    // StrictMode 때문에 두 번 실행되는 것을 방지하는 가드
    if (hasFetched.current) return
    hasFetched.current = true

    fetchPost()
  }, [id])

  if (loading) {
    return <Wrapper>게시글을 불러오는 중입니다...</Wrapper>
  }

  if (error) {
    return <Wrapper>{error}</Wrapper>
  }

  const handleDelete = async () => {
    if (!window.confirm("정말 이 글을 삭제하시겠습니까?")) return

    if (!deletePassword) {
      alert("비밀번호를 입력하세요.")
      return
    }

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/board/${id}`, {
        // axios의 DELETE 에서 body 보내는 법: data 속성 사용
        data: { password: deletePassword },
      })
      alert("삭제되었습니다.")
      navigate("/board")
    } catch (err) {
      console.error("삭제 오류", err)

      if (err.response && err.response.status === 403) {
        alert("비밀번호가 일치하지 않습니다.")
      } else if (err.response && err.response.status === 404) {
        alert("이미 삭제되었거나 존재하지 않는 글입니다.")
      } else {
        alert("삭제 중 오류가 발생했습니다.")
      }
    }
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

        {/* 🆕 삭제용 비밀번호 입력칸 */}
        <Label>비밀번호 (삭제 시 필요)</Label>
        <Input
          type="password"
          value={deletePassword}
          onChange={(e) => setDeletePassword(e.target.value)}
        />

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
          {/* 삭제 버튼 */}
          <DeleteButton type="button" onClick={handleDelete}>
            삭제
          </DeleteButton>
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
  height: 200px;
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
const DeleteButton = styled(Button)`
  margin-left: 8px;
  background-color: #e53935;

  &:hover {
    backgroud-color: #c62828;
  }
`
