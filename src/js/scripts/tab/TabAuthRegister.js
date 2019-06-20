import $ from "jquery";
import {BaseTab} from "./BaseTab";

const selectorByText = '.js-tab-modal-text';

export class TabAuthRegister extends BaseTab {

    onClickedTab(type) {
        let text = '';
        switch (type) {
        case 'register':
            text = 'регистрация';
            break;
        case 'auth':
            text = 'войти';
            break;
        default:
            break;
        }
        $(document).find(selectorByText).text(text);
    }
}