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
    }

    scrollTo(id) {
        $("html, body").animate({ scrollTop: $(id).offset().top }, 700);
    }

    onClickScrollTo() {
        const self = this;
        $("a.js-scroll-to").click(function() {
            self.scrollTo($(this).attr("href"));
        });
    }

    onLoadScrollTo() {
        this.scrollTo(window.location.hash);
    }

}
