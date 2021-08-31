// quickchart-js https://github.com/typpo/quickchart-js

const QuickChart = require('quickchart-js');

const chart = new QuickChart();

chart.setWidth(500)
chart.setHeight(300);

chart.setConfig({
  type: 'bar',                                // Show a bar chart
  data: {
    labels: [2012, 2013, 2014, 2015, 2016],   // Set X-axis labels
    datasets: [{
      label: 'Users',                         // Create the 'Users' dataset
      data: [120, 60, 50, 180, 120]           // Add data to the chart
    }]
  }
});

// Print the chart URL
console.log(chart.getUrl());

// Get the image...
// const image = await chart.toBinary();

// Or write it to a file
chart.toFile('chart.png');

// Print the chart URL
// console.log(myChart.getUrl());