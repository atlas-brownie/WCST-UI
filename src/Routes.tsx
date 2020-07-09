import * as React from 'react';

import { Switch } from 'react-router';
import { Route } from 'react-router-dom';

import Home from './containers/Home';
import NotFound from './containers/NotFound';

import BenefitsStatusForm from './containers/checkBenefitsStatusForm/BenefitsStatusForm';
import BenefitsStatusFormSuccess from './containers/uploadBenefitsForm/BenefitsStatusFormSuccess';
import ReviewBenefitsForm from './containers/uploadBenefitsForm/ReviewBenefitsForm';
import UploadBenefitsForm from './containers/uploadBenefitsForm/UploadBenefitsForm';
import UploadBenefitsFormSuccess from './containers/uploadBenefitsForm/UploadBenefitsFormSuccess';

export function SiteRoutes() {
  return (
    <Switch>
      <Route exact={true} path="/" component={Home} />
      <Route exact={true} path="/index.html" component={Home} />
      <Route path="/upload-benefits-form" component={UploadBenefitsForm} />
      <Route path="/review-benefits-form" component={ReviewBenefitsForm} />
      <Route path="/upload-benefits-form-success" component={UploadBenefitsFormSuccess} />
      <Route path="/check-benefits-status" component={BenefitsStatusForm} />
      <Route path="/check-benefits-status-form-success" component={BenefitsStatusFormSuccess} />
      <Route component={NotFound} />
    </Switch>
  );
}
