import $ from "jquery";
import {Ajax} from "./Ajax";
import Validator from "../classes/Validator";
import {Select} from "%components%/select/select";

export class AjaxPersonalAutoTO extends Ajax {

    validate() {
        this.element.prev('.validator-error-message').remove();
        return !new Validator(this.element).init();
    }

    done(data) {
        this.element.prev('.validator-error-message').remove();
        const res =  super.done(data);
        if (res) {
            var failRes = document.createElement('div');
            failRes.classList.add('validator-error-message');
            failRes.classList.add('no-abosulte');
            if(data.up && data.up === true ) {
                failRes.classList.add('validator-error-message-good');
                failRes.innerHTML = 'Данные обновлены!';
                this.element.find('.ledger__form-row:eq(0)').siblings('.ledger__form-row').remove();
                this.element.find('.ledger__form-row input').val('');                
                //обновим список
                $(document).find('[data-tab-item="ledger"]').addClass('wating-filter');
                $.get("/local/script/lk.php", {label: 'listTO'},
                    function(data) {
                        $(document).find('[data-tab-item="ledger"] .validator-error-message').remove();
                        $(document).find('[data-tab-item="ledger"] .ledger').html(data);
                        $(document).find('[data-tab-item="ledger"]').removeClass('wating-filter');
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
            this.element.before(failRes);            
        }
    }

    fail(error) {
        BX.closeWait();
        this.element.prev('.validator-error-message').remove();
        var failRes = document.createElement('div');
        failRes.classList.add('validator-error-message');
        failRes.classList.add('no-abosulte');
        failRes.innerHTML = 'Ошибка! Повторите немного позже';
        this.element.before(failRes);
    }
}