function createSoccerViz() {
  d3.csv("worldcup.csv")
    .then(function (data) {
      overallTeamViz(data);
    })
    .catch(function (err) {
      console.log(err);
    });

  function overallTeamViz(incomingData) {
    d3.select("svg")
      .append("g")
      .attr("id", "teamsG")
      .attr("transform", "translate(50,300)")
      .selectAll("g")
      .data(incomingData)
      .enter()
      .append("g")
      .attr("class", "overallG")
      .attr("transform", (d, i) => "translate(" + i * 50 + ", 0)");

    // Load SVG
    d3.html("../resources/noun-football-1907.svg")
      .then(function (svgData) {
        loadSVG(svgData);
      })
      .catch(function (err) {
        console.log(err);
      });
    function loadSVG(svgData) {
      d3.selectAll(".overallG").each(function () {
        d3.select(this)
          .append("svg")
          .attr("class", "soccer-svg")
          .attr("width", "30px")
          .attr("height", "37.5px")
          .attr("viewBox", "0 0 100 125")
          .attr("x", -15)
          .attr("y", -15)
          .each(function () {
            gParent = this;
            d3.select(svgData)
              .selectAll("path")
              .each(function () {
                gParent.appendChild(this.cloneNode(true)); // with append child no data is associated with the element
              });
          });
        
          // Add data to paths
        d3.selectAll("g.overallG").each(function (d) {
          d3.select(this).selectAll("path").datum(d);
        });
        var fourColorScale = d3.scaleOrdinal().domain(["UEFA", "CONMEBOL", "CAF", "AFC"]).range(["#5eafc6", "#FE9922", "#93C464", "#fcbc34"]);
        d3.selectAll("path")
          .style("fill", (p) => fourColorScale(p.region))
          .style("stroke", "black")
          .style("stroke-width", "2px");
      });
    }

    var teamG = d3.selectAll("g.overallG");
    teamG
      .append("circle")
      // A pulse animation as circles load in
      .attr("r", 0)
      .transition()
      .delay((d, i) => i * 100)
      .duration(500)
      .attr("r", 40)
      .transition()
      .duration(500)
      .attr("r", 20);

    teamG
      .append("text")
      .attr("y", 30)
      .text((d) => {
        // console.log(d);
        return d.team;
      });

    // Images
    // d3.selectAll("g.overallG")
    //   .insert("image", "text") // Note insert. This orders text to be on top
    //   .attr("xlink:href", (d) => `../images/${d.team}.png`)
    //   .attr("width", "45px")
    //   .attr("height", "20px")
    //   .attr("x", -22)
    //   .attr("y", -10);

    // Create Buttons for each data point, plus button event
    const dataKeys = Object.keys(incomingData[0]).filter((d) => d !== "team" && d !== "region");
    d3.select("#controls")
      .selectAll("button.teams")
      .data(dataKeys)
      .enter()
      .append("button")
      .on("click", (e, d) => buttonClick(d))
      // Add Inner Html
      .html((d) => {
        // console.log("DataKey: ",d);
        return d;
      })
      // Add Data Attribute
      .attr("data-key", (d) => {
        // console.log("Data key: ", d);
        return d;
      });

    // Each click will resize button based on data attribute
    function buttonClick(datapoint) {
      let maxValue = d3.max(incomingData, (d) => parseFloat(d[datapoint]));
      let radiusScale = d3.scaleLinear().domain([0, maxValue]).range([2, 20]);

      // Coloring a graph
      // RGB
      // let ybRamp = d3.scaleLinear().domain([0, maxValue]).range(["blue", "yellow"]);
      // HSL
      // let ybRamp = d3.scaleLinear().interpolate(d3.interpolateHsl).domain([0, maxValue]).range(["blue", "yellow"]);
      // HCL
      // let ybRamp = d3.scaleLinear().interpolate(d3.interpolateHcl).domain([0, maxValue]).range(["blue", "yellow"]);
      // LAB
      // let ybRamp = d3.scaleLinear().interpolate(d3.interpolateLab).domain([0, maxValue]).range(["blue", "yellow"]);

      // Discrete Color Scale
      // Unknown choses color for US that is outside the domain
      // var tenColorScale = d3.scaleOrdinal().domain(["UEFA", "CONMEBOL", "CAF", "AFC"]).range(d3.schemeCategory10).unknown("#c4b9ac");

      // Using Color Brewer.js (Cynthia Brewer color theory)

      var colorQuantize = d3.scaleQuantize().domain([0, maxValue]).range(colorbrewer.Reds[5]);

      d3.selectAll("g.overallG")
        .select("circle")
        // Apply Transition for animation
        .transition()
        .duration(1000)
        .attr("r", (d) => {
          // console.log("Data: ", d);
          // console.log("DataPoint: ",datapoint);
          return Math.max(radiusScale(d[datapoint]), 0);
        })
        // .style("fill", (d) => ybRamp(d[datapoint]))
        // .style("fill", (p) => tenColorScale(p.region));
        .style("fill", (d) => colorQuantize(d[datapoint]));
    }

    // Highlight countries that share the same region
    // teamG.on("mouseover", (e, d) => {
    //   // console.log("e:", e); // Event
    //   // console.log("d:", d); // Data
    //   highlightRegion(d);
    // });

    teamG.on("mouseover", highlightRegion);
    function highlightRegion(e, d, i) {
      // console.log("Region: ", d.region);
      // console.log("Datapoint: ", datapoint);

      var teamColor = d3.rgb("#75739F");
      d3.select(this).select("text").classed("active", true).attr("y", 10);

      // Note with the use of darker / brighter, we are using inline styles, and so overwrite css
      d3.selectAll("g.overallG")
        .select("circle")
        .style("fill", (p) => (p.region === d.region ? teamColor.darker(0.75) : teamColor.brighter(0.5)));
      // this.parentElement.appendChild(this); // SVG has no Z index, so we must re-append to raise the draw
      d3.select(this).raise();
    }
    teamG.select("text").style("pointer-events", "none");

    // Deactivate classes on mouseout
    // Iteration 1:
    // teamG.on("mouseout", function () {
    //   d3.selectAll("g.overallG").select("circle").classed("inactive", false).classed("active", false);
    // });
    // Iteration 2:
    teamG.on("mouseout", unHighlight);
    function unHighlight() {
      d3.selectAll("g.overallG").select("circle").attr("class", "");
      d3.selectAll("g.overallG").select("text").classed("active", false).attr("y", 30);
    }

    // Logging dom objects
    // d3.select("circle").each(function (d, i) {
    //   console.log(d); // Data bound to object
    //   console.log(i); // index
    //   console.log(this); // Dom element
    // });
    //

    // Adding Tables
    d3.text("../resources/infobox.html")
      .then(function (html) {
        d3.select("body").append("div").attr("id", "infobox").html(html);

        teamG.on("click", teamClick);
        function teamClick(e, d) {
          console.log("D: ", d);
          d3.selectAll("td.data")
            .data(Object.values(d))
            .html((p) => {
              console.log("P: ", p);
              return p;
            });
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  }
}
