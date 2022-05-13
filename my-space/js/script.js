const homeIcon = document.getElementById('home-icon');
let quemSouSection = document.querySelector('.quem-sou-section');
let projetosSection = document.querySelector('.projetos-section');
let porqueEuSection = document.querySelector('.porque-eu-section')
let contatoSection = document.querySelector('.contato-section');

let quemSouLink = document.getElementById('li-quemSou');
let projetosLink = document.getElementById('li-projetos');
let porqueEuLink = document.getElementById('li-porqueEU');
let contatoLink = document.getElementById('li-contato');

homeIcon.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
})

quemSouLink.addEventListener('click', () => {
    window.scrollTo({
        top: quemSouSection.offsetTop,
        behavior: 'smooth'
    });
})

projetosLink.addEventListener('click', () => {
    window.scrollTo({
        top: projetosSection.offsetTop,
        behavior: 'smooth'
    });
})

porqueEuLink.addEventListener('click', () => {
    window.scrollTo({
        top: porqueEuSection.offsetTop,
        behavior: 'smooth'
    });
})

contatoLink.addEventListener('click', () => {
    window.scrollTo({
        top: contatoSection.offsetTop,
        behavior: 'smooth'
    });
})