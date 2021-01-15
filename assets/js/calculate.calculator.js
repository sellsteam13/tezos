document.addEventListener('DOMContentLoaded', () => {
    [...document.querySelectorAll('.calculator-range__input')].forEach(x => {
        /** Прогрессбар */
        const fillInner = x.parentNode.querySelector('.calculator-range__fill');
        /** Функция подсчета нужной ширины прогрессбара */
        const calcRealRangeWidth = (currValue, el) => {
            return Number.parseFloat(currValue) / Number.parseFloat(el.getAttribute('max'))
        };
        window.calcRealRangeWidth = calcRealRangeWidth;

        /** Обновляем ширину прогрессбара после загрузки страницы */
        fillInner.style.width = `calc(${calcRealRangeWidth(x.value, x) * 100}% - 1px)`;

        /** Обновляем ширину прогрессбара после изменения рэнджа */
        x.addEventListener('input', () => {
            fillInner.style.width = `calc(${calcRealRangeWidth(x.value, x) * 100}% - 1px)`;
        });

    });
});

const range = {
    input: (el) => {
        /** Обновляем значение привязанного инпута после изменения значения рэнджа */
        const output = Array.from(el.parentNode.parentNode.querySelectorAll('.calculator__input'))[Number.parseInt(el.dataset.input)];
        output.value = el.value + ' ' + output.dataset.label;
    }
}

const rangeInput = {
    change: (el) => {
        /** Получаем рэндж */
        const output = Array.from(el.parentNode.querySelectorAll('.calculator-range__input'))[Number.parseInt(el.dataset.range)];

        /** Получаем минимальное и максимальное значение текущего рэнджа */
        let maxValue = Number.parseInt(output.getAttribute('max'));
        let minValue = Number.parseInt(output.getAttribute('min'));

        /** Получаем прогрессбар */
        const rangefillInner = output.nextSibling.nextElementSibling;

        /** Провяряем разные условия для значения рэнджа, после заменяем на нужные */
        if (el.value >= minValue && el.value <= maxValue) {
            output.value = el.value;
            rangefillInner.style.width = `calc(${calcRealRangeWidth(el.value, output) * 100}% - 1px)`;
        } else if (el.value < minValue) {
            el.value = minValue;
            output.value = minValue;
            rangefillInner.style.width = `calc(${calcRealRangeWidth(minValue, output) * 100}% - 1px)`;
        } else if (el.value > maxValue) {
            el.value = maxValue;
            output.value = maxValue;
            rangefillInner.style.width = `calc(${calcRealRangeWidth(maxValue, output) * 100}% - 1px)`;
        }
    }
}

const calculator = {
    updateValues: () => {
        const paymentAmountValue = Number.parseInt(document.getElementById('calculatorPaymentAmount').value)
        const daysAmountValue = Number.parseInt(document.getElementById('calculatorDaysAmount').value);
        const resultInner = document.querySelector('[data-calculator-output]')
        if (!isNaN(paymentAmountValue) && typeof(paymentAmountValue) === 'number' && !isNaN(daysAmountValue) && typeof(daysAmountValue) === 'number') {
            calculator.getResult(paymentAmountValue, daysAmountValue)
            if (resultInner) resultInner.innerHTML = calculator.getResult(paymentAmountValue, daysAmountValue);
        }
    },
    getResult: (amount, days) => {
        return ((amount * 0.1) * days + amount).toFixed(0);
    },
    submit: (el) => {
        const submitBtn = el.querySelector('.calculator__submit');
        if (submitBtn) submitBtn.setAttribute('disabled', true);
        document.body.addEventListener('click', (e) => {
            if ((e.target.classList.contains('info__cancel') || e.target.classList.contains('overlay-trigger')) && submitBtn) submitBtn.removeAttribute('disabled');
        });
        var formData = {
            'amount': $('input[name=calculatorAmount]').val(),
            'days': $('input[name=calculatorDays]').val()
        };

        $.ajax({
            type: 'POST',
            url: '#',
            data: formData,
            dataType: 'json',
            encode: true,
            success: function(data) {
                const calcResult = calculator.getResult(
                    Number.parseInt(formData.amount),
                    Number.parseInt(formData.days)
                )
                $('.modal-info .info-block__amount')[0].innerHTML = formData.amount + ' USDtz';
                $('.modal-info .info-block__amount')[1].innerHTML = calcResult + ' USDtz';
                openModal(document.querySelector('.modal-info'));
            },
            error: function(xhr, ajaxOptions, thrownError) {
                setTimeout(() => {
                    if (submitBtn) submitBtn.removeAttribute('disabled');
                    console.group(xhr.status + '//' + thrownError, '| Data: ' + JSON.stringify(formData));
                }, 5000)
            }
        })
    }
}