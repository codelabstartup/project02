import {
  Typography,
  FormControl,
  InputLabel,
  NativeSelect,
  Button,
} from "@mui/material";
import styled from "@emotion/styled";

export default function ResultPage() {
  return (
    <Container>
      <ResultWrapper>
        <ResultWrap>
          <ResultContent></ResultContent>
          <ResultTitle></ResultTitle>
        </ResultWrap>
        <ResultImg></ResultImg>
      </ResultWrapper>
      <SectionTitle></SectionTitle>
      <Selection1></Selection1>
      <Selection2></Selection2>
      <Selection3></Selection3>
      <Selection4></Selection4>
      <CommentWrap>
        <CmtTitle></CmtTitle>
        <CmtContent></CmtContent>
      </CommentWrap>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f9f9f9;

  @media (max-width: 780px) {
    flex-direction: column;
  }
`;
const Result = styled.div``;
