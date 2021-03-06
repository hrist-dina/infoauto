import $ from "jquery";
import {Select} from "%components%/select/select";

export class Ajax {
    constructor(selector) {
        this.selector = selector;
        if (typeof this.selector === 'string') {
            this.element = $(document).find(this.selector);
        } else if (typeof this.selector === 'object') {
            this.element = this.selector;
        }

        this._data = {};

        this.init();
    }

    get data() {
        if ($.isEmptyObject(this._data)) {
            return this.element.serialize();
        }
        return this._data;
    }

    set data(value) {
        this._data = value;
        return this;
    }

    get url() {
        const dataAction = this.element.data('action');
        if (dataAction) {
            return dataAction;
        }
        return this.element.attr('action');
    }

    init() {
    }

    submit() {
        const self = this;
        this.element.on('submit', function (event) {
            event.preventDefault();

            if (self.validate()) {
                if(this.getAttribute('action')=='/ajax/') {
                    BX.showWait();
                }
                if(this.getAttribute('data-form-file')) {
                    self.sendAllData();
                }
                else 
                    self.post();
            } else  {
                console.log('validated - false');
            }
        });
        return this;
    }

    validate() {
        return true;
    }

    onChange() {
        const self = this;
        this.element.on('change', function (event) {
            event.preventDefault();
            self.get();
        });
        return this;
    }

    ajax(method) {
        $.ajax(
            this.url,
            {
                method: method,
                dataType: 'json',
                data: this.data,

            }
        ).done(data => this.done(data)).fail(error => this.fail(error));
    }

    sendAllData() {
        var dataForm = new FormData(document.querySelector('form#'+this.element[0].getAttribute('id')));
        $.ajax(
            this.url,
            {
                method: 'post',
                dataType: 'json',
                data: dataForm,
                processData: false,
                contentType: false
            }
        ).done(data => this.done(data)).fail(error => this.fail(error));
    }

    post() {
        this.ajax('post');
        return this;
    }

    get() {
        this.ajax('get');
        return this;
    }

    done(data) {
        // TODO:: Изменить формат ответа, после реализации на бэкенде
        if(data.stop) {
            BX.closeWait();
            $("body").trigger("headCurrent");
        }
        if (data) {
            return true;
        }
        return false;
    }

    fail(error) {
        // TODO:: Изменить формат ответа, после реализации на бэкенде
        console.log('fail');
        console.log(error);
    }
}