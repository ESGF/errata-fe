import {EXECUTION_MODE} from './constants.misc.js';

// Set API base url.
export const API_BASE_URL = {
    dev: "http://localhost:5001",
    prod: "https://errata-api.es-doc.org",
    test: "https://test-errata-api.es-doc.org"
}[EXECUTION_MODE];

// ES-DOC homepage.
export const HOME_PAGE = "https://es-doc.org";

// pid page.
export const PID_PAGE = "pid.html";

// pid resolve.
export const PID_RESOLVE = "/1/resolve/pid";

// pid task queeu search.
export const PID_TASK_QUEUE_SEARCH = "/1/pid-queue/search";

// pid task queeu search setup.
export const PID_TASK_QUEUE_SEARCH_SETUP = "/1/pid-queue/search-setup";

// issue retrieve.
export const RETRIEVE = "/1/issue/retrieve";

// issue search.
export const SEARCH = "/1/issue/search";

// search page.
export const SEARCH_PAGE = "index.html";

// issue search setup.
export const SEARCH_SETUP = "/1/issue/search-setup";

// Set viewerBaseURL.
export const VIEWER_BASE_URL = {
    dev: window.location.href.replace("index", "viewer").replace("pidq", "viewer"),
    prod: "https://errata.es-doc.org/viewer.html",
    test: "https://test-errata.es-doc.org/viewer.html"
}[EXECUTION_MODE];
