import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3'
import { TmpDataService } from 'src/app/services/tmp-data.service';

@Component({
  selector: 'app-tree-graph',
  templateUrl: './tree-graph.component.html',
  styleUrls: ['./tree-graph.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TreeGraphComponent implements OnInit {
    initTreeData: any;
    margin = {top: 20, right: 90, bottom: 30, left: 90}
    width = 960 - this.margin.left - this.margin.right;
    height = 500 - this.margin.top - this.margin.bottom;

    svg: any;
    i = 0;
    duration = 750;
    root: any;
    treemap: any;

  constructor(private defaultDataService: TmpDataService) {
    this.initTreeData = this.defaultDataService.getDefaultTreeGraphData();
  }
  ngOnInit(): void {
    this.svg = d3.select("#hierarchy-container").append("svg")
    .attr("width", this.width + this.margin.right + this.margin.left)
    .attr("height", this.height + this.margin.top + this.margin.bottom)
    .append("g")
    .attr("transform", "translate("
          + this.margin.left + "," + this.margin.top + ")");

    this.treemap = d3.tree().size([this.height, this.width]);
    this.root = d3.hierarchy(this.initTreeData, (d: any)  => { return d.children; });
    this.root.x0 = this.height / 2;
    this.root.y0 = 0;

    // Collapse after the second level
    let self = this;
    this.root.children.forEach((item: any) => {
      self.collapse(item);
    });

    this.update(this.root);

  }

  collapse(d: any) {
    if(d.children) {
      d._children = d.children
      let self = this;
      //d._children.forEach(self.collapse)
      d._children.forEach((item: any) => {
        self.collapse(item);
      })
      d.children = null
    }
  }

  update(source: any) {

    // Assigns the x and y position for the nodes
    let treeData = this.treemap(this.root);
  
    // Compute the new tree layout.
    let nodes = treeData.descendants();
    let links = treeData.descendants().slice(1);
  
    // Normalize for fixed-depth.
    nodes.forEach((d: any) => { d.y = d.depth * 180});
  
    // ****************** Nodes section ***************************
  
    // Update the nodes...
    let node: any = this.svg.selectAll('g.node')
        .data(nodes, (d: any) => {return d.id || (d.id = ++this.i); });

    // Toggle children on click.
    let click = (event: any, d: any) => {
    if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
    this.update(d);
  }
  
    // Enter any new modes at the parent's previous position.
    let nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr("transform", (d: any) => {
          return "translate(" + source.y0 + "," + source.x0 + ")";
      })
      .on('click', click);
  
    // Add Circle for the nodes
    nodeEnter.append('circle')
        .attr('class', 'node')
        .attr('r', 1e-6)
        .style("fill", (d: any) => {
            return d._children ? "lightsteelblue" : "#fff";
        });
  
    // Add labels for the nodes
    nodeEnter.append('text')
        .attr("dy", ".35em")
        .attr("x", (d: any) => {
            return d.children || d._children ? -13 : 13;
        })
        .attr("text-anchor", (d: any) => {
            return d.children || d._children ? "end" : "start";
        })
        .text((d: any) => { return d.data.name; });
  
    // UPDATE
    let nodeUpdate = nodeEnter.merge(node);
  
    // Transition to the proper position for the node
    nodeUpdate.transition()
      .duration(this.duration)
      .attr("transform", (d: any) => { 
          return "translate(" + d.y + "," + d.x + ")";
       });
  
    // Update the node attributes and style
    nodeUpdate.select('circle.node')
      .attr('r', 10)
      .style("fill", (d: any) => {
          return d._children ? "lightsteelblue" : "#fff";
      })
      .style("stroke", (d: any) => {
        return ;
    })
      .attr('cursor', 'pointer');
  
  
    // Remove any exiting nodes
    var nodeExit = node.exit().transition()
        .duration(this.duration)
        .attr("transform", (d: any) => {
            return "translate(" + source.y + "," + source.x + ")";
        })
        .remove();
  
    // On exit reduce the node circles size to 0
    nodeExit.select('circle')
      .attr('r', 1e-6);
  
    // On exit reduce the opacity of text labels
    nodeExit.select('text')
      .style('fill-opacity', 1e-6);
  
    // ****************** links section ***************************
  
    // Update the links...
    let link: any = this.svg.selectAll('path.link')
        .data(links, (d: any) => { return d.id; });

      // Creates a curved (diagonal) path from parent to the child nodes
    let diagonal = (s: any, d: any) => {
        let path = `M ${s.y} ${s.x}
                C ${(s.y + d.y) / 2} ${s.x},
                  ${(s.y + d.y) / 2} ${d.x},
                  ${d.y} ${d.x}`
        return path
      }
  
    // Enter any new links at the parent's previous position.
    let linkEnter = link.enter().insert('path', "g")
        .attr("class", "link")
        .attr('d', (d: any) => {
          let o = {x: source.x0, y: source.y0};
          return diagonal(o, o)
        });
  
    // UPDATE
    let linkUpdate = linkEnter.merge(link);
  
    // Transition back to the parent element position
    linkUpdate.transition()
        .duration(this.duration)
        .attr('d', (d: any) => { return diagonal(d, d.parent) });
  
    // Remove any exiting links
    let linkExit = link.exit().transition()
        .duration(this.duration)
        .attr('d', (d: any) => {
          var o = {x: source.x, y: source.y}
          return diagonal(o, o)
        })
        .remove();
  
    // Store the old positions for transition.
    nodes.forEach((d: any) => {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }
}
