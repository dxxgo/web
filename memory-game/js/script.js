let btn = document.querySelector('#ff');
const cardsContainer = document.querySelectorAll('.cards-container .card');
let selectedCards = []
let checkedCards = []
let imagesIdentifiers = shuffleArray(20, 30)

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
        console.log('diferente')
        setTimeout(() => {
            enable();
        }, 1000);
    }

}


function allCardsPointerEvents(state) {
    cardsContainer.forEach((card) => {
        card.firstElementChild.style.pointerEvents = state;
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