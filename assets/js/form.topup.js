const topupForm = {
    submit: (el) => {
        const submitBtn = el.querySelector('.modal-topup-form__submit');
        const allInputs = el.querySelectorAll('select');
        const messageInner = el.querySelector('.form-message');
        if (submitBtn) submitBtn.classList.add('is-disabled');
        el.classList.add('is-disabled');
        var formData = {
            'select': $('select[name=select]').val()
        };

        $.ajax({
            type: 'POST',
            url: '#',
            data: formData,
            dataType: 'json',
            encode: true,
            success: function(data) {},
            error: function(xhr, ajaxOptions, thrownError) {
                setTimeout(() => {
                    messageInner.classList.add('is-shown');
                    if (submitBtn) submitBtn.classList.remove('is-disabled');
                    el.classList.remove('is-disabled');
                    messageInner.innerHTML = xhr.status + '//' + thrownError;
                }, 5000)
            }
        })
    }
}