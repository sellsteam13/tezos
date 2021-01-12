const registrationForm = {
    submit: (el) => {
        const submitBtn = el.querySelector('.registration-form__submit');
        const allInputs = el.querySelectorAll('input');
        const messageInner = el.querySelector('.registration-form__message');
        if (submitBtn) submitBtn.classList.add('is-disabled');
        el.classList.add('is-disabled');
        // get the form data
        // there are many ways to get this data using jQuery (you can use the class or id also)
        var formData = {
            'login': $('input[name=login]').val(),
            'email': $('input[name=email]').val(),
            'password': $('input[name=password]').val(),
            'partner': $('input[name=partner]').val()
        };

        // process the form
        $.ajax({
            type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url: './process.php', // the url where we want to POST
            data: formData, // our data object
            dataType: 'json', // what type of data do we expect back from the server
            encode: true,
            success: function(data) {

                // log data to the console so we can see
                console.log(data, 'Перезагрузка выполнится через 10сек');

                // here we will handle errors and validation messages

                if (submitBtn) submitBtn.classList.remove('is-disabled');
                el.classList.remove('is-disabled');
                messageInner.classList.remove('is-shown');
                setTimeout(() => { location.reload() }, 10000);
            },
            error: function(xhr, ajaxOptions, thrownError) {
                messageInner.classList.add('is-shown');
                if (submitBtn) submitBtn.classList.remove('is-disabled');
                el.classList.remove('is-disabled');
                messageInner.innerHTML = xhr.status + '//' + thrownError;
            }
        })
    }
}