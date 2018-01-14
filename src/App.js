import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import background from './images/blurred-background1.jpg';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          id: 1,
          name: 'Bitcoin',
          symbol: 0,
          price_usd: 0,
          percent_change_1h: 0,
          percent_change_7d: 0,
          percent_change_24h: 0
        },

        {
          id: 2,
          name: 'Ethereum',
          symbol: 0,
          price_usd: 0,
          percent_change_1h: 0,
          percent_change_7d: 0,
          percent_change_24h: 0
        },
        {
          id: 3,
          name: 'Litecoin',
          symbol: 0,
          price_usd: 0,
          percent_change_1h: 0,
          percent_change_7d: 0,
          percent_change_24h: 0
        }
      ]
    };
  }

  dataFetch() {
    const url = 'https://api.coinmarketcap.com/v1/ticker/?limit=10';
    axios.get(url)
      .then(response => {
        // console.log(response);
        var wanted = ["bitcoin", "ethereum", "litecoin"];
        var result = response.data.filter(currency => wanted.includes(currency.id));
        this.setState({
          data: result
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.dataFetch();
  }

  render() {
    return (
      <div className="App">
        { this.state.data
          ?
          <CryptoList data={ this.state.data } />
          :
          <Loading /> }
      </div>
      );
  }
}

const Loading = () => {
  <h1 className="loading">Loading...</h1>
}

const CryptoList = (props) => {
  const currencies = props.data.map((currency) => {
    return <CryptoItem key={ currency.id } data={ currency } />
  })
  return <ul className="cryptolist">
           { currencies }
         </ul>
}

const CryptoItem = (props) => {
  const item = props.data;
  return <li className="cryptolist__item">
           <h2 className="cryptolist__item__name"> { item.name } ({ item.symbol })</h2>
           <h3 className="cryptolist__item__usd">{ item.price_usd }</h3>
           <h3 className="cryptolist__item__change_1h">{ item.percent_change_1h }</h3>
           <h3 className="cryptolist__item__change_7d">{ item.percent_change_7d }</h3>
           <h3 className="cryptolist__item__change_24h">{ item.propercent_change_24h }</h3>
         </li>
}

export default App;
