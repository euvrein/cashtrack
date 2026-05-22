$(document).ready(function() {
    var data_exist = check_data();
    
    if(!data_exist){
        set_default_data();  
    }
        
    setTimeout(function() {
        window.location.href = "./pages/home.html"
    }, 3000);
});

