const APP_NAME = "Cash Track";
const STORAGE_KEY = "BM_";
const initial_data = {
    user_data: {
            user_name : "Default User",
            user_first_letter: "U",
            set_locale: "en-AU"
        }
    ,
    budget_data:{
            currency: "$",
            spending_limit: 0
        }
    ,
    transaction:[]
};

function check_data(){
    var data = get_data(STORAGE_KEY);
    if (data === null){
        return false;
    } else {
        return true;
    }
}

function get_data(keyname) {
    return JSON.parse(localStorage.getItem(keyname));
}

function set_data(keyname, value){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

function set_default_data(){
     set_data(STORAGE_KEY, initial_data);
} 


function clear_data(){
    localStorage.removeItem(STORAGE_KEY);
}


//COMPUTE
function compute_balance(){
    const transaction = read_transaction();
    compute_earnings();
}

function compute_earnings(){
    const transactions = read_transaction();
    let earnings = 0;

    transactions.forEach((transaction, index) => {
        if(transaction.type == 'earnings'){
            earnings += transaction.amount;
        }
    });
    return earnings;
}

function compute_spending(){
    const transactions = read_transaction();
    let spending = 0;

    transactions.forEach((transaction, index) => {
        if(transaction.type == 'spending'){
            spending += transaction.amount;
        }
    });
    return spending;
}

// CREATE
function create_transaction(description, date, amount, type){
    let data = read_data();

    //put the most recent data infront of the array
    data.transaction.unshift({ description, date, amount, type }); 

    set_data(STORAGE_KEY, data);
}


// READ
function read_data(){
  const data = get_data(STORAGE_KEY);
  return data;
}

function read_transaction(){
  const data = read_data();
  return data.transaction;
}

function read_budget_data(){
  const data = read_data();
  return data.budget_data;
}


// UPDATE
function update_user() {
    var data = get_data(STORAGE_KEY);
    // .replace(/[^a-z0-9]/gi, '') removes special characters
    var user_value = $("#input-user").val().replace(/[^a-z0-9]/gi, '').trim();
    var user_firstchar = user_value.charAt(0);

    data.user_data.user_name = user_value;
    data.user_data.user_first_letter = user_firstchar;
    
    set_data(STORAGE_KEY, data);
}

function update_currency() {    
    var data = get_data(STORAGE_KEY);
    data.budget_data.currency = $("#input-currency").val();

    set_data(STORAGE_KEY, data);
}

function update_transaction(index, description, date, amount, type) {
    let data = read_data();

    data.transaction[index] = { description, date, amount, type };

    set_data(STORAGE_KEY, data);
}


// DELETE
function delete_transaction(index){
    let data = read_data();

    data.transaction.splice(index, 1);
    set_data(STORAGE_KEY, data);
}