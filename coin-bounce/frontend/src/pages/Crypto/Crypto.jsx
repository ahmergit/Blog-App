import { useState, useEffect } from "react";
import Loader from '../../Component/Loader/Loader';
import { getCrypto } from "../../api/external";

function Crypto() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // IIFE
    (async function cryptoApiCall() {
      try {
        const response = await getCrypto();
        if (Array.isArray(response)) {
          setData(response);
        } else {
          console.error("Invalid response format:", response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  if (data.length === 0) {
    return <Loader text='cryptocurrencies' />;
  }

  const negativeStyle = {
    color: '#ea3943'

  }

  const positiveStyle = {
    color: '#16c784'
  }


  return (
    <div className="overflow-x-auto">
      <table className="my-20 w-full lg:w-[80%] mx-auto border-collapse">
        <thead className="text-center">
          <tr>
            <th className="font-bold text-3xl p-2">#</th>
            <th className="font-bold text-3xl p-2">Coin</th>
            <th className="font-bold text-3xl p-2 sm:hidden md:table-cell hidden ">Symbol</th>
            <th className="font-bold text-3xl p-2">Price</th>
            <th className="font-bold text-3xl p-2">24h</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data.map((coin) => (
            <tr key={coin.id}>
              <td className="border-b border-black p-2 text-lg font-bold">{coin.market_cap_rank}</td>
              <td className="border-b border-black md:ml-32 lg:ml-36 p-2 text-lg font-bold">
                <div className="flex items-center justify-center gap-2">
                  <img src={coin.image} width={40} height={40} alt="" />
                  {coin.name}
                </div>
              </td>
              <td className="border-b border-black p-2 text-lg  font-bold sm:hidden md:table-cell hidden">
                {coin.symbol}
              </td>
              <td className="border-b border-black p-2 text-lg font-bold">{`$${coin.current_price}`}</td>
              <td style={coin.price_change_percentage_24h < 0
                 ? negativeStyle 
                 : positiveStyle
                  } className="border-b border-black p-2 text-lg font-bold">{coin.price_change_percentage_24h}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Crypto;
