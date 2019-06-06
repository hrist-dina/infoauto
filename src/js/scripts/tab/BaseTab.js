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

            let itemMenu = $(this);

            self.menu.removeClass('active');
            itemMenu.addClass('active');

            let type =  itemMenu.data(self.dataMenu);

            self.items.removeClass('active');
            $(self.selector).find(`[data-${self.dataItems}=${type}]`).addClass('active');

            self.onClickedTab(itemMenu);
        });
    }

    onClickedTab(element) {
        return element;
    }
}