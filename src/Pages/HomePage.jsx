import {
  Typography,
  FormControl,
  InputLabel,
  NativeSelect,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import Map from "../Components/kakaomap/Map";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [selectedGu, setSelectedGu] = useState("");
  const [selectedDong, setSelectedDong] = useState("");
  const [guList, setGuList] = useState([]); // DB에서 가져오는 구 리스트
  const [dongList, setDongList] = useState([]); // 선택된 구의 동 리스트

  useEffect(() => {
    fetch("http://127.0.0.1:8000/ai")
      .then((res) => res.json())
      .then((data) => {
        console.log("gu API response:", data); // ✅ 실제 데이터 확인

        setGuList(data);
      })
      .catch((err) => {
        console.error("Failed to load gu list", err);
      });
  }, []);

  useEffect(() => {
    if (!selectedGu) {
      setDongList([]);
      return;
    }

    fetch(`http://127.0.0.1:8000/ai?gu=${encodeURIComponent(selectedGu)}`)
      .then((res) => res.json())
      .then((data) => {
        setDongList(data);
      })
      .catch((err) => {
        console.error("Failed to load dong list", err);
      });
  }, [selectedGu]);

  const handleGuChange = (e) => {
    const value = e.target.value;
    setSelectedGu(value);
    setSelectedDong("");
  };

  const handleDongChange = (e) => {
    const value = e.target.value;
    setSelectedDong(value);
  };

  return (
    <Container>
      <SearchWrapper>
        <ContentWrap>
          <Typography variant="h3" gutterBottom>
            서울지역 상권 추천 서비스
          </Typography>
          <Typography variant="h6" gutterBottom>
            모든 항목을 선택하세요.
          </Typography>
        </ContentWrap>
        <FormWrap>
          <SelectForm>
            <FormControl sx={{ width: "50%" }}>
              <InputLabel variant="standard" htmlFor="selected-gu">
                구 선택
              </InputLabel>
              <NativeSelect
                value={selectedGu}
                onChange={handleGuChange}
                inputProps={{
                  name: "gu",
                  id: "selected-gu",
                }}
              >
                <option value="">구를 선택하세요</option>
                {guList.map((item) => (
                  <option key={item.gu_id} value={item.gu_name}>
                    {item.gu_name}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>

            <FormControl sx={{ width: "50%" }}>
              <InputLabel variant="standard" htmlFor="selected-dong">
                동 선택
              </InputLabel>
              <NativeSelect
                value={selectedDong}
                onChange={handleDongChange}
                inputProps={{
                  name: "dong",
                  id: "selected-dong",
                }}
              >
                <option value="">동을 선택하세요</option>
                {dongList.map((item) => (
                  <option key={item.dong_id} value={item.dong_name}>
                    {item.dong_name}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
          </SelectForm>

          <SearchForm>
            <FormControl sx={{ width: "50%" }}>
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
            <Button
              component={Link}
              to="/result"
              variant="contained"
              sx={{
                width: "26%",
                backgroundColor: "#2E4F21",
                borderRadius: "25px",
              }}
            >
              조회하기
            </Button>
          </SearchForm>
        </FormWrap>
      </SearchWrapper>
      <MapWrapper>
        <MapWrap>
          <Map gu={selectedGu} dong={selectedDong} />
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
  padding: 2em;
`;
const SelectForm = styled.div`
  margin-bottom: 2em;
`;
const SearchForm = styled.div`
  display: flex;
  justify-content: space-between;
`;
const MapWrapper = styled.div`
  width: 100%;
`;
const MapWrap = styled.div`
  margin-top: 3em;
  padding: 2em;
`;

// const guList = [
//   { value: "0", label: "구를 선택하세요" },
//   { value: "강남구", label: "강남구" },
//   { value: "강동구", label: "강동구" },
//   { value: "강북구", label: "강북구" },
//   { value: "강서구", label: "강서구" },
//   { value: "관악구", label: "관악구" },
//   { value: "광진구", label: "광진구" },
//   { value: "구로구", label: "구로구" },
//   { value: "금천구", label: "금천구" },
//   { value: "노원구", label: "노원구" },
//   { value: "도봉구", label: "도봉구" },
//   { value: "동대문구", label: "동대문구" },
//   { value: "동작구", label: "동작구" },
//   { value: "마포구", label: "마포구" },
//   { value: "서대문구", label: "서대문구" },
//   { value: "서초구", label: "서초구" },
//   { value: "성동구", label: "성동구" },
//   { value: "성북구", label: "성북구" },
//   { value: "송파구", label: "송파구" },
//   { value: "양천구", label: "양천구" },
//   { value: "영등포구", label: "영등포구" },
//   { value: "용산구", label: "용산구" },
//   { value: "은평구", label: "은평구" },
//   { value: "종로구", label: "종로구" },
//   { value: "중구", label: "중구" },
//   { value: "중랑구", label: "중랑구" },
// ];

// const dongList = [
//   { value: "1", label: "동을 선택하세요" },
//   { value: "10", label: "금호1가동" },
//   { value: "20", label: "금호2·3가동" },
//   { value: "30", label: "금호4가동" },
//   { value: "40", label: "마장동" },
//   { value: "50", label: "사근동" },
//   { value: "60", label: "성수1가1동" },
//   { value: "70", label: "성수1가2동" },
//   { value: "80", label: "성수2가1동" },
//   { value: "90", label: "성수2가3동" },
//   { value: "100", label: "송정동" },
//   { value: "110", label: "옥수동" },
//   { value: "120", label: "왕십리2동" },
//   { value: "130", label: "왕십리도선동" },
//   { value: "140", label: "용답동" },
//   { value: "150", label: "응봉동" },
//   { value: "160", label: "행당1동" },
//   { value: "170", label: "행당2동" },
// ];

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
