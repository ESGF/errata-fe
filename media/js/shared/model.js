import * as constants from './constants.js';

// A user interacting with the system.
export class User {
    constructor() {
        this.oauthCredentials= Cookies.get('errata-oauth-credentials');
        this.isAuthenticated = _.isUndefined(this.oauthCredentials) === false;
        this.isModerator = this.isAuthenticated && Cookies.get('errata-user-role') === constants.SECURITY.USER_ROLE_MODERATOR;
        this.isAuthor = this.isAuthenticated && Cookies.get('errata-user-role') === constants.SECURITY.USER_ROLE_AUTHOR;
        this.isAnonymous = !(this.isModerator || this.isAuthor);
    }
}
