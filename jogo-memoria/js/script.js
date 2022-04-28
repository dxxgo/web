let btn = document.querySelector('#ff');
const cardsContainer = document.querySelectorAll('.cards-container .card');
let selectedCards = [];
let checkedCards = [];
let imagesIdentifiers = shuffleArray(20, 30);
let statusTempo = document.querySelector('.status__tempo span');
let statusJogadas = document.querySelector('.status__jogadas span');
let containerGeral = document.querySelector('.container');
let loadingIcon = document.querySelector('.loadingIcon');
// buttons
let restartGameBtn = document.querySelector('.restartGameBtn');
let playGameBtn = document.querySelector('.playGame');

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
    let src = `http://picsum.photos/id/${id}/100/130`
    card.lastElementChild.src = src
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
    cardsContainer.forEach((card) => {
        card.firstElementChild.style.pointerEvents = state;
        card.firstElementChild.style.filter = 'none';
    })
}

function equalsCards(card1, card2) {
    card1.path[1].classList.add('checkedCard');
    card2.path[1].classList.add('checkedCard');
    checkedCards.push(card1);
    checkedCards.push(card2);

    setTimeout(() => {
        allCardsPointerEvents('all');
        selectedCards = []
    }, 2000);

}


// status code

function addJogadas() {
    if (statusJogadas.textContent < 9) {
        let n = statusJogadas.textContent;
        n++;
        console.log(n);
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
        } else {
            statusTempo.innerHTML = `${minutes}:${seconds}`;
        }

    }, 1000);
    playGameBtn.style.display = 'none';
    restartGameBtn.style.display = 'inline';
})

restartGameBtn.addEventListener('click', () => {
    location.reload();
})

containerGeral.style.display = 'none';
setInterval(() => {
    containerGeral.style.display = 'block';
    loadingIcon.style.display = 'none';
}, 2000);