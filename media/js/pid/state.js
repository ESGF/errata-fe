// Module imports.
import Errata from  './model.js';

// Errata to be presented to user.
export var errata = [];

// Collection of pids selected by user.
export var pids = [];

export const setErrata = (data) => {
	errata = _.map(data, (i) => new Errata(i));
}

export const setPIDs = (data) => {
	pids = data;
}
