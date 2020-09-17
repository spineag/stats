//https://observablehq.com/@mbostock/revenue-by-music-format-1973-2018

let data=[], obj, i,
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
    ]),
res=[{"hour":"00:00","aes":7704,"tec":1126,"vde":657,"tes":4228,"gesgaes":447,"consumptiongaespump":0,"consumption":13313},
{"hour":"01:00","aes":7695,"tec":1118,"vde":627,"tes":3643,"gesgaes":148,"consumptiongaespump":0,"consumption":12541},
{"hour":"02:00","aes":7728,"tec":1137,"vde":561,"tes":3483,"gesgaes":271,"consumptiongaespump":-422,"consumption":12223},
{"hour":"03:00","aes":7729,"tec":1155,"vde":529,"tes":3545,"gesgaes":384,"consumptiongaespump":-624,"consumption":11912},
{"hour":"04:00","aes":7727,"tec":1191,"vde":550,"tes":3605,"gesgaes":127,"consumptiongaespump":-712,"consumption":11923},
{"hour":"05:00","aes":7736,"tec":1217,"vde":546,"tes":3581,"gesgaes":206,"consumptiongaespump":-709,"consumption":12106},
{"hour":"06:00","aes":7747,"tec":1304,"vde":718,"tes":3746,"gesgaes":128,"consumptiongaespump":-87,"consumption":12856},
{"hour":"07:00","aes":7731,"tec":1448,"vde":750,"tes":4298,"gesgaes":486,"consumptiongaespump":0,"consumption":14262},
{"hour":"08:00","aes":7751,"tec":1469,"vde":899,"tes":4547,"gesgaes":587,"consumptiongaespump":0,"consumption":14927},
{"hour":"09:00","aes":7729,"tec":1425,"vde":1543,"tes":4582,"gesgaes":729,"consumptiongaespump":0,"consumption":15300},
{"hour":"10:00","aes":7713,"tec":1334,"vde":2419,"tes":4105,"gesgaes":489,"consumptiongaespump":-402,"consumption":15340},
{"hour":"11:00","aes":7695,"tec":1248,"vde":3155,"tes":3926,"gesgaes":476,"consumptiongaespump":-404,"consumption":15283},
{"hour":"12:00","aes":7690,"tec":1272,"vde":3494,"tes":3864,"gesgaes":554,"consumptiongaespump":-806,"consumption":15249},
{"hour":"13:00","aes":7682,"tec":1276,"vde":3542,"tes":4015,"gesgaes":293,"consumptiongaespump":-798,"consumption":15216},
{"hour":"14:00","aes":7665,"tec":1267,"vde":3390,"tes":3909,"gesgaes":567,"consumptiongaespump":-890,"consumption":15303},
{"hour":"15:00","aes":7649,"tec":1255,"vde":3051,"tes":4060,"gesgaes":1001,"consumptiongaespump":-882,"consumption":15483},
{"hour":"16:00","aes":7669,"tec":1390,"vde":2409,"tes":4171,"gesgaes":556,"consumptiongaespump":-87,"consumption":15384},
{"hour":"17:00","aes":7674,"tec":1475,"vde":1573,"tes":5078,"gesgaes":817,"consumptiongaespump":-83,"consumption":15691},
{"hour":"18:00","aes":7666,"tec":1506,"vde":693,"tes":5615,"gesgaes":1195,"consumptiongaespump":0,"consumption":15890},
{"hour":"19:00","aes":7676,"tec":1504,"vde":323,"tes":5714,"gesgaes":1517,"consumptiongaespump":0,"consumption":16103},
{"hour":"20:00","aes":7688,"tec":1502,"vde":266,"tes":5917,"gesgaes":2371,"consumptiongaespump":0,"consumption":17153},
{"hour":"21:00","aes":7696,"tec":1494,"vde":222,"tes":5832,"gesgaes":2233,"consumptiongaespump":0,"consumption":17057},
{"hour":"22:00","aes":7689,"tec":1216,"vde":238,"tes":5313,"gesgaes":1784,"consumptiongaespump":0,"consumption":15810},
{"hour":"23:00","aes":7668,"tec":1181,"vde":269,"tes":4748,"gesgaes":1261,"consumptiongaespump":0,"consumption":14431},
{"hour":"24:00","aes":7680,"tec":1134,"vde":300,"tes":4341,"gesgaes":136,"consumptiongaespump":0,"consumption":13283}];
for (i=0;i<res.length;i++){
    obj = {name:'aes',time:res[i]["hour"],value:res[i]['aes']};  data.push(obj);
    obj = {name:'tec',time:res[i]["hour"],value:res[i]['tec']};  data.push(obj);
    obj = {name:'vde',time:res[i]["hour"],value:res[i]['vde']};  data.push(obj);
    obj = {name:'tes',time:res[i]["hour"],value:res[i]['tes']};  data.push(obj);
    obj = {name:'gesgaes',time:res[i]["hour"],value:res[i]['gesgaes']};  data.push(obj);
    //obj = {name:'consumptiongaespump',time:res[i]["hour"],value:res[i]['consumptiongaespump']};  data.push(obj);
    //obj = {name:'consumption',time:res[i]["hour"],value:res[i]['consumption']};  data.push(obj);
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
    const  svg = d3.select("body").selectAll('div#stats').append("svg");
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

chart();
 //document.getElementById('stats').innerHTML = node;
 //console.log(node);
 //console.log(d3.select("div"));
 //d3.select('body').selectAll('div').append(node);
 //d3.select("body").append("p").text("New paragraph!");
 //console.log(d3);