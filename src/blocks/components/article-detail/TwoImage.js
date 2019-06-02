import {BaseSlider} from "../../../js/scripts/slider/BaseSlider";

export class TwoImage extends BaseSlider {
    constructor(selector = '.two-img') {
        const options = {
            infinite: false,
            slidesToShow: 2,
            variableWidth: true,
            arrows: false,
            responsive: [
                {
                    breakpoint: 1280,
                    settings: {
                        slidesToShow: 2,
                        variableWidth: false,

                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        mobileFirst: true,
                        centerMode: true,
                        variableWidth: true,

                    }
                },
                {
                    breakpoint: 680,
                    settings: {
                        centerPadding: '15px 0px 0px',
                        centerMode: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        variableWidth: false,
                        adaptiveHeight: true
                    }
                },
            ]
        };
        super(selector, options);
    }

}