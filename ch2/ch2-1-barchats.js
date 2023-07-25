import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

var data1 = [15, 50, 22, 8, 100, 10];
var data2 = [14, 68, 24500, 430, 19, 1000, 5555];

// ## Scale to visualise large numbers in data2

// Linear Scale
// var yScale = d3.scaleLinear().domain([0,24500]).range([0,100]);

// Polylinear scale - Linear scale with multiple points in domain and range
// var yScale = d3.scaleLinear().domain([0,100,1000,24500]).range([0,50,75,100]);

// Cutoff values over 100
// var yScale = d3.scaleLinear().domain([0,100,500]).range([0,50,100])

// Clamp Scale
var yScale = d3.scaleLinear().domain([0, 100, 500]).range([0, 50, 100]).clamp(true);

//yScale(0);
//yScale(100);
//yScale(24000);
//yScale(1000);

d3.select("svg")
  .selectAll("rect")
  .data(data2)
  .enter()
  .append("rect")
  .attr("width", 10)
  .attr("height", (d) => d)
  .style("opacity", 0.25) // colors overlapping elements
  //.attr("height", d => d)
  .style("fill", "#FE9922")
  .style("stroke", "#9A8B7A")
  .style("stroke-width", "1px")
  .attr("x", (d, i) => i * 10) // spread elements by their width on x axis
  //.attr("y", d => 100 - d) // lower elements by max element on y axis
  //.attr("y", d => 24500 - d)
  .attr("height", (d) => yScale(d))
  .attr("y", (d) => 100 - yScale(d));
