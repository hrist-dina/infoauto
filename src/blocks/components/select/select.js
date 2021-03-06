import $ from "jquery";
import select2 from "select2";
// Initialise imported function as jQuery function
$.fn.iziModal = select2;
$.fn.select2.defaults.set("width", "100%");

export class Select {
    constructor(selector = '.js-select', theme = 'infoauto', options = {}){
        this.selector = selector;
        this.theme = theme;

        this.baseOptions = {
            minimumResultsForSearch: Infinity,
            theme: this.theme
        };

        this.options = $.extend(this.baseOptions, options);

        this.init();
    }

    init() {
        $(this.selector).select2(this.options);
    }

}