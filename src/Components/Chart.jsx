import {
  ComposedChart,
  PieChart,
  Pie,
  AreaChart,
  Area,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { ResponsiveBar } from "@nivo/bar";

function SalesBar({ data }) {
  if (!data || data.length === 0) {
    return <div>표시할 데이터가 없습니다.</div>;
  }

  const weekdayKeys = [
    "qs_mon",
    "qs_tue",
    "qs_wed",
    "qs_thu",
    "qs_fri",
    "qs_sat",
    "qs_sun",
  ];

  const weekdayLabels = {
    qs_mon: "월",
    qs_tue: "화",
    qs_wed: "수",
    qs_thu: "목",
    qs_fri: "금",
    qs_sat: "토",
    qs_sun: "일",
  };

  // 특정 컬럼만 만원 단위로 변환
  const convertToManWonForKeys = (rows, keys) => {
    return rows.map((row) => {
      const updated = { ...row };

      keys.forEach((key) => {
        if (updated[key] != null) {
          updated[key] = Math.round(updated[key] / 10000);
        }
      });

      return updated;
    });
  };

  const chartData = convertToManWonForKeys(data, weekdayKeys);

  return (
    <ResponsiveBar
      data={chartData}
      keys={weekdayKeys}
      indexBy="yqc_code"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      groupMode="stacked"
      axisBottom={{
        legend: "분기",
        legendOffset: 32,
        legendPosition: "middle",
      }}
      axisLeft={{
        legend: "매출 (단위: 만원)",
        legendOffset: -50,
        legendPosition: "middle",
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      // 툴팁에서도 한글 라벨 사용
      tooltip={({ id, value, color, indexValue }) => (
        <div
          style={{
            padding: "4px 8px",
            background: "white",
            border: "1px solid #ccc",
          }}
        >
          <div>
            <strong>{indexValue}</strong>
          </div>
          <div style={{ color }}>
            {weekdayLabels[id] ?? id}: {value.toLocaleString()} 만원
          </div>
        </div>
      )}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          translateX: 120,
          itemsSpacing: 3,
          itemWidth: 80,
          itemHeight: 18,
          itemDirection: "left-to-right",
          symbolSize: 14,
          label: (legend) => weekdayLabels[legend.id] ?? legend.id, // ← 한글 라벨 적용
        },
      ]}
    />
  );
}

function SaleBarChart({ data }) {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid stroke="#D5E4D0" />
          <XAxis dataKey="name" stroke="#506349" />
          <YAxis stroke="#506349" />
          <Tooltip />
          <Bar dataKey="value" fill="#506349" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function SaleAreaChart({ data }) {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <CartesianGrid stroke="#D5E4D0" />
          <XAxis dataKey="name" stroke="#506349" />
          <YAxis stroke="#506349" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#506349"
            fill="#D5E4D0"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function SalePieChart() {
  const pieData = [
    { name: "A", value: 400, fill: "#2E4F21" },
    { name: "B", value: 300, fill: "#506349" },
    { name: "C", value: 300, fill: "#7D9276" },
    { name: "D", value: 200, fill: "#A3C9A8" },
  ];

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Tooltip />
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            label
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function SaleComboChart({ data }) {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <ComposedChart data={data}>
          <CartesianGrid stroke="#D5E4D0" />
          <XAxis dataKey="name" stroke="#506349" />
          <YAxis stroke="#506349" />
          <Tooltip />

          {/* Bar */}
          <Bar dataKey="pv" fill="#7D9276" />

          {/* Line */}
          <Line type="monotone" dataKey="uv" stroke="#2E4F21" strokeWidth={3} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export { SalesBar, SaleBarChart, SaleAreaChart, SalePieChart, SaleComboChart };
