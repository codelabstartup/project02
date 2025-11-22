import {
  Typography,
  FormControl,
  InputLabel,
  NativeSelect,
  Button,
} from "@mui/material";
import styled from "@emotion/styled";

export default function HomePage() {
  return (
    <Container>
      <SearchWrapper>
        <ContentWrap>
          <Typography variant="h3" gutterBottom>
            서울지역 상권 추천 서비스
          </Typography>
          <Typography variant="h6" gutterBottom>
            조회할 행정동과 업종을 선택하세요.
          </Typography>
        </ContentWrap>
        <FormWrap>
          <FormControl sx={{ width: "32%" }}>
            <InputLabel variant="standard" htmlFor="selected-dong">
              동 선택
            </InputLabel>
            <NativeSelect
              defaultValue={"동을 선택하세요."}
              inputProps={{
                name: "dong",
                id: "selected-dong",
              }}
            >
              {dongList.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
          <FormControl sx={{ width: "42%" }}>
            <InputLabel variant="standard" htmlFor="selected-categorynative">
              업종 선택
            </InputLabel>
            <NativeSelect
              defaultValue={"업종을 선택하세요."}
              inputProps={{
                name: "category",
                id: "selected-categorynative",
              }}
            >
              {categoryList.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
          <Button variant="contained" sx={{ width: "26%" }}>
            조회하기
          </Button>
        </FormWrap>
      </SearchWrapper>
      <MapWrapper>
        <MapWrap>
          <img
            src="src/imgs/sdg.png"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover", // div에 꽉 차게
              objectPosition: "center",
            }}
          />
        </MapWrap>
      </MapWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #a0f1bd;

  @media (max-width: 780px) {
    flex-direction: column;
  }
`;
const SearchWrapper = styled.div`
  width: 100%;
`;
const ContentWrap = styled.section`
  margin-top: 3em;
  padding: 2em;
`;
const FormWrap = styled.div`
  display: flex;
  padding: 2em;
`;
const MapWrapper = styled.div`
  width: 100%;
`;
const MapWrap = styled.div`
  margin-top: 3em;
  padding: 2em;
`;

const dongList = [
  { value: "1", label: "동을 선택하세요" },
  { value: "10", label: "금호1가동" },
  { value: "20", label: "금호2·3가동" },
  { value: "30", label: "금호4가동" },
  { value: "40", label: "마장동" },
  { value: "50", label: "사근동" },
  { value: "60", label: "성수1가1동" },
  { value: "70", label: "성수1가2동" },
  { value: "80", label: "성수2가1동" },
  { value: "90", label: "성수2가3동" },
  { value: "100", label: "송정동" },
  { value: "110", label: "옥수동" },
  { value: "120", label: "왕십리2동" },
  { value: "130", label: "왕십리도선동" },
  { value: "140", label: "용답동" },
  { value: "150", label: "응봉동" },
  { value: "160", label: "행당1동" },
  { value: "170", label: "행당2동" },
];

const categoryList = [
  { value: "2", label: "업종을 선택하세요" },
  { value: "a", label: "가구" },
  { value: "b", label: "가방" },
  { value: "c", label: "가전제품" },
  { value: "d", label: "가전제품수리" },
  { value: "e", label: "고시원" },
  { value: "f", label: "골프연습장" },
  { value: "g", label: "네일숍" },
  { value: "h", label: "노래방" },
  { value: "i", label: "당구장" },
  { value: "j", label: "문구" },
  { value: "k", label: "미곡판매" },
  { value: "l", label: "미용실" },
  { value: "m", label: "반찬가게" },
  { value: "n", label: "분식전문점" },
  { value: "o", label: "서적" },
  { value: "p", label: "섬유제품" },
  { value: "q", label: "세탁소" },
  { value: "r", label: "수산물판매" },
  { value: "s", label: "슈퍼마켓" },
  { value: "t", label: "스포츠 강습" },
  { value: "u", label: "스포츠클럽" },
  { value: "v", label: "시계및귀금속" },
  { value: "w", label: "신발" },
  { value: "x", label: "안경" },
  { value: "y", label: "애완동물" },
  { value: "z", label: "양식음식점" },
  { value: "aa", label: "여관" },
  { value: "ab", label: "예술학원" },
  { value: "ac", label: "완구" },
  { value: "ad", label: "외국어학원" },
  { value: "ae", label: "운동/경기용품" },
  { value: "af", label: "육류판매" },
  { value: "ag", label: "의료기기" },
  { value: "ah", label: "의약품" },
  { value: "ai", label: "인테리어" },
  { value: "aj", label: "일반교습학원" },
  { value: "ak", label: "일반의류" },
  { value: "al", label: "일반의원" },
  { value: "am", label: "일식음식점" },
  { value: "an", label: "자동차미용" },
  { value: "ao", label: "자동차수리" },
  { value: "ap", label: "자전거 및 기타운송장비" },
  { value: "aq", label: "전자상거래업" },
  { value: "ar", label: "제과점" },
  { value: "as", label: "조명용품" },
  { value: "at", label: "중식음식점" },
  { value: "au", label: "철물점" },
  { value: "av", label: "청과상" },
  { value: "aw", label: "치과의원" },
  { value: "ax", label: "치킨전문점" },
  { value: "ay", label: "커피-음료" },
  { value: "az", label: "컴퓨터및주변장치판매" },
  { value: "ba", label: "패스트푸드점" },
  { value: "bb", label: "편의점" },
  { value: "bc", label: "피부관리실" },
  { value: "bd", label: "한식음식점" },
  { value: "be", label: "한의원" },
  { value: "bf", label: "핸드폰" },
  { value: "bg", label: "호프-간이주점" },
  { value: "bh", label: "화장품" },
  { value: "bi", label: "화초" },
  { value: "bj", label: "PC방" },
];
