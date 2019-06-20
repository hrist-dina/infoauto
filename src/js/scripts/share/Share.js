import $ from "jquery";

export class Share {
    constructor() {
        this.share = $('.js-share');
        this.shareDropdown = $('.js-share-dropdown');

        this.init();
    }

    init() {
        this.show();
    }

    show() {
        this.share.hover(() => {
            this.shareDropdown.fadeToggle();
        });
    }
}