import $ from "jquery";
// eslint-disable-next-line no-unused-vars
import mousewheel from "jquery-mousewheel";
import {Select} from "%components%/select/select";
// eslint-disable-next-line no-unused-vars
import mCustomScrollbar from "malihu-custom-scrollbar-plugin";
import {BaseTab} from "./BaseTab";

const sizeInitScroll = 1280;

export class TabPersonalArea extends BaseTab {

    init() {
        super.init();
        this.scroll();

    }

    clickTab() {
        super.clickTab();
        new Select('.js-select-gray', 'infoauto-gray');
    }

    scroll() {
        if (!this.menu.length) {
            return;
        }
        const self = this;
        $(window).resize(function() {
            if ($(window).width() <= sizeInitScroll) {
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