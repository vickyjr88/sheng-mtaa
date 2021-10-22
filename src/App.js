import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
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
      <Sheng />
      {
        shengs.map(sheng =>
          <div>{sheng.word}</div>
        )
      }
    </div>
  );
}

export default App;
