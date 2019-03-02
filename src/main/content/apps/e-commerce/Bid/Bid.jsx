import React, { PureComponent } from 'react';
import { FusePageCarded } from '@fuse';
import './Bid.styles.css';
import { Tab, Tabs } from '@material-ui/core';
import axios from 'axios';
import PropTypes from 'prop-types';
import BidsHeader from './BidsHeader/BidsHeader';
import { ApiServer } from '../../../../../Defaults';
import BidData from './BidData/BidData';

class Bid extends PureComponent {
  constructor(props) {
    super(props);

    const { match } = this.props;

    this.state = {
      hasError: false,
      bidId: match.params.bidId,
      tabValue: 0,
      bidCollector: NaN,
    };

    this.getBidCollectorInfo = this.getBidCollectorInfo.bind(this);
    this.handleChangeTab = this.handleChangeTab.bind(this);

    this.getBidCollectorInfo(match.params.bidId);
  }

  async getBidCollectorInfo(id) {
    const response = await axios.get(`${ApiServer}/api/v1/admin/bid/collectors/${id}`);
    const bidCollectorData = response.data;
    this.setState({
      bidCollector: bidCollectorData,
    });
  }

  handleChangeTab(event, tabValue) {
    this.setState({ tabValue });
  }

  render() {
    const { hasError } = this.state;

    if (hasError) {
      return <h1>Something went wrong.</h1>;
    }

    const { bidId, tabValue, bidCollector } = this.state;

    return (
      <FusePageCarded
        classes={{
          content: 'flex',
          header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
        }}
        header={
          <BidsHeader bidCollectorId={bidId} />
                }
        contentToolbar={(
          <Tabs
            value={tabValue}
            onChange={this.handleChangeTab}
            indicatorColor="secondary"
            textColor="secondary"
            centered
            classes={{ root: 'w-full h-64' }}
          >
            <Tab className="h-64 normal-case" label="Highest" icon={<i className="far fa-thumbs-up" />} />
            <Tab className="h-64 normal-case" label="History" icon={<i className="fas fa-history" />} />
          </Tabs>
)}
        content={(
          <div style={{ width: '100%' }}>
            {tabValue === 0 && (<BidData bidCollector={bidCollector} />)}
            {tabValue === 1 && (<div>Empty</div>)}
          </div>
)}
        innerScroll
      />
    );
  }
}

Bid.propTypes = {
  match: PropTypes.object,
};

Bid.defaultProps = {
  match: {},
};

export default Bid;
