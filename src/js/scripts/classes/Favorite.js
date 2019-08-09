import $ from "jquery";

export class Favorite {
    constructor(selector = '.js-add-to-favorite') {
        this.selector = selector;

        this.init();
    }

    init () {
        var thisLike = $(this.selector);
        $.get("/local/script/script.php", {label: 'likes', type: 'get', id: $(this.selector).attr('data-favid')},
            function(data) {
                data=$.parseJSON(data);
                if(data.res=='like') {
                    $(thisLike).addClass('active');
                }                
            }
        );
        this.onClick();
    }

    onClick() {
        $(this.selector).on('click', function (e) {
            e.preventDefault();
            $(this).toggleClass('active');
            var thisLike = $(this);
            $.get("/local/script/script.php", {label: 'likes', type: 'add', id: $(this).attr('data-favid')}, 
                function(data) {
                    data=$.parseJSON(data);
                    if(data.res=='auth') {
                        $(thisLike).removeClass('active');
                        $(document).find('[data-modal-type="auth-register"]:eq(0)').trigger('click');                        
                    }
                }
            );
        });
    }
}