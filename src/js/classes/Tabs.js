import $ from "jquery";
import Select from "%components%/select/select";

export class Tabs {
    constructor(selector = '.js-tabs') {
        this.selector = selector;
        this.dataMenu = 'tab-menu';
        this.dataItems = 'tab-item';

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
        let _this = this;
        this.menu.on('click', function (e) {
            e.preventDefault();

            let itemMenu = $(this);
            _this.menu.removeClass('active');
            itemMenu.addClass('active');

            let type =  itemMenu.data(_this.dataMenu);

            _this.items.removeClass('active');
            $(_this.selector).find(`[data-${_this.dataItems}=${type}]`).addClass('active');
            new Select('.js-select-gray', 'infoauto-gray');
        });
    }
}