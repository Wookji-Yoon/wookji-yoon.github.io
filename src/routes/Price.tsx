import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { FetchCoinPrice } from "../api";

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    color: ${(props) => props.theme.fontColor};
    font-size: 14px;
    :first-child {
      font-weight: bold;
    }
  }
  border: 1px solid ${(props) => props.theme.fontColor};
  border-radius: 10px;
  padding: 10px 20px;
  margin: 10px 10px 0 10px;
`;

interface IPriceInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Price() {
  const { coinId } = useParams<{ coinId?: string }>();
  const { isLoading, data } = useQuery<IPriceInfo>(["Price", coinId], () =>
    FetchCoinPrice(coinId as string)
  );
  const coinPrice = data?.quotes.USD;
  return isLoading ? (
    <Loader>Loading...</Loader>
  ) : (
    <>
      <Card>
        <span>현재가</span>
        <span>$ {coinPrice?.price.toFixed(2)}</span>
      </Card>
      <Card>
        <span>시가총액</span>
        <span>$ {numberWithCommas(coinPrice?.market_cap as number)}</span>
      </Card>
      <Card>
        <span>어제보다</span>
        <span>{coinPrice?.percent_change_24h}%</span>
      </Card>
      <Card>
        <span>1주일전보다</span>
        <span>{coinPrice?.percent_change_7d}%</span>
      </Card>
      <Card>
        <span>1달전보다</span>
        <span>{coinPrice?.percent_change_30d}%</span>
      </Card>
      <Card>
        <span>1년전보다</span>
        <span>{coinPrice?.percent_change_1y}%</span>
      </Card>
    </>
  );
}
export default Price;
