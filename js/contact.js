(function ($) {
    var emailValidation = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    function onSuccess() {
        // Success message
        $('#contact-reply').html('<div class="alert alert-success p-5 border-radius-unset"> <strong> <i class="fa fa-check-square"></i> Thank you, your message has been sent. I\'ll contact you as soon as possbile. </strong> </div>');
        //remove form
        $('#contact-form').remove();
    }


    function onError() {
        // Fail message
        $('#contact-reply').html('<div class="alert alert-danger error p-4 border-radius-unset text-dark"> <strong><i class="fas fa-exclamation-triangle"></i> Sorry, it seems the mail server is not responding. Please try again later! </div>');
    }

    $("#contact-form").submit(function (event) {
        event.preventDefault();

        var isFormValid = true;
        var data = {};
        [$("input#name"), $("input#email"), $("textarea#message")].forEach(function(input){
            var isInputValid = true;
            var value = input.val();
            var key = input.attr('id');
            data[key] = value;
            if (!value || value.length < 3) {
                var isInputValid = isFormValid = false;
            }

            if (key === 'email' && !emailValidation.test(value)) {
                isFormValid = isInputValid = false;
            }

            if (!isInputValid) {
                input.next('.help-block').html('* ' + input.data().validationRequiredMessage);
                input.addClass("is-invalid")
            } else {
                input.next('.help-block').html('');
                input.removeClass("is-invalid")
            }
        });

        if (isFormValid) {
            console.log("submit...")
            $.ajax({
                url: "https://api.slapform.com/info@blissfulwebdev.com",
                type: "POST",
                dataType: 'json',
                data: data,
                cache: false,
                success: onSuccess,
                error: onError
            })
        }
    })
})(jQuery);