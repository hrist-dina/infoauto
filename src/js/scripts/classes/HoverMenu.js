import $ from "jquery";

export class HoverMenu {
    constructor(selector = '.js-hover-menu') {
        this.menu = $(selector);
        this.menuLineSelector = 'hover-menu-line';

        if (this.menu.length) {
            this.init();
        }
    }

    init() {
        this.initMenuLine();
        this.activateItem();
        this.initHover();
    }

    activateItem(activeItem) {
        if(!activeItem) {
            activeItem = this.menu.find('.active');
        }
        this.menuLine.width(activeItem.outerWidth(true)).css('left', activeItem.position().left);
    }

    initMenuLine() {
        this.menu.prepend(`<div class='${this.menuLineSelector}'></div>`);
    }

    initHover() {
        const self = this;
        this.items.hover(function () {
            self.activateItem($(this));
        }, function () {
            self.activateItem();
        });
    }

    get menuLine() {
        return this.menu.find(`.${this.menuLineSelector}`);
    }

    get items() {
        return this.menu.children('li');
    }
}