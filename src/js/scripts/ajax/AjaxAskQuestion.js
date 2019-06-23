import $ from "jquery";
import {Ajax} from "./Ajax";
import Validator from "../classes/Validator";
import {BaseModal} from "../modal/BaseModal";

export class AjaxAskQuestion extends Ajax {

    validate() {
        return !new Validator(this.element).init();
    }

    done(data) {
        const res =  super.done(data);
        const self =  this;
        if (res) {
            let button = this.element.find('button[type=submit]');
            const buttonText = button.text();
            button.prop('disabled', true);
            button.text('Успешно!');
            let modal = $(this.element).parents('.js-modal');
            setTimeout(function () {
                BaseModal.closeCurrent(modal);
                self.clear();
                button.text(buttonText).prop('disabled', false);
            }, 5000);
        }
    }

    fail(error) {
        console.log('fail');
        console.log(error);
    }
}