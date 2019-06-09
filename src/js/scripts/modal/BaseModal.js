import  $ from "jquery";
import iziModal from 'izimodal-1.6.0';
// Initialise imported function as jQuery function
$.fn.iziModal = iziModal;

class BaseModal {
    constructor(
        options = {},
        selector = '.js-modal',
        selectorOpen = '.js-modal-open',
        selectorClose = '.js-modal-close'
    ) {
        this.element = $(selector);
        this.elementOpen = $(selectorOpen);
        this.selectorClose = selectorClose;
        this.baseOptopns = {
            radius: 0,
            width: 'auto',
            borderBottom: false,
            closeButton: false
        };
        this.options = Object.assign(this.baseOptopns, options);
        this.init();
    }

    init() {
        this.element.iziModal(this.options);
        this.onClick();
    }

    onClick() {
        const self = this;
        this.elementOpen.on('click', function (event) {
            event.preventDefault();
            self.open($(this).data('modal-type'));
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