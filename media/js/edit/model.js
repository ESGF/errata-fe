// Module imports.
import * as STATE from  './state.js';
import * as UTILS from  '../shared/utilities.js';

// An issue being either created / updated.
export default class Issue {
    // Instance ctor.
    constructor(uid) {
        this.datasets = [];
        this.description = null;
        this.materials = [];
        this.project = null;
        this.severity = "low";
        this.status = "new";
        this.title = null;
        this.uid = UTILS.getURLParam("uid") || UTILS.generateUUID();
        this.isNew = UTILS.getURLParam("uid") ? false : true;
        this.urls = [];

        this.ext = new IssueExtensionInfo(this);
    }

    // Full issue title.
    get fullTitle () {
        var result;

        if (this.isNew) {
            return 'New Issue'
        }

        result = this.project.toUpperCase();
        result += " - ";
        result += this.title.slice(0, 48);
        if (this.title.length > 48) {
            result += "...";
        }

        return result;
    }

    // Decodes an instance from data pulled from server.
    decode (i) {
        this.datasets = i.datasets;
        this.description = i.description;
        this.materials = i.materials;
        this.project = i.project;
        this.severity = i.severity;
        this.status = i.status;
        this.title = i.title;
        this.uid = i.uid;
        this.urls = i.urls;
    }

    // Encode an instance to be pushed to server.
    encode () {
        return JSON.stringify({
            datasets: this.datasets,
            description: this.description,
            materials: this.materials,
            project: this.project,
            severity: this.severity,
            status: this.status,
            title: this.title,
            uid: this.uid,
            urls: this.urls
        })
    }
}

// Extended issue information.
class IssueExtensionInfo {
    // Instance ctor.
    constructor(i) {
        this._issue = i;
    }

    get datasets () {
        return this._issue.datasets.join('\n');
    }

    get materials () {
        return this._issue.materials.join('\n');
    }
}
