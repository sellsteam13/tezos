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
            $('#themeStateHolder').prop("checked", true);
            console.log('white theme');
            themeToggler.toggle(true);
        } else {
            $('#themeStateHolder').prop("checked", false);
            console.log('dark theme');
            themeToggler.toggle(false);
        }
    },

    toggle: (state) => {
        const rootElement = document.querySelector('html');
        if (state) {
            rootElement.classList.add('is-white')
        } else {
            rootElement.classList.remove('is-white')
        }
    }

}