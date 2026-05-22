function goto_page(location,timeout){
    setTimeout(function() {
        window.location.href = location;
    }, timeout);
}
