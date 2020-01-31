/**
 * transform key-value to value-key pairs
 * @param {Object} o
 */
function INV(o) {
    return Object.fromEntries(Object.entries(o).map(([k, v]) => [v, k]));
}

/**
 * Sicunform.Form.FormInfoType
 */
class FormInfoType {
    constructor(state = 0) {
        this.comments = "";
        this.no = "";
        this.state = state;
        this.title = "";
    }
}

/**
 * Sicunform.Form.FormType
 */
class FormType {
    constructor(infoType = FormInfoType) {
        this.id = 0;
        this.data = new Array();
        this.info = new infoType();
        this._type = 0;
    }

    setType(val, TypeList) {
        if (TypeList.hasOwnProperty(val)) {
            this._type = TypeList[val];
        } else {
            throw new RangeError("Invalid type.");
        }
    }

    push(v) { this.data.push(v); return this; }
}

/**
 * Sicunform.Form.Answer [[Sicunform.Form.FormInfoType]]
 */
class Answer extends FormInfoType {
    constructor(state = 0) {
        super(state);
        this.id = 0;
        this.imagePath = new Array();
        this.text = "";
    }

    /**
     * 将text字符串中的{{i}}用imagePath对应的值替换
     */
    get richText() {
        let s = this.text;
        for (let i in this.imagePath) {
            s = s.replace("{{" + i + "}}", this.imagePath[i]);
        }
        return s;
    }
}

/**
 * Sicunform.Form.QuestionInfo [[Sicunform.Form.FormInfoType]]
 */
class QuestionInfo extends FormInfoType {
    constructor(state = 0, visible = true) {
        super(state);
        this.choose = null;
        this.depends = new Array();
        this.text = "";
        this.visible = visible;
    }
}

/**
 * Sicunform.Form.Question [[Sicunform.Form.FormType]]
 */
class Question extends FormType {
    constructor(type = "Input") {
        super(QuestionInfo);
        this.type = type;
    }

    static TypeList = {
        "Input": 0,
        "Checkbox": 1,
        "MultiSelector": 2,
        "Picker": 3,
        "Ratio": 4,
        "Slider": 5,
        "Switch": 6,
        "Textarea": 7
    };
    static TypeListInv = INV(Question.TypeList);

    set type(v) { super.setType(v, Question.TypeList); }
    get type() { return Question.TypeListInv[this._type]; }
    push(v) { return super.push(v); }
}

/**
 * Sicunform.Form.SectionInfo [[Sicunform.Form.FormInfoType]]
 */
class SectionInfo extends FormInfoType {
    constructor(state = 0) {
        super(state);
        this.imagePath = new Array();
        this.text = "";
    }

    get richText() {
        let s = this.text;
        for (let i in this.imagePath) {
            s = s.replace("{{" + i + "}}", this.imagePath[i]);
        }
        return s;
    }
}

/**
 * Sicunform.Form.Section [[Sicunform.Form.FormType]]
 */
class Section extends FormType {
    constructor(type = "Normal") {
        super(SectionInfo);
        this.type = type;
    }

    static TypeList = {
        "Text": 0,
        "Normal": 1,
        "Artical": 2,
        "Custom": 3
    };
    static TypeListInv = INV(Section.TypeList);

    set type(v) { super.setType(v, Section.TypeList); }
    get type() { return Section.TypeListInv[this._type]; }
    push(v) { return super.push(v); }
}

/**
 * Sicunform.Form.FormInfo [[Sicunform.Form.FormInfoType]]
 */
class FormInfo extends FormInfoType {
    constructor(state = 0) {
        super(state);
        this.createTime = new Date(0);
        this.lastEdit = new Date(0);
        this.ownerid = "";
        this.owner = "";
    }
}

/**
 * Sicunform.Form.Form [[Sicunform.Form.FormType]]
 */
class Form extends FormType {
    constructor(type = 0) {
        super(FormInfo);
        this.id = 0;
        this.type = type;
    }

    set type(v) { super.setType(v, [0]); }
    get type() { return [0][this._type]; }
    push(v) { return super.push(v); }
}

let FORM = {
    Answer,
    Form,
    FormInfo,
    FormInfoType,
    FormType,
    Question,
    QuestionInfo,
    Section,
    SectionInfo
};

function test() {
    let x = new FORM.Form();
    let s = new FORM.Section();
    x.push(s.push(new FORM.Question("Ratio")));
    let q = s.data[0];
    q.push(new FORM.Answer());
}

// test();

module.exports = FORM;