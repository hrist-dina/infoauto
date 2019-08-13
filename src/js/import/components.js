import $ from "jquery";
import "%components%/article-detail/article-detail";
import "%components%/card-slider/card-slider";
import "%components%/share/share";
import "%components%/hint/hint";
import Validator from "../scripts/classes/Validator";
import {Select} from "%components%/select/select";
import {FilterSearch} from "%components%/filter-search/filter-search";
import {MobileMenu} from "%components%/mobile-menu/mobile-menu";
import {Video} from "../scripts/classes/Video";
import {PeronalAreaSubMenu} from "%components%/personal-area-icon/PeronalAreaSubMenu";
import {MarksAndModels} from "../scripts/marks-and-models/MarksAndModels";

window.alphabetMarks = window.alphabetMarks || [];

//переменные для фильтров
window.carSelects = window.carSelects || [];
window.carSelectsTitle = window.carSelectsTitle || [];
window.carSelectsOption = window.carSelectsOption || [];
window.valueByStep = window.valueByStep || [];

carSelects.push('types');
carSelects.push('mark');
carSelects.push('model');
carSelects.push('generation');
carSelects.push('section');
carSelects.push('property');
carSelects.push('article');

carSelectsTitle.push('Выберите тип авто');
carSelectsTitle.push('Выберите марку авто');
carSelectsTitle.push('Выберите модель авто');
carSelectsTitle.push('Выберите поколение авто');
carSelectsTitle.push('Выберите область');
carSelectsTitle.push('Выберите часть автомобиля');

carSelectsOption.push('Тип авто');
carSelectsOption.push('Марка');
carSelectsOption.push('Модель');
carSelectsOption.push('Поколение');
carSelectsOption.push('Область');
carSelectsOption.push('Часть автомобиля');

valueByStep.push('id_car_type');
valueByStep.push('id_car_mark');
valueByStep.push('id_car_model');
valueByStep.push('id_car_generation');
valueByStep.push('section');
valueByStep.push('property');

function searchAjax(data) {
    if($(document).find('[data-search-ajax]').length==0) {
        $('.filter-main').after('<section class="section section-white" data-search-ajax>\
            <div class="container">\
                <h2 class="h2">Подходящие публикации</h2>\
                <div class="section__container">\
                    <div class="card-list"></div>\
                </div>\
            </div>\
        </section>');
    }
    var html ='', types;
    for (var i = 0; i < data.length ; i++) {
        types = '';        
        for (var j = 0; j < data[i]['types'].length ; j++) {
            types=types+'<div class="mark card__mark">'+data[i]['types'][j]+'</div>';
        }        
        html=html+'<a class="card" href="'+data[i]['url']+'">\
            <div class="card__img" style="background-image: url('+data[i]['pic']+')"></div>\
            <div class="card__title">'+data[i]['name']+'</div>\
            <div class="card__mark-list">'+types+'</div>\
        </a>';
    }
    $(document).find('[data-search-ajax] .card-list').html(html);

    
}
function reCarSelect($this, step, data) {
    var options ='', title = carSelectsTitle[step];

    if($this.find('[data-numcarselection="'+step+'"]').length==0) {
        //это фильтр на главной, пошаговый, надо создать селект следующий
        if(step>0) {
            //если уже был селект, т.е. данные есть
            $this.find('.car-selection__text:eq(0)').text('Вы выбрали');
            if($this.find('.car-selection__choice').length==0) {
                $this.find('.car-selection__text:eq(0)').after('<ul class="car-selection__choice"></ul>');                    
            }
            $this.find('.car-selection__choice').append('<li>'+$this.find('option:selected').text()+'<a class="close" data-value="'+$this.find('option:selected').val()+'" data-step="'+$this.find('select').attr('name')+'" href="javascript:void(0)"></a></li>');
            $this.find('select, .select2').remove();
        }
        $this.find('.car-selection__text:eq(1)').text(title).after('<select class="select js-select" name="'+carSelects[step]+'" data-numcarselection="'+step+'"></select>');
    }
        
    options = '<option value="0" hidden>'+carSelectsOption[step]+'</option>';
    for (var i = 0; i < data.length ; i++) {
        options=options+'<option value="'+data[i][valueByStep[step]]+'">'+data[i].name+'</option>';
    }
    $this.find('[data-numcarselection="'+step+'"]').find('option').remove();
    $this.find('[data-numcarselection="'+step+'"]').prop('disabled', false).append(options);
    
    new Select();
}

function CarSelect($this, $select) {
    var step=0, param = {}, selectStep;

    //определить, какой шаг надо подгрузить
    if($select) {
        //при изменении селекта - след шаг, если пуст - то этот шаг
        step = parseInt($select.attr('data-numcarselection'))  +  ($select.find('option').length>1?( $select.find('option:selected').val()=='0'?0:1 ):0);
    }
    else if($this.find('select').length>0) {
        step = parseInt($this.find('select:eq(0)').attr('data-numcarselection'));
    }    

    //выберем текущие значения
    $this.find('select').each(function() {
        selectStep = parseInt($(this).attr('data-numcarselection'));
        if(selectStep < step) {
            //соберем текущие выбранные
            param[$(this).attr('name')] = $(this).find(':selected').val();
        } else {
            //нижестоящим - занулим выборы
            if(selectStep!=step)
                $(this).prop('disabled', true).html('<option value="0" hidden>'+carSelectsOption[selectStep]+'</option>');
        }
    });     

    var i = 0;
    for (var x in param) {
        i++;
    }
    
    if(i==0) {
        param[$this.find('.car-selection__choice li:last-child a').attr('data-step')] = $this.find('.car-selection__choice li:last-child a').attr('data-value');
    }  

    param.type = carSelects[step];
            
    if(step<4) {
        $.get("/local/script/autobaseApi.php", param,
            function(data) {
                data=$.parseJSON(data);
                reCarSelect($this, step, data);
            }
        );
    } else 
        if ($this.attr('data-carselection')=='0') {
            //ИСКАТЬ статьи на главной
            if(!param['generation']) {
                param['generation'] = $this.find('.car-selection__choice a[data-step="generation"]').attr('data-value');
            }   
            if(step<6) {
                $.get("/local/script/autobaseApi.php", param,
                    function(data) {
                        data=$.parseJSON(data);
                        reCarSelect($this, step, data);
                    }
                );
            } else {
                if(!param['section']) {
                    param['section'] = $this.find('.car-selection__choice a[data-step="section"]').attr('data-value');
                }   
                $.get("/local/script/autobaseApi.php", param,
                    function(data) {
                        data=$.parseJSON(data);
                        searchAjax(data);
                    }
                );
            }
        }
    
}

function clearIndexFilter($this) {
    $this.find('.car-selection__text:eq(0)').text('');
    $this.find('.car-selection__choice').remove();
    $this.find('.car-selection__text:eq(1)').text('');
    $this.find('select, .select2').remove();
    CarSelect($this, false);
}

function clearIndexFilterPoint($this, step) {
    $this.find('.car-selection__choice a[data-step="'+step+'"]').closest('li').nextAll().remove();
    $this.find('.car-selection__choice a[data-step="'+step+'"]').closest('li').remove();
    if($this.find('.car-selection__choice li').length==0)  {
        $this.find('.car-selection__text:eq(0)').text('');
        $this.find('.car-selection__choice').remove();
    }
    $this.find('.car-selection__text:eq(1)').text(carSelectsTitle[carSelects.indexOf(step)]);
    $this.find('select').html('').attr('data-numcarselection', carSelects.indexOf(step)).attr('name', step);
    CarSelect($this, $this.find('select'));
}

function declOfNum(number, titles) {  
    cases = [2, 0, 1, 1, 1, 2];  
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
}

$(document).ready(function () {

    new Select();
    new Select('.js-select-gray', 'infoauto-gray');
    new FilterSearch();
    new MobileMenu();
    new Video();
    new PeronalAreaSubMenu();    

    $(document).on('click', '[data-fn=clear-index-filter]', function() {
        clearIndexFilter($(this).closest('section').find('[data-carselection]'));
    });

    $(document).on('click', '.car-selection__choice .close', function() {
        clearIndexFilterPoint($(this).closest('section').find('[data-carselection]'), $(this).attr('data-step'));
    });

    $(document).on('change', '[data-numcarselection]', function() {
        CarSelect($(this).closest('[data-carselection]'), $(this));
    });

    $('[data-carselection]').each(function() {
        if($(this).closest('.modal').length==0)
            CarSelect($(this), false);
    });    


    $('.alphabet a').click(function(e) {
        e.preventDefault();
        $('.alphabet a, [data-model]').removeClass('active');
        $(this).addClass('active');
        $('.letter').html($(this).text());
        $('.marks__list.js-marks').html('');
        for (var i in alphabetMarks[$(this).text()]) {
            $('.marks__list.js-marks').append('<li class="marks__item" data-mark="'+alphabetMarks[$(this).text()][i][0]+'"><a href="javascript:void(0)">'+alphabetMarks[$(this).text()][i][0]+'</a></li>');
            if($(document).find('[data-model="'+alphabetMarks[$(this).text()][i][0]+'"]').length==0) {
                $('.js-models').append('<div class="models__item" data-model="'+alphabetMarks[$(this).text()][i][0]+'">\
                    <div class="models__head">\
                        <div class="models__logo"><img src="'+alphabetMarks[$(this).text()][i][2]+'" alt=""></div>\
                        <div class="models__title">Список моделей</div>\
                    </div>\
                    <div class="models__container"></div>\
                </div>');
            }
        } 
                       
        new MarksAndModels();
        $('.marks__list.js-marks li:eq(0)').click();
    });

    $(document).on('click', '[data-js-getmodel]', function(e) {
        e.preventDefault();
        var model = $(this);
        if($(model).closest('[data-model] .models__container').find('[data-list-generation="'+$(this).attr('data-js-getmodel')+'"]').length==0) {
            $.get("/local/script/autobaseApi.php", {type: 'generation', model: $(this).attr('data-js-getmodel')},
                function(data) {
                    data=$.parseJSON(data);
                    var count = data.length % 4;
                    var full = (data.length-count) / 4;
                    var html = '<div class="models__list" data-list-generation="'+$(model).attr('data-js-getmodel')+'">';
                    var q = 0;
                    for (var i = 0; i < data.length; i++) {
                        q++;
                        if(q>(full+(count>0?1:0)) ) {
                            q=1;
                            count = count--; 
                            html = html+'</div><div class="models__list"  data-list-generation="'+$(model).attr('data-js-getmodel')+'">';
                        }
                        html = html+'<a href="/materials/?mark='+alphabetMarks[$('.alphabet a.active').text()][$(model).closest('[data-model]').attr('data-model')][1]+'&model='+$(model).attr('data-js-getmodel')+'&generation='+data[i]['id_car_generation']+'">'+data[i]['name']+'</a>';
                    }
                    html = html+'</div>';
                    $(model).closest('[data-model] .models__container').append(html);
                    $(model).closest('.models__container').find('.models__list').hide();
                    $(model).closest('.models__container').find('[data-list-generation="'+$(model).attr('data-js-getmodel')+'"]').css('display', 'inline-block');
                }
            );
        }
        else {
            $(model).closest('.models__container').find('.models__list').hide();
            $(model).closest('.models__container').find('[data-list-generation="'+$(model).attr('data-js-getmodel')+'"]').css('display', 'inline-block');
        }
        

    });

    //рекламные блоки в списках
    $('[data-show-banner]').each(function() {
        var count = $(this).attr('data-show-banner-count'), type = $(this).attr('data-show-banner');
        var list = $(this);
        $.get("/local/script/script.php", {label: 'showBanners', type: type, count: count},
            function(data) {
                data=$.parseJSON(data);                
                for (var i = 0; i < data.length; i++) {
                    $(list).find('a:nth-child('+(count*2 + i*count*2+i)+')').after('<a class="card" href="'+data[i]['href']+'"><img src="'+data[i]['pic']+'" alt=""></a>');
                }
            }
        );
    });


    //подгрузка комментов 
    if($('.comments__inner').length>0) {
        var start = $('.comments__inner').attr('data-last')?$('.comments__inner').attr('data-last'):0;
        $.get("/local/script/script.php", {label: 'getComments', id: $(this).attr('data-article-id'), start: start},
            function(data) {
                data=$.parseJSON(data);                
                for (var i = 0; i < data.length; i++) {
                    //$(list).find('a:nth-child('+(count*2 + i*count*2+i)+')').after('<a class="card" href="'+data[i]['href']+'"><img src="'+data[i]['pic']+'" alt=""></a>');
                }
            }
        );
    }
    function reComments(data) {
        var count = ($('.comments__quantity-text').text()==''?0:parseInt($('.comments__quantity-text').text())) + data.length;
        $('.comments__quantity-text').text(count + declOfNum(count, ['комментарий', 'комментария', 'комментариев']));
        if($('.comments__inner').find('ul').length==0) {
            $('.comments__inner').append('<ul class="comments__list"></ul>');
        }
        for (var i = 0; i < data.length; i++) {
            if(data[i]['UF_ID']) {

            }
            else
                $('.comments__inner').find('ul').prepend('<li class="comments__item" data-comment="'+data[i]['ID']+'">\
                    <div class="comments__author">\
                        <img src="'+data[i]['pic']+'" alt="">\
                        <div class="comments__info">\
                            <div class="comments__name"><span>'+data[i]['UF_USER']+'</span></div>\
                            <div class="comments__date">'+data[i]['UF_DATA']+'</div>\
                        </div>\
                    </div>\
                    <div class="comments__text">'+data[i]['UF_TEXT']+'</div>\
                    <a class="comments__reply" href="javascript:void(0)">Ответить</a>\
                </li>');
        }   
    }

    //
    /*
    <ul class="comments__list">
                              

                              <li class="comments__item comments__item-answer">
                                <div class="comments__author"><img src="img/comments.jpg" alt="">
                                  <div class="comments__info">
                                    <div class="comments__name"><span>Василий Петров</span><a class="comments__answer" href="javascript:void(0)">Иван Сидоров</a>
                                    </div>
                                    <div class="comments__date">03.04.2019</div>
                                  </div>
                                </div>
                                <div class="comments__text">Видел такой сервис... ключевые заголовки на странице меняются под поисковый запрос. Не думал, что это тайна вообще</div><a class="comments__reply" href="javascript:void(0)">Ответить</a>
                              </li>
                              


            </ul>*/

    //подгрузка новых комментов


    //lk
    function personalArea() {
        var request = {};

        //мои авто
        if($(document).find('[data-tab-item="autos"]').length>0 ||  $(document).find('[name="personal-auto"]').length>0) {
            $.get("/local/script/lk.php", {label: 'auto'},
                function(data) {
                    var html = '';
                    data=$.parseJSON(data);  
                    $(document).find('[name="personal-auto"]').html('<option value="0">Выбрать</option>');              
                    for (var i = 0; i < data.length; i++) {
                        $(document).find('[name="personal-auto"]').append('<option '+(data[i][1]?'selected':'')+' value="'+data[i][2]+'">'+data[i][0]+'</option>');
                        html = html+'<div class="personal-area__auto"><div class="personal-area__info">'+data[i][0]+'</div><a class="remove personal-area__remove" href="#" data-auto-del="'+data[i][2]+'">Удалить</a></div>';
                    }
                    $(document).find('[data-tab-item="autos"] .personal-area__auto-wrap').html(html);
                    BX.closeWait();
                }
            );
        }

        //мои ТО
        if($(document).find('[data-tab-item="ledger"]').length>0) {
            request.label = 'listTO';
            $.get("/local/script/lk.php", request,
                function(data) {
                    $(document).find('[data-tab-item="ledger"] .ledger').html(data);
                }
            );
        }

        //мои избранные
        if($(document).find('[data-tab-item="favorite"]').length>0) {
            request.label = 'material';
            $.get("/local/script/lk.php", request,
                function(data) {
                    $(document).find('[data-tab-item="favorite"]').html(data);
                }
            );
        }

        //мои вопросы
        if($(document).find('[data-tab-item="questions"]').length>0) {
            request.label = 'qa';
            $.get("/local/script/lk.php", request,
                function(data) {
                    $(document).find('[data-tab-item="questions"]').html(data);
                }
            );
        }
        BX.closeWait();
    }

    personalArea();

    //выбор текущего авто
    $(document).on('change', '[name="personal-auto"]', function() {
        BX.showWait();
        $.get("/local/script/lk.php", {label: 'currentAuto', id: $(this).val()},
            function(data) {
                personalArea();
            }
        );
    });

    //пагинаторы в табах ЛК
    $(document).on('click', '[data-tab-item] .pagination a', function(e) {
        var request = {};
        e.preventDefault();
        BX.showWait();
        var type = $(this).closest('[data-tab-item]').attr('data-tab-item');
        $.get($(this).attr('href'), request,
            function(data) {
                BX.closeWait();
                $(document).find('[data-tab-item="'+type+'"]').html(data);
            }
        );
    });

    //удаление вопросов в ЛК
    $(document).on('click', '[data-del-qa]', function(e) {
        e.preventDefault();
        BX.showWait();
        $(this).parent().remove();
        $.get("/local/script/lk.php", {label: 'del-qa', id: $(this).attr('data-del-qa')},
            function(data) {
                BX.closeWait();
            }
        );
    });

    //удаление избранных статей в ЛК
    $(document).on('click', '[data-novaf-lk]', function(e) {
        e.preventDefault();
        BX.showWait();
        $(this).parent().remove();
        $.get("/local/script/script.php", {label: 'likes', type: 'add', id: $(this).attr('data-novaf-lk')},
            function(data) {
                BX.closeWait();              
            }
        );
    });
    
    //удаление авто из ЛК
    $(document).on('click', '[data-auto-del]', function(e) {
        e.preventDefault();
        BX.showWait();
        $(this).parent().remove();
        $.get("/local/script/script.php", {label: 'delAuto', id: $(this).attr('data-auto-del')},
            function(data) {
                BX.closeWait();              
            }
        );
    });

    //удаление ТО из ЛК
    $(document).on('click', '[data-to]', function(e) {
        e.preventDefault();
        BX.showWait();
        $(this).closest('.ledger__row').remove();
        $.get("/local/script/script.php", {label: 'delTO', id: $(this).attr('data-to')},
            function(data) {
                BX.closeWait();              
            }
        );
    });
    
    //добавление ТО - новая строчка
    $(document).on('click', '[data-copy-tr]', function() {
        var copy = $(this).prev().clone();
        $(copy).find('input').val('');
        var select = $(this).prev().find('.ledger__select select').clone().attr('class', '').removeAttr('data-select2-id');
        $(select).children().removeAttr('data-select2-id');
        $(copy).find('.ledger__select').html('').append($(select));
        $(this).before($(copy));
        new Select();
    });


    function headCurrent() {
        $.get("/local/script/script.php", {label: 'getCurrent'},
            function(data) {
                data=$.parseJSON(data);  
                if(data.current) {
                    $(document).find('.js-modal-open[data-modal-type="select-car"] a span').text(data.current.UF_NAME);
                }
                BX.closeWait();              
            }
        );
    }
    if($(document).find('.js-modal-open[data-modal-type="select-car"]').length>0) {
        headCurrent();
    }

    $("body").on("headCurrent", function(){ headCurrent(); });
    

});