let data=[], arrStats=[], obj, i,
    margin = ({top: 20, right: 30, bottom: 30, left: 30}),
    height = 300, width = 500,
    colors=new Map([
        ["aes", "#2A5784"],
        ["tec", "#7AAAD0"],
        ["vde", "#E1575A"],
        ["tes", "#FFC686"],
        ["gesgaes", "#7C4D79"]
        //["consumptiongaespump", "#D5A5C4"],
        //["consumption", "#24693D"]
    ])

// function getStats$(){
//     $.ajax({
//         url:"https://ua.energy/wp-admin/admin-ajax.php",
//         headers: { 'Content-Type': 'application/json' },
//         type: 'POST',
//         data:{
//             action: 'get_data_oes',
//             report_date: '15.09.2020',
//             type: 'day'
//         }, 
//         success: f11,
//         error: function(er){
//             console.log('error -11:');
//             console.log(er);
//         }
//     });
       
//     function f11(res){
//     console.log('f11:');
//     console.log(res);
//     };
// }
function getCO2$(){
    $.get(
        "https://api.co2signal.com/v1/latest?countryCode=UA&auth-token=fff2780a31b744e6",
        { }, (res)=>{
            $('#co2-1').text((res.data.carbonIntensity).toFixed(2));
            $('#co2-2').text((res.data.fossilFuelPercentage).toFixed(2));
            $('#co2-3').text(res.units.carbonIntensity);
        }
    );
}
// function getStatsPY(){
//     $.ajax({
//         url: "http://spineag.xenn.xyz/test/UA.py",
//         headers: { 'Content-Type': 'application/json' },
//         type: 'POST',
//         success: function(res){
//             console.log('getStatsPY:');
//             console.log(res);
//         },
//         error: function(er){
//             console.log('error -getStatsPY:');
//             console.log(er);
//         }
//     });
// }

function getStatsPHP(){
    $.ajax({
        url: "http://spineag.xenn.xyz/test/stats.php",
        headers: { 'Content-Type': 'application/json' },
        type: 'POST',
        success: function(res){
            for (i=0;i<res.length;i++){
                obj = {
                    hour:res[i]["hour"],
                    aes:res[i]["aes"],
                    tec:res[i]["tec"],
                    vde:res[i]["vde"],
                    tes:res[i]["tes"],
                    ges:res[i]["gesgaes"],
                    gaespump:res[i]["consumptiongaespump"],
                    consumption:res[i]["consumption"]
                };
                arrStats.push(obj);
            }
            for (i=0;i<arrStats.length;i++){
                obj = {name:'aes',time:arrStats[i]["hour"],value:arrStats[i]['aes']};  data.push(obj);
                obj = {name:'tec',time:arrStats[i]["hour"],value:arrStats[i]['tec']};  data.push(obj);
                obj = {name:'vde',time:arrStats[i]["hour"],value:arrStats[i]['vde']};  data.push(obj);
                obj = {name:'tes',time:arrStats[i]["hour"],value:arrStats[i]['tes']};  data.push(obj);
                obj = {name:'gesgaes',time:arrStats[i]["hour"],value:arrStats[i]['gesgaes']};  data.push(obj);
                //obj = {name:'consumptiongaespump',time:res[i]["hour"],value:res[i]['consumptiongaespump']};  data.push(obj);
                //obj = {name:'consumption',time:res[i]["hour"],value:res[i]['consumption']};  data.push(obj);
            }
            chart();
        },
        error: function(er){ console.log('error -getStatsPHP:'); console.log(er); }
    });
}

let yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y)
        .tickFormat(x => (x / 1e9).toFixed(0)))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data.y));
let xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x)
        .tickValues(d3.ticks(...d3.extent(x.domain()), width / 80))
        .tickSizeOuter(0));
let color = d3.scaleOrdinal()
    .domain(colors.keys())
    .range(colors.values());
let series = d3.stack()
    .keys(colors.keys())
    .value((group, key) => group.get(key).value)
    .order(d3.stackOrderReverse)
    (d3.rollup(data, ([d]) => d, d => d.time, d => d.name).values())
    .map(s => (s.forEach(d => d.data = d.data.get(s.key)), s));
let y = d3.scaleLinear()
    .domain([0, d3.max(series, d => d3.max(d, d => d[1]))]).nice()
    .range([height - margin.bottom, margin.top]);
let x = d3.scaleBand()
    .domain(data.map(d => d.time))
    .rangeRound([margin.left, width - margin.right]);


let chart = function(){  
    //const svg = d3.create("svg");
    const svg = d3.select("body").selectAll('div#stats').append("svg");
    svg.attr("viewBox", [0, 0, width, height]);
    svg.append("g")
        .selectAll("g")
        .data(series)
        .join("g")
            .attr("fill", ({key}) => color(key))
            .call(g => g.selectAll("rect")
            .data(d => d)
            .join("rect")
                .attr("x", d => x(d.data.time))
                .attr("y", d => y(d[1]))
                .attr("width", x.bandwidth() - 1)
                .attr("height", d => y(d[0]) - y(d[1]))
            .append("title")
                .text(d => `${d.data.name}, ${d.data.time}
                 ${d.data.value}`));
    
    svg.append("g").call(xAxis);
    //svg.append("g").call(yAxis);
    
    //return svg.node();
 };

 // let node = chart();


getCO2$();
//getStatsPHP();