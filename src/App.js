import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Coin from "./components/coinItem/Coin";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
   const getCoinDetails = async()=>{ 
    const res = await axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
     
        setCoins(res.data);
        console.log(res.data);
    }
      getCoinDetails()
  }, [coins]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="header">
        <h1 className="brand">
          <i className="fab fa-btc"></i> CrypTo Price Tracker
        </h1>
        <form>
          <input
            className="inputField"
            type="text"
            onChange={handleChange}
            placeholder="Search Crypto"
          />
        </form>
      </div>
      <div className="coinsContainer">
      {filteredCoins.map((coin) => {
          return (
            <Coin
              key={coin.id}
              name={coin.name}
              price={coin.current_price}
              symbol={coin.symbol}
              marketcap={coin.market_cap}
              volume={coin.total_volume}
              image={coin.image}
              priceChange={coin.price_change_percentage_24h}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
