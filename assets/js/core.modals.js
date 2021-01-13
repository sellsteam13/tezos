if (document.querySelector('.overlay')) {

    // Вызов бинда модалок после загрузки страницы.
    document.addEventListener('DOMContentLoaded', () => {
        // bindModal('.modal-thanks', '.tggl-thanks-modal');
    });

    // Основные/главные переменные.
    const $overlay = document.querySelector('.overlay');
    const $overlayCloseTrigger = document.querySelector('.overlay-trigger');
    const $modals = document.querySelectorAll('.modal');

    // Закрытие открытых модалок при клике вне их области.
    document.addEventListener('DOMContentLoaded', () => {
        document.addEventListener('click', (e) => {
            if (e.target.contains($overlayCloseTrigger) && $overlay.classList.contains('is-opened')) {
                $modals.forEach(each => {
                    if (each.classList.contains('is-opened')) {
                        closeModal(each);
                    }
                });
            }
        });
    });

    // Бинд модалок на элемент. Первая и вторая переменная - классы элементов.
    const bindModal = (modalClass, triggerClass) => {
        if (document.querySelector(triggerClass) && document.querySelector(modalClass)) {
            const $triggers = document.querySelectorAll(triggerClass);
            const $modal = document.querySelector(modalClass);

            $triggers.forEach(trigger => {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (!$modal.classList.contains('is-opened')) {
                        openModal($modal);
                    } else {
                        closeModal($modal);
                    }
                });
            });
        } else {
            console.warn(`Cant find modal (${modalClass}) or trigger element (${triggerClass})`);
        }
    };

    // Открытие модального окна. Переменная - объект модалки.
    const openModal = (currModal) => {
        if (currModal && typeof currModal == 'object' && !currModal.classList.contains('is-opened')) {

            const currOpenModal = document.querySelector('.modal.is-opened') ? document.querySelector('.modal.is-opened') : null;

            const animatingFunction = (animatingModal) => {
                animatingModal.style.display = 'flex';
                setTimeout(() => {
                    animatingModal.classList.add('is-opened');
                }, 50);
            };

            if (currOpenModal != null) {
                currOpenModal.classList.remove('is-opened');
                currOpenModal.style.display = 'none';
            }

            document.body.style.overflow = 'hidden';

            if (!$overlay.classList.contains('.is-opened')) {
                $overlay.classList.add('is-opened');
                animatingFunction(currModal);
            } else {
                animatingFunction(currModal);
            }
            return true;
        } else {
            console.warn(`Cant find modal (${currModal}) or its already opened!`);
        }
    };

    // Закрытие модального окна. Переменная - объект модалки.
    const closeModal = (closingModal) => {
        if (closingModal && typeof closingModal == 'object' && closingModal.classList.contains('is-opened')) {
            closingModal.classList.remove('is-opened');
            $overlay.classList.remove('is-opened');
            setTimeout(() => {
                document.body.style.overflow = '';
                closingModal.style.display = 'none';
            }, 300);
            return true;
        } else {
            console.warn(`Cant find modal (${closingModal}) or its already closed!`);
        }
    };


    // Добавления функций управления модальными окнами в глобальную область видимости.
    window.bindModal = bindModal;
    window.openModal = openModal;
    window.closeModal = closeModal;

}