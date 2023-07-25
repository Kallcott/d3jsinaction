import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

d3.csv("cities.csv")
  .then(function (data) {
    dataViz(data);
  })
  .catch(function (err) {
    console.log(err);
  });

function dataViz(incomingData) {
  var maxPopulation = d3.max(incomingData, (d) => parseInt(d.population));
  var yScale = d3.scaleLinear().domain([0, maxPopulation]).range([0, 460]);
  d3.select("svg").attr("style", "height: 480px; width: 600px;");
  d3.select("svg")
    .selectAll("rect")
    .data(incomingData)
    .enter()
    .append("rect")
    .attr("width", 50)
    .attr("height", (d) => yScale(parseInt(d.population)))
    .attr("x", (d, i) => i * 60)
    .attr("y", (d) => 480 - yScale(parseInt(d.population)))
    .style("fill", "#FE9922")
    .style("stroke", "#9A8B7A")
    .style("stroke-width", "1px");
}
