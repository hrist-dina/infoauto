import Select from "%components%/select/select";
import {FilterSearch} from "%components%/filter-search/filter-search";
import $ from "jquery";

$(document).ready(function () {
    new Select();
    new Select('.js-select-gray', 'infoauto-gray');
    new FilterSearch();
});