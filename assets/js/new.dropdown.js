const dropdown = {
    open: (el) => {
        el.nextElementSibling.classList.add('is-opened');
        //  Создаём закрывающий элемент
        dropdown.lock();
    },


    // Удаляем созданный нами контент
    closed: () => {
        $('.dropdownContainer').removeClass('is-opened');
        $('.lock').remove();
    },

    //  Создаём подложку для закрытия открытого меню
    lock: () => {
        let lock = document.createElement('div');
        lock.className = 'lock';
        lock.style.zIndex = 4;
        lock.onclick = function() {
            dropdown.closed();
        }

        $('body').append(lock);
    }
}