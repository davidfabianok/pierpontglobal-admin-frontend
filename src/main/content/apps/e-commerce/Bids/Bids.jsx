import React, { PureComponent } from 'react';
import { FusePageCarded } from '@fuse';
import { Tab, Tabs } from '@material-ui/core';
import BidsHeader from './BidsHeader/BidsHeader';
import './Bids.styles.css';
import BidsTable from './BidsTable/BidsTable';

class Bids extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      tabValue: 0,
    };

    this.handleChangeTab = this.handleChangeTab.bind(this);
  }

  handleChangeTab(event, tabValue) {
    this.setState({ tabValue });
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return <h1>Something went wrong.</h1>;
    }

    const { tabValue } = this.state;

    return (
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
            <Tab className="h-64 normal-case" label="Pending" icon={<i className="fas fa-ban" />} />
            <Tab className="h-64 normal-case" label="Waiting response" icon={<i className="far fa-clock" />} />
            <Tab className="h-64 normal-case" label="Closed" icon={<i className="fas fa-check-double" />} />
          </Tabs>
)}
        content={(
          <div style={{ width: '100%' }}>
            {tabValue === 0 && (<BidsTable />)}
            {tabValue === 1 && (<BidsTable />)}
            {tabValue === 2 && (<BidsTable />)}
          </div>
)}
        innerScroll
      />
    );
  }
}

export default Bids;
