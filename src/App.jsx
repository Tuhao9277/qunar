import React,{Component,createContext,useState} from 'react';
import './App.css';
const BatteryContext = createContext()

class Leaf extends Component {
  static contextType = BatteryContext
  render(){
    const battery = this.context
    return (<h1>{battery}</h1>)
    
  }
}
const Middle  = ()=>{
  return (
    <Leaf />
  )
}
function App() {
  const [battery, setBattery] = useState(60);
  return (
    <div className="App">
      <BatteryContext.Provider value={battery}>
      <button type="button" onClick={()=>setBattery(battery-1)}>Press</button>
        <Middle />
      
      </BatteryContext.Provider>
    </div>
  );
}

export default App;
