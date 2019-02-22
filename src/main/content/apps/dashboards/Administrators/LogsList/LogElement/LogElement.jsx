import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './LogElement.styles.css';
import posed from 'react-pose';
import JSONPretty from 'react-json-pretty';

const JSONPrettyMon = require('react-json-pretty/dist/monikai');

const ExpandableDiv = posed.div({
  retracted: {
    height: '47px',
  },
  expanded: {
    height: '250px',
  },
});

class LogElement extends PureComponent {
  constructor( props ) {
    super( props );

    const { log } = this.props;

    this.state = {
      hasError: false,
      log,
      retracted: true,
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

  getBrowserIcon(browser) {
    if (browser.includes('Chrome/')) {
      return "fab fa-chrome"
    } else if (browser.includes('PostmanRuntime/')) {
      return "fab fa-dev"
    } else if (browser.includes('Safari')) {
      return "fab fa-safari"
    } else {
      return "fas fa-question-circle"
    }
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    const { log, retracted } = this.state;

    return (
      <div style={{ cursor: 'pointer' }} className="LogElementWrapper">
        <ExpandableDiv style={{display: 'block', overflow: retracted ? 'hidden' : 'auto'}} pose={retracted ? 'retracted' : 'expanded'} onClick={() => { this.setState({ retracted: !retracted }) }}>
          <div style={{
            height: '47px',
            lineHeight: '47px',
            color: '#3C4252',
            width: '100%',
            }}>
            <span className='complex-badge'>{`${log.controller}#${log.action}`}</span>
            <i className={`${this.getBrowserIcon(log.browser)} browserIcon`}></i>
            <i className="fas fa-globe-americas"></i>{log.ip_address}
            <i style={{marginLeft: '30px'}} class="fas fa-user"></i>{`${log.user.first_name || ''} ${log.user.last_name || ''} (${log.user.username})`}
          </div>
          <div><i style={{width: '40px'}} class="far fa-sticky-note"></i>Note: {log.note}</div>
          <div><i style={{width: '40px'}} class="fas fa-code"></i>Parameters: <JSONPretty id="json-pretty" data={log.params} theme={JSONPrettyMon}></JSONPretty></div>
        </ExpandableDiv>
        <hr />
      </div>
    );
  }
}

LogElement.propTypes = {
  // bla: PropTypes.string,
};

LogElement.defaultProps = {
  // bla: 'test',
};

export default LogElement;
