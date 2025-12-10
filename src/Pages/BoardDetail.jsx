// 상세 + 댓글 페이지

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BoardDetail() {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);
  const [comment, setComment] = useState({ writer: "", content: "" });

  useEffect(() => {
    fetch(`http://localhost:8000/board/${id}`)
      .then((res) => res.json())
      .then((data) => setPostData(data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:8000/board/${id}/comments`),{
      method:"POST",
      headers: { }
    }
  }

}