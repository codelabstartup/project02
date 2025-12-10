// 게시판 작성(글쓰기)페이지
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function BoardWrite() {
  const [form, setForm] = useState({ title: "", writer: "", content: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/board", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    navigate(`/board/${data.ip_id}`);
  };

}
