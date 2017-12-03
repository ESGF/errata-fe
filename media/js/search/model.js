// Search result.
APP.types.SearchResult = class SearchResult {
    // Instance ctor.
    constructor(i) {
        this.project = i[0];
        this.institutionID = i[1];
        this.uid = i[2];
        this.title = i[3];
        this.severity = i[4];
        this.status = i[5];
        this.dateCreated = i[6];
        this.dateClosed = i[7];
        this.dateUpdated = i[8];
        this.ext = new APP.types.SearchResultExtensionInfo(this);
    }
}

// Extended search result information.
APP.types.SearchResultExtensionInfo = class SearchResultExtensionInfo {
    // Instance ctor.
    constructor(i) {
        this.severity = APP.state.filters[1].data.set['esdoc:errata:severity:' + i.severity];
        this.status = APP.state.filters[2].data.set['esdoc:errata:status:' + i.status];
        this.institutionID = i.institutionID.toUpperCase();
        this.title = (i.title || '--').trim();
        if (i.title.length > 53) {
            this.title = i.title.slice(0, 53) + " ...";
        }
    }
}