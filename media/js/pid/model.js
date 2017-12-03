// Represents an errata in the system.
class Errata {
    // Instance constructor.
    constructor(i) {
        this.handle = i[0];
        this.issues = _.map(i[1], (j) => new Issue(j));
    }
}

// Represents an issue.
class Issue {
    // Instance constructor.
    constructor(i) {
        this.artefact = i[1] + "#" + i[2];
        this.sortOrdinal = i[3];
        this.uid = i[0];
        this.is_first = i[4];
        this.is_latest = i[5];
        this.unchanged_file = i[6];
    }
}