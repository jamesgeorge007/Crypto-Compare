import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import LineChart from 'react-chartjs-2';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {cryptoCoinData : []};
    this.getCoinData = this.getCoinData.bind(this);
    this.coinData ={ labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    }
  }
  componentWillMount(){
    this.getCoinData();
  }
  getCoinData = () => {
    let count = 0;
    let coinData = []
    fetch('https://api.coinmarketcap.com/v2/ticker/')
    .then(response => response.json())
    .then(coinList => {
      for (let key in coinList.data){
        if(count === 10) break;
        console.log(coinList.data[key]);
        coinData.push(coinList.data[key]);
        count++;
        }
        //this.setState({cryptoCoinData: coinData});
        console.log(coinData);
        
        console.log('State:\n' + this.state.cryptoCoinData);
        
      }
    )
    .catch(err => console.log(err));
    
  }
  render() {
    return (
      <div>
        <LineChart data={this.coinData} />
      </div>
    );
  }
}

export default App;
