const topupForm = {
    submit: (el) => {
        const submitBtn = el.querySelector('.topup-form__submit');
        const allInputs = el.querySelectorAll('select');
        const messageInner = el.querySelector('.form-message');
        if (submitBtn) submitBtn.setAttribute('disabled', true);
        form.toggleInputs(el);
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
                    if (submitBtn) submitBtn.removeAttribute('disabled');
                    form.toggleInputs(el);
                    el.classList.remove('is-disabled');
                    messageInner.innerHTML = xhr.status + '//' + thrownError;
                }, 5000)
            }
        })
    }
}