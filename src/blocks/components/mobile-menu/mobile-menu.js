import $ from "jquery";

export class MobileMenu {
    constructor(selectorMenuIcon = '.js-mobile-menu-icon') {
        this.selectorMenuIcon = selectorMenuIcon;

        this.init();
    }

    init() {
        this.onClickIcon();
    }

    onClickIcon() {
        $(this.selectorMenuIcon).on('click', function () {
            $(this).toggleClass('is-active');
        });
    }

}