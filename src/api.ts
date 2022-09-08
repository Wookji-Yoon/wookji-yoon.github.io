export const FetchMainpage = async () => {
  const response = await fetch("https://api.coinpaprika.com/v1/coins");
  const json = await response.json();
  const data = json.slice(0, 100);
  return data;
};

export const FetchCoinInfo = async (coinId: string) => {
  const response = await fetch(
    "https://api.coinpaprika.com/v1/coins/" + coinId
  );
  const json = await response.json();
  return json;
};

export const FetchCoinPrice = async (coinId: string) => {
  const response = await fetch(
    "https://api.coinpaprika.com/v1/tickers/" + coinId
  );
  const json = await response.json();
  return json;
};

export const FetchCoinHistory = async (coinId: string) => {
  const response = await fetch(
    "https://ohlcv-api.nomadcoders.workers.dev/?coinId=" + coinId
  );
  const json = await response.json();
  return json;
};
