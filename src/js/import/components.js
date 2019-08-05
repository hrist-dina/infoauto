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
        console.log(selectStep+' / '+step);
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
                console.log(param);
                if(!param['section']) {
                    param['section'] = $this.find('.car-selection__choice a[data-step="section"]').attr('data-value');
                }   
                console.log(param);
                $.get("/local/script/autobaseApi.php", param,
                    function(data) {
                        data=$.parseJSON(data);
                        reCarSelect($this, step, data);
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

});