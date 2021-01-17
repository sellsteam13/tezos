const themeToggler = {
    // Проверяем текущее значение переключателя
    change: (el) => {
        // Проверяем текущее значение переключателя
        if (el.checked === true) {
            // Включаем светлую тему
            window.localStorage.setItem('wmode', true);
            console.log('white theme');
            themeToggler.toggle(true);
        } else {
            // Включаем темную тему
            window.localStorage.setItem('wmode', false);
            console.log('dark theme');
            themeToggler.toggle(false);
        }
    },

    load: () => {
        // Получаем значение из localStorage
        const wmode = window.localStorage.getItem('wmode', '');
        // Меняем текущий стейт переключателя
        if (wmode === 'true') {
            console.log('white theme');
            themeToggler.toggle(true);
        } else {
            console.log('dark theme');
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