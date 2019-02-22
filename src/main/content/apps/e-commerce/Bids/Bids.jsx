import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {FusePageCarded} from '@fuse';
import BidsHeader from './BidsHeader/BidsHeader';
import './Bids.styles.css';
import BidsTable from './BidsTable/BidsTable';
import { Tab, Tabs } from '@material-ui/core';

class Bids extends PureComponent { 
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      tabValue: 0
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

  handleChangeTab = (event, tabValue) => {
    this.setState({tabValue});
  };

  render () {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    const { tabValue } = this.state;

    return (
      <FusePageCarded
                classes={{
                    content: "flex",
                    header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                  <BidsHeader />
                }
                contentToolbar={
                  <Tabs 
                      value={tabValue}
                      onChange={this.handleChangeTab}
                      indicatorColor="secondary"
                      textColor="secondary"
                      centered
                      classes={{root: "w-full h-64"}}
                  >
                      <Tab className="h-64 normal-case" label="Pending" icon={<i className="fas fa-ban"></i>} />
                      <Tab className="h-64 normal-case" label="Waiting response" icon={<i className="far fa-clock"></i>} />
                      <Tab className="h-64 normal-case" label="Closed" icon={<i className="fas fa-check-double"></i>} />
                  </Tabs>
                }
                content={
                  <div style={{ width: '100%'}}>
                    {tabValue === 0 && (<BidsTable />)}
                    {tabValue === 1 && (<BidsTable />)}
                    {tabValue === 2 && (<BidsTable />)}
                  </div>
                }
                innerScroll
            />
    );
  }
}

Bids.propTypes = {
  // bla: PropTypes.string,
};

Bids.defaultProps = {
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
)(Bids);
