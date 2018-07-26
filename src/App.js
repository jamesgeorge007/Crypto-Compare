import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import { Line, Bar, Doughnut, Pie, HorizontalBar } from 'react-chartjs-2';
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
};

class App extends Component {
  constructor(props){
    super(props);
    this.state = {coinData: this.getCoinData(), chart: 'Line'};
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
          data: coinPrices,
          backgroundColor: [                
            "#79CAF2",
            "#80DEEA",
            "#A5D6A7",
            "#79CAF2",
            "#80DEEA",
            "#A5D6A7",
            "#C5E1A5",
            "#FFF59D",
          ],
          hoverBackgroundColor: [            
            "#31B2F2",
            "#00BCD4",
            "#4CAF50",
            "#31B2F2",
            "#00BCD4",
            "#4CAF50",
            "#8BC34A",
            "#FFEB3B",
          ]
        },
      ]
    }
    
  }

  render() {
    let comparisonChart;
    if(this.state.chart === 'Line'){
       comparisonChart = <Line data={this.state.coinData} redraw options={options} width={600} height={250} />;
    } else if(this.state.chart === 'Bar'){
       comparisonChart = <Bar data={this.state.coinData} redraw options={options} width={600} height={250} />;
    } else if (this.state.chart === 'Horizontal-Bar') {
      comparisonChart = <HorizontalBar data={this.state.coinData} redraw options={options} width={600} height={250} />;
    } else if (this.state.chart === 'Doughnut') {
      comparisonChart = <Doughnut data={this.state.coinData} redraw options={options} width={600} height={250} />;
    } else if (this.state.chart === 'Pie') {
      comparisonChart = <Pie data={this.state.coinData} redraw options={options} width={600} height={250} />;
    }
    return (
      <div>
        <div style={{padding: 10, borderWidth: 10, borderColor: '#ddd', borderStyle: 'solid'}}>
        {comparisonChart} 
        </div>
        <select style={{width: '80vw', margin: '10vh auto', borderColor: '#2e2e2e'}} className="form-control" onChange={e => this.setState({coinData: this.getCoinData(), chart: e.target.value})}>
          <option value="Line">Line-Chart</option>
          <option value="Bar">Bar-Chart</option>
          <option value="Horizontal-Bar">Horizontal-Bar-Chart</option>
          <option value="Doughnut">Doughnut</option>
          <option value="Pie">Pie</option>
        </select>
      </div>
    );
  }
}

export default App;
