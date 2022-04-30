let btn = document.querySelector('#ff');
const cardsContainer = document.querySelectorAll('.cards-container .card');
let selectedCards = [];
let checkedCards = [];
let imagesIdentifiers = shuffleArray(1, 11);
let statusTempo = document.querySelector('.status__tempo span');
let statusJogadas = document.querySelector('.status__jogadas span');
let containerGeral = document.querySelector('.container');
let loadingIcon = document.querySelector('.loadingIcon');
// buttons
let restartGameBtn = document.querySelector('.restartGameBtn');
let playGameBtn = document.querySelector('.playGame');
let finalStatus = document.querySelector('.final-status');
// counters
let chkCardsQtd = 0;
let actualTime = 0;
let attPlays = 0;
let socialMenuBtn = document.querySelector('.social-btn');
let socialMenu = document.querySelector('.social-menu');
let openMenu = document.querySelector('._open');
let closeMenuBtn = document.querySelector('._close');
let bgCloseMenu = document.querySelector('#bg-to-close-menu');

socialMenuBtn.addEventListener('click', () => {
    closeOpenMenu();
})

bgCloseMenu.addEventListener('click', () => {
    closeOpenMenu();
})

function closeOpenMenu() {
    socialMenu.classList.toggle('toggle-menu');
    openMenu.classList.toggle('_display-none');
    closeMenuBtn.classList.toggle('_display-none');
    closeMenuBtn.classList.toggle('close--active')
    bgCloseMenu.classList.toggle('_display-none')
}



function shuffleArray(start, end) {
    let arr = []
    for (k = start; k < end; k++) {
        arr.push(k);
        arr.push(k)
    }

    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

cardsContainer.forEach((card) => {
    let id = imagesIdentifiers.pop();
    src = `
    https://raw.githubusercontent.com/diegofrr/findme.e/main/memory_game/images/cards-image/image${id}.png
    `
    card.lastElementChild.src = src;
})


function enable() {
    selectedCards.forEach((card) => {
        if (!checkedCards.includes(card)) {
            let cardStamp = card.path[1].firstElementChild;
            let imageCard = card.path[1].lastElementChild;

            cardStamp.style.display = 'block';

            setTimeout(() => {
                cardStamp.classList.remove('flip');
            }, 50);

            imageCard.classList.remove('on');
        }
    })
    selectedCards = []
    allCardsPointerEvents('all')
}


cardsContainer.forEach((card) => {
    card.addEventListener('click', (e) => {
        e.target.style.pointerEvents = 'none';
        let cardStamp = e.composedPath()[1].firstElementChild;
        let imageCard = e.composedPath()[1].lastElementChild;
        cardStamp.classList.add('flip');
        setTimeout(() => {
            cardStamp.style.display = 'none';
        }, 300);

        imageCard.classList.add('on');

        selectedCards.push(e);

        if (selectedCards.length === 2) {
            addJogadas();
            allCardsPointerEvents('none');
            compareCards(selectedCards);
        }

    })

})

function compareCards(selectedCardsToCompare) {
    let card1 = selectedCardsToCompare[0];
    let card2 = selectedCardsToCompare[1];

    let card1ImgLink = card1.path[1].lastElementChild.getAttribute('src');
    let card2ImgLink = card2.path[1].lastElementChild.getAttribute('src');

    if (card1ImgLink === card2ImgLink) {
        equalsCards(card1, card2);
    } else {
        setTimeout(() => {
            enable();
        }, 1000);
    }

}

function allCardsPointerEvents(state) {
    document.querySelectorAll('.cards-container .card .card__stamp').forEach((span) => {
        span.style.pointerEvents = state;
        span.style.filter = 'none';
    })
}

function addChkIcon(cards) {
    cards.forEach((card) => {
        card.path[1].innerHTML =
            `<span id="nice"><i class="uil uil-check"></i></span>` +
            card.path[1].innerHTML
    })

    cards.forEach((card) => {
        card.path[1].firstElementChild.firstElementChild.classList.add('_upup');
    })


    setTimeout(() => {
        document.querySelectorAll('#nice i').forEach((e) => {
            e.classList.remove('_upup');
        })
    }, 1000);

}

function equalsCards(card1, card2) {
    card1.path[1].classList.add('checkedCard');
    card2.path[1].classList.add('checkedCard');
    checkedCards.push(card1);
    checkedCards.push(card2);

    chkCardsQtd++;

    if (chkCardsQtd === 10) {
        setTimeout(() => {
            finalResult(attPlays, actualTime);
        }, 1000);
    }

    setTimeout(() => {
        allCardsPointerEvents('all');
        selectedCards = []
    }, 2000);

    setTimeout(() => {
        addChkIcon([card1, card2]);
    }, 1000);

}


// status code

function addJogadas() {
    attPlays++;
    if (statusJogadas.textContent < 9) {
        let n = statusJogadas.textContent;
        n++;
        statusJogadas.textContent = '0' + n;
        return;
    }
    statusJogadas.textContent++;

}

playGameBtn.addEventListener('click', () => {
    allCardsPointerEvents('all')
    let seconds = 0;
    let minutes = 0;
    setInterval(() => {
        seconds++;

        if (seconds > 59) {
            minutes++;
            seconds = 0;
        }

        if (seconds < 10) {
            statusTempo.innerHTML = `${minutes}:0${seconds}`;
            actualTime = `${minutes}:0${seconds}`;
        } else {
            statusTempo.innerHTML = `${minutes}:${seconds}`;
            actualTime = `${minutes}:${seconds}`;
        }

    }, 1000);
    playGameBtn.style.display = 'none';
    restartGameBtn.style.display = 'inline';
})

restartGameBtn.addEventListener('click', () => {
    location.reload();
})

containerGeral.style.display = 'none';

// Icon de carregamento
setInterval(() => {
    containerGeral.style.display = 'block';
    loadingIcon.style.display = 'none';
}, 2000);


// RESULTADO FINAL

function finalResult(att, time) {
    finalStatus.style.display = 'grid';
    finalStatus.innerHTML = (
        `
    <div class="f-container">
                <img class="f-container__image" src="https://raw.githubusercontent.com/diegofrr/findme.e/main/memory_game/images/f-emoji.png">

                <p class="f-msg">Parabéns, você encontrou todos os pares de cartas!!!</p>
                <p class="f-statics">Aqui estão suas estatísticas:</p>
                <p class="f-tentativas">Tentativas >
                    <span>${att}</span>
                </p>

                <p class="f-tempo">
                    Tempo >
                    <span>${time}</span>
                </p>


                <button class="f-btn">Quero jogar de novo!</button>
            </div>
    `);
    document.querySelector('.f-btn').addEventListener('click', () => {
        location.reload();
    })

    document.querySelector('.status-bar').style.display = 'none';
}