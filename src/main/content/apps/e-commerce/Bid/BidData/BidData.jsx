import React, { PureComponent } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import './BidData.styles.css';
import PropTypes from 'prop-types';
import AttributeHolder from './AttributeHolder';
import BidCard from './BidCard';
import { MaterialActionButton } from '../../../components/MaterialAction';

const Timestamp = require('react-timestamp');

class BidData extends PureComponent {
  constructor(props) {
    super(props);

    const { bidCollector } = this.props;

    this.state = {
      hasError: false,
      bidCollector,
    };

    this.copy_vin = this.copyVin.bind(this);
    this.vin = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.bidCollector !== this.setState.bidCollector) {
      this.setState({
        bidCollector: nextProps.bidCollector,
      });
    }
  }

  copyVin() {
    const copyText = this.vin.current;
    const textArea = document.createElement('textarea');
    textArea.value = copyText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('Copy');
    textArea.remove();
  }

  render() {
    const { bidCollector, hasError } = this.state;

    if (hasError) {
      return <h1>Something went wrong.</h1>;
    }

    const imagesOrganized = [];
    if (!bidCollector) {
      return (
        <h1>
          No content
        </h1>
      );
    }

    bidCollector.car.car_information.images.forEach((image) => {
      imagesOrganized[image.f4] = image;
    });

    const {
      car_maker, car_model, trim, year,
    } = bidCollector.car.car_information;

    const openAuctionDate = new Date(bidCollector.auction_end);
    openAuctionDate.setHours(openAuctionDate.getHours() - 1);
    const bidId = bidCollector.highest_bid.bid_details.id;

    const bids = [<div />];

    bidCollector.bids.forEach((bid) => {
      if (bid.bid_details.id !== bidId) {
        bids.push(<BidCard key={bid.bid_details.id} bid={bid} />);
      } else {
        bids[0] = (<BidCard key={bid.bid_details.id} bid={bid} main />);
      }
    });

    return (
      <div className="BidDataWrapper">
        <div className="bid-car-info">
          <div className="rounded-corners bid-car-carousel">
            <Carousel
              showThumbs={false}
              showIndicators={false}
              showStatus={false}
              dynamicHeight
              showArrows
            >
              {imagesOrganized.map(image => (
                <div key={image.f1}>
                  <img alt="Car" key={image.f1} src={image.f3} />
                </div>
              ))}
            </Carousel>
          </div>
          <div style={{ padding: '10px' }}>
            <AttributeHolder key="vehicle" title="Vehicle" value={`${year} ${car_maker} ${car_model} ${trim}`} />
            <AttributeHolder key="vin" copy title="VIN" value={bidCollector.car.car_information.vin} />
            <AttributeHolder key="time-end" title="Auction ends" value={<Timestamp autoUpdate precision={4} time={bidCollector.auction_end} />} />
            <AttributeHolder key="opened-end" style={{ color: '#2db742' }} title="Opened for" value={<Timestamp autoUpdate precision={4} time={openAuctionDate} />} />
          </div>
          <div style={{
            position: 'absolute',
            right: '20px',
            top: '20px',
            display: 'flex',
            flexDirection: 'column',
          }}
          >
            <MaterialActionButton key="submitted" label="Submitted" iconClass="fab fa-font-awesome-flag" />
            <MaterialActionButton key="won" label="Won" iconClass="fab fa-font-awesome-flag" />
            <MaterialActionButton key="lost" iconClass="fab fa-font-awesome-flag" label="Lost" />
          </div>
        </div>
        <hr />
        <div id="BidDetails">
          {bids}
        </div>
      </div>
    );
  }
}

BidData.propTypes = {
  bidCollector: PropTypes.any,
};

BidData.defaultProps = {
  bidCollector: 0,
};

export default BidData;
