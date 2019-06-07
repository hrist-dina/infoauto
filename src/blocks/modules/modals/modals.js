import {TabAuthRegister} from "../../../js/scripts/tab/TabAuthRegister";
import {BaseModal} from "../../../js/scripts/modal/BaseModal";
import {Select} from "%components%/select/select";

new TabAuthRegister('.js-auth-register-tabs');
new BaseModal();
new Select('.js-modal-select', 'infoauto-gray');