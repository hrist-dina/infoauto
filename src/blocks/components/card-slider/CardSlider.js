import {BaseSlider} from "../../../js/scripts/slider/BaseSlider";

export class CardSlider extends BaseSlider {
    constructor(selector = '.js-card-slider') {
        const options = {
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            variableWidth: false,
            arrows: true,
            responsive: [
                {
                    breakpoint: 1280,
                    settings: {
                        arrows: false,

                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        mobileFirst: true,
                        arrows: false,

                    }
                },
                {
                    breakpoint: 680,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        mobileFirst: true,
                        arrows: false,
                    }
                },
            ]
        };
        super(selector, options);
    }

}