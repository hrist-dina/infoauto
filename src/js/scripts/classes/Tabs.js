import $ from "jquery";
// eslint-disable-next-line no-unused-vars
import mousewheel from "jquery-mousewheel";
import {Select} from "%components%/select/select";
// eslint-disable-next-line no-unused-vars
import mCustomScrollbar from "malihu-custom-scrollbar-plugin";

export class Tabs {
    constructor(selector = '.js-tabs') {
        this.selector = selector;
        this.dataMenu = 'tab-menu';
        this.dataItems = 'tab-item';
        this.tabsContent = '.js-tabs-content';

        this.sizeInitScroll = 1280;

        this.init();
    }

    init() {
        this.clickTab();
        this.scroll();
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
            new Select('.js-select-gray', 'infoauto-gray');
        });
    }

    scroll() {
        if (!this.menu.length) {
            return;
        }
        const self = this;
        $(window).resize(function() {
            if ($(window).width() <= self.sizeInitScroll) {
                self.initCustomScroll();
            } else  {
                self.destroyCustomScroll();
            }
        }).resize();

    }

    destroyCustomScroll() {
        $(this.tabsContent).mCustomScrollbar("destroy");
    }

    initCustomScroll() {
        $(this.tabsContent).mCustomScrollbar({
            axis: "x",
            theme: "draggable-theme",
            scrollInertia: 500,
            scrollEasing: "easeOut",
            scrollbarPosition: 'inside',
            mouseWheel: true,
            advanced: {
                autoExpandHorizontalScroll: true,
                updateOnContentResize: true
            }
        });
    }

}