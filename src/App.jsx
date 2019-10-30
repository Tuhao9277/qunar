import React,{createContext,useState} from 'react';
import './App.css';
const BatteryContext = createContext()
const OnlineContext = createContext()
const Leaf =()=>{
  return (
    <BatteryContext.Consumer>
    {
      battery => (
        <OnlineContext.Consumer>
          {
            online => <h1>battery ,{battery},online,{String(online)}</h1>
          }
        </OnlineContext.Consumer>
      )
    }
    </BatteryContext.Consumer>
  )
}
const Middle  = ()=>{
  return (
    <Leaf />
  )
}
function App() {
  const [battery, setBattery] = useState(60);
  const [online, setOnline] = useState(false);
  return (
    <div className="App">
      <BatteryContext.Provider value={battery}>
      <OnlineContext.Provider value={online}>
      <button type="button" onClick={()=>setBattery(battery-1)}>Press</button>
      <button type="button" onClick={()=>setOnline(!online)}>Press</button>
        <Middle />
      </OnlineContext.Provider>
      </BatteryContext.Provider>
    </div>
  );
}

export default App;
