import * as React from 'react';

import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import DropDownPanel from '@department-of-veterans-affairs/formation-react/DropDownPanel';

import { IRootState } from 'src/types';
import headerLogo from '../assets/header-logo.png';
import { defaultFlexContainer } from '../styles/vadsUtils';

import APIDisplay from './APIDisplay';
import VeteransCrisisLine from './crisisLine/VeteransCrisisLine';

import './Header.scss';

interface IHeaderState {
  mobileNavVisible: boolean;
  open: boolean;
  isOn: boolean;
}

export interface IHeaderProps {
  journal: any[];
  version: string;
}

const mapStateToProps = (state: IRootState) => {
  const pathname = state.routing.location?.pathname;
  let displayJournal = [];
  if (pathname === '/check-benefits-status-form-success') {
    displayJournal = state.benefitsStatus.result?.journal || [];
  } else {
    displayJournal = state.uploadBenefits.result?.journal || [];
  }
  return {
    journal: displayJournal,
    version: state.environment.version,
  };
};

class Header extends React.Component<IHeaderProps, IHeaderState> {
  constructor(props: IHeaderProps) {
    super(props);
    this.state = {
      isOn: false,
      mobileNavVisible: false,
      open: false,
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  public handleClick() {
    this.setState((prevState) => {
      return { isOn: !prevState.isOn };
    });
  }

  public render() {
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
                <APIDisplay journal={this.props.journal} />
              </DropDownPanel>
              <div style={{ display: 'inline-block', color: '#fff' }}>
                Version: {this.props.version}
              </div>
            </div>
          </div>
        </header>
      </React.Fragment>
    );
  }

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
