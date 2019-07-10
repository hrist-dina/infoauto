import {TabAuthRegister} from "../../../js/scripts/tab/TabAuthRegister";
import {BaseModal} from "../../../js/scripts/modal/BaseModal";
import {Select} from "%components%/select/select";
import {AjaxAskQuestion} from "../../../js/scripts/ajax/AjaxAskQuestion";
import {AjaxAuth} from "../../../js/scripts/ajax/AjaxAuth";
import {AjaxRegister} from "../../../js/scripts/ajax/AjaxRegister";
import {AjaxRestorePassword} from "../../../js/scripts/ajax/AjaxRestorePassword";
import {AjaxFormSelectCar} from "../../../js/scripts/ajax/AjaxFormSelectCar";

new BaseModal();
new Select('.js-modal-select', 'infoauto-gray');
new TabAuthRegister('.js-auth-register-tabs');
new AjaxAskQuestion('.js-ajax-ask-question').submit();
new AjaxAuth('.js-ajax-auth').submit();
new AjaxRegister('.js-ajax-register').submit();
new AjaxRestorePassword('.js-ajax-restore-password').submit();
new AjaxFormSelectCar('.js-ajax-form-select-car').submit();