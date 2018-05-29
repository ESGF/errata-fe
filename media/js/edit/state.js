// Module imports.
import Issue from  './model.js';

// OAuth credentials.
export const OAuthCredentials = Cookies.get('errata-oauth-credentials');

// Flag indicating whether user is authenticated or not.
export const isAuthenticated = _.isUndefined(OAuthCredentials) === false;

// Issue.
export const issue = new Issue();
