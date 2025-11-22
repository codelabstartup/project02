import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

export default function HeaderWrapper() {
  return (
    <HeaderRoot>
      <HeaderWrap1>
        <Typography component={Link} to="/">
          HOME
        </Typography>
      </HeaderWrap1>
      <HeaderWrap2>
        <Typography component={Link} to="/about">
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
  padding: 1em;
  margin: auto;
`;

const HeaderWrap1 = styled.div``;
const HeaderWrap2 = styled.div``;
