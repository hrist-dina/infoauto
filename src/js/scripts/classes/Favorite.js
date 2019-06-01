import $ from "jquery";

export class Favorite {
    constructor(selector = '.js-add-to-favorite') {
        this.selector = selector;

        this.init();
    }

    init () {
        this.onClick();
    }

    onClick() {
        $(this.selector).on('click', function (e) {
            e.preventDefault();
            $(this).toggleClass('active');
            // TODO: Need add ajax request to server
        });
    }
}