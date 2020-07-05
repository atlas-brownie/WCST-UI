import classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';

// import { Flag } from 'flag';
// import apiDefinitions, { apiCategoryOrder } from '../apiDefs/data/categories';
// import padlockImg from '../assets/homepage-padlock.svg';
// import apiImg from '../assets/homepage-reliable-api.svg';
// import CardLink from '../components/CardLink';
// import Hero from '../components/Hero';

const leftColumnClasses = classNames(
  'medium-screen:vads-l-col--2',
  'small-screen:vads-l-col--4',
  'va-api-u-margin-y--auto',
);
const rightColumnClasses = classNames(
  'medium-screen:vads-l-col--8',
  'small-screen:vads-u-padding-left--2',
  'small-screen:vads-l-col--6',
  'va-api-u-margin-y--auto',
);
const flexContainer = classNames(
  'vads-l-grid-container',
  'vads-u-margin-top--6',
  'vads-u-margin-x--auto',
);
const imageClasses = classNames('medium-screen:vads-u-width--auto', 'va-api-u-width--200');

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
          <div className={leftColumnClasses}>
            <img className={imageClasses} src={imageSrc} alt="" role="presentation" />
          </div>
          <div className={rightColumnClasses}>{children}</div>
        </div>
      </div>
    </section>
  );
}

// function ApiList() {
//   return (
//     <section>
//       <div className={classNames(flexContainer, 'vads-u-margin-bottom--6')}>
//         <div className="vads-l-row">
//           <div className="medium-screen:vads-l-col--4" />
//           <div className="medium-screen:vads-l-col--8">
//             <div className="vads-l-row">
//               {apiCategoryOrder.map((apiCategoryKey: string) => {
//                 const { name, content } = apiDefinitions[apiCategoryKey];
//                 return (
//                   <Flag name={`categories.${apiCategoryKey}`} key={apiCategoryKey}>
//                     <CardLink
//                       className="medium-screen:vads-l-col--5"
//                       name={`VA ${name}`}
//                       url={`/explore/${apiCategoryKey}`}
//                     >
//                       {content.placardText}
//                     </CardLink>
//                   </Flag>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function VeteransNotice() {
//   return (
//     <section
//       className="vads-u-display--none medium-screen:vads-u-display--block"
//       role="region"
//       aria-label="Veterans Notice"
//     >
//       <div
//         className={classNames(
//           'vads-u-background-color--primary',
//           'vads-u-font-size--lg',
//           'vads-u-padding-y--0p5',
//           'vads-u-text-align--center',
//           'vads-u-color--white',
//         )}
//       >
//         <div className="vads-u-margin-y--2p5">
//           Are you a Veteran looking to submit a claim, manage benefits or access your health data?
//           &nbsp;
//           <a
//             className={classNames('vads-u-font-weight--bold', 'vads-u-color--white')}
//             href="https://www.va.gov/"
//           >
//             Visit VA.gov
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// }

class Home extends React.Component {
  public render() {
    return (
      <div className="home">
        {/* <Hero /> */}
        {/* <VeteransNotice /> */}
        <HomeSection ariaLabel="An API platform" title="S">
          <h3>Submit a Widget Claim Form (T4NG)</h3>
          <h4>Have you submitted a form before?</h4>
          <Link to="/apply">Check the status of your submission</Link>
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
