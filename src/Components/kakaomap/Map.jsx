import { useEffect, useRef } from "react";

export default function KakaoMap({ gu, dong }) {
  const mapRef = useRef(null);
  const geocoderRef = useRef(null);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) return;

    window.kakao.maps.load(() => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울시청
        level: 8,
      };

      const map = new window.kakao.maps.Map(container, options);
      const geocoder = new window.kakao.maps.services.Geocoder();

      mapRef.current = map;
      geocoderRef.current = geocoder;
    });
  }, []);

  useEffect(() => {
    const kakao = window.kakao;
    const map = mapRef.current;
    const geocoder = geocoderRef.current;

    if (!kakao || !map || !geocoder) return;

    if (!gu || gu === "구를 선택하세요") return;

    let query = `서울특별시 ${gu}`;

    const hasDong = dong && dong !== "동을 선택하세요";

    if (hasDong) {
      query = `서울특별시 ${gu} ${dong}`;
    }

    geocoder.addressSearch(query, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        map.setCenter(coords);

        if (hasDong) {
          map.setLevel(5);
        } else {
          map.setLevel(5);
        }
      } else {
        console.warn("주소 검색 실패:", query, status);
      }
    });
  }, [gu, dong]);

  return <div id="map" style={{ width: "100%", height: "500px" }} />;
}
