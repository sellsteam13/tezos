const input = {
    // Удаляем лэйбл при фокусе на инпут
    focus: (el) => {
        if (Number.parseFloat(el.value) === 0) {
            el.value = '';
        } else {
            el.value = (el.value.replace(' ' + el.dataset.label, ''))
        }
    },
    // Обновляем значение инпута и добавляем лэйбл после расфокуса
    blur: (el) => {
        el.value = el.value.length != 0 ? el.value + ' ' + el.dataset.label : 0 + ' ' + el.dataset.label;
    }
}