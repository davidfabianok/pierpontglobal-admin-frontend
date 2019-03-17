import React from 'react';
import './BidsTable.styles.css';
import { withCookies } from 'react-cookie';
import FlipMove from 'react-flip-move';


class BidsTable extends React.Component {
  constructor(props) {
    super(props);

    const { incomingBids } = this.props;

    this.state = {
      hasError: false,
      bids: incomingBids,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { bids } = this.state;
    const { incomingBids } = nextProps;
    if (bids !== incomingBids) {
      this.setState({
        bids: incomingBids,
      });
    }
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return <h1>Something went wrong.</h1>;
    }

    const { bids } = this.state;

    return (
      <div className="BidsTableWrapper">
        <FlipMove
          enterAnimation="fade"
          appearAnimation="fade"
          leaveAnimation="fade"
          style={{
            display: 'flex',
            placeContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          { bids }
        </FlipMove>
      </div>
    );
  }
}

export default withCookies(BidsTable);
