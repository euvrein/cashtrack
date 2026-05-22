function confirm_clear_all_data(){
    clear_data();
    $("#clear_data_description").html("Data has been Cleared. Please wait!");
    setTimeout(function() {
        window.location.href = "../index.html"
    }, 1000);
}