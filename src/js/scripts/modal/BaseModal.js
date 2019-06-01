import  $ from "jquery";
import iziModal from 'izimodal';
// Initialise imported function as jQuery function
$.fn.iziModal = iziModal;

class BaseModal {
    constructor(selector = '.js-modal', selectorOpen = false, options = {}) {
        this.element = $(selector);
        if (selectorOpen) {
            this.elementOpen = $(selectorOpen);
        }
        this.options = options.length ? options : '';
        this.init();
    }

    init() {
        this.element.iziModal(this.options);
    }

    open() {
        this.element.iziModal('open');
    }
}

export {BaseModal};