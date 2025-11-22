import { Typography } from "@mui/material";
import styled from "styled-components";

export default function HeaderWrapper() {
  return (
    <HeaderRoot>
      <HeaderWrap1>
        <Typography component={Link} to="/">
          Home
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100px;
`;

const HeaderWrap1 = styled.div``;
const HeaderWrap2 = styled.div``;
