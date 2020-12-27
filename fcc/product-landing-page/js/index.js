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

/*
document.addEventListener('click', function(event) {
    let clickedInside = document.getElementById('dropdown-list').contains(event.target);
    if(!clickedInside && document.getElementById('dropdown-list').style.display === 'block') {
        document.getElementById('dropdown-list').style.display = 'none';
    }
});*/