function getStats(){
    let  f1=function(res){
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
        console.log(res);
    };

    let xhr = new XMLHttpRequest();
    xhr.open("get", "https://api.co2signal.com/v1/latest?countryCode=UA&auth-token=fff2780a31b744e6");
    xhr.onload=f2;
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}

getCO2();
getStats();