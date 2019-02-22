import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FusePageCarded } from '@fuse';
import AdministratorsHeader from './AdministratorsHeader/AdministratorsHeader';
import { Tabs, Tab } from '@material-ui/core';
import AdminTable from './AdminTable/AdminTable';
import LogsList from './LogsList/LogsList';

class Administrators extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      tabValue: 0,
    };
  }

  componentWillMount = () => {
  }

  componentDidMount = () => {
  }

  componentWillReceiveProps = (nextProps) => {
  }

  componentWillUpdate = (nextProps, nextState) => {
  }

  componentDidUpdate = () => {
  }

  componentWillUnmount = () => {
  }

  handleChangeTab = (e, i) => {
    this.setState({
      tabValue: i,
    })
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    const { tabValue } = this.state

    return (
      <FusePageCarded
        classes={{
          content: "flex",
          header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
        }}
        header={
          <AdministratorsHeader />
        }
        contentToolbar={
          <Tabs
            value={tabValue}
            onChange={this.handleChangeTab}
            indicatorColor="secondary"
            textColor="secondary"
            centered
            classes={{ root: "w-full h-64" }}
          >
            <Tab className="h-64 normal-case" label="Users" icon={<i className="fas fa-user"></i>} />
            <Tab className="h-64 normal-case" label="Logs" icon={<i className="fas fa-clipboard-list"></i>} />
          </Tabs>
        }
        content={
          <div style={{ width: '100%'}}>
            {tabValue === 0 && (<AdminTable />)}
            {tabValue === 1 && (<LogsList />)}
          </div>
        }
        innerScroll
      />
    );
  }
}

Administrators.propTypes = {
  // bla: PropTypes.string,
};

Administrators.defaultProps = {
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
)(Administrators);
