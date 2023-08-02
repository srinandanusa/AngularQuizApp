import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Sankey from 'd3-sankey';
import d3Tip from 'd3-tip';
import * as sankeyData from '../assets/data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.generateSankeyChart();
  }
  title = 'SankeySample1';

  generateSankeyChart() {
    // Set up the chart dimensions
    const width = 1000;
    const height = 650;

    // Define the colors for nodes and links
    const nodeColors = [
      '#69b3a2',
      '#e15759',
      '#f28e2c',
      '#4e79a7',
      '#76b7b2',
      '#59a14f',
    ];
    const linkColors = [
      '#69b3a2',
      '#e15759',
      '#f28e2c',
      '#4e79a7',
      '#76b7b2',
      '#59a14f',
    ];
    // Defines a color scale.
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Create the SVG container
    const svg = d3.select('svg').attr('width', width).attr('height', height);

    // Create the Sankey generator
    const sankey = d3Sankey
      .sankey()
      .nodeWidth(90)
      .nodePadding(50)
      .nodeAlign(d3Sankey.sankeyLeft)
      .extent([
        [1, 1],
        [width, height],
      ]);

    // Generate the Sankey diagram
    const { nodes, links } = sankey(sankeyData);

    const tip = d3Tip();

    tip.attr('class', 'd3-tip').html((d) => {
      return `<strong>Value:</strong> <span style="color:red">` + d + '</span>';
    });

    svg.call(tip);

    // Render the links
    const link = svg
      .append('g')
      .attr('fill', 'none')
      .selectAll('path')
      .data(links)
      .enter()
      .filter((l: any) => l.target.name.toLowerCase() !== 'dropout')
      .append('path')
      .attr('d', d3Sankey.sankeyLinkHorizontal())
      .attr('class', 'link')
      .attr('stroke', (d, i) => linkColors[i % linkColors.length])
      .attr('stroke-width', (d) => d.value * 8)
      .attr('stroke-opacity', 0.5)
      .on('mouseover', (d) => tip.show(d.target.__data__.value))
      .on('mouseout', (d) => tip.hide(d.value));

    // Add text to the links
    // const linkText = svg
    //   .append('g')
    //   .attr('fill', 'black')
    //   .selectAll('text')
    //   .data(links)
    //   .join('text')
    //   .attr('dy', '0.35em') // Set the vertical alignment of the text
    //   .attr('text-anchor', 'center') // Set the text anchor position to the middle
    //   .text((d) => d.source.name); // Set the text content of the link

    // Use textPath to bind the text to the link
    // linkText
    //   .append('textPath')
    //   .attr('xlink:href', (d, i) => `#link-${i}`) // Use the link's ID as the reference for textPath
    //   .text((d) => 'value is ' + d.value); // Set the text content of the link

    // // Update the link's ID to be used by textPath
    // link.attr('id', (d, i) => `link-${i}`);

    // Render the nodes
    const nodeGroup = svg
      .append('g')
      .selectAll('g')
      .data(nodes)
      .enter()
      .filter((l: any) => l.name.toLowerCase() !== 'dropout')
      .append('g')
      .attr('transform', (d) => `translate(${d.x0},0)`);

    nodeGroup
      .append('rect')
      .attr('height', 550)
      .attr('width', (d) => d.x1 - d.x0)
      .attr('fill', (d, i) => nodeColors[i % nodeColors.length]);

    // nodeGroup.append('text')
    // .attr('x', (d) => (d.x1 - d.x0) / 2)
    // .attr('y', 250)
    // .attr('dy', '0.5em') // Adjust vertical alignment if needed
    // .attr('text-anchor', 'middle') // Center the text horizontally
    // .text((d) => d.name); // Use the node name as the text content

    nodeGroup
      .append('foreignObject')
      .attr('width', (d) => d.x1 - d.x0)
      .attr('height', 500)
      .append('xhtml:div')
      .style('width', '100%')
      .style('height', '100%')
      .style('display', 'flex')
      .style('align-items', 'center')
      .style('justify-content', 'center')
      .style('overflow-wrap', 'break-word')
      .html((d) => d.name);

      const circleRadius = 15;
      nodeGroup.append('circle')
        .attr('cx', 25)
        .attr('cy', (d) => (d.y1 - d.y0) / 2)
        .attr('r', circleRadius)
        .style('fill', (d, i) => nodeColors[i % nodeColors.length]);

    
    

    // const dropLink = svg
    //   .append('g')
    //   .selectAll('.link')
    //   .data(links)
    //   .enter()
    //   .filter((l: any) => l.target.name.toLowerCase() === 'dropout')
    //   .append('rect')
    //   .attr('x', (d: any) => d.source.x1)
    //   .attr('y', (d: any) => d.source.y1 - 20)

    //   .attr('height', (d: any) => d.value * 10)
    //   .attr('width', (d: any) => sankey.nodeWidth() - 80)
    //   .attr('fill', (d, i) => linkColors[i % linkColors.length])
    //   .attr('class', 'dropout-node');
    // dropLink
    //   .append('title')
    //   .text((d: any) => d.source.name + '\n' + 'Dropouts ' + d.value);
  }
}
