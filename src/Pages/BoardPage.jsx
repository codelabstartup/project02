// 게시판 목록 페이지
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled"

function BoardPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/board?page=1&size=10")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

 return (
    <div>
      <h2></h2>
      <Link to="/board/write">글쓰기</Link>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>조회수</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p.ip_id}>
              <td>{p.ip_id}</td>
              <td>
                <Link to={`/board/${p.ip_id}`}>{p.ip_title}</Link>
              </td>
              <td>{p.ip_writer}</td>
              <td>{p.ip_view_count}</td>
              <td>{p.ip_created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default BoardList;



