import  $ from "jquery";
import iziModal from 'izimodal-1.6.0';
import {TabAuthRegister} from "../tab/TabAuthRegister";
import {Select} from "%components%/select/select";
// Initialise imported function as jQuery function
$.fn.iziModal = iziModal;

class BaseModal {
    constructor(
        selector = '.js-modal',
        options = {},
        selectorOpen = '.js-modal-open',
        selectorClose = '.js-modal-close'
    ) {
        this.selector = selector;
        this.element = $(document).find(this.selector);
        this.selectorOpen = selectorOpen;
        this.selectorClose = selectorClose;
        this.options = $.extend(BaseModal.baseOptions(), options);
        this.init();
    }

    static baseOptions() {
        return {
            radius: 0,
            width: 'auto',
            borderBottom: false,
            closeButton: false,
        };
    }

    static closeCurrent(elem) {
        $(elem).iziModal('close');
    }

    init() {
        if (this.element.length) {
            this.element.iziModal(this.options);
            this.onClick();
        }
    }

    onClick() {
        const self = this;
        $(document).find(this.selectorOpen).on('click', function (event) {
            event.preventDefault();
            self.close();
            self.open($(this).data('modal-type'));

            if ($(this).data('modal-tab')) {
                new TabAuthRegister('.js-auth-register-tabs').active($(this).data('modal-tab'));
            }
        });
        $(this.selectorClose).on('click', function (event) {
            event.preventDefault();
            self.close();
        });
    }

    open(type) {
        this.element.filter(function() {
            return $(this).data('modal-type') === type;
        }).iziModal('open');
    }

    close() {
        this.element.map((item, elem) => $(elem).iziModal('close'));
    }

}

export {BaseModal};