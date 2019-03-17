import React, { PureComponent } from 'react';
import './BidCollector.styles.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import PropTypes from 'prop-types';

const Timestamp = require('react-timestamp');

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function goTo(url) {
  window.location.href = url;
}

class BidCollector extends PureComponent {
  constructor(props) {
    super(props);

    const { bid } = this.props;

    this.state = {
      hasError: false,
      images: bid.car.car_information.images,
      bid,
    };
  }

  componentWillReceiveProps(newProps) {
    const { bid } = this.state;
    if (bid !== newProps.bid) {
      this.setState({
        bid: newProps.bid,
      });
    }
  }

  render() {
    const { hasError } = this.state;

    if (hasError) {
      return <h1>Something went wrong.</h1>;
    }

    const { images, bid } = this.state;

    const imagesOrganized = [];
    images.forEach((image) => {
      imagesOrganized[image.f4] = image;
    });

    return (
      <div className="BidCollectorWrapper shadow">
        <div style={{ height: '173px', position: 'relative', overflow: 'hidden' }}>
          <Carousel
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            dynamicHeight
            showArrows
          >
            {imagesOrganized.map(image => (
              <div key={image.f1}>
                <img alt="Car" src={image.f3} />
              </div>
            ))}
          </Carousel>
        </div>
        <div style={{ padding: '10px' }}>
          <p>
              Auction ID:
            <span style={{ fontWeight: 200 }}>{bid.id}</span>
          </p>
          <p>
              VIN:
            <span style={{ fontWeight: 200 }}>{bid.car.car_information.vin}</span>
          </p>
          <p>
              Auction ends:
            <span style={{ fontWeight: 200 }}>
              <Timestamp
                autoUpdate={60}
                precision={3}
                time={bid.auction_end}
              />
            </span>
          </p>
          <p>
              Winning bid:
            {' '}
            <span style={{ fontWeight: 200 }}>
              { bid.highest_bid ? `$ ${numberWithCommas(parseFloat(bid.highest_bid.bid_details.amount).toFixed(2))} USD` : 'Not captured' }
              <button
                type="button"
                onClick={() => (goTo(`/apps/cars/bid-detail/${bid.id}`))}
              >
                <i
                  style={{
                    fontSize: '9px',
                    marginLeft: '5px',
                    cursor: 'pointer',
                  }}
                  className="fas fa-external-link-alt"
                />
              </button>
            </span>
          </p>
        </div>
      </div>
    );
  }
}

BidCollector.propTypes = {
  bid: PropTypes.object,
};

BidCollector.defaultProps = {
  bid: {},
};

export default BidCollector;
