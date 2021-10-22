import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header.js';
import Sheng from './components/Sheng.js';

function App() {
  const [shengs, setShengs] = useState([])

  useEffect(() => {
    const getShengs = async () => {
      const shengsFromServer = await fetchShengs();
      setShengs(shengsFromServer.shengs);
    }

    getShengs();
  }, [])

  const fetchShengs = async () => {
    const res = await (await fetch(
      "https://shengmtaa.com/api/private/shengs/", { mode: 'cors' }
    )).json();
    // const data = await res.json;
    console.log(res);
    return res;
  }

  return (
    <div className="App">
      <Header />
      {
        shengs.map(sheng =>
          <Sheng sheng={sheng} />
        )
      }
    </div>
  );
}

export default App;
