import $ from "jquery";

export class MarksAndModels {
    
    constructor(selector = '.js-marks-and-models') {
        this.selector = selector;

        this.parent = $(this.selector);
        this.listModels = $('.js-models');

        this.init();
    }

    init () {
        this.onClick();
        this.onLoad();
    }

    get marks() {
        return this.parent.find('[data-mark]');
    }

    get models() {
        return this.parent.find('[data-model]');
    }

    onClick() {
        const self = this;
        this.marks.on('click', function (e) {
            e.preventDefault();
            self.marks.removeClass('active');
            self.models.removeClass('active');
            $(this).toggleClass('active');
            self.check();
        });
    }

    check() {
        let activeMark = this.marks.filter(function (index, item) {
            return $(item).hasClass('active');
        });
        let model = this.models.filter(function (index, item) {
            if($(item).data('model') === activeMark.data('mark')) {
                console.log($(document).find('.models__item[data-model="'+activeMark.data('mark')+'"] .models__list').length);
                console.log($(document).find('.models__item[data-model="'+activeMark.data('mark')+'"] .models__list *').length);
            }
            return $(item).data('model') === activeMark.data('mark');
        });
        model.addClass('active');
        this.move(activeMark, model);
        return [activeMark, model];

    }

    onLoad() {
        const [activeMark, model] = this.check();
        this.move(activeMark, model);
    }

    move(activeMark, model) {
        const self = this;
        $(window).resize(function() {
            if ($(window).width() <= 768) {
                model.insertAfter(activeMark);
            } else {
                self.listModels.append(model);
            }
        }).resize();
    }
    
}