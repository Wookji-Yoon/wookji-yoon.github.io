import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FetchMainpage } from "../api";
import { Helmet } from "react-helmet";

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
const CoinsList = styled.ul``;
const Coin = styled.li`
  background-color: ${(props) => props.theme.fontColor};
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;

  border-radius: 15px;
  a {
    padding: 20px;
    display: flex;
    align-items: center;
    transition: color 0.15s ease-in-out;
  }
  :hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data: coins } = useQuery<ICoin[]>("coins", FetchMainpage);
  return (
    <>
      <Helmet>
        <title>Coins | Crypto Tracker</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
      </Header>
      <Container>
        <CoinsList>
          {isLoading ? (
            <Loader>"Loading..."</Loader>
          ) : (
            coins?.map((coin) => (
              <Coin key={coin.id}>
                <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                  <Img
                    src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                  />
                  {coin.name}
                  &rarr;
                </Link>
              </Coin>
            ))
          )}
        </CoinsList>
      </Container>
    </>
  );
}

export default Coins;
