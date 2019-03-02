import 'babel-polyfill';
import 'typeface-muli';
import React from 'react';
import ReactDOM from 'react-dom';
import './react-table-defaults';
import './styles/index.css';
import './fake-db/fake-db';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { FuseLayout, FuseTheme, FuseAuthorization } from '@fuse';
// import MainFooter from './main/MainFooter';
import jssExtend from 'jss-extend';
import QuickPanel from 'main/quickPanel/QuickPanel';
import store from 'store';
// import ChatPanel from 'main/chatPanel/ChatPanel';
import { Auth } from 'auth';
import { CookiesProvider } from 'react-cookie';
import MainNavbarHeader from './main/MainNavbarHeader';
import MainNavbarContent from './main/MainNavbarContent';
import MainToolbar from './main/MainToolbar';
import { routes } from './fuse-configs/fuseRoutesConfig';
import registerServiceWorker from './registerServiceWorker';
import history from './history';

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend()],
});

jss.options.insertionPoint = document.getElementById('jss-insertion-point');
const generateClassName = createGenerateClassName();

ReactDOM.render(
  <JssProvider jss={jss} generateClassName={generateClassName}>
    <Provider store={store}>
      <Auth>
        <Router history={history}>
          <CookiesProvider>
            <FuseAuthorization routes={routes}>
              <FuseTheme>
                <FuseLayout
                  routes={routes}
                  toolbar={
                    <MainToolbar />
                                    }
                  navbarHeader={
                    <MainNavbarHeader />
                                    }
                  navbarContent={
                    <MainNavbarContent />
                                    }
                                    // footer={
                                    //     // <MainFooter/>
                                    // }
                  rightSidePanel={(
                    <React.Fragment>
                      {/* <ChatPanel/> */}
                      <QuickPanel />
                    </React.Fragment>
)}
                />
              </FuseTheme>
            </FuseAuthorization>
          </CookiesProvider>
        </Router>
      </Auth>
    </Provider>
  </JssProvider>,
  document.getElementById('root'),
);

registerServiceWorker();
