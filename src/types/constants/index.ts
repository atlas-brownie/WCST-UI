export * from './actions/upload-benefits';
export * from './actions/benefits-status';

export const SET_REQUESTED_API_VERSION = 'SET_REQUESTED_APIVERSION';
export type SET_REQUESTED_API_VERSION = typeof SET_REQUESTED_API_VERSION;

export const SET_INITIAL_VERSIONING = 'SET_INITIAL_VERSIONING';
export type SET_INITIAL_VERSIONING = typeof SET_INITIAL_VERSIONING;

export const CURRENT_VERSION_IDENTIFIER = 'current';

export const APPLY_FIELDS_TO_URL_FRAGMENTS = {
  benefits: 'benefits',
  claims: 'claims',
  communityCare: 'community_care',
  confirmation: 'veteran_confirmation',
  facilities: 'facilities',
  health: 'fhir',
  vaForms: 'vaForms',
  verification: 'veteran_verification',
};

export const APPLY_STANDARD_APIS = ['benefits', 'facilities', 'vaForms', 'confirmation'];

export const APPLY_OAUTH_APIS = ['claims', 'communityCare', 'health', 'verification'];
