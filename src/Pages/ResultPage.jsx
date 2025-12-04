import {
  SaleLineChart,
  SaleBarChart,
  SaleAreaChart,
  SalePieChart,
  SaleComboChart,
} from "../Components/Chart"
import styled from "@emotion/styled"

export default function ResultPage() {
  const data = [
    { name: "Jan", value: 400, pv: 240, uv: 200 },
    { name: "Feb", value: 300, pv: 139, uv: 120 },
    { name: "Mar", value: 500, pv: 380, uv: 260 },
    { name: "Apr", value: 200, pv: 200, uv: 150 },
    { name: "May", value: 350, pv: 180, uv: 160 },
    { name: "Jun", value: 600, pv: 390, uv: 300 },
  ]
  return (
    <Container>
      <ResultWrapper>
        <ResultWrap>
          <ResultContent>
            <H2>{data}</H2>
          </ResultContent>
          <ResultTitle>
            <H1>{data}천</H1>
          </ResultTitle>
        </ResultWrap>
        <ResultImg>
          <ImgBox>
            <img
              src="src/imgs/high.png"
              style={{
                height: "auto",
                // objectFit: "cover",
                // objectPosition: "center",
              }}
            />
          </ImgBox>
        </ResultImg>
      </ResultWrapper>
      <SectionTitle>
        How it works<p></p>
        <h2>상세 분석 내용</h2>
      </SectionTitle>
      <SelectionWrap>
        <SecTitle>1. 매출은 이런 추세</SecTitle>
        <SecChart>
          <SaleLineChart data={data} />
        </SecChart>
      </SelectionWrap>
      <SelectionWrap>
        <SecTitle>2. 유동인구 현황</SecTitle>
        <SecChart>
          <SaleBarChart data={data} />
        </SecChart>
      </SelectionWrap>
      <SelectionWrap>
        <SecTitle>3. 개/폐업 현황</SecTitle>
        <SecChart>
          <SaleComboChart data={data} />
        </SecChart>
      </SelectionWrap>
      <SelectionWrap>
        <SecTitle>4. 또 뭐하지?</SecTitle>
        <SecChart>
          <SalePieChart />
        </SecChart>
      </SelectionWrap>
      <CommentWrap>
        <CmtTitle>We believe</CmtTitle>
        <CmtContent>
          <CmtBox>블라블라</CmtBox>
        </CmtContent>
      </CommentWrap>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  background-color: #f9f9f9;
`
const ResultWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2em;

  @media (max-width: 780px) {
    flex-direction: column;
  }
`
const ResultWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 2em;
  padding-bottom: 2em;
`
const ResultContent = styled.div`
  width: 100%;
`
const H2 = styled.h2`
  text-align: center;
  font-size: 2em;
`
const ResultTitle = styled.div`
  width: 100%;
`
const H1 = styled.h1`
  text-align: center;
  font-size: 3em;
`
const ResultImg = styled.div`
  width: 100%;
`
const ImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const SectionTitle = styled.div`
  padding: 2em 2em 2em 2em;
`
const SelectionWrap = styled.div`
  display: flex;
  padding: 3em 3em;

  @media (max-width: 780px) {
    flex-direction: column;
  }
`
const SecTitle = styled.div`
  flex: 3;
  font-size: 2em;
`
const SecChart = styled.div`
  flex: 7;
  width: 100%;
`
const CommentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const CmtTitle = styled.div`
  font-size: 1.8em;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
`
const CmtContent = styled.div`
  width: 100%;
`
const CmtBox = styled.div`
  width: 80%;
  background-color: #d2f8dc;
  padding: 1em;
  border-radius: 10px;
  margin: auto;
  margin-bottom: 2em;
  text-align: center;
`
