$(document).ready(function() {
    var data = get_data(STORAGE_KEY);
    var earnings = compute_earnings();
    var spending = compute_spending();
    var balance = earnings - spending;
 
    // DISPLAY USER ICON
    load_display('#user_first_letter',data.user_data.user_first_letter);

    // DISPLAY BALANCE
    load_display('#budget_balance',data.budget_data.currency + parseFloat(balance).toLocaleString('en-AU', {minimumFractionDigits: 2, maximumFractionDigits: 2}));

    // DISPLAY CASH HOLDER
    load_display('#cash_holder',data.user_data.user_name);

    // DISPLAY SPENDING
    load_display('#spending_amount',data.budget_data.currency + parseFloat(spending).toLocaleString('en-AU', {minimumFractionDigits: 2, maximumFractionDigits: 2}));
    load_display('#spending_description', "Your largest recorded spending is");

    // DISPLAY EARNINGS
    load_display('#earnings_amount',data.budget_data.currency + parseFloat(earnings).toLocaleString('en-AU', {minimumFractionDigits: 2, maximumFractionDigits: 2}));
    load_display('#earnings_description', "Your largest recorded earning is");

    // DISPLAY SPENDING LIMIT
    load_display('#spending_limit_amount',data.budget_data.currency + parseFloat(data.budget_data.spending_limit).toLocaleString('en-AU', {minimumFractionDigits: 2, maximumFractionDigits: 2}));
    if (data.budget_data.spending_limit <= spending){
        let message = "You have already reached your limit!";
        load_display('#spending_limit_description', message);
    }
        
    //DISPLAY TRANSACTION
    render_transaction();
});
    

$('.card').click(function(){
    let isFlipping = false;

    if (!isFlipping) {
        isFlipping = true;
        $('.card').toggleClass('flipped');
        
        setTimeout(() => {
            isFlipping = false;
        }, 800);
    }
});

// Pulse animation for the add card button
$('.add-card-btn').on('mouseenter', function(){
    $('.add-card-btn').addClass('pulse');
});
   
$('.add-card-btn').on('mouseleave', function(){
    $('.add-card-btn').removeClass('pulse');
});


$('.transaction-item').click(function(){
        $(this).css("background-color", "rgba(60, 197, 117, 0.3)");
        setTimeout(() => {
            $(this).css("background-color", "rgba(255, 255, 255, 1)");
        }, 1500);
});

function load_display(target, content){
    $(target).html(content);
}

function render_transaction(){
  const transactions = read_transaction();
  const budget_data = read_budget_data();
  const transaction_list = $("#transactions-list");
  const items_to_display = 3;

  transaction_list.empty();

  if(transactions.length === 0){
      transaction_list.html(`
          <div class="transaction-item">
              No recorded transaction
          </div>
      `);
  } else {
    transactions
      .slice()  //create a copy of an array
      .slice(0, items_to_display)  //array.slice(start, end)
      .forEach((transaction, index) => {
        let transaction_date = new Date(transaction.date).toLocaleDateString('en-AU');

        transaction_list.append(`
          <div class="transaction-item">
            <div>
              <div class="transaction-merchant">${transaction.description}</div>
              <div class="transaction-date">${transaction_date}</div>
            </div>
            <div id="amount_${index}" class="transaction-amount">${budget_data.currency}${parseFloat(transaction.amount).toLocaleString('en-AU', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
          </div>
        `);

        if(transaction.type == 'earnings'){
          $('#amount_'+index).addClass("trend-up");
        } else if(transaction.type == 'spending'){
          $('#amount_'+index).addClass("trend-down");
        }
      });
  }
}