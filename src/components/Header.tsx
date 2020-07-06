import classNames from 'classnames';
import { Flag } from 'flag';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

// import { defaultFlexContainer, desktopOnly, mobileOnly } from '../styles/vadsUtils';
import { defaultFlexContainer } from '../styles/vadsUtils';

import headerLogo from '../assets/header-logo.png';

// import Banner from './Banner';
// import VeteransCrisisLine from './crisisLine/VeteransCrisisLine';
// import NavBar from './NavBar';
// import Search from './Search';

import './Header.scss';
import TestingNotice from './TestingNotice';

interface IHeaderState {
  mobileNavVisible: boolean;
}

export default class Header extends React.Component<{}, IHeaderState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      mobileNavVisible: false,
    };
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
        <Flag name="show_testing_notice">
          <TestingNotice />
        </Flag>
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
          {/* <Banner />
          <VeteransCrisisLine /> */}
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
                to="https://www.va.gov"
                title="Digital VA home page"
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
            {/* <div className={desktopOnly()}>
              <div className={classNames(
                'vads-u-display--flex',
                'vads-u-flex-direction--column',
              )}>
                <div className={defaultFlexContainer(true)}>
                  <Link to="/apply" className={buttonClassnames}>Request an API Key</Link>
                  <Search />
                </div>
              </div>
            </div>
            <div className={mobileOnly()}>
              <button
                className={classNames(
                  'va-api-mobile-menu-button',
                  'vads-u-font-size--sm',
                  'vads-u-font-weight--normal',
                  'vads-u-margin--0',
                  'vads-u-padding--0',
                  'vads-u-text-align--center',
                )}
                onClick={this.toggleMenuVisible}
              >
                Menu
              </button>
            </div> */}
          </div>
          {/* <NavBar isMobileMenuVisible={this.state.mobileNavVisible} onClose={navBarCloseHandler} /> */}
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
