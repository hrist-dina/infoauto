import $ from "jquery";

export default class Common {
    constructor() {
        this.init();
    }

    init() {
        this.events();
    }

    events() {
        this.onClickScrollTo();
        this.onLoadScrollTo();
        this.onClickAccordion();
    }

    scrollTo(id) {
        const element = $(id);
        if (!element.length) return;
        $("html, body").animate({ scrollTop: element.offset().top }, 700);
    }

    onClickScrollTo() {
        const self = this;
        $("a.js-scroll-to").click(function() {
            self.scrollTo($(this).attr("href"));
        });
    }

    onLoadScrollTo() {
        if (window.location.hash) {
            this.scrollTo(window.location.hash);
        }
    }

    onClickAccordion() {
        const selector = '.js-accordion';
        const title = `${selector}-title`;
        const content = `${selector}-content`;

        $(title).on('click', function () {
            $(this).toggleClass('active');
            $(this).parents(selector).find(content).slideToggle();
        });
    }
}
