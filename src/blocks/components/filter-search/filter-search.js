import $ from "jquery";
import {Select} from "%components%/select/select";

export class FilterSearch {
    constructor(
        edit = '.js-filter-search-edit',
        result = '.js-filter-search-result',
        form = '.js-filter-search-form'
    ) {
        this.edit = edit;
        this.result = result;
        this.form = form;

        this.init();
    }

    init() {
        this.listenClick();
    }

    listenClick() {
        let self = this;
        $(this.edit).on('click', function () {
            $(self.form).removeClass('hide');
            $(self.result).addClass('hide');
            new Select();
        });
    }
}