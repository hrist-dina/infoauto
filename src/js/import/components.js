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
    //$this.find('[data-no]').remove();

    if($this.find('[data-numcarselection="'+step+'"]').length==0) {
        //это фильтр на главной, пошаговый, надо создать селект следующий
        if(step>1) {
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

    if($this.attr('data-cur-'+step) && $this.attr('data-cur-'+step)!='') {
        $this.find('[data-numcarselection="'+step+'"]').find('option[value="'+$this.attr('data-cur-'+step)+'"]').prop('selected', true);
        $this.find('[data-numcarselection="'+step+'"]').trigger('change');
        $this.attr('data-cur-'+step, '');
    } 
    else
        $this.closest('.wating-filter').removeClass('wating-filter');

    if(step>2 && $this.is('.car-selection__center')&&data.length==0) {
        $this.children(':not(.car-selection__text):not(.car-selection__choice)').hide();
        $this.children('.car-selection__text:eq(0), .car-selection__choice').show();
        //$this.append('<p data-no>По выбранному автомобилю нет подходящих статей</p>');
    }
}

function CarSelect($this, $select) {
    var step=1, param = {}, selectStep;

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
    param.search = $this.attr('data-typesearch');
    param.sessid = $(document).find('[name=sessid]').val();
            
    if(step<4) {
        $.get("/local/script/autobaseApi.php", param,
            function(data) {
                data=$.parseJSON(data);                
                if(data.length==0 && step==3 && $this.is('.car-selection__center')) {
                    $select.attr('data-numcarselection', 4);
                    CarSelect($this, $select);
                    return;
                }
                reCarSelect($this, step, data);
            }
        );
    } else {
        $this.closest('.wating-filter').removeClass('wating-filter');
    }
    if ($this.is('.car-selection__center')) {
        //ИСКАТЬ статьи на главной        
        if(!param['generation']) {
            param['generation'] = $this.find('.car-selection__choice a[data-step="generation"]').attr('data-value');
        }
        if(step<6 && step>3) {
            $.get("/local/script/autobaseApi.php", param,
                function(data) {
                    data=$.parseJSON(data);
                    reCarSelect($this, step, data);
                }
            );
        }
        
        if(!param['section']) {
            param['section'] = $this.find('.car-selection__choice a[data-step="section"]').attr('data-value');
        }

        param.type = 'article'; 
        $.get("/local/script/autobaseApi.php", param,
            function(data) {
                data=$.parseJSON(data);
                searchAjax(data);
            }
        );
    }
}

function clearIndexFilter($this) {
    $this.closest('section').find('[data-modal-type="select-car"]').parent().remove();
    $this.removeClass('hide');
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
    var cases = [2, 0, 1, 1, 1, 2];  
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
}

$(document).ready(function () {

    $('[data-src]').each(function() {
        $(this).attr('src', $(this).attr('data-src')).removeAttr('data-src');
    });

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

    function headCurrent($reload = false) {
        $.get("/local/script/script.php", {label: 'getCurrent'},
            function(data) {
                data=$.parseJSON(data);  
                if(data.current) {
                    $(document).find('.js-modal-open[data-modal-type="select-car"] a span').text(data.current.UF_NAME);
                }
                if($reload) location.reload();
                BX.closeWait();              
            }
        );
    }
    $("body").on("headCurrent", function(){ headCurrent(true); });
    
    //табы в кабинете при заходе из меню
    if(location.pathname=='/lk/') {
        changeTab(location.href);
    }
    $('.personal-area-sub-menu').on('click', 'a', function() {
        changeTab($(this).attr('href'));
    });
    function changeTab($href) {
        var needTab = $href.split('#tab=');
        if(needTab[1]) {
            $('[data-tab-menu="'+needTab[1]+'"]').click();
        }
    }
    //lk
    function personalArea() {
        var request = {};
        BX.closeWait();
        //мои авто
        if($(document).find('[data-tab-item="autos"]').length>0 ||  $(document).find('.personal-area-head__select').length>0) {
            $(document).find('[data-tab-item="autos"]').addClass('wating-filter');
            $.get("/local/script/lk.php", {label: 'auto'},
                function(data) {
                    var html = '';
                    data=$.parseJSON(data);  
                    $(document).find('.personal-area-head__select [name="personal-auto"]').html('<option value="0">Выбрать</option>');              
                    for (var i = 0; i < data.length; i++) {
                        if(data[i][3]=='') {
                            $(document).find('.personal-area-head__select [name="personal-auto"]').append('<option '+(data[i][1]?'selected':'')+' value="'+data[i][2]+'">'+data[i][0]+'</option>');
                            html = html+'<div class="personal-area__auto"><div class="personal-area__info">'+data[i][0]+'</div><a class="remove personal-area__remove" href="#" data-auto-del="'+data[i][2]+'">Удалить</a></div>';
                        } else {
                            html = html+'<div class="personal-area__auto trash-auto"><div class="personal-area__info">'+data[i][0]+'</div><a class="remove personal-area__remove" href="#" data-auto-undel="'+data[i][2]+'">Восстановить</a></div>';
                        }
                    }
                    $(document).find('[data-tab-item="autos"] .personal-area__auto-wrap').html(html);
                    $(document).find('[data-tab-item="autos"]').removeClass('wating-filter');
                }
            );
        }
        //мои авто в шапке
        if($(document).find('.modal [name="personal-auto"]').length>0) {
            $.get("/local/script/lk.php", {label: 'auto'},
                function(data) {
                    data=$.parseJSON(data);  
                    $(document).find('.modal [name="personal-auto"]').html('<option value="0">Выбрать</option>');              
                    for (var i = 0; i < data.length; i++) {
                        if(data[i][3]=='') 
                            $(document).find('.modal [name="personal-auto"]').append('<option '+(data[i][1]?'selected':'')+' value="'+data[i][2]+'">'+data[i][0]+'</option>');
                    }
                }
            );
        }
        //мои ТО
        if($(document).find('[data-tab-item="ledger"]').length>0) {
            request.label = 'listTO';
            $(document).find('[data-tab-item="ledger"]').addClass('wating-filter');
            $.get("/local/script/lk.php", request,
                function(data) {
                    $(document).find('[data-tab-item="ledger"] .ledger').html(data);
                    $(document).find('[data-tab-item="ledger"]').removeClass('wating-filter');
                }
            );
        }
        //мои избранные
        if($(document).find('[data-tab-item="favorite"]').length>0) {
            request.label = 'material';
            $(document).find('[data-tab-item="favorite"]').addClass('wating-filter');
            $.get("/local/script/lk.php", request,
                function(data) {
                    $(document).find('[data-tab-item="favorite"]').html(data);
                    $(document).find('[data-tab-item="favorite"]').removeClass('wating-filter');
                }
            );
        }
        //мои вопросы
        if($(document).find('[data-tab-item="questions"]').length>0) {
            request.label = 'qa';
            $(document).find('[data-tab-item="questions"]').addClass('wating-filter');
            $.get("/local/script/lk.php", request,
                function(data) {
                    $(document).find('[data-tab-item="questions"]').html(data);
                    $(document).find('[data-tab-item="questions"]').removeClass('wating-filter');
                }
            );
        }        
    }
    personalArea();

    //выбор текущего авто
    $(document).on('change', '[name="personal-auto"]', function() {
        var select = $(this);
        $.get("/local/script/lk.php", {label: 'currentAuto', id: $(this).val()},
            function(data) {
                if($(select).closest('.modal').length>0) {
                    BX.showWait();
                    $('body').trigger('headCurrent');
                } 
                else personalArea();
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
    //восстановление авто из ЛК
    $(document).on('click', '[data-auto-undel]', function(e) {
        e.preventDefault();
        BX.showWait();
        $.get("/local/script/script.php", {label: 'undelAuto', id: $(this).attr('data-auto-undel')},
            function(data) {
                BX.closeWait();   
                personalArea();           
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
        $(select).addClass('js-select-gray');
        $(copy).find('.ledger__select').html('').append($(select));
        $(this).before($(copy));
        new Select('.js-select-gray', 'infoauto-gray');
    });
    //добавление ТО - новая строчка удалить
    $(document).on('click', '[data-del-emptyto]', function() {
        if($(this).closest('.ledger__form-inner').prev().length>0) {
            $(this).closest('.ledger__form-inner').remove();
        }
    });

    //смена буквы на странице всех авто
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

    //поколения на странице всех атво
    $(document).on('click', '[data-js-getmodel]', function(e) {
        e.preventDefault();
        var model = $(this);
        if($(model).closest('[data-model] .models__container').find('[data-list-generation="'+$(this).attr('data-js-getmodel')+'"]').length==0) {
            $.get("/local/script/autobaseApi.php", {sessid: $(document).find('[name=sessid]').val(), search: 'material', type: 'generation', model: $(this).attr('data-js-getmodel')},
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

    //пагинаторы в поиске
    $(document).on('click', '.ajax_paginator .pagination a', function(e) {
        var request = {};
        e.preventDefault();
        BX.showWait();
        var section = $(this).closest('section');
        request.ajax_type = $(section).attr('data-paginator');
        $.get($(this).attr('href'), request,
            function(data) {
                BX.closeWait();
                $(section).after(data);
                $(section).remove();
            }
        );
    });    

    //не найдено в поиске
    if($('.filter-search').length>0 && $('[data-paginator]').length==0) {
        $('.filter-search').parent().append('<p>По данным условиям ничего не найдено. Попробуйте <a href="#" onclick="document.querySelector(\'.filter-search__edit.js-filter-search-edit\').click();return false;">изменить параметры поиска</a></p>');
    }

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

    //добавление комментов
    $(document).on('submit', '.comments__form', function() {
        var text = $(this).find('textarea'); 
        if($(text).val()=='') {
            $(this).addClass('validator-error');
        } else {
            BX.showWait();
            $(this).removeClass('validator-error');
            var re =0;            
            if($(this).attr('data-re')) {
                re = $(this).attr('data-re');    
                $(this).prev().text('Ответить');
                $(this).remove();                        
            }
            $.get("/local/script/script.php", {label: 'addComment', id: $('.comments__inner').attr('data-article-id'), text: $(text).val(), re: re},
                function(data) {
                    BX.closeWait();
                    $(text).val('');
                    reComments();
                }
            );
        }
        return false;
    }); 

    //подгрузка комментов 
    if($('.comments__inner').length>0) {
        reComments();
    }
    function reComments() {
        var start = $('.comments__inner').attr('data-last')?$('.comments__inner').attr('data-last'):0;
        $('.comments__inner').addClass('wating-filter');
        $.get("/local/script/script.php", {label: 'getComments', id: $('.comments__inner').attr('data-article-id'), start: start},
            function(data) {
                data=$.parseJSON(data);
                if($(document).find('.comments__list').length==0)
                    $('.comments__quantity-text').text(data.length+' '+declOfNum(data.length, ['комментарий', 'комментария', 'комментариев'])).next().after('<ul class="comments__list"></ul>');
                if(data.length>0) {                    
                    var ul = $('.comments__inner').find('ul');    
                    for (var i = 0; i < data.length; i++) {   

                        if(data[i]['RE']==0) {
                            $(ul).prepend('<li class="'+(start>0?'new-comment ':'')+'comments__item" data-comment="'+data[i]['ID']+'">\
                                <div class="comments__author"><img src="'+data[i]['pic']+'" alt="">\
                                <div class="comments__info">\
                                    <div class="comments__name"><span>'+data[i]['UF_USER']+'</span>\
                                    </div>\
                                    <div class="comments__date">'+data[i]['UF_DATA']+'</div>\
                                </div>\
                                </div>\
                                <div class="comments__text">'+data[i]['UF_TEXT']+'</div><a class="comments__reply" href="javascript:void(0)">Ответить</a>\
                            </li>'); 
                        }
                        else {
                            $(ul).find('[data-comment="'+data[i]['RE']+'"]>a').after('<li class="'+(start>0?'new-comment ':'')+'comments__item comments__item-answer" data-comment="'+data[i]['ID']+'">\
                                <div class="comments__author"><img src="'+data[i]['pic']+'" alt="">\
                                <div class="comments__info">\
                                    <div class="comments__name"><span>'+data[i]['UF_USER']+'</span>\
                                    </div>\
                                    <div class="comments__date">'+data[i]['UF_DATA']+'</div>\
                                </div>\
                                </div>\
                                <div class="comments__text">'+data[i]['UF_TEXT']+'</div><a class="comments__reply" href="javascript:void(0)">Ответить</a>\
                            </li>');
                        }                        
                    }
                    $('.comments__inner').attr('data-last', data[data.length-1]['ID']);
                }
                $('.comments__inner').removeClass('wating-filter');
            }
        );
    }

    $(document).on('click', '.comments__reply', function() {
        if($(this).next().length>0 && $(this).next().is(':not(li)')) {
            $(this).next().remove();
            $(this).text('Ответить');
        }
        else {
            $(this).text('Скрыть');            
            $(document).find('.comments__form').removeClass('validator-error');
            $(this).after($('.comments__form:eq(0)').clone());
            $(this).next().attr('data-re', $(this).closest('li').attr('data-comment'));
        }        
    });

    //изменение аватарки
    $('[name="PERSONAL_PHOTO"]').on('change', function() {
        addFile($(this).parent());
    });   
    
    function addFile($label) {
        if($label.find('input').val() == '') {
            $label.removeClass('active').removeClass('error').find('span').text('Сменить фото');
            return;
        }
        var file = document.querySelector('#'+$label.attr('for')).files[0];
        var nameFull = file.name;   
        var name = nameFull.split('.');   
        var ext = name[name.length-1];
        
        if(file>10485760  || name.length==1 || !( ext =='jpeg' || ext =='jpg' || ext =='png' || ext =='gif' ) ) {
            $label.removeClass('active').addClass('error').find('span').text(file.size>10485760?'Слишком большой размер файла':'Недопустимый формат файла');
            document.querySelector('#'+$label.attr('for')).value = '';
        }  else {
            $label.addClass('active').removeClass('error').find('span').text(nameFull);   
        }
    }

});