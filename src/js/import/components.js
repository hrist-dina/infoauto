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

    $('.section-gray [data-numcarselection="1"]').select2('focus');

    window.carSelects = window.carSelects || [];
    window.carSelectsTitle = window.carSelectsTitle || [];
    window.carSelectsOption = window.carSelectsOption || [];
    window.valueByStep = window.valueByStep || [];

	carSelects.push('types');
	carSelects.push('mark');
	carSelects.push('model');
	carSelects.push('generation');

    carSelectsTitle.push('Выберите тип авто');
    carSelectsTitle.push('Выберите марку авто');
    carSelectsTitle.push('Выберите модель авто');
    carSelectsTitle.push('Выберите поколение авто');

    carSelectsOption.push('Тип авто');
    carSelectsOption.push('Марка');
    carSelectsOption.push('Модель');
    carSelectsOption.push('Поколение');

    valueByStep.push('id_car_type');
    valueByStep.push('id_car_mark');
    valueByStep.push('id_car_model');
    valueByStep.push('id_car_generation');

    $('[data-carselection]').each(function() {
        CarSelect($(this), false);
    });

    $(document).on('change', '[data-numcarselection]', function() {
        CarSelect($(this).closest('[data-carselection]'), $(this));
    });

    function CarSelect($this, $select) {
        var title, options, step=0, param = {}, selectStep;

        //определить, какой шаг надо подгрузить
        if($select) {
            //при изменении селекта - след шаг
            step = parseInt($select.attr('data-numcarselection'))+1;
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
                    $(this).prop('disabled', true).html('<option value="0" disabled hidden selected>'+carSelectsOption[selectStep]+'</option>');
            }
        });        

        param.type = carSelects[step];
        
        if(step<4) {
            $.get("/local/script/autobaseApi.php", param,
                function(data) {
                    data=$.parseJSON(data);
                    reCarSelect($this, step, data);
                }
            );
        }
    }

    function reCarSelect($this, step, data) {
        var options ='', title = carSelectsTitle[step];
        if($this.find('[data-numcarselection="'+step+'"]').length==0) {
            if(step>0) {
                $this.find('.car-selection__text:eq(0)').text('Вы выбрали');
                if($this.find('.car-selection__choice').length==0) {
                    $this.find('.car-selection__text:eq(0)').after('<ul class="car-selection__choice"></ul>');                    
                }
                $this.find('.car-selection__choice').append('<li>'+$this.find('option:selected').text()+'<a class="close" href="javascript:void(0)"></a></li>');
                $this.find('select, .select2').remove();
            }
            $this.find('.car-selection__text:eq(1)').text(title).after('<select class="select js-select" name="'+carSelects[step]+'" data-numcarselection="'+step+'"></select>');
        }
        
        options = '<option value="0" disabled selected hidden>'+carSelectsOption[step]+'</option>';
        for (var i = 0; i < data.length ; i++) {
            options=options+'<option value="'+data[i][valueByStep[step]]+'">'+data[i].name+'</option>';
        }
        $this.find('[data-numcarselection="'+step+'"]').prop('disabled', false).append(options);
        
        new Select();
        $this.find('[data-numcarselection="'+step+'"]+span').trigger('focus');
        //$this.find('[data-numcarselection="'+step+'"]+span').trigger('click');
    }
    
});