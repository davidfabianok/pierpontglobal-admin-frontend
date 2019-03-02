import React, { PureComponent } from 'react';
import './LogElement.styles.css';
import posed from 'react-pose';
import JSONPretty from 'react-json-pretty';
import PropTypes from 'prop-types';

const JSONPrettyMon = require('react-json-pretty/dist/monikai');

const ExpandableDiv = posed.div({
  retracted: {
    height: '47px',
  },
  expanded: {
    height: '250px',
  },
});

function getBrowserIcon(browser) {
  if (browser.includes('Chrome/')) {
    return 'fab fa-chrome';
  } if (browser.includes('PostmanRuntime/')) {
    return 'fab fa-dev';
  } if (browser.includes('Safari')) {
    return 'fab fa-safari';
  }
  return 'fas fa-question-circle';
}

class LogElement extends PureComponent {
  constructor(props) {
    super(props);

    const { log } = this.props;

    this.state = {
      hasError: false,
      log,
      retracted: true,
    };
  }

  render() {
    const { hasError, log, retracted } = this.state;

    if (hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return (
      <div style={{ cursor: 'pointer' }} className="LogElementWrapper">
        <ExpandableDiv style={{ display: 'block', overflow: retracted ? 'hidden' : 'auto' }} pose={retracted ? 'retracted' : 'expanded'} onClick={() => { this.setState({ retracted: !retracted }); }}>
          <div style={{
            height: '47px',
            lineHeight: '47px',
            color: '#3C4252',
            width: '100%',
          }}
          >
            <span className="complex-badge">{`${log.controller}#${log.action}`}</span>
            <i className={`${getBrowserIcon(log.browser)} browserIcon`} />
            <i className="fas fa-globe-americas" />
            {log.ip_address}
            <i style={{ marginLeft: '30px' }} className="fas fa-user" />
            {`${log.user.first_name || ''} ${log.user.last_name || ''} (${log.user.username})`}
          </div>
          <div>
            <i style={{ width: '40px' }} className="far fa-sticky-note" />
Note:
            {' '}
            {log.note}
          </div>
          <div>
            <i style={{ width: '40px' }} className="fas fa-code" />
Parameters:
            {' '}
            <JSONPretty id="json-pretty" data={log.params} theme={JSONPrettyMon} />
          </div>
        </ExpandableDiv>
        <hr />
      </div>
    );
  }
}

LogElement.propTypes = {
  log: PropTypes.object,
};

LogElement.defaultProps = {
  log: {},
};

export default LogElement;
