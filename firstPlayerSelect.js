const xSelector = document.querySelector('.select__x');
const oSelector = document.querySelector('.select__o');

xSelector.addEventListener('click', (event) => {
    if(!xSelector.classList.contains('active')) {
        xSelector.classList.add('active');
        oSelector.classList.remove('active');
    }
});

oSelector.addEventListener('click', (event) => {
    if(!oSelector.classList.contains('active')) {
        oSelector.classList.add('active');
        xSelector.classList.remove('active');
    }
});