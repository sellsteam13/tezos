const registrationForm = {
    submit: (el) => {
        const submitBtn = el.querySelector('.registration-form__submit');
        const allInputs = el.querySelectorAll('input');
        const messageInner = el.querySelector('.registration-form__message');
        if (submitBtn) submitBtn.classList.add('is-disabled');
        el.classList.add('is-disabled');
        var formData = {
            'login': $('input[name=login]').val(),
            'email': $('input[name=email]').val(),
            'password': $('input[name=password]').val(),
            'partner': $('input[name=partner]').val()
        };

        $.ajax({
            type: 'POST',
            url: './process.php',
            data: formData,
            dataType: 'json',
            encode: true,
            success: function(data) {
                console.log(data);

                if (submitBtn) submitBtn.classList.remove('is-disabled');
                el.classList.remove('is-disabled');

                if (data.success) {
                    console.log('Перезагрузка выполнится через 10сек');
                    messageInner.classList.remove('is-shown');
                    setTimeout(() => { location.reload() }, 10000);
                } else {
                    messageInner.classList.add('is-shown');
                    let errorMessage = JSON.stringify(data.errors).replace(/["}]/g, '').replace(/(.+)(\:)/, '');
                    messageInner.innerHTML = errorMessage;
                }
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