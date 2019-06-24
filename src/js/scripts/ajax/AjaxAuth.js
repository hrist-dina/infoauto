import $ from "jquery";
import {Ajax} from "./Ajax";
import Validator from "../classes/Validator";
import {BaseModal} from "../modal/BaseModal";

const successMessage = {
    title: 'Спасибо!',
    text: 'Вы успешно авторизованы!'
};

export class AjaxAuth extends Ajax {


    validate() {
        return !new Validator(this.element).init();
    }

    done(data) {
        const res =  super.done(data);
        if (res) {
            let modal = $(this.element).parents('.js-modal');
            BaseModal.showSuccessMessage(modal, successMessage);
        }
    }

    fail(error) {
        console.log('fail');
        console.log(error);

        //TODO:: Написать логику на бэке по обработке ошибок. То что ниже удалить!
        let modal = $(this.element).parents('.js-modal');
        BaseModal.showSuccessMessage(modal, successMessage);
    }
}