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
                
                $(document).find('[name="personal-auto"]').trigger('change');
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