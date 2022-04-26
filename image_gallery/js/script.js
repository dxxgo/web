const searchBtn = document.querySelector('.gallery__search button');
const imagesList = document.querySelectorAll('.gallery__images-container .image-block img')
const imagesKeywords = []
let galleryResults = document.querySelector('.gallery__results');
let galleryAllImages = document.querySelector('.gallery__images-container')
let searchInput = document.querySelector('.gallery__search input')
let allImagesBtn = document.querySelector('#allImages');


allImagesBtn.addEventListener('click', () => {
    galleryAllImages.classList.remove('displayNone');
    galleryResults.classList.add('displayNone');
})

searchBtn.addEventListener('click', () => {
    let inputSearch = document.querySelector('.gallery__search input');
    searchImage(formatList(inputSearch.value.split(' ')));
    galleryAllImages.classList.add('displayNone');
    galleryResults.classList.remove('displayNone');
})

imagesList.forEach((img, indice) => {
    imagesKeywords.push({
        img: img,
        indice: indice,
        keywords: img.getAttribute('kw').toUpperCase()
    });
})

function galleryResultsHTML(results) {
    if (results.length === 0) {
        galleryResults.innerHTML = (
            `<p class="noneResults">
            Nenhuma imagem<br>encontrada.
            </p>`
        );

    } else {
        galleryResults.innerHTML = '';
        results.forEach((e) => {
            let src = e.img.getAttribute('src');
            let alt = e.img.getAttribute('alt')
            galleryResults.innerHTML += (
                `<div class="image-block">
                            <img src='${src}' alt='${alt}'>
                        </div>`
            )
        })
    }
}

function searchImage(inputSearch) {
    let results = [];
    imagesKeywords.forEach((img) => {
        inputSearch.forEach((key) => {
            if (img.keywords.includes(key.toUpperCase())) {
                results.push(img);
            }
        });

    })
    galleryResultsHTML(results);
}

function formatList(list) {
    let newList = [];
    list.forEach((e, i) => {
        if (e === '') {
            list.splice(i, 1);
        }
    })
    list.forEach((e, i) => {
            if (e !== '') {
                newList.push(e);
            }
        })
        // remove itens repetidos da lista
    let uniqueList = [...new Set(newList)]
    return uniqueList;
}