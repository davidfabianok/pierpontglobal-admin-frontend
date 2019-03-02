import React, { PureComponent } from 'react';
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

  async getLogs() {
    const response = await axios.get(`${ApiServer}/api/v1/admin/administrator/logs`);
    const logsData = response.data;
    const logs = logsData.map(log => (<LogElement log={log} />));

    this.setState({
      logs: logs || [],
    });
  }

  render() {
    const { hasError } = this.state;

    if (hasError) {
      return <h1>Something went wrong.</h1>;
    }
    const { logs } = this.state;

    return (
      <div
        style={{
          marginTop: '7px',
        }}
        className="LogsListWrapper"
      >
        {logs}
      </div>
    );
  }
}

export default LogsList;
