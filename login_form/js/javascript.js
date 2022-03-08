function visible(n){
    if(n == 1){
        document.querySelector('.visible').style.display = 'none';
        document.querySelector('.not-visible').style.display = 'block';
        document.querySelector('#senha').type = 'text'
    } else {
        document.querySelector('.visible').style.display = 'block';
        document.querySelector('.not-visible').style.display = 'none';
        document.querySelector('#senha').type = 'password'
    }
}