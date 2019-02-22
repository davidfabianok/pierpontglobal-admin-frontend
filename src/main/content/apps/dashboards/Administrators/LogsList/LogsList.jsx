import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { ApiServer } from '../../../../../../Defaults';
import LogElement from './LogElement/LogElement';

class LogsList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      logs: [],
    };

    this.getLogs = this.getLogs.bind(this);

    this.getLogs();
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

  async getLogs() {
    const logs = [];
    const response = await axios.get(`${ApiServer}/api/v1/admin/administrator/logs`);
    const logsData = response.data;
    logsData.map((log) => {
      logs.push(<LogElement log={log} />);
    })

    this.setState({
      logs,
    });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    const { logs } = this.state;

    return (
      <div 
      style={{
        marginTop: '7px',
      }} 
      className="LogsListWrapper">
        {logs}
      </div>
    );
  }
}

LogsList.propTypes = {
  // bla: PropTypes.string,
};

LogsList.defaultProps = {
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
)(LogsList);
