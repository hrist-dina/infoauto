import $ from "jquery";
import {BaseTab} from "./BaseTab";

const selectorByText = '.js-tab-modal-text';

export class TabAuthRegister extends BaseTab {

    onClickedTab(element) {
        let $element = super.onClickedTab(element);
        let data = $element.data('tab-menu');

        let text = '';
        switch (data) {
        case 'register':
            text = 'регистрация';
            break;
        case 'auth':
            text = 'войти';
            break;
        default:
            break;
        }
        $(selectorByText).text(text);
    }
}