import $ from "jquery";
import "%components%/article-detail/article-detail";
import "%components%/card-slider/card-slider";
import "%components%/share/share";
import "%components%/hint/hint";
import {Select} from "%components%/select/select";
import {FilterSearch} from "%components%/filter-search/filter-search";
import {MobileMenu} from "%components%/mobile-menu/mobile-menu";
import {Video} from "../scripts/classes/Video";
import {PeronalAreaSubMenu} from "%components%/personal-area-icon/PeronalAreaSubMenu";

$(document).ready(function () {
    new Select();
    new Select('.js-select-gray', 'infoauto-gray');
    new FilterSearch();
    new MobileMenu();
    new Video();
    new PeronalAreaSubMenu();

    window.carSelects = window.carSelects || [];
    window.carSelectsTitle = window.carSelectsTitle || [];

	carSelects.push('types');
	carSelects.push('mark');
	carSelects.push('model');
	carSelects.push('generation');

    carSelectsTitle.push('Выберите тип авто');
    carSelectsTitle.push('Выберите марку авто');
    carSelectsTitle.push('Выберите модель авто');
    carSelectsTitle.push('Выберите поколение авто');

    $('[data-carselection]').each(function() {
        CarSelect($(this), false);
    });

    $(document).on('change', '[data-numcarselection]', function() {
        CarSelect($(this).closest('[data-carselection]'), $(this));
    });

    function CarSelect($this, $select) {
        window.carSelects = window.carSelects || [];
        window.carSelectsTitle = window.carSelectsTitle || [];
        var title, options, step=0, param = {};

        //определить, какой шаг надо подгрузить
        if($select) {
            step = parseInt($select.attr('data-numcarselection'))+1;
            $this.find('select').each(function() {
                var selectStep = parseInt($(this).attr('data-numcarselection'));
                if(selectStep < step) {
                    if($(this).attr('name')=='types')
                        param.typeAuto = $(this).find(':selected').val();
                    if($(this).attr('name')=='mark')
                        param.mark = $(this).find(':selected').val();
                    if($(this).attr('name')=='model')
                        param.model = $(this).find(':selected').val();
                } else {
                    switch(selectStep) {
                        case 1:
                            $(this).html('<option value="0" disabled selected hidden>Марка</option>');
                            break;
                        case 2:
                            $(this).html('<option value="0" disabled selected hidden>Модель</option>');
                            break;
                        case 3:
                            $(this).html('<option value="0" disabled selected hidden>Поколение</option>');
                            break;
                    }
                }
            });
        }
        else if($this.find('select').length > 0) {
            var thisBreak= false;
            $this.find('select').each(function() {
                if($(this).find(':selected').val()!=0) {
                    if($(this).attr('name')=='types')
                        param.typeAuto = $(this).find(':selected').val();
                    if($(this).attr('name')=='mark')
                        param.mark = $(this).find(':selected').val();
                    if($(this).attr('name')=='model')
                        param.model = $(this).find(':selected').val();
                    //если выбраны значения, то следующий шаг надо выполнять
                    if(!thisBreak)
                        step = parseInt($(this).attr('data-numcarselection'))+1;
                }
                else {
                    if(!thisBreak) {
                        //не выбрано значение, значит этот шаг грузим
                        step = parseInt($(this).attr('data-numcarselection'));
                        thisBreak= true;
                    }
                }
            });
        }

        param.type = carSelects[step];
        if(step<4) $.get("/local/script/autobaseApi.php", param,
            function(data) {
                data=$.parseJSON(data);
                reCarSelect($this, carSelectsTitle[step], step, data);
            }
        );
    }

    function reCarSelect($this, title, step, data) {
        var options ='';
        if(data) {
            switch(step) {
                case 0:
                    break;
                case 1:
                    $this.find('[data-numcarselection="1"]').html('<option value="0" disabled selected hidden>Марка</option>');
                    for (var i = 0; i < data.length ; i++) {
                        options=options+'<option value="'+data[i].id_car_mark+'">'+data[i].name+'</option>';
                    }
                    $this.find('[data-numcarselection="1"]').append(options);
                    break;
                case 2:
                    $this.find('[data-numcarselection="2"]').html('<option value="0" disabled selected hidden>Модель</option>');
                    for (var i = 0; i < data.length ; i++) {
                        options=options+'<option value="'+data[i].id_car_model+'">'+data[i].name+'</option>';
                    }
                    $this.find('[data-numcarselection="2"]').append(options);
                    break;
                case 3:
                    $this.find('[data-numcarselection="3"]').html('<option value="0" disabled selected hidden>Поколение</option>');
                    for (var i = 0; i < data.length ; i++) {
                        options=options+'<option value="'+data[i].id_car_generation+'">'+data[i].name+'</option>';
                    }
                    $this.find('[data-numcarselection="3"]').append(options);
                    break;
                default:
                    break;
            }
        }
        new Select();
        //var index = parseInt($this.attr('data-carselection'));
        //$this.find('.car-selection__text').text(title);
        //if(index==0) {
            //if($this.find('.car-selection__text').length==0) {
                //$this.prepend('<div class="car-selection__text">Вы выбрали</div><ul class="car-selection__choice"></ul>');
            //}
            //$this.find('.car-selection__choice').html('');
            //$this.find('select').each(function() {
                //if($(this).val()) {
                    //$this.find('.car-selection__choice').append('<li>'+$(this).find(':selected').text()+'<a class="close" href="javascript:void(0)"></a></li>');
                //}
            //});
        //}
    }

});