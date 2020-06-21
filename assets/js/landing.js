(document.onload = () => {
    let newGameBtn = document.getElementById('new-game');

    newGameBtn.addEventListener('click', (event) => {
        console.log(window.location.href);
        
        window.location.href += 'game';
    })

})();