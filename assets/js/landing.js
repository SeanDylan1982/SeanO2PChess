(document.onload = () => {
    let newGameBtn = document.getElementById('new-game');

    newGameBtn.addEventListener('click', (event) => {
        window.location.href += 'game';
    })

})();