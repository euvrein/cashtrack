$( document ).ready(function() {
    var data = get_data(STORAGE_KEY);

    $("#spending-limit-amount").val(data.budget_data.spending_limit);
});

$("#spending_limit_form").on("submit", function(e) {
    e.preventDefault();
    
    update_spending_limit();

    goto_page('./home.html');
});

function update_spending_limit() {    
    var data = get_data(STORAGE_KEY);
    let spending_limit = $("#spending-limit-amount").val();

    spending_limit = Math.abs(spending_limit);

    data.budget_data.spending_limit =  spending_limit;

    set_data(STORAGE_KEY, data);
}