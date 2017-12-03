// Search result.
Task = class Task {
    // Instance ctor.
    constructor(i) {
        _.each(_.keys(i), (k) => {
            this[k] = i[k];
        })
        this.ext = new TaskExtensionInfo(this);
    }
}

// Extended task information.
class TaskExtensionInfo {
    // Instance ctor.
    constructor(i) {
        this.action = APP.state.filters[1].data.set['esdoc:errata:pid-task-action:' + i.action];
        this.status = APP.state.filters[2].data.set['esdoc:errata:pid-task-status:' + i.status];
    }
}
