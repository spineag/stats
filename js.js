function getStats(){
    let  f1=function(res){
        console.log('f1:');
        console.log(res);
    };

    let xhr = new XMLHttpRequest();
    xhr.open("post", "https://ua.energy/wp-admin/admin-ajax.php");
    xhr.onload=f1;
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        action: 'get_data_oes',
        report_date: '15.09.2020',
        type: 'day'
    }));
}

function getCO2(){
    let  f2=function(res){
        console.log('f2:');
        console.log(res);
    };

    let xhr = new XMLHttpRequest();
    xhr.open("get", "https://api.co2signal.com/v1/latest?countryCode=UA&auth-token=fff2780a31b744e6");
    xhr.onload=f2;
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}



function getStats$(){
    $.post(
        "https://ua.energy/wp-admin/admin-ajax.php",
        {
            action: 'get_data_oes',
            report_date: '15.09.2020',
            type: 'day'
        }, f11
      );
       
      function f11(res){
        console.log('f11:');
        console.log(res);
      };
}
function getCO2$(){
    $.get(
        "https://api.co2signal.com/v1/latest?countryCode=UA&auth-token=fff2780a31b744e6",
        { }, f22
      );
       
      function f22(res){
        console.log('f22:');
        console.log(res);
      };
}


getCO2$();
getStats$();