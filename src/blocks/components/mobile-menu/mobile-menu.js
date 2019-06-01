import $ from "jquery";

export class MobileMenu {
    constructor(
        selectorMenuOpen = '.js-mobile-menu-icon',
        selectorMenu = '.js-mobile-menu',
        selectorSearch = '.js-search') {
        this.menuOpen = $(selectorMenuOpen);
        this.menu = $(selectorMenu);
        this.search = $(selectorSearch);

        this.init();
    }

    init() {
        this.onClickIcon();
    }

    onClickIcon() {
        const self = this;
        this.menuOpen.on('click', function () {
            $(this).toggleClass('is-active');
            $('body').toggleClass('overflow');

            if ($(this).hasClass('is-active')) {
                self.menu.fadeIn();
                self.search.fadeOut();
            } else {
                self.menu.fadeOut();
                self.search.fadeIn();
            }
        });
    }

}