function showMenuBar() {
    let menuBar = document.getElementById('dropdown-list');

    if(menuBar.style.display === 'block') {
        menuBar.style.display = 'none';
    } else {
        menuBar.style.display = 'block';
    }
}

document.getElementById('dropdown-list').addEventListener('click', function() {
    this.style.display = 'none';
});
