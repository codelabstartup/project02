import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

export default function HeaderWrapper() {
  return (
    <HeaderRoot>
      <HeaderWrap1>
        <Typography
          component={Link}
          to="/"
          sx={{
            textDecoration: "none", // 언더라인 제거
            color: "#2E4F21", // 부모 색상 사용
            "&:hover": {
              cursor: "pointer",
              textDecoration: "none",
              color: "#333", // 원하는 hover 색상
            },
          }}
        >
          HOME
        </Typography>
      </HeaderWrap1>
      <HeaderWrap2>
        <Typography
          component={Link}
          to="/about"
          sx={{
            textDecoration: "none", // 언더라인 제거
            color: "#2E4F21", // 부모 색상 사용
            "&:hover": {
              cursor: "pointer",
              textDecoration: "none",
              color: "#333", // 원하는 hover 색상
            },
          }}
        >
          ABOUT
        </Typography>
      </HeaderWrap2>
    </HeaderRoot>
  );
}

const HeaderRoot = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background-color: #a0f1bd;
  margin: auto;
`;

const HeaderWrap1 = styled.div``;
const HeaderWrap2 = styled.div``;
