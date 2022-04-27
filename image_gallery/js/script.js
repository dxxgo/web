const searchBtn = document.querySelector('.gallery__search button');
const imagesList = document.querySelectorAll('.gallery__images-container .image-block img')
const imagesKeywords = []
let galleryResults = document.querySelector('.gallery__results');
let galleryAllImages = document.querySelector('.gallery__images-container')
let searchInput = document.querySelector('.gallery__search input')
let allImagesBtn = document.querySelector('#allImages');
let galleryContainer = document.querySelector('.gallery-container')
let displayImagesQtd = document.querySelector('.qnt-imagens');

searchBtn.style.display = 'none';

searchInput.addEventListener('keyup', (tecla) => {
    if (tecla.key === 'Enter') {
        searchBtn.click();
    }
    searchBtn.click();
})

allImagesBtn.addEventListener('click', () => {
    galleryAllImages.classList.remove('displayNone');
    galleryResults.classList.add('displayNone');
    allImagesBtn.style.opacity = '1';
    displayImagesQtd.classList.add('displayNone');
    galleryContainerWidth('900px');
})

searchBtn.addEventListener('click', () => {
    galleryContainerWidth('900px');
    let inputSearch = document.querySelector('.gallery__search input');
    if (inputSearch.value.length === 0) {
        allImagesBtn.click();
        return;
    }
    searchImage(formatList(inputSearch.value.split(' ')));
    galleryAllImages.classList.add('displayNone');
    galleryResults.classList.remove('displayNone');
    allImagesBtn.style.opacity = '.5'
})

imagesList.forEach((img, indice) => {
    imagesKeywords.push({
        img: img,
        indice: indice,
        keywords: img.getAttribute('kw').toUpperCase()
    });
})

function galleryContainerWidth(maxWidth) {
    galleryContainer.style.maxWidth = maxWidth;
}

function galleryResultsHTML(results) {
    document.querySelector('.qnt-imagens span').textContent = results.length;
    if (results.length === 0) {
        displayImagesQtd.classList.add('displayNone');
        galleryResults.innerHTML = (
            `<p class="noneResults">
            Nenhuma imagem<br>encontrada.
            </p>`
        );

    } else {
        displayImagesQtd.classList.remove('displayNone');
        if (results.length === 1) {
            galleryContainerWidth('400px');
        } else if (results.length === 2) {
            galleryContainerWidth('600px');
        } else if (results.length === 3) {
            galleryContainerWidth('800px')
        }

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
        })

    })
    let uniqueResults = [...new Set(results)];
    galleryResultsHTML(uniqueResults);
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
    return newList;
}