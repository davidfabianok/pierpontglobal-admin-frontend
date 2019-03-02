import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as userActions from 'auth/store/actions';
import { bindActionCreators } from 'redux';
import * as Actions from 'store/actions';
import auth0Service from 'auth0Service';
import { withCookies } from 'react-cookie';

class Auth extends Component {
  constructor(props) {
    super(props);

    this.auth0Check = this.auth0Check.bind(this);
    auth0Service.init();
  }

  componentDidMount() {
    this.auth0Check();
  }

  auth0Check() {
    const { setUserDataAuth0 } = this.props;
    setUserDataAuth0();
  }

  render() {
    const { children } = this.props;

    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setUserDataAuth0: userActions.setUserDataAuth0,
    setUserDataFirebase: userActions.setUserDataFirebase,
    showMessage: Actions.showMessage,
    hideMessage: Actions.hideMessage,
  },
  dispatch);
}

export default withCookies(connect(null, mapDispatchToProps)(Auth));
