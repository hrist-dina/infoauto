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

    carSelects.push({
		0: 'types',
		1: 'mark',
		2: 'model',
		3: 'generation',
	});  

	/*
<div class="filter-search__item">
                                  <select class="select js-select" name="mark">
                                    <option value="Марка" disabled selected hidden>Марка</option>
                                    <option value="Toyota">Toyota</option>
                                    <option value="Лада">Лада</option>
                                    <option value="Mazda">Mazda</option>
                                  </select>
                    </div>
                    <div class="filter-search__item">
                                  <select class="select js-select" name="model">
                                    <option value="Модель" disabled selected hidden>Модель</option>
                                    <option value="Camry">Camry</option>
                                    <option value="Vesta">Vesta</option>
                                    <option value="323">323</option>
                                  </select>
                    </div>
                    <div class="filter-search__item">
                                  <select class="select js-select" name="generation">
                                    <option value="Поколение" disabled selected hidden>Поколение</option>
                                    <option value="2018">2018</option>
                                    <option value="2016">2016</option>
                                    <option value="III (BF), 1985 — 1989">III (BF), 1985 — 1989</option>
                                  </select>
                    </div>
    function CarSelect($this) {
    	window.carSelects = window.carSelects || [];
    	var title, options, step;
    	//определить, какой шаг надо подгрузить
    	if($this.find('select').length == 0) {
    		step = 0;
    	} else {
    		var thisBreak= false;
    		$this.find('select').each(function() {
    			if($(this).val()) {
    				//если выбраны значения, то следующий шаг надо выполнять
    				if(!thisBreak) 
    					step = parseInt($(this).attr('data-numcarselection'))+1;
    			}
    			else {
    				//не выбрано значение, значит этот шаг грузим
    				step = parseInt($(this).attr('data-numcarselection'));
    				thisBreak= true;
    			}
    		});
    	}    	
    	switch(step) {
  			case 0: 
  				//только для главной нулевой шаг
  				$this.html('');		
  				$.get("/local/script/autobaseApi.php", {
    					type: "types"
  					},
  					function(data) {
						data=$.parseJSON(data);
						reCarSelect($this, 'Выберите тип авто', '<option disabled selected hidden>Тип авто</option>', data, 0);
  					}
				);    			
    			break;			
  			case 1:  
    			$.get("/local/script/autobaseApi.php", {
    					type: "types"
  					},
  					function(data) {
						data=$.parseJSON(data);
						reCarSelect($this, 'Выберите марку', '<option disabled selected hidden>Марка</option>', data, 0);
  					}
				);  
    			break;			
    		case 2:  
    			console.log(2);
    			break;			
    		case 3:  
    			console.log(3);
    			break;			
    		case 4:  
    			console.log(4);
    			break;			
  			default:
    			console.log('error');
    			break;
		}		
    }

    function reCarSelect($this, title, options, data, type) {
    	window.carSelects = window.carSelects || [];
    	var index = parseInt($this.attr('data-carselection'));
    	$this.find('.car-selection__text').text(title);		
		if(data) {
			for (var i = 0; i < data.length ; i++) {			
				options=options+'<option value="'+data[i].id_car_type+'">'+data[i].name+'</option>';				
			}
			$this.append('<select class="select js-select" data-numcarselection="'+type+'">'+options+'</select>');
        	new Select();
		}		
		if(index==0) {
			if($this.find('.car-selection__text').length==0) {
				$this.prepend('<div class="car-selection__text">Вы выбрали</div><ul class="car-selection__choice"></ul>');
			}
			$this.find('.car-selection__choice').html('');
			$this.find('select').each(function() {
    			if($(this).val()) {
    				$this.find('.car-selection__choice').append('<li>'+$(this).find(':selected').text()+'<a class="close" href="javascript:void(0)"></a></li>');
    			}
    		});
		}
	}

    $('[data-carselection]').each(function() {
    	CarSelect($(this));    	
    });

    $(document).on('change', '[data-carselection] select', function() {
    	CarSelect($(this).closest('[data-carselection]'));
    });
    */

});


