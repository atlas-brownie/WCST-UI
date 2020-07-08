import * as React from 'react';

import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import DropDownPanel from '@department-of-veterans-affairs/formation-react/DropDownPanel';

import { IRootState } from 'src/types';
import headerLogo from '../assets/header-logo.png';
import { defaultFlexContainer } from '../styles/vadsUtils';

// import Banner from './Banner';
import VeteransCrisisLine from './crisisLine/VeteransCrisisLine';

import './Header.scss';

interface IHeaderState {
  mobileNavVisible: boolean;
  open: boolean;
  version: string;
  isOn: boolean;
}

export interface IHeaderProps {
  journal: string[];
}

const mapStateToProps = (state: IRootState) => {
  // const uploadBenefitsJournal = state.uploadBenefits.result?.journal || [];
  // const benefitsSuccessJournal = state.benefitsStatus.result?.journal || [];

  const displayJournal = [].concat([], []).filter((item) => {
    if (item) {
      return true;
    } else {
      return false;
    }
  });

  // return {
  //   ...(state.uploadBenefits.result || { journal: null }),
  // };
  return {
    journal: displayJournal,
  };
};

class Header extends React.Component<IHeaderProps, IHeaderState> {
  constructor(props: IHeaderProps) {
    super(props);
    this.state = {
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
    this.setState((prevState) => {
      return { isOn: !prevState.isOn };
    });
  }

  public render() {
    const apiRequestString = JSON.stringify(this.props.journal);
    console.log('Header this.props=', this.props, apiRequestString);

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
          {/* <Banner /> */}
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
                  <textarea rows={50} readOnly={true} value={apiRequestString} />
                </div>

                {/* <div>
                  <span className="ta-label">API RESPONSE</span>
                  <textarea readOnly={true} defaultValue={this.state.apiResponseString} />
                </div> */}
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

export default connect(mapStateToProps)(Header);
