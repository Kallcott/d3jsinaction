import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// D3 select and style
d3.select("body").append("div").style("border", "1px black solid").html("Hello world");

// Add on click
d3.select("div")
  .style("background-color", "pink")
  .style("font-size", "24px")
  .attr("id", "newDiv")
  .attr("class", "d3div")
  .on("click", () => {
    console.log("You clicked a div");
  });

// Append shapes
d3.select("body").append("svg");

/*
      d3.select("svg")
        .append("line")
        ttr("x1", 20)
        .attr("y1", 20)
        .attr("x2", 400)
        .attr("y2", 400)
        .style("stroke", "black")
        .style("stroke-width", "2px");
      d3.select("svg").append("text").attr("x", 20).attr("y", 20).text("HELLO");
      d3.select("svg").append("circle").attr("r", 20).attr("cx", 20).attr("cy", 20).style("fill", "red");
      d3.select("svg").append("circle").attr("r", 100).attr("cx", 400).attr("cy", 400).style("fill", "lightblue");
      d3.select("svg").append("text").attr("x", 400).attr("y", 400).text("WORLD"); -->
      */

d3.select("svg").append("circle").attr("r", 20).attr("cx", 20).attr("cy", 20).style("fill", "red");
d3.select("svg").append("text").attr("id", "a").attr("x", 20).attr("y", 20).style("opacity", 0).text("HELLO WORLD");
d3.select("svg").append("circle").attr("r", 100).attr("cx", 400).attr("cy", 400).style("fill", "lightblue");
d3.select("svg").append("text").attr("id", "b").attr("x", 400).attr("y", 400).style("opacity", 0).text("Uh, hi.");

d3.select("#a").transition().delay(1000).style("opacity", 1);
d3.select("#b").transition().delay(3000).style("opacity", 0.75);

d3.selectAll("circle").transition().duration(2000).attr("cy", 200);
