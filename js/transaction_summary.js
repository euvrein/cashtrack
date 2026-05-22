$( document ).ready(function() {
  render_transaction();
  clearForm();
});


function render_transaction(){
  const transactions = read_transaction();
  const budget_data = read_budget_data();
  const transaction_list = $("#transaction-summary");


  transaction_list.empty();

  if(transactions.length === 0){
      transaction_list.html(`
          <div class="transaction-item">
              No recorded transaction
          </div>
      `);
  } else {
    transactions
      .forEach((transaction, index) => {
        let transaction_date = new Date(transaction.date).toLocaleDateString('en-AU');

        transaction_list.append(`
          <div class="transaction-item">
            <div class="text-start">
              <div><strong>${transaction.description}</strong> <span class="hidden-content">(${transaction.type})</span></div>
              <div>${transaction_date}</div>
            </div>
            <div class="text-end">
              <div class="modify-link no-print" onClick="show_amendment_form(${index})">[✎edit]</div>
              <div id="amount_${index}">${budget_data.currency}${parseFloat(transaction.amount).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            </div>
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

function transaction_sort_by_date(){
  const transactions = read_transaction();

  transactions.sort(function(oldest, recent) {
    return new Date(recent.date) - new Date(oldest.date);
  });

  return transactions;
}


function cancel_amendment(){
  clearForm();
  goto_page('./transaction_summary.html');
}


function clearForm() {
  $("#transaction-index").val("");
  $("#transaction-description").val("");
  $("#transaction-date").val("");
  $("#transaction-amount").val("");
  $("#transaction-type").val("");
}

// AMEND FORM AUTOFILL
function autofill_form(index){
  var transactions = read_transaction();

  transactions = transactions;
  var transaction = transactions[index];

  $("#transaction-index").val(index);
  $("#transaction-description").val(transaction.description);
  $("#transaction-date").val(transaction.date);
  $("#transaction-amount").val(transaction.amount);
  $("#transaction-type").val(transaction.type);
};


function show_amendment_form(index){
  $("#amend_transaction_display").show();
  $("#summary_list").hide();
  autofill_form(index);
}


$("#btn_delete_transaction").on("click", function () {
  let index = $("#transaction-index").val();
  
  delete_transaction(index);
  goto_page('./transaction_summary.html');

});


function print_transaction(){
  var divContents = $("#printable_area").html();
  var printWindow = window.open('', '', '');

  printWindow.document.write(`
    <html>
      <head>
          <title>Print</title>
          <style>
            .no-print {
              display: none;
            }
            
            .trend-up {
              color: green;
            }
            
            .trend-down {
              color: red;
            }

            .transaction-item{
              display:inline-block;
              width: 95vw;
              padding: 10px;
            }

            .text-start{
              float:left
            }

            .text-end{
              float:right;
            }
          </style>
      </head>
      <body>
          ${divContents}
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();

}