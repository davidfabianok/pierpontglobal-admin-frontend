import React, { PureComponent } from 'react';
import axios from 'axios';
import { FusePageCarded } from '@fuse';
import { Tab, Tabs } from '@material-ui/core';
import { ActionCableProvider, ActionCableConsumer } from 'react-actioncable-provider';
import ActionCable from 'actioncable';
import { withCookies } from 'react-cookie';
import { ApiServer } from '../../../../../Defaults';
import BidsHeader from './BidsHeader/BidsHeader';
import './Bids.styles.css';
import BidsTable from './BidsTable/BidsTable';
import BidCollector from './BidsTable/BidCollector/BidCollector';

function appendBidOrdered(newBid, bids) {
  const orderedBids = [];
  let elementOnList = false;
  for (let i = 0; i < bids.length; i += 1) {
    const listBid = bids[i];

    const newBidDate = new Date(newBid.auction_end);
    const listBidDate = new Date(listBid.props.bid.auction_end);

    if (newBidDate <= listBidDate && !elementOnList) {
      orderedBids.push(<BidCollector key={newBid.id} bid={newBid} />);
      orderedBids.push(listBid);
      elementOnList = true;
    } else {
      orderedBids.push(listBid);
    }
  }
  return orderedBids;
}

function removeOldIfExist(bid, bids) {
  const newBidsList = [];
  for (let i = 0; i < bids.length; i += 1) {
    if (parseInt(bids[i].key, 10) !== bid.id) {
      newBidsList.push(bids[i]);
    }
  }
  return newBidsList;
}

class Bids extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      tabValue: 0,
      bids: [],
      notificationTag: 0,
    };

    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.handleReceived = this.handleReceived.bind(this);
    this.updateCarList = this.updateCarList.bind(this);
    this.getPending = this.getPending.bind(this);
  }

  componentDidMount() {
    this.getPending();
  }

  async getPending() {
    const responseData = (await axios.get(`${ApiServer}/api/v1/admin/bid/collectors`)).data;
    this.updateCarList(responseData);
  }

  handleReceived(message) {
    const bid = JSON.parse(message);
    let { bids } = this.state;
    bids = removeOldIfExist(bid, bids);
    const newBidsList = appendBidOrdered(bid, bids);
    this.setState({ bids: newBidsList, notificationTag: newBidsList.length });
  }

  updateCarList(newCarList) {
    const newCarElements = newCarList.map(car => (<BidCollector key={car.id} bid={car} />));
    this.setState({ bids: newCarElements, notificationTag: newCarElements.length });
  }

  handleChangeTab(event, tabValue) {
    this.setState({ tabValue });
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return <h1>Something went wrong.</h1>;
    }

    const { tabValue, bids, notificationTag } = this.state;
    const { cookies } = this.props;
    this.cable = ActionCable.createConsumer(`${ApiServer}/cable?token=${cookies.get('token')}`);

    return (

      <ActionCableProvider cable={this.cable}>
        <ActionCableConsumer
          channel="BidStatusChannel"
          onReceived={this.handleReceived}
        />
        <FusePageCarded
          classes={{
            content: 'flex',
            header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
          }}
          header={
            <BidsHeader />
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
              <Tab className="h-64 normal-case canNotify" data-notification={notificationTag} label="Pending" icon={<i className="fas fa-ban" />} />
              <Tab className="h-64 normal-case canNotify" data-notification={0} label="Waiting response" icon={<i className="far fa-clock" />} />
              <Tab className="h-64 normal-case canNotify" data-notification={0} label="Closed" icon={<i className="fas fa-check-double" />} />
            </Tabs>
        )}
          content={(
            <div style={{ width: '100%' }}>
              {tabValue === 0 && (<BidsTable incomingBids={bids} />)}
              {tabValue === 1 && (<div />)}
              {tabValue === 2 && (<div />)}
            </div>
        )}
          innerScroll
        />
      </ActionCableProvider>
    );
  }
}

export default withCookies(Bids);
