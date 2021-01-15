const form = {
    toggleInputs: (form) => {
        [...form.querySelectorAll('input, select')].forEach(x => {
            if (x.hasAttribute('disabled')) {
                x.removeAttribute('disabled');
                if (x.hasAttribute('data-selectize')) x.selectize.enable();
            } else {
                x.setAttribute('disabled', true);
                if (x.hasAttribute('data-selectize')) x.selectize.disable();
            }
        });
    }
}