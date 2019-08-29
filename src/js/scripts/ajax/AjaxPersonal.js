import $ from "jquery";
import {Ajax} from "./Ajax";
import Validator from "../classes/Validator";

export class AjaxPersonal extends Ajax {

    validate() {
        this.element.find('button').prev('.validator-error-message').remove();
        return !new Validator(this.element).init();
    }

    done(data) {
        this.element.find('button').prev('.validator-error-message').remove();
        const res =  super.done(data);
        if (res) {
            var failRes = document.createElement('div');
            failRes.classList.add('validator-error-message');
            failRes.classList.add('no-abosulte');
            if(data.up && data.up === true ) {
                failRes.classList.add('validator-error-message-good');
                failRes.innerHTML = 'Данные обновлены!';
                if(data.pic) {
                    this.element.find('[type=file]').val('').siblings('span').css('background', 'url('+data.pic+') no-repeat center center').text('Сменить фото').parent().removeClass('error').removeClass('active');
                }
            } else {
                if(data.err)
                    failRes.innerHTML = data.err;
                else
                    failRes.innerHTML = 'Ошибка! Повторите немного позже';
            }
            this.element.find('button').before(failRes);
            BX.closeWait();
        }
    }

    fail(error) {
        BX.closeWait();
        this.element.find('button').prev('.validator-error-message').remove();
        var failRes = document.createElement('div');
        failRes.classList.add('validator-error-message');
        failRes.classList.add('no-abosulte');
        failRes.innerHTML = 'Ошибка! Повторите немного позже';
        this.element.find('button').before(failRes);
    }
}