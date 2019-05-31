import $ from "jquery";
import "%components%/article-detail/article-detail";
import Select from "%components%/select/select";
import {FilterSearch} from "%components%/filter-search/filter-search";
import {MobileMenu} from "%components%/mobile-menu/mobile-menu";

$(document).ready(function () {
    new Select();
    new Select('.js-select-gray', 'infoauto-gray');
    new FilterSearch();
    new MobileMenu();
});