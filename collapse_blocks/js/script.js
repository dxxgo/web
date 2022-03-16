

(function () {

    var buttons = document.querySelectorAll('.more-content-button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function () {
            var className = buttons[i].classList[0]
            var selectContent = document.querySelectorAll('.' + className + ' ~ ' + '.more-content-block')[i];
            selectContent.classList.toggle('off')
            if (buttons[i].querySelector('a').textContent === 'Ver mais') {
                buttons[i].querySelector('a').textContent = 'Ver menos'
            } else {
                buttons[i].querySelector('a').textContent = 'Ver mais'
            }


        })
    }



})();
