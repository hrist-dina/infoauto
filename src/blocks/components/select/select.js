import $ from "jquery";
import select2 from "select2";
// Initialise imported function as jQuery function
$.fn.iziModal = select2;

export default class Select {
    constructor(selector = '.js-select'){
        this.selector = selector;

        this.init();
    }

    init() {
        $(this.selector).select2({
            minimumResultsForSearch: Infinity,
            theme: 'infoauto',
            width: 'resolve'
        });
    }

}