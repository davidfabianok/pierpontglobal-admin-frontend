import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { TableHead, TableRow, Table, TableBody, TableCell } from '@material-ui/core';
import './BidsTable.styles.css';
import axios from 'axios';
import { ApiServer } from '../../../../../../Defaults';

const Timestamp = require('react-timestamp');

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

class BidsTable extends PureComponent { 
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      bids: [],
    };
    this.getPending = this.getPending.bind(this);
  }

  componentWillMount = () => {
    console.log('BidsTable will mount');
  }

  componentDidMount = () => {
    this.getPending();
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('BidsTable will receive props', nextProps);
  }

  componentWillUpdate = (nextProps, nextState) => {
    console.log('BidsTable will update', nextProps, nextState);
  }

  // TODO: Move to actions
  async getPending(){
    const receivedBids = []
    const responseData = (await axios.get(`${ApiServer}/api/v1/admin/bid/all?filter=NOT_SUBMITTED`)).data
    console.log(responseData);
    responseData.map((bid) => {
      receivedBids.push(
        <TableRow>
          <TableCell>{bid.bid_deatails.id}</TableCell>
          <TableCell><Timestamp time={bid.car_details.sale_information.auction_start_date} /></TableCell>
          <TableCell>{bid.car_details.car_information.vin}</TableCell>
          <TableCell>$ {numberWithCommas(parseFloat(bid.bid_deatails.amount).toFixed(2))}</TableCell>
          <TableCell>{bid.user.id}</TableCell>
          <TableCell>Highest local bid</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      )
    })
    this.setState({bids: receivedBids})
  }

  componentDidUpdate = () => {
    console.log('BidsTable did update');
  }

  componentWillUnmount = () => {
    console.log('BidsTable will unmount');
  }

  render () {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    const { bids } = this.state;

    return (
      <div className="BidsTableWrapper">
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>Bid #</TableCell>
              <TableCell>Active due to</TableCell>
              <TableCell>VIN</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Dealer ID</TableCell>
              <TableCell>Highest local bid</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { bids }
          </TableBody>
        </Table>
      </div>
    );
  }
}

BidsTable.propTypes = {
  // bla: PropTypes.string,
};

BidsTable.defaultProps = {
  // bla: 'test',
};

const mapStateToProps = state => ({
  // blabla: state.blabla,
});

const mapDispatchToProps = dispatch => ({
  // fnBlaBla: () => dispatch(action.name()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BidsTable);
