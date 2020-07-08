import classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import DropDownPanel from '@department-of-veterans-affairs/formation-react/DropDownPanel';

// import { defaultFlexContainer, desktopOnly, mobileOnly } from '../styles/vadsUtils';
import { defaultFlexContainer } from '../styles/vadsUtils';

import headerLogo from '../assets/header-logo.png';

import Banner from './Banner';
import VeteransCrisisLine from './crisisLine/VeteransCrisisLine';
// import NavBar from './NavBar';
// import Search from './Search';

import './Header.scss';

interface IHeaderState {
  apiRequestString: string;
  apiResponseString: string;
  mobileNavVisible: boolean;
  open: boolean;
  version: string;
  isOn: boolean;
}

export default class Header extends React.Component<{}, IHeaderState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      apiRequestString:
        "curl -X POST 'https://sandbox-api.va.gov/services/vba_documents/v1/uploads'  --data-row '{}'",
      apiResponseString: 'example response',
      isOn: false,
      mobileNavVisible: false,
      open: false,
      version: 'Version 1.0.2',
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  // public handleClick() {
  //   this.setState({ isOn: !this.state.isOn });
  // }

  public handleClick() {
    this.setState(prevState => {
      return { isOn: !prevState.isOn };
    });
  }

  public render() {
    // const navBarCloseHandler = this.toggleMenuVisible.bind(this);
    // const buttonClassnames = classNames(
    //   'usa-button',
    //   'vads-u-background-color--white',
    //   'vads-u-color--primary-darkest',
    //   'vads-u-margin-right--2',
    // );

    return (
      <React.Fragment>
        <header
          role="banner"
          className={classNames('va-api-header', 'vads-u-background-color--primary-darkest')}
        >
          <HashLink
            to="#main"
            className={classNames('va-api-skipnav', 'vads-u-padding-x--2', 'vads-u-padding-y--1')}
            onClick={this.handleSkipNavClick}
          >
            Skip to main content
          </HashLink>
          <Banner />
          <VeteransCrisisLine />
          <div
            className={classNames(
              defaultFlexContainer(true),
              'vads-u-justify-content--space-between',
              'medium-screen:vads-u-padding-x--4',
              'medium-screen:vads-u-margin-y--2',
            )}
          >
            <div
              className={classNames(
                'va-api-logo',
                'vads-u-margin-left--1',
                'medium-screen:vads-u-margin-left--0',
              )}
            >
              <Link
                to="/"
                title="VA home page"
                className={classNames(
                  'vads-u-color--white',
                  'vads-u-font-size--lg',
                  'vads-u-text-decoration--none',
                  'medium-screen:vads-u-font-size--2xl',
                )}
              >
                <img src={headerLogo} alt="Department of Veterans Affairs" />
              </Link>
            </div>
            <div style={{ backgroundColor: '#112e51' }}>
              <DropDownPanel
                buttonText="Product Owner"
                cssClass="va-dropdown"
                isOpen={this.state.open}
                contents="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ullamcorper at eros eu suscipit. Ut imperdiet libero et luctus pretium."
                clickHandler={() => this.setState({ open: !this.state.open })}
              >
                <div>
                  {/* <span style={{ position: 'relative', top: '15px' }}>API is: </span>

                  <button
                    type="button"
                    className="usa-button"
                    style={{ float: 'right' }}
                    onClick={this.handleClick}
                  >
                    {this.state.isOn ? 'ON' : 'OFF'}
                  </button> */}
                </div>

                <div>
                  <span className="ta-label">API REQUEST</span>
                  <textarea readOnly={true}>{this.state.apiRequestString}</textarea>
                </div>

                <div>
                  <span className="ta-label">API RESPONSE</span>
                  <textarea readOnly={true}>{this.state.apiResponseString}</textarea>
                </div>
              </DropDownPanel>
              <div style={{ display: 'inline-block', color: '#fff' }}>{this.state.version}</div>
            </div>
          </div>
        </header>
      </React.Fragment>
    );
  }

  // private toggleMenuVisible() {
  //   this.setState((state: IHeaderState) => {
  //     return { mobileNavVisible: !state.mobileNavVisible };
  //   });
  // }

  // need to manually set focus on navigation to #main, since React Router cancels
  // native anchor click behavior and react-router-hash-link doesn't handle focus
  private handleSkipNavClick() {
    const mainElement: HTMLElement | null = document.querySelector('main');
    if (mainElement) {
      mainElement.focus();
    }
  }
}
