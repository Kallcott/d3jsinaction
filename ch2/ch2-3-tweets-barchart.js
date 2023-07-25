import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

d3.json("tweets.json")
  .then(function (data) {
    dataViz(data.tweets);
  })
  .catch(function (err) {
    console.log(err);
  });
function dataViz(incomingData) {
  var nestedTweets = d3.group(incomingData, (d) => d.user);

  nestedTweets.forEach((d) => {
    d.numTweets = d.length;
  });

//   console.log(nestedTweets);

  var maxTweets = d3.max(nestedTweets, function(d) {
    // console.log(d[1].numTweets);
    return d[1].numTweets});
    
  console.log(maxTweets);

  var yScale = d3.scaleLinear().domain([0, maxTweets]).range([0, 500]);

  d3.select("svg")
    .selectAll("rect")
    .data(nestedTweets)
    .enter()
    .append("rect")
    .attr("width", 50)
    .attr("height", (d) => yScale(d[1].numTweets))
    .attr("x", (d, i) => i * 60)
    .attr("y", (d) => 500 - yScale(d[1].numTweets))
    .style("fill", "#FE9922")
    .style("stroke", "#9A8B7A")
    .style("stroke-width", "1px");
}
