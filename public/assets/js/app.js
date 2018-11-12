$(window).on("load",function(){
    // PAGE IS FULLY LOADED
    // FADE OUT YOUR OVERLAYING DIV
    $('.inner').fadeOut(1500,"linear",function(){
        $('.preloader').fadeOut();
    });
});

$(document).ready(function($){
    var formModal = $('.cd-user-modal'),
        formLogin = formModal.find('#cd-login'),
        formSignup = formModal.find('#cd-signup'),
        formModalTab = $('.cd-switcher'),
        tabLogin = formModalTab.children('li').eq(0).children('a'),
        tabSignup = formModalTab.children('li').eq(1).children('a'),
        mainNav = $('.navigation');

    //open modal
    mainNav.on('click', function(event){
        $(event.target).is(mainNav) && mainNav.children('ul').toggleClass('is-visible');
    });

    // //open sign-up form
    // mainNav.on('click', '.cd-signup', signup_selected);
    //open login-form form
    mainNav.on('click', '.modal', function(){
        mainNav.children('ul').removeClass('is-visible');
        formModal.addClass('is-visible');
        formLogin.addClass('is-selected');
        formSignup.removeClass('is-selected');
        tabLogin.addClass('selected');
        tabSignup.removeClass('selected');
    });



    //close modal
    formModal.on('click', function(event){
        if( $(event.target).is(formModal) || $(event.target).is('.cd-close-form') ) {
            formModal.removeClass('is-visible');
        }
    });
    //close modal when clicking the esc keyboard button
    $(document).keyup(function(event){
        if(event.which=='27'){
            formModal.removeClass('is-visible');
        }
    });

    //switch from a tab to another
    formModalTab.on('click', function(event) {
        event.preventDefault();
        ( $(event.target).is( tabLogin ) ) ? login_selected() : signup_selected();
    });

    //hide or show password
    $('.hide-password').on('click', function(){
        var togglePass= $(this),
            passwordField = togglePass.prev('input');

        ( 'password' == passwordField.attr('type') ) ? passwordField.attr('type', 'text') : passwordField.attr('type', 'password');
        ( 'Hide' == togglePass.text() ) ? togglePass.text('Show') : togglePass.text('Hide');
        //focus and move cursor to the end of input field
        passwordField.putCursorAtEnd();
    });

    function login_selected(){
        mainNav.children('ul').removeClass('is-visible');
        formModal.addClass('is-visible');
        formLogin.addClass('is-selected');
        formSignup.removeClass('is-selected');
        tabLogin.addClass('selected');
        tabSignup.removeClass('selected');
    }

    function signup_selected(){
        mainNav.children('ul').removeClass('is-visible');
        formModal.addClass('is-visible');
        formLogin.removeClass('is-selected');
        formSignup.addClass('is-selected');
        tabLogin.removeClass('selected');
        tabSignup.addClass('selected');
    }

    if(!Modernizr.input.placeholder){
        $('[placeholder]').focus(function() {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
            }
        }).blur(function() {
            var input = $(this);
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                input.val(input.attr('placeholder'));
            }
        }).blur();
        $('[placeholder]').parents('form').submit(function() {
            $(this).find('[placeholder]').each(function() {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                }
            })
        });
    }

});

jQuery.fn.putCursorAtEnd = function() {
    return this.each(function() {
        // If this function exists...
        if (this.setSelectionRange) {
            // ... then use it (Doesn't work in IE)
            // Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
            var len = $(this).val().length * 2;
            this.focus();
            this.setSelectionRange(len, len);
        } else {
            // ... otherwise replace the contents with itself
            // (Doesn't work in Google Chrome)
            $(this).val($(this).val());
        }
    });
}


//========================================
//             Product Modal Qty
//========================================

function modify_qty(val, id) {
    var qty = document.getElementById("qty_'" + id + "'").value;
    var new_qty = parseInt(qty,10) + val;

    if (new_qty <= 0) {
        new_qty = 1;
    }
    if (new_qty > 99) {
        new_qty = 99;
    }
    document.getElementById("qty_'" + id + "'").value = new_qty;
    document.getElementById("btnAdd_'" + id + "'").href = '/cart/add/' + id + '/' + new_qty + '/false';
    document.getElementById("btnAdd_'" + id + "'").textContent='Προσθήκη ' + (new_qty * document.getElementById("btnAdd_'" + id + "'").getAttribute("price")).toFixed(2) + '€';
    return new_qty;
}

//========================================
//             Order Stages
//========================================

$(document).ready(function () {
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {

        var href = $(e.target).attr('href');
        var $curr = $(".checkout-bar  a[href='" + href + "']").parent();

        $('.checkout-bar li').removeClass();

        $curr.addClass("active");
        $curr.prevAll().addClass("visited");


    });
});

//========================================
//                  AJAX CALLS
//========================================

function showStoreMap(store) {
    var xhttp;
    if (store == "") {
        document.getElementById("resultMap").innerHTML = '';
        return;
    }
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // document.getElementById("resultMap").innerHTML = this.responseText;
            var store = JSON.parse(this.responseText);

            // jsonObj variable now contains the data structure and can
            // be accessed as jsonObj.name and jsonObj.country.
            document.getElementById("resultMap").innerHTML = "<iframe class='map' src='https://www.google.com/maps/embed/v1/place?q=" + store[0].location.lat + "," + store[0].location.lng + "&key=AIzaSyDoWKJrVl9P97JSP3cfqswCGsfrgS5ve2Q'></iframe>";
            document.getElementById("storeInfo").innerHTML = "<p><i class='fa fa-map-marker'></i> " + store[0].address + "</p><p><i class='fa fa-phone'></i> " + store[0].phoneNumber  + "</p><hr>";

        }
    };
    xhttp.open("GET", "/getStore/"+store, true);
    xhttp.send();
}

$(document).on('change','#selection',function(){
    var id = $(this).children(":selected").attr("id");
    if(id){ showStoreMap(id); }
    else { document.getElementById("resultMap").innerHTML = "<iframe class='map' src='https://www.google.com/maps/d/embed?mid=1NGnpc-zQH9CTkXFUoP9ONLz5ZkOLPWgV'></iframe>"; }
});

//when i clicked a navbar element..navbar collapsing hide
$(document).click(function (event) {
    var clickover = $(event.target);
    var $navbar = $(".navbar-collapse");
    var _opened = $navbar.hasClass("in");
    if (_opened === true && !clickover.hasClass("navbar-toggle")) {
        $navbar.collapse('hide');
    }
});


$(document).ready(function() {
    if(window.location.href.indexOf('#kalathi') != -1) {
        $('#kalathi').modal('show');
    }
});