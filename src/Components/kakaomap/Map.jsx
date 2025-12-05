import { useEffect, useRef } from "react"

export default function Map({ selectedGu, selectedDong }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markerRef = useRef(null)

  // 1. 최초 지도 생성 (level 9)
  useEffect(() => {
    if (!mapRef.current) return
    const { kakao } = window
    if (!kakao || !kakao.maps) {
      console.error("Kakao Maps SDK not loaded")
      return
    }

    kakao.maps.load(() => {
      const options = {
        center: new kakao.maps.LatLng(37.5665, 126.978), // 서울 시청 근처
        level: 9, // ✅ 처음에는 멀리 (전국/서울 전체 느낌)
      }

      const map = new kakao.maps.Map(mapRef.current, options)
      mapInstanceRef.current = map
    })
  }, [])

  // 2. 구 / 동 선택 시 지도 이동 + 줌 조절
  useEffect(() => {
    const { kakao } = window
    const map = mapInstanceRef.current
    if (!kakao || !kakao.maps || !map) return

    // 아무것도 선택 안 했으면 그냥 둠
    if (!selectedGu && !selectedDong) return

    const geocoder = new kakao.maps.services.Geocoder()

    // 동이 있으면 구+동, 없으면 구만 검색
    const keyword = selectedDong
      ? `서울특별시 ${selectedGu} ${selectedDong}`
      : `서울특별시 ${selectedGu}`

    geocoder.addressSearch(keyword, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x)

        // 지도 중심 이동
        map.setCenter(coords)

        // ✅ 줌 레벨 조절 로직
        if (selectedDong) {
          // 동까지 선택된 경우: 더 확대
          map.setLevel(5) // 필요하면 4, 6 등으로 조정해봐도 됨
        } else if (selectedGu) {
          // 구만 선택된 경우: 구 기준으로 꽤 확대
          map.setLevel(7)
        }

        // 마커 위치 설정
        if (markerRef.current) {
          markerRef.current.setPosition(coords)
        } else {
          markerRef.current = new kakao.maps.Marker({
            map,
            position: coords,
          })
        }
      } else {
        console.warn("Geocoding failed:", status)
      }
    })
  }, [selectedGu, selectedDong])

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />
}
