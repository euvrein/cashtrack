$( document ).ready(function() {
    //DISPLAY THE DATE TODAY
    const today = new Date().toISOString().split('T')[0];

    if ($('#transaction-date').length) {
      $("#transaction-date").val(today);
    }
});


// Create
$("#transaction_form").on("submit", function(e) {
    e.preventDefault();
    
    let description = $("#transaction-description").val().trim();
    let date = $("#transaction-date").val();
    let amount = $("#transaction-amount").val();
    let type = $("#transaction-type").val();

    amount = Math.abs(amount);

    create_transaction(description, date, amount, type);

    goto_page('./home.html');
});

// Update
$("#amendment_form").on("submit", function(e) {
    e.preventDefault();
    
    let index = $("#transaction-index").val();
    let description = $("#transaction-description").val().trim();
    let date = $("#transaction-date").val();
    let amount = $("#transaction-amount").val();
    let type = $("#transaction-type").val();

    amount = Math.abs(amount);

    update_transaction(index, description, date, amount, type);

    goto_page('./transaction_summary.html');
});