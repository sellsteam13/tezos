const themeToggler = {
    // Проверяем текущее значение переключателя
    change: (el) => {
        const dModeStyles = document.querySelector('#whiteThemeLink');
        const rootElement = document.querySelector('html');
        if (dModeStyles.hasAttribute('disabled')) {
            dModeStyles.removeAttribute('disabled');
            window.localStorage.setItem('whitemode', true);
            rootElement.classList.add('is-white');
        } else {
            dModeStyles.setAttribute('disabled', true);
            window.localStorage.setItem('whitemode', false);
            rootElement.classList.remove('is-white');
        }
    }

}
window.onpageshow = function(event) {
    if (event.persisted) {
        window.location.reload()
    }
};
document.addEventListener("DOMContentLoaded", () => {
    // переключение темы сайта
    const dmode = window.localStorage.getItem('whitemode', '');
    const modeSwtch = [...document.querySelectorAll('.btnNavWhiteMode, .btnNavDarkMode')];
    const dModeStyles = document.querySelector('#whiteThemeLink');
    const rootElement = document.querySelector('html');

    if (localStorage.whitemode == 'true') {
        dModeStyles.removeAttribute('disabled');
        rootElement.classList.add('is-white');
        $('#themeStateHolder').prop("checked", true);
    } else {
        dModeStyles.setAttribute('disabled', true);
        rootElement.classList.remove('is-white');
        $('#themeStateHolder').prop("checked", false);
    }

    if (modeSwtch) {
        modeSwtch.map(x => {
            x.addEventListener('click', (e) => {
                e.preventDefault();
                if (dModeStyles.hasAttribute('disabled')) {
                    dModeStyles.removeAttribute('disabled');
                    window.localStorage.setItem('whitemode', true);
                    rootElement.classList.add('is-white');
                    $('#themeStateHolder').prop("checked", true);
                } else {
                    dModeStyles.setAttribute('disabled', true);
                    window.localStorage.setItem('whitemode', false);
                    rootElement.classList.remove('is-white');
                    $('#themeStateHolder').prop("checked", false);
                }
            });
        })
    }
})