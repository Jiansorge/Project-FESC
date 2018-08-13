// 1 DOMContentLoaded
function onDOMLoad() {
  console.log("I'm the first step, I should load Google library.");
  google.charts.load('current', {'packages': ['corechart']});
  google.charts.setOnLoadCallback(getData);
  google.charts.setOnLoadCallback(getData2);
}
// 2 Google chart library loaded


document.addEventListener("DOMContentLoaded", onDOMLoad);

// 3 Get data from API

// Create Alternative Electricity Production Graph
function getData() {

  console.log("Getting data is the third step!");
  // Create a new request object
  let request = new XMLHttpRequest();
  // URL to contact goes here
  let requestUrl = "http://api.eia.gov/series/?api_key=626b941aa582f1466f09ff95922f4b50&series_id=SEDS.REPRB.FL.A";

  request.open('GET', requestUrl, true);
  // Callback for when the request completes


  request.onload = function(){
    if(request.status !== 200){
      console.log("Something went wrong: ", request);
      return;
    }

    let response = JSON.parse(request.response);
    console.log(response.series[0].data);
    drawProductionChart(response.series[0].data);
  }

  request.error = function(err){
    console.log("error is: ", err);
    return;
  }
  request.send();
}
// 4 Data received from the API

// 5 Draw chart
function drawProductionChart(freshData) {
  var data =  new google.visualization.DataTable();
  data.addColumn('string', 'Year');
  data.addColumn('number', 'Renewable Energy Production');
  data.addRows(freshData);

  var options = {'title':'Annual renewable energy production in Florida',
                 legend: { position: 'bottom' },
                  vAxis: {title: "Billion Btu"},
                 hAxis: {title: "Year",
                    direction: '-1'
                  },
                 'colors': ['green']

                };

  var chart = new google.visualization.AreaChart(document.getElementById('chart-production'));
  chart.draw(data, options);
}



// Create Electrical Consumption Graph
function getData2() {

  console.log("Getting data is the third step! ")
  // Create a new request object
  let request = new XMLHttpRequest();
  // URL to contact goes here
  let requestUrl =
  "https://api.eia.gov/series/?api_key=626b941aa582f1466f09ff95922f4b50&series_id=SEDS.TETCB.FL.A";


  request.open('GET', requestUrl, true)
  // Callback for when the request completes


  request.onload = function(){
    if(request.status !== 200){
      console.log("Something went wrong: ", request)
      return
    }

    let response = JSON.parse(request.response)
    console.log(response.series[0].data)
    drawConsumptionChart(response.series[0].data)
  }

  request.error = function(err){
    console.log("error is: ", err)
    return
  }
  request.send()
}

function drawConsumptionChart(freshData) {
  var data =  new google.visualization.DataTable();
  data.addColumn('string', 'Year');
  data.addColumn('number', 'Total Electricity Consumption');
  data.addRows(freshData);

  var options = {'title':'Total Electricity Consumption (i.e. sold) Florida',
                 legend: { position: 'bottom' },
                  vAxis: {title: "Billion Btu"},
                 hAxis: {title: "Year",
                          direction: '-1'
                  },
                 'colors': ['red']

                };

  var chart = new google.visualization.AreaChart(document.getElementById('chart-consumption'));
  chart.draw(data, options);
}



document.addEventListener("DOMContentLoaded", function(){
  // getData();
  console.log("DOM fully loaded and parsed");
  console.log(status);
  drawProductionChart();
  drawConsumptionChart();
});
