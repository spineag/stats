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
    $.ajax({
        url:"https://ua.energy/wp-admin/admin-ajax.php",
        headers: { 'Content-Type': 'application/json' },
        type: 'POST',
        data:{
            action: 'get_data_oes',
            report_date: '15.09.2020',
            type: 'day'
        }, 
        success: f11,
        error: function(er){
            console.log('error -11:');
            console.log(er);
        }
    });
       
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
        $('#co2-1').text(res.data.carbonIntensity);
        $('#co2-2').text(res.data.fossilFuelPercentage);
        $('#co2-3').text(res.units.carbonIntensity);
      };
}
function getStatsPY(){
    $.ajax({
        url: "https://raw.githubusercontent.com/spineag/stats/master/UA.py",
        headers: { 'Content-Type': 'application/json' },
        type: 'POST',
        success: function(res){
            console.log('getStatsPY:');
            console.log(res);
        },
        error: function(er){
            console.log('error -getStatsPY:');
            console.log(er);
        }
    });
}


getCO2$();
getStatsPY();