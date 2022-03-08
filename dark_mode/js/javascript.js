function escuro() {
    $('body').addClass('dark-body');
    $('.titulo').addClass('light-letter');
    document.querySelector('.titulo').innerHTML = 'dark mode';
    $('button').removeClass('black-button');
    $('#escuro').addClass('display-none');
    $('#claro').removeClass('display-none');
} 

function claro() {
    $('body').removeClass('dark-body');
    $('.titulo').removeClass('light-letter');
    $('button').addClass('black-button');
    document.querySelector('.titulo').innerHTML = 'light mode';
    $('#claro').addClass('display-none');
    $('#escuro').removeClass('display-none');
}

function alterarFundo(){
    let corAtual = $( 'body' ).css('background-color');
    if (corAtual == 'rgb(255, 255, 255)') {
        $( 'body' ).css('background-color', 'rgb(0, 0, 0)');
        return;
    } else {
        $( 'body' ).css('background-color', 'rgb(255, 255, 255)');

    }
}