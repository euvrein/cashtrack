$( document ).ready(function() {
    var data = get_data(STORAGE_KEY);
    
    $("#input-currency").val(data.budget_data.currency);
    
    // LOAD INPUT USER
    $("#input-user").val(data.user_data.user_name);
});

$("#user_form").on("submit", function(e) {
    e.preventDefault();

    update_user();
    update_currency();
    goto_page('./home.html');
});
