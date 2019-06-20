import $ from "jquery";

export class BaseTab {
    constructor(selector = '.js-tabs') {
        this.selector = selector;
        this.dataMenu = 'tab-menu';
        this.dataItems = 'tab-item';
        this.tabsContent = '.js-tabs-content';

        this.init();
    }

    init() {
        this.clickTab();
    }

    get menu() {
        return $(this.selector).find(`[data-${this.dataMenu}]`);
    }

    get items() {
        return $(this.selector).find(`[data-${this.dataItems}]`);
    }

    clickTab() {
        let self = this;
        this.menu.on('click', function (e) {
            e.preventDefault();

            let type =  $(this).data(self.dataMenu);

            self.active(type);
        });
    }

    active(type) {
        this.menu.removeClass('active');
        $(this.selector).find(`[data-${this.dataMenu}=${type}]`).addClass('active');

        this.items.removeClass('active');
        $(this.selector).find(`[data-${this.dataItems}=${type}]`).addClass('active');

        this.onClickedTab(type);
    }

    onClickedTab(element) {
        return element;
    }
}