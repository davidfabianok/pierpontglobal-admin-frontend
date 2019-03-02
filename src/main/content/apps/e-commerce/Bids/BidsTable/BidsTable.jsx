import React from 'react';
import './BidsTable.styles.css';
import axios from 'axios';
import { ApiServer } from '../../../../../../Defaults';
import BidCollector from './BidCollector/BidCollector';

class BidsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      bids: [],
    };
    this.getPending = this.getPending.bind(this);
  }

  componentDidMount() {
    this.getPending();
  }

  async getPending() {
    const responseData = (await axios.get(`${ApiServer}/api/v1/admin/bid/collectors`)).data;
    const receivedBids = responseData.map(bid => (<BidCollector key={bid.id} bid={bid} />));
    this.setState({ bids: receivedBids || [] });
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return <h1>Something went wrong.</h1>;
    }

    const { bids } = this.state;

    return (
      <div className="BidsTableWrapper">
        { bids }
      </div>
    );
  }
}

export default BidsTable;
