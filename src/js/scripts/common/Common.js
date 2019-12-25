import $ from "jquery";

export default class Common {
    constructor() {
        this.isMobile = false;
        this.init();
    }

    init() {
        this.events();
    }

    events() {
        this.checkIsMobile();
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

    checkIsMobile() {
        const self = this;
        $(window).resize(function () {
            self.isMobile = $(this).width() < 768;
        }).resize();
    }

    onClickAccordion() {
        const self = this;
        const selector = '.js-accordion';
        const title = `${selector}-title`;
        const content = `${selector}-content`;

        $(document).on('click', title, function () {
            if (self.isMobile) {
                $(this).toggleClass('active');
                $(this).parents(selector).find(content).slideToggle();
            }
        });
    }
}
