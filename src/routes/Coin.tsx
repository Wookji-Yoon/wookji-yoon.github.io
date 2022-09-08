import React from "react";
import { useParams, useLocation, Routes, Route, Link } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";
import { FetchCoinInfo, FetchCoinPrice } from "../api";
import { Helmet } from "react-helmet";

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 0 40px;
  max-width: 480px;
  margin: 0 auto;
`;
const 뒤로가기 = styled.div`
  position: absolute;
  left: 50px;
  color: ${(props) => props.theme.accentColor};
  font-size: 25px;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 50px;
`;
const Container = styled.div`
  padding: 0 40px;
  max-width: 480px;
  margin: 0 auto;
`;
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Cards = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.fontColor};
  padding: 20px 0px;
`;
const Card = styled.div`
  color: ${(props) => props.theme.bgColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30%;
  span:first-child {
    font-size: 12px;
    margin-bottom: 3px;
  }
  span:last-child {
    font-size: 20px;
  }
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Tab = styled(Cards)<{ isActive: boolean }>`
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.bgColor};
  height: 25px;
  padding: 10px;
  width: 180px;
  display: flex;
  justify-content: center;
`;
const P = styled.p`
  margin: 10px;
`;

interface ILocation {
  state: {
    name: string;
  };
}
interface IInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  tags: {
    id: string;
    name: string;
    coin_counter: number;
    ico_counter: number;
  }[];
  team: {
    id: string;
    name: string;
    position: string;
  }[];
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: {
    explorer: string[];
    facebook: string[];
    reddit: string[];
    source_code: string[];
    website: string[];
    youtube: string[];
  };
  links_extended: {
    url: string;
    type: string;
    stats?: {
      contributors: number;
      stars: number;
    };
  }[];
  whitepaper: {
    link: string;
    thumbnail: string;
  };
  first_data_at: string;
  last_data_at: string;
}
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

function Coin() {
  const { coinId } = useParams<{ coinId?: string }>();
  const { state } = useLocation() as ILocation;

  const { isLoading: infoLoading, data: coinInfo } = useQuery<IInfo>(
    ["Info", coinId],
    () => FetchCoinInfo(coinId as string)
  );
  const { isLoading: priceLoading, data: coinPrice } = useQuery<IPriceInfo>(
    ["Price", coinId],
    () => FetchCoinPrice(coinId as string)
  );
  const isLoading = infoLoading || priceLoading;

  const isPrice = useLocation().pathname.includes("/price");
  const isChart = useLocation().pathname.includes("/chart");

  return (
    <>
      <Helmet>
        <title>
          {state?.name ? state.name : isLoading ? "Loading..." : coinInfo?.name}
        </title>
      </Helmet>
      <Header>
        <뒤로가기>
          <Link to="/">&larr;</Link>
        </뒤로가기>

        <Title>
          {state?.name ? state.name : isLoading ? "Loading..." : coinInfo?.name}
        </Title>
      </Header>
      <Container>
        {isLoading ? (
          <Loader>"Loading..."</Loader>
        ) : (
          <>
            <Cards>
              <Card>
                <span>Rank</span>
                <span>{coinInfo?.rank}</span>
              </Card>
              <Card>
                <span>Symbol</span>
                <span>{coinInfo?.symbol}</span>
              </Card>
              <Card>
                <span>Price</span>
                <span>${coinPrice?.quotes.USD.price.toFixed(2)}</span>
              </Card>
            </Cards>
            <P>{coinInfo?.description}</P>
          </>
        )}

        <Tabs>
          <Link to="chart">
            <Tab isActive={isChart}>Chart</Tab>
          </Link>
          <Link to="price">
            <Tab isActive={isPrice}>Price</Tab>
          </Link>
        </Tabs>

        <Routes>
          <Route path="chart" element={<Chart />} />
          <Route path="price" element={<Price />} />
        </Routes>
      </Container>
    </>
  );
}

export default Coin;
