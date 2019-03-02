import React, { PureComponent } from 'react';
import { Card } from '@material-ui/core';
import { PropTypes } from 'prop-types';
import AttributeHolder from './AttributeHolder';

function numberWithCommas(x) {
  const valueWithDecimalPoints = parseFloat(x).toFixed(2);
  return valueWithDecimalPoints.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default class BidCard extends PureComponent {
  constructor(props) {
    super(props);

    const { bid, main } = this.props;
    this.state = {
      bid,
      main,
    };
  }

  componentWillReceiveProps(newProps) {
    const { bid, main } = this.state;

    if (newProps.bid !== bid) {
      this.setState({
        bid: newProps.bid,
      });
    }

    if (newProps.main !== main) {
      this.setState({
        main: newProps.main,
      });
    }
  }

  render() {
    const { bid, main } = this.state;

    return (
      <Card className={`${main ? 'main-bid' : ''} shadow spaced-bid-details`}>
        <AttributeHolder title="User ID" value={bid.user.id} />
        <AttributeHolder title="Username" value={bid.user.username} />
        <AttributeHolder title="Name" value={`${bid.user.first_name} ${bid.user.last_name}`} />
        <AttributeHolder title="Bid ID" value={bid.bid_details.id} />
        <AttributeHolder title="Bid amount" value={`$ ${numberWithCommas(bid.bid_details.amount)} USD`} />
      </Card>
    );
  }
}

BidCard.propTypes = {
  bid: PropTypes.object,
  main: PropTypes.bool,
};

BidCard.defaultProps = {
  bid: {},
  main: false,
};
