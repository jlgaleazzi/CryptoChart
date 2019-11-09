import React, {Component} from 'react'
import './App.css';
import Liveprice from './components/livePrice';
import Chart from './components/BChart'

class App extends Component {
    render() {
        return <div className="App">
           <Liveprice/>
           <Chart/>
        </div>
    }
}

export default App;