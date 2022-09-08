import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { FetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

interface IOhlcv {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}
interface IChart {
  x: number;
  y: number[];
}
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
function Chart() {
  const { coinId } = useParams<{ coinId?: string }>();
  const { isLoading, data: raw } = useQuery<IOhlcv[]>(["Chart", coinId], () =>
    FetchCoinHistory(coinId as string)
  );
  const [chartData, setChartData] = useState<IChart[]>();
  useEffect(() => {
    const data = raw?.map((d) => {
      return {
        x: d.time_close,
        y: [d.open, d.high, d.low, d.close].map(Number),
      };
    });
    setChartData(data);
  }, [raw]);
  console.log(chartData);
  return isLoading ? (
    <Loader>Loading...</Loader>
  ) : (
    <ApexChart
      type="candlestick"
      series={[{ data: chartData?.map((d) => d) as unknown as number[] }]}
      options={{
        theme: {
          mode: "dark",
        },
        yaxis: {
          labels: {
            formatter: (value: number) => {
              return `$${numberWithCommas(value)}`;
            },
          },
        },
        xaxis: {
          labels: {
            formatter: (value: string) => {
              return new Date(Number(value) * 1000).toLocaleDateString("ko-KR");
            },
          },
        },
        chart: {
          height: 500,
          width: 500,
          toolbar: { show: false },
          background: "transparent",
        },
      }}
    />
  );
}

export default Chart;
