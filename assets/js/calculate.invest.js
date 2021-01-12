const calculateInvest = {
    // Биндим инпут к конечному результату
    input: (el) => {
        let inputValue = Number.parseInt(el.value.replace(' ' + el.dataset.label, ''));
        let result = Number.parseInt(inputValue / 10) + '-' + Number.parseInt(inputValue / 5) + 'USDtz';
        if (isNaN(inputValue)) result = 0 + 'USDtz'
        $('#investCalculateResult').text(result)
    }
}