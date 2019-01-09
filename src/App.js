import React, { Component } from 'react';
import './App.css';
import * as d3 from 'd3';


class App extends Component {

  componentDidMount(){
     var width = 500;
      var height = 500;
      var margin = 25;
      var axisLength = width - 2 * margin; 
      
      var data = [
        {x: "1", input: 100, output: 200},
        {x: "2", input: 300, output: 150},
        {x: "3", input:  200, output:  280},
        {x: "4", input:  400, output:  100},
        {x: "5", input:  230, output:  400}
      ];
      
      var stack = d3.stack()
          .keys(["input", "output"]);   
      
      var series = stack(data);
      console.log(series)
      
      var xScale = d3.scaleBand()
          .domain(data.map(function(d) { return d.x; }))
          .rangeRound([0, axisLength]);
      
      var yScale = d3.scaleLinear()
          .domain([stackMax(), stackMin()])
          .range([0, axisLength]).clamp(true);
      
      var colorScale = d3.scaleOrdinal(d3.schemeCategory10);
      
      function extractValues(series) {
        var values = [];
        series.forEach(function(value) {
          //console.log(values)
          value.forEach(function(item) {
            values = values.concat(item);
            //console.log(item)
          });
        });
        return values;
      }
      
      function stackMin() {
        var values = extractValues(series);
        return d3.min(values);
      }
      
      function stackMax() {
        var values = extractValues(series);
        return d3.max(values);
      }
      
      var svgContainer = d3.select(this.node)
        .append("svg")
          .attr("width", width)
          .attr("height", height)
          .style("border", "1px solid");
      
      function renderXAxis() {
        var xAxis = d3.axisBottom(xScale);
        
        svgContainer.append("g")
            .classed("x-axis", true).
            attr('stroke','#d4cece')
            .attr("transform", function() {
              return "translate(" + margin + "," + (height - margin) + ")";
            })
            .call(xAxis);
      }
      
      function renderYAxis() {
        var yAxis = d3.axisLeft(yScale);
        
        svgContainer.append("g")
            .classed("y-axis", true).
            attr('stroke','#d4cece')
            .attr("transform", function() {
              return "translate(" + margin + "," + margin + ")";
            })
            .call(yAxis);
        
        svgContainer.selectAll("g.y-axis g.tick")
          .append("line")
            .classed("grid-line", false)
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", axisLength)
            .attr("y2", 0);
      }
      
      renderXAxis();
      renderYAxis();
      
      svgContainer.append("g")
          .classed("stack-bar", true)
          .attr("transform", "translate(" + margin + "," + margin + ")")
        .selectAll("g")
        .data(series)
        .enter()
        .append("g")
          .attr("fill", function(d) {return colorScale(d.key)})
        .selectAll("rect")
        .data(function(d) {return d;})
        .enter()
        .append("rect")
          .attr("x", function(d, i) { return i * 100;})
          .attr("y", function(d) {return yScale(d["1"])})
          .attr("width", 50)
          .attr("height", function(d) {return axisLength - (yScale(d["1"] - d["0"]))})

    } 




  render() {
    return (
      <svg className="App" height = "800px" width = "100%"  ref ={(node)=> {this.node =node}}>
      </svg>
    );
  }
}

export default App;
