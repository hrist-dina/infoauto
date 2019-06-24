import $ from "jquery";
import {Ajax} from "./Ajax";
import Validator from "../classes/Validator";
import {BaseModal} from "../modal/BaseModal";

export class AjaxFormSelectCar extends Ajax {

    validate() {
        return !new Validator(this.element).addMessages({required: 'Обязательное!',}).init();
    }

    done(data) {
        const res =  super.done(data);
        const self =  this;
        if (res) {
            let modal = $(this.element).parents('.js-modal');
            setTimeout(function () {
                BaseModal.closeCurrent(modal);
                self.clear();
            }, 5000);
        }
    }

    fail(error) {
        console.log('fail');
        console.log(error);
    }
}