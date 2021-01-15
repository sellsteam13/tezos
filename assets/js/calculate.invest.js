const calculateInvest = {
    // Биндим инпут к конечному результату
    input: (el) => {
        let value = Number.parseInt(el.value);
        let result = calculateInvest.getResult(value, el.dataset.label)[0] + '-' + calculateInvest.getResult(value, el.dataset.label)[1] + 'USDtz';
        if (calculateInvest.getResult(value, el.dataset.label)[2] === 0) result = 0 + 'USDtz'
        $('#investCalculateResult').text(result)
    },
    getResult: (value, label = '') => {
        let validatedValue = value.toString().replace(' ' + label, '');
        if (!isNaN(validatedValue)) {
            return [
                Number.parseInt(validatedValue / 10),
                Number.parseInt(validatedValue / 5),
                validatedValue
            ]
        } else {
            return [0, 0, 0];
        }
    },
    submit: (el) => {
        const submitBtn = el.querySelector('.invest-manage__submit');
        if (submitBtn) submitBtn.setAttribute('disabled', true);
        document.body.addEventListener('click', (e) => {
            if ((e.target.classList.contains('info__cancel') || e.target.classList.contains('overlay-trigger')) && submitBtn) submitBtn.removeAttribute('disabled');
        });
        var formData = {
            'amount': $('input[name=investAmount]').val(),
        };

        $.ajax({
            type: 'POST',
            url: '#',
            data: formData,
            dataType: 'json',
            encode: true,
            success: function(data) {
                const calcResult = (
                    calculateInvest.getResult(Number.parseInt(formData.amount))[0] + calculateInvest.getResult(Number.parseInt(formData.amount))[1]
                ) / 2;
                $('.modal-info .info-block__amount')[0].innerHTML = formData.amount;
                $('.modal-info .info-block__amount')[1].innerHTML = calcResult + ' USDtz';
                openModal(document.querySelector('.modal-info'));
            },
            error: function(xhr, ajaxOptions, thrownError) {
                setTimeout(() => {
                    if (submitBtn) submitBtn.removeAttribute('disabled');
                    console.group(xhr.status + '//' + thrownError, '| Data: ' + JSON.stringify(formData));
                }, 5000)
                const calcResult = (
                    calculateInvest.getResult(Number.parseInt(formData.amount))[0] + calculateInvest.getResult(Number.parseInt(formData.amount))[1]
                ) / 2;
                $('.modal-info .info-block__amount')[0].innerHTML = formData.amount;
                $('.modal-info .info-block__amount')[1].innerHTML = calcResult.toFixed(0) + ' USDtz';
                openModal(document.querySelector('.modal-info'));
            }
        })
    }
}