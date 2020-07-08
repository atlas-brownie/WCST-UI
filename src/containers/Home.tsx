import classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';

const columnClasses = classNames(
  'medium-screen:vads-l-col--8',
  'small-screen:vads-u-padding-left--2',
  'small-screen:vads-l-col--6',
  'va-api-u-margin-y--auto',
  'vads-u-margin-x--auto',
);
const flexContainer = classNames(
  'vads-l-grid-container',
  'vads-u-margin-top--6',
  'vads-u-margin-x--auto',
);

const formUrl = 'https://www.va.gov/vaforms/form_detail.asp?FormNo=29-4364';

function HomeSection({
  ariaLabel,
  imageSrc,
  children,
}: {
  ariaLabel: string;
  imageSrc?: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section role="region" aria-label={ariaLabel}>
      <div className={flexContainer}>
        <div className="vads-l-row">
          <div className={columnClasses}>{children}</div>
        </div>
      </div>
    </section>
  );
}

class Home extends React.Component {
  public render() {
    return (
      <div className="home">
        <HomeSection ariaLabel="Upload Benefits Form" title="S">
          <h3>Submit a Widget Claim Form (T4NG)</h3>
          <div className="feature">
            <h4>Have you submitted a form before?</h4>
            <Link to="/check-benefits-status">Check the status of your submission</Link>
          </div>
          <ol className="process">
            <li className="process-step list-one">
              <b>Prepare</b>
              <br />
              <br />
              <b>To continue, you'll need your:</b>
              <br />
              <ul>
                <li>Completed Form T4NG in PDF Format</li>
              </ul>
              If you need a blank copy, you can <a href={formUrl}>download Form T4NG</a>
            </li>
            <li className="process-step list-two">
              <b>Upload</b>
              <br />
              <br />
              Upload your completed form
              <br />
              After submitting the form, you'll get a confirmation message. You can print this for
              your <br />
              records.
            </li>
            <li className="process-step list-three">
              <b>VA Review</b>
              <br />
              <br />
              The VA receives and processes your completed form.
            </li>
          </ol>
          <div className={classNames('va-api-nav-secondary', 'vads-u-margin-y--1')}>
            <Link to="/upload-benefits-form" className={classNames('usa-button')}>
              Submit your form
            </Link>
          </div>
        </HomeSection>
      </div>
    );
  }
}

export default Home;
