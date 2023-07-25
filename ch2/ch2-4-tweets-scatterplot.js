import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

d3.json("tweets.json")
  .then(function (data) {
    dataViz(data.tweets);
  })
  .catch(function (err) {
    console.log(err);
  });

// function dataViz(incomingData) {
//   incomingData.forEach((d) => {
//     // Create impact score
//     d.impact = d.favorites.length + d.retweets.length;
//     // Time data type
//     d.tweetTime = new Date(d.timestamp);
//   });
//   // Earliest and latest times
//   var maxImpact = d3.max(incomingData, (d) => d.impact);
//   var startEnd = d3.extent(incomingData, (d) => d.tweetTime);

//   var timeRamp = d3.scaleTime().domain(startEnd).range([20, 480]);
//   var yScale = d3.scaleLinear().domain([0, maxImpact]).range([0, 460]);
//   var radiusScale = d3.scaleLinear().domain([0, maxImpact]).range([1, 20]);
//   // Build Color Scale
//   var colorScale = d3.scaleLinear().domain([0, maxImpact]).range(["white", "#75739F"]);
//   d3.select("svg")
//     .selectAll("circle")
//     .data(incomingData)
//     .enter()
//     .append("circle")
//     // Size, Color, Vertical Position based on impact
//     .attr("r", (d) => radiusScale(d.impact))
//     .attr("cx", (d) => timeRamp(d.tweetTime))
//     .attr("cy", (d) => 480 - yScale(d.impact))
//     .style("fill", (d) => colorScale(d.impact))
//     .style("stroke", "black")
//     .style("stroke-width", "1px");

//   // Labels
//   var tweetG = d3
//     .select("svg")
//     .selectAll("g")
//     .data(incomingData)
//     .enter()
//     .append("g")
//     // G requires transform
//     .attr("transform", (d) => "translate(" + timeRamp(d.tweetTime) + "," + (480 - yScale(d.impact)) + ")");
//   tweetG
//     .append("circle")
//     .attr("r", (d) => radiusScale(d.impact))
//     .style("fill", "#75739F")
//     .style("stroke", "black")
//     .style("stroke-width", "1px");
//   tweetG.append("text").text((d) => d.user + "-" + d.tweetTime.getHours());

//   // Remove some elements with exit. Removes all but 4 elements (size of array)
//   d3.selectAll("g").data([1, 2, 3, 4]).exit().remove();

//   // Updating
//   d3.selectAll("g")
//     .select("text")
//     .text((d) => d);

//   d3.selectAll("g").each((d) => console.log(d));
//   d3.selectAll("text").each((d) => console.log(d));
//   d3.selectAll("circle").each((d) => console.log(d));
// }

// Setting the key value in data-binding. (exit's delete priotity)
function dataViz(incomingData) {
  incomingData.forEach((d) => {
    d.impact = d.favorites.length + d.retweets.length;
    d.tweetTime = new Date(d.timestamp);
  });
  var maxImpact = d3.max(incomingData, (d) => d.impact);
  var startEnd = d3.extent(incomingData, (d) => d.tweetTime);
  var timeRamp = d3.scaleTime().domain(startEnd).range([50, 450]);
  var yScale = d3.scaleLinear().domain([0, maxImpact]).range([0, 460]);
  var radiusScale = d3.scaleLinear().domain([0, maxImpact]).range([1, 20]);
  d3.select("svg")
    .selectAll("circle")
    .data(incomingData, JSON.stringify) // Setting the key value in data-binding. (exit's delete priotity)
    .enter()
    .append("circle")
    .attr("r", (d) => radiusScale(d.impact))
    .attr("cx", (d) => timeRamp(d.tweetTime))
    .attr("cy", (d) => 480 - yScale(d.impact))
    .style("fill", "#75739F ")
    .style("stroke", "black")
    .style("stroke-width", "1px");

  // Filter out some of out data
  var filteredData = incomingData.filter((d) => d.impact > 0);
  d3.selectAll("circle")
    .data(filteredData, (d) => JSON.stringify(d))
    .exit()
    .remove();
}
