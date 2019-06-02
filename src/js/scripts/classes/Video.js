import $ from "jquery";

class Video {
    constructor() {
        this.allVideos = $("iframe[src*='//www.youtube.com'], iframe[src*='//player.vimeo.com']");
        this.videoWrapper = 'js-videoWrapper';
        this.videoButton = 'js-videoButton';

        this.init();
    }

    init() {
        this.aspectRatio();
        this.resize();
        this.click();
    }

    aspectRatio() {
        this.allVideos.each(function() {
            $(this)
                .data('aspectRatio', this.height / this.width)
                .removeAttr('height')
                .removeAttr('width');
        });
    }

    resize() {
        const self = this;
        $(window).resize(function() {
            self.allVideos.each(function() {
                let newWidth = $(this).parent().width();
                let el = $(this);
                el
                    .width(newWidth)
                    .height(newWidth * el.data('aspectRatio'));

                let wrap = $('<div>').addClass([self.videoWrapper, 'videoWrapper']);
                el.wrap(wrap);
                el
                    .parent()
                    .append($('<button>')
                        .addClass([self.videoButton, 'videoPoster'])
                    );

            });
        }).resize();
    }

    click() {
        const self = this;
        $(document).on('click', `.${this.videoButton}`, function(e) {
            e.preventDefault();
            let wrapper = $(this).closest(`.${self.videoWrapper}`);
            Video.videoPlay(wrapper);
        });
    }

    static videoPlay(wrapper) {
        let iframe = wrapper.find('iframe');
        let src = iframe.attr('src');
        let params = Video.params;
        for (let key in params) {
            src = Video.updateURLParameter(src, key, params[key]);
        }
        wrapper.addClass('videoWrapperActive');
        iframe.attr('src', src);
    }

    static updateURLParameter(url, param, paramVal){
        let newAdditionalURL = "";
        let tempArray = url.split("?");
        let baseURL = tempArray[0];
        let additionalURL = tempArray[1];
        let temp = "";
        if (additionalURL) {
            tempArray = additionalURL.split("&");
            for (let i = 0; i < tempArray.length; i++){
                if(tempArray[i].split('=')[0] !== param){
                    newAdditionalURL += temp + tempArray[i];
                    temp = "&";
                }
            }
        }

        let rowsTxt = temp + "" + param + "=" + paramVal;
        return baseURL + "?" + newAdditionalURL + rowsTxt;
    }

    static get params() {
        return {
            autoplay: 1,
            //modestbranding: 1,
            rel: 0,
            hl: 'ru',
            showinfo: 0
        };
    }
}

export {Video};