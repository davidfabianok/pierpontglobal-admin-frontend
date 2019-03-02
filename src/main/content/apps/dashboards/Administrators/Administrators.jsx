import React, { PureComponent } from 'react';
import { FusePageCarded } from '@fuse';
import { Tabs, Tab } from '@material-ui/core';
import AdministratorsHeader from './AdministratorsHeader/AdministratorsHeader';
import AdminTable from './AdminTable/AdminTable';
import LogsList from './LogsList/LogsList';

class Administrators extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      tabValue: 0,
    };

    this.handleChangeTab = this.handleChangeTab.bind(this);
  }

  handleChangeTab(e, i) {
    this.setState({
      tabValue: i,
    });
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
          <AdministratorsHeader />
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
            <Tab className="h-64 normal-case" label="Users" icon={<i className="fas fa-user" />} />
            <Tab className="h-64 normal-case" label="Logs" icon={<i className="fas fa-clipboard-list" />} />
          </Tabs>
)}
        content={(
          <div style={{ width: '100%' }}>
            {tabValue === 0 && (<AdminTable />)}
            {tabValue === 1 && (<LogsList />)}
          </div>
)}
        innerScroll
      />
    );
  }
}

export default Administrators;
