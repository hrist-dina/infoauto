import {TabPersonalArea} from "../../../js/scripts/tab/TabPersonalArea";
import {AjaxPersonal} from "../../../js/scripts/ajax/AjaxPersonal";
import {AjaxPersonalAuto} from "../../../js/scripts/ajax/AjaxPersonalAuto";
import {AjaxPersonalAutoTO} from "../../../js/scripts/ajax/AjaxPersonalAutoTO";

new TabPersonalArea();
new AjaxPersonal('.js-personal-info').submit();
new AjaxPersonalAuto('.js-personal-auto').submit();
new AjaxPersonalAutoTO('.js-personal-to').submit();