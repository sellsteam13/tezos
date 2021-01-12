const navbar = {
    open: (el) => {
        // Получаем контент меню
        let menu = $('aside').children('ul');

        //  Создаём область для нового меню
        let area = document.createElement('div');
        area.className = "areaMenu";
        area.dataset.viev = "true";
        area.style.zIndex = 5;
        area.innerHTML = "<ul>" + menu.html() + "</ul>";

        // Обновляем контент меню в новом блоке
        $('main').append(area);

        //  Создаём закрывающий элемент
        navbar.lock();
    },


    // Удаляем созданный нами контент
    closed: () => {
        $('.areaMenu').remove();
        $('.lock').remove();
    },

    //  Создаём подложку для закрытия открытого меню
    lock: () => {
        let lock = document.createElement('div');
        lock.className = 'lock';
        lock.style.zIndex = 4;
        lock.onclick = function() { navbar.closed(); }

        $('body').append(lock);
    }
}