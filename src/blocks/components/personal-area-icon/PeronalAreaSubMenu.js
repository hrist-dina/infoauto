import $ from "jquery";

export class PeronalAreaSubMenu {
    constructor(
        selectorIcon = '.js-icon-sub-menu',
        selectorSubMenu = '.js-sub-menu',
        selectorSubMenuLayout = '.js-sub-menu-layout'
    ) {
        this.icon = $(selectorIcon);
        this.subMenu = $(selectorSubMenu);
        this.layout = $(selectorSubMenuLayout);

        this.init();
    }

    init() {
        this.click();
    }

    click() {
        this.icon.on('click', () => {
            this.subMenu.toggleClass('active');
            this.layout.toggleClass('active');
        });

        this.layout.on('click', () => {
            if (this.subMenu.hasClass('active')) {
                this.subMenu.removeClass('active');
                this.layout.removeClass('active');
            }
        });
    }
}