import $ from "jquery";
import slick from "slick-carousel";

export class BaseSlider {
    constructor(selector = '.js-slider', options  = {}) {
        this.slider = $(selector);

        const baseOptions = {
            prevArrow: '<i class="slider-arrow-left"></i>',
            nextArrow: '<i class="slider-arrow-right"></i>',
            rows: 0
        };
        this.options = {...baseOptions, ...options};

        this.init();
    }

    init() {
        if (this.slider.length) {
            this.slider.slick(this.options);
        }
    }
}