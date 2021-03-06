import $ from "jquery";
import {Ajax} from "./Ajax";
import Validator from "../classes/Validator";
import {BaseModal} from "../modal/BaseModal";

const successMessage = {
    title: 'Вопрос принят!',
    text: 'Наши эксперты в ближайшее время ответят на него.'
};

export class AjaxAskQuestion extends Ajax {

    validate() {
        this.element.children().find('button').parent().prev('.validator-error-message').remove();
        return !new Validator(this.element).init();
    }

    done(data) {
        this.element.children().find('button').parent().prev('.validator-error-message').remove();
        const res =  super.done(data);
        if (res) {            
            if(data.err) {
                var failRes = document.createElement('div');
                failRes.classList.add('validator-error-message');
                failRes.classList.add('no-abosulte');
                failRes.innerHTML = 'Ошибка! Повторите немного позже';
                this.element.children().find('button').parent().before(failRes);
                BX.closeWait();
            }
            else {
                BX.closeWait();    
                let modal = $(this.element).parents('.js-modal');
                BaseModal.showSuccessMessage(modal, successMessage);
            }

        }
    }

    fail(error) {
        this.element.children().find('button').parent().prev('.validator-error-message').remove();
        var failRes = document.createElement('div');
        failRes.classList.add('validator-error-message');
        failRes.classList.add('no-abosulte');
        failRes.innerHTML = 'Ошибка! Повторите немного позже';
        this.element.children().find('button').parent().before(failRes);
    }
}