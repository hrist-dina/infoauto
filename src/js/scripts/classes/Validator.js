import $ from "jquery";

export default class Validator {
    constructor(selectorForm) {
        if (typeof selectorForm === 'string') {
            this.form = $(selectorForm);
        } else if (typeof selectorForm === 'object') {
            this.form = selectorForm;
        }

        this.validator = 'validator';
        this.requireFiled = 'validator-require';
        this.typeFiled = 'validator-type';
        this.slectorAgreeFiled = 'js-validator-agree';
        this.submitButton = this.form.find('[type=submit]');
        this.selectorError = 'validator-error';
        this.selectorErrorMessage = 'validator-error-message';
        this.massages = {
            required: 'Поле обязательное для заполнения!',
            email: 'Некорректный Email адрес!',
            phone: 'Некорректный телефон!'
        };

        this.addClass();
    }

    addClass() {
        if (!this.form.hasClass(this.validator)) {
            this.form.addClass(this.validator);
        }
    }

    addMessages(messages) {
        $.extend(this.massages, messages);
        return this;
    }

    removeErrorMessages() {
        this.form.children().find(`.${this.selectorErrorMessage}`).remove();
        this.form.children().find(`.${this.selectorError}`).removeClass(this.selectorError);
    }

    disabledSubmit(flag = true) {
        this.submitButton.prop('disabled', flag);
    }

    showErrorMessage(item, message) {
        let error = $('<div>').addClass(this.selectorErrorMessage).text(message);
        $(item).after(error);
        $(item).addClass(this.selectorError);
    }

    get fields() {
        return this.form.children().find('input, textarea, select');
    }

    validate() {
        let error = 0;
        this.fields.map((key, item) => {
            let value = '';
            if ($(item).is("select")) {
                let optionVal = $(item).children("option:selected:not([disabled]):not([hidden])").val();
                value = optionVal ? optionVal : "";
            } else {
                value = $(item).val();
            }

            if ($(item).data(this.requireFiled) === true && this.constructor.checkEmpty(value)) {
                this.showErrorMessage(item, this.massages.required);
                error = 1;
            }

            if (!this.constructor.checkEmpty(value)) {
                switch ($(item).data(this.typeFiled)) {
                case 'email':
                    if (this.constructor.checkEmail(value)) {
                        this.showErrorMessage(item, this.massages.email);
                        error = 1;
                    }
                    break;
                case 'phone':
                    if (this.constructor.checkPhone(value)) {
                        this.showErrorMessage(item, this.massages.phone);
                        error = 1;
                    }
                    break;
                default:
                    break;
                }
            }

        });

        return error;
    }

    static checkEmpty(string) {
        return string === '';
    }

    static checkEmail(string) {
        return !!string.search(/^[-._a-z0-9]+@+[a-z0-9-]+\.[a-z]{2,6}$/i);
    }

    static checkPhone(string) {
        return !!string.search(/^\+7\(([0-9]{3})\)([0-9]{3})-([0-9]{2})-([0-9]{2})$/i);
    }

    validateAgree() {
        let that = this;

        this.form.find(`.${this.slectorAgreeFiled}`).on('change', function () {
            if ($(this).is(':checked')) {
                that.disabledSubmit(false);
            } else {
                that.disabledSubmit();
            }
        });
    }

    init() {
        this.removeErrorMessages();
        return this.validate();
    }
}
