import $ from "jquery";
import {Ajax} from "./Ajax";
import Validator from "../classes/Validator";

export class AjaxPersonalAuto extends Ajax {

    validate() {
        this.element.next('.validator-error-message').remove();
        return !new Validator(this.element).init();
    }

    done(data) {
        this.element.next('.validator-error-message').remove();
        const res =  super.done(data);
        if (res) {
            var failRes = document.createElement('div');
            failRes.classList.add('validator-error-message');
            failRes.classList.add('no-abosulte');
            if(data.up && data.up === true ) {
                failRes.classList.add('validator-error-message-good');
                failRes.innerHTML = 'Данные обновлены!';
                this.element.find('select:eq(0)').find(':selected').prop('selected', false);
                this.element.find('select:eq(0)').find('option:eq(0)').prop('selected', true);
                this.element.find('select:eq(0)').trigger('change');
                //обновим список                
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
                BX.closeWait();
            } else {
                if(data.err)
                    failRes.innerHTML = data.err;
                else
                    failRes.innerHTML = 'Ошибка! Повторите немного позже';
                BX.closeWait();
            }
            this.element.after(failRes);            
        }
    }

    fail(error) {
        BX.closeWait();
        this.element.next('.validator-error-message').remove();
        var failRes = document.createElement('div');
        failRes.classList.add('validator-error-message');
        failRes.classList.add('no-abosulte');
        failRes.innerHTML = 'Ошибка! Повторите немного позже';
        this.element.after(failRes);
    }
}