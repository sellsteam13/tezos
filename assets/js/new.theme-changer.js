const themeToggler = {
    // Проверяем текущее значение переключателя
    change: (el) => {
        // Проверяем текущее значение переключателя
        if (el.checked === true) {
            // Включаем светлую тему
            window.localStorage.setItem('wmode', true);
            themeToggler.toggle(true);
        } else {
            // Включаем темную тему
            window.localStorage.setItem('wmode', false);
            themeToggler.toggle(false);
        }
    },

    load: () => {
        // Получаем значение из localStorage
        const wmode = window.localStorage.getItem('wmode', '');
        // Меняем текущий стейт переключателя
        if (wmode === 'true') {
            themeToggler.toggle(true);
        } else {
            themeToggler.toggle(false);
        }
    },

    toggle: (state) => {
        const rootElement = document.querySelector('html');
        if (state) {
            $('#themeStateHolder').prop("checked", true);
            rootElement.classList.add('is-white');
            $('#whiteThemeLink').prop('disabled', false);
            $('#darkThemeLink').prop('disabled', true);
        } else {
            $('#themeStateHolder').prop("checked", false);
            rootElement.classList.remove('is-white');
            $('#whiteThemeLink').prop('disabled', true);
            $('#darkThemeLink').prop('disabled', false);
        }
    }

}