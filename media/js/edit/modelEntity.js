class Entity {
    constructor () {
        this.fields = [];
    }

    setField (field) {
        this.fields.push(field);
        this[field.id] = field;
    }

    getField (id) {
        return _.first(this.fields, (i) => {
            return i.id === id;
        });
    }
}

class Field {
    constructor(id, value, fieldType) {
        self.hasChanged = false;
        self.id = id;
        self.value = value || self.valueDefault;
        self.valueOriginal = self.value;
        self.fieldType = fieldType;
    }
}

class ScalarField extends Field {
    constructor(id, value) {
        self.valueDefault = null;
        super(id, value, 'scalar');
    }
}

class ArrayField extends Field {
    constructor(id, value) {
        self.valueDefault = [];
        super(id, value, 'array');
    }
}

class UIDField extends Field {
    constructor(id, value) {
        self.valueDefault = UTILS.generateUUID();
        super(id, value, 'uid');
    }
}
