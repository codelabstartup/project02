import { SalesBar, FpLine, AgeRadar, AgeSaleRadar } from "../Components/Chart"
import styled from "@emotion/styled"
import { useResultData } from "../context/ResultDataContext"
import { Table, TableRow, TableCell } from "@mui/material"

export default function ResultPage() {
  // const data = [
  //   { name: "Jan", value: 400, pv: 240, uv: 200 },
  //   { name: "Feb", value: 300, pv: 139, uv: 120 },
  //   { name: "Mar", value: 500, pv: 380, uv: 260 },
  //   { name: "Apr", value: 200, pv: 200, uv: 150 },
  //   { name: "May", value: 350, pv: 180, uv: 160 },
  //   { name: "Jun", value: 600, pv: 390, uv: 300 },
  // ]
  const { dbResult, selection } = useResultData()
  const data_qs = dbResult[0] || []
  const data_ags = dbResult[1] || []
  const data_fp = dbResult[2] || []
  const data_ssi = dbResult[3] || []
  const data_cai = dbResult[4] || []
  console.log(data_fp)

  const monthAvg = Math.floor(
    data_qs[data_qs.length - 1].qs_sales / 3
  ).toLocaleString()
  const monthAvgMen = Math.floor(
    data_ags[data_ags.length - 1].ags_male / 3
  ).toLocaleString()
  const monthAvgWomen = Math.floor(
    data_ags[data_ags.length - 1].ags_female / 3
  ).toLocaleString()
  const monthAvgPop = Math.floor(
    data_fp[data_fp.length - 1].fp_total / 3
  ).toLocaleString()
  const ssiCnt = data_ssi[data_ssi.length - 1].ssi_cnt
  const ssiSmrCnt = data_ssi[data_ssi.length - 1].ssi_similar_cnt

  const gu = selection?.gu
  const dong = selection?.dong
  const category = selection?.category
  return (
    <Container>
      <ResultWrapper>
        <ResultWrap>
          <ResultContent>
            <H2>
              선택하신
              <span style={{ color: "#e65100" }}> {gu} </span>
              <span style={{ color: "#e65100" }}>{dong}</span>의
              <span style={{ color: "#e65100" }}> {category} </span>업종은
            </H2>
          </ResultContent>
          <ResultTitle>
            <H1>추천 or 비추천</H1>
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
      <SectionWrap>
        <SecTitle>1. 최근 분기 간단 요약</SecTitle>
        <SecBox>
          <UBox>
            <Table>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  🏦 동일업종 수
                </TableCell>
                <TableCell>{ssiCnt} 개</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  🏨 유사업종 수
                </TableCell>
                <TableCell>{ssiSmrCnt} 개</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  💰 월 평균 매출
                </TableCell>
                <TableCell>{monthAvg} 원</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  🚶🏻 월 평균 유동인구
                </TableCell>
                <TableCell>{monthAvgPop} 명</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  🙋🏻‍♂️ 월 평균 매출(남)
                </TableCell>
                <TableCell>{monthAvgMen} 원</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  🙋🏻‍♀️ 월 평균 매출(여)
                </TableCell>
                <TableCell>{monthAvgWomen} 원</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  🚍 버스 정류장
                </TableCell>
                <TableCell>
                  {data_cai[data_cai.length - 1].cai_bus_stop} 개
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>🚇 지하철</TableCell>
                <TableCell>
                  {data_cai[data_cai.length - 1].cai_subway} 개
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>🏤 초등학교</TableCell>
                <TableCell>
                  {data_cai[data_cai.length - 1].cai_school_ele} 개
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>🏟 중학교</TableCell>
                <TableCell>
                  {data_cai[data_cai.length - 1].cai_school_mid} 개
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>🏫 고등학교</TableCell>
                <TableCell>
                  {data_cai[data_cai.length - 1].cai_school_hig} 개
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>🏯 대학교</TableCell>
                <TableCell>
                  {data_cai[data_cai.length - 1].cai_university} 개
                </TableCell>
              </TableRow>
            </Table>
          </UBox>
          <DBox></DBox>
        </SecBox>
      </SectionWrap>
      <SectionWrap>
        <SecTitle>2. 분기별 매출 현황</SecTitle>
        <SecChart>
          <SalesBar data={data_qs} />
        </SecChart>
      </SectionWrap>
      <SectionWrap>
        <SecTitle>2. 유동인구 현황</SecTitle>
        <SecChart>
          <FpLine data={data_fp} />
        </SecChart>
      </SectionWrap>
      <SectionWrap>
        <SecTitle>3. 시간별 매출 현황</SecTitle>
        <SecChart>{/* <SalePieChart /> */}</SecChart>
      </SectionWrap>
      <SectionWrap>
        <SecTitle>4. 연령별 유동인구 분포 및 매출 현황</SecTitle>
        <SecChart>
          <DivWrap>
            <DivBox>
              <AgeRadar data={data_fp} />
            </DivBox>
            <DivBox>
              <AgeSaleRadar data={data_ags} />
            </DivBox>
          </DivWrap>
        </SecChart>
      </SectionWrap>
      <SectionWrap>
        <SecTitle>3. 또 뭐하지?</SecTitle>
        <SecChart>{/* <SalePieChart /> */}</SecChart>
      </SectionWrap>
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
const SectionWrap = styled.div`
  padding: 3em 3em;

  @media (max-width: 780px) {
    flex-direction: column;
  }
`
const SecTitle = styled.div`
  font-size: 1.5em;
`
const SecChart = styled.div`
  width: 100%;
  height: 400px;
`
const DivWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: between-space;

  @media (max-width: 780px) {
    flex-direction: column;
  }
`
const DivBox = styled.div`
  width: 100%;
  height: 400px;
`
const SecBox = styled.div``
const UBox = styled.div`
  width: 100%;
  padding: 1em 1em;
`
const DBox = styled.div`
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
