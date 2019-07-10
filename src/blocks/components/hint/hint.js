import $ from "jquery";

export class Hint {
    constructor(selector = '.js-hint') {
        this.hint = $(selector);

        this.init();
    }

    init() {
        this.hint.hover(function () {
            $(this).children().stop().fadeToggle();
        });
    }
}

new Hint();