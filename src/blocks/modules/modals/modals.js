import {TabAuthRegister} from "../../../js/scripts/tab/TabAuthRegister";
import {BaseModal} from "../../../js/scripts/modal/BaseModal";
import {Select} from "%components%/select/select";
import {AjaxAskQuestion} from "../../../js/scripts/ajax/AjaxAskQuestion";

new BaseModal();
new Select('.js-modal-select', 'infoauto-gray');
new TabAuthRegister('.js-auth-register-tabs');
new AjaxAskQuestion('.js-ajax-ask-question').submit();