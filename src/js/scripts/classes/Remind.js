import $ from "jquery";

export class Remind {
    constructor(selector = ".js-remind-me") {
        this.selector = selector;

        this.init();
    }

    init() {
        this.onClick();
    }

    onClick() {
        $(this.selector).on("click", function(e) {
            e.preventDefault();
            $(this).toggleClass("active");
            
            //to do 
            
        });
    }
}
