import * as React from 'react';

import classNames from 'classnames';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import Footer from './components/Footer';
import Header from './components/Header';
import PageContent from './components/PageContent';
import { history } from './store';

import { defaultUploadBenefitsResponsePayload } from './reducers';

import 'highlight.js/styles/atom-one-dark-reasonable.css';
import './styles/base.scss';

class App extends React.Component {
  public render() {
    // the double flex container only exists and is flexed to
    // address a bug in IE11 where min-height is only respected
    // if the parent of a flex container is also a flex container.
    return (
      <ConnectedRouter history={history}>
        <div className="vads-u-display--flex">
          <div
            className={classNames(
              'vads-u-display--flex',
              'vads-u-flex-direction--column',
              'vads-u-min-height--viewport',
              'vads-u-width--full',
            )}
          >
            <Header {...defaultUploadBenefitsResponsePayload} />
            <Route path="/" component={PageContent} />
            <Footer />
          </div>
        </div>
      </ConnectedRouter>
    );
  }
}

export default App;
