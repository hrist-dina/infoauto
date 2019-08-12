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
            let active = self.marks.filter(function (key, item)  {
                return $(item).hasClass('active');
            });
            self.marks.removeClass('active');
            self.models.removeClass('active');
            if ($(this)[0] === active[0]) {
                $(this).removeClass('active');
            } else {
                $(this).addClass('active');
            }

            $(document).find('[data-model="'+$(this).attr('data-mark')+'"] .models__list').css('display', '');
            if($(document).find('[data-model="'+$(this).attr('data-mark')+'"] .models__list').length==0) {
                var markName = $(this).attr('data-mark');
                $.get("/local/script/autobaseApi.php", {type: 'model', mark: alphabetMarks[$('.alphabet a.active').text()][$(this).attr('data-mark')][1]},
                    function(data) {
                        data=$.parseJSON(data);
                        var count = data.length % 3;
                        var full = (data.length-count) / 3;
                        var html = '<div class="models__list">';
                        var q = 0;
                        for (var i = 0; i < data.length; i++) {
                            q++;
                            if(q>(full+(count>0?1:0)) ) {
                                q=1;
                                count = count--; 
                                html = html+'</div><div class="models__list">';
                            }
                            html = html+'<a href="#" data-js-getmodel="'+data[i]['id_car_model']+'">'+data[i]['name']+'</a>';
                        }
                        html = html+'</div>';
                        $(document).find('[data-model="'+markName+'"] .models__container').html(html);
                    }
                );
            }
            self.check();
        });
    }

    check() {
        let activeMark = this.marks.filter(function (index, item) {
            return $(item).hasClass('active');
        });
        let model = this.models.filter(function (index, item) {
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