import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import { Line } from 'react-chartjs-2';
import './App.css';

const options = {
  scaleShowGridLines: true,
  scaleGridLineColor: "rgba(0,0,0,.05)",
  scaleGridLineWidth: 1,
  scaleShowHorizontalLines: true,
  scaleShowVerticalLines: true,
  bezierCurve: true,
  bezierCurveTension: 0.4,
  pointDot: true,
  pointDotRadius: 4,
  pointDotStrokeWidth: 1,
  pointHitDetectionRadius: 20,
  datasetStroke: true,
  datasetStrokeWidth: 2,
  datasetFill: true,
  legendTemplate:
    '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
};

class App extends Component {
  constructor(props){
    super(props);
    this.state = {coinData: this.getCoinData()};
    this.getCoinData = this.getCoinData.bind(this);
  }
  getCoinData = () => {
    let count = 0;
    let cryptoCoinData = []
    let coinNames = [];
    let coinPrices = [];
    fetch('https://api.coinmarketcap.com/v2/ticker/')
    .then(response => response.json())
    .then(coinList => {
      for (let key in coinList.data){
        if(count === 10) break;
        console.log(coinList.data[key]);
        if(coinList.data[key].quotes.USD.price > 100){
            cryptoCoinData.push(coinList.data[key]);
            count++;
          }
        }
        console.log(cryptoCoinData); 
        cryptoCoinData.map(coin => {
          coinNames.push(coin.name);
          coinPrices.push(coin.quotes.USD.price);
          });
        console.log(coinNames);
        console.log(coinPrices);
        
        
      }
    )
    .catch(err => console.log(err));

    return {
      labels: coinNames,
      datasets: [
        {
          label: 'Dataset',
          fillColor: 'rgba(220,220,220,0.2)',
          strokeColor: 'rgba(220,220,220,1)',
          pointColor: 'rgba(220,220,220,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          data: coinPrices,
        },
      ]
    }
    
  }
  render() {
    return (
      <div>
        <Line data={this.state.coinData} options={options} width={600} height={250} />
      </div>
    );
  }
}

export default App;
