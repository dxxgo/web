const topBtn = document.querySelector('.topo-btn');
topBtn.classList.add('hidden');
const twoSection = document.querySelector('.two-section');
const twoSectionOffSetTop = twoSection.offsetTop;
document.addEventListener('scroll', () => {

    if (window.scrollY >= twoSectionOffSetTop) {
        topBtn.classList.remove('hidden');
        return;
    }
    topBtn.classList.add('hidden');
})

topBtn.addEventListener('click', () => {
    scrollTo({
        top: 0,
        behavior: 'smooth'
    })
})