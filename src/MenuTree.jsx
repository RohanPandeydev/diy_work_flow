import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ProjectStructureTree = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data) return;

    // Use the data directly as it's already in a hierarchical structure
    const hierarchyData = d3.hierarchy(data);

    // Store original children in _children for toggling
    hierarchyData.descendants().forEach(d => {
      if (d.children) {
        d._children = d.children;
      }
    });

    const renderTree = (source) => {
      const width = 1200;
      const dx = 35; // Increase node spacing vertically
      const dy = 250; // Increase node spacing horizontally
      const tree = d3.tree().nodeSize([dx, dy]);
      const root = tree(hierarchyData);

      let x0 = Infinity;
      let x1 = -x0;
      root.each(d => {
        if (d.x > x1) x1 = d.x;
        if (d.x < x0) x0 = d.x;
      });

      const svg = d3.select(svgRef.current)
        .attr("viewBox", [0, 0, width, x1 - x0 + dx * 2])
        .style("font", "14px Arial, sans-serif")
        .style("user-select", "none");

      svg.selectAll("*").remove();

      const g = svg.append("g")
        .attr("transform", `translate(60,${dx - x0})`);

      // Create a color scale based on the "access" property and human allocation
      const colorScale = d => {
        // Access-based coloring
        if (d.data.access === "public") return "#4CAF50"; // Green for public
        if (d.data.access === "restricted") return "#FF5722"; // Orange for restricted
        
        // Human allocation-based coloring
        if (d.data.name && d.data.name.includes("Human")) {
          return "#2196F3"; // Blue for human resources
        }
        
        // Default colors based on depth
        const depthColors = ["#9C27B0", "#3F51B5", "#009688", "#FFC107", "#795548", "#607D8B"];
        return depthColors[d.depth % depthColors.length];
      };

      // Add links between nodes
      g.append("g")
        .attr("fill", "none")
        .attr("stroke-opacity", 0.6)
        .attr("stroke-width", 2)
        .selectAll("path")
        .data(root.links())
        .join("path")
        .attr("d", d3.linkHorizontal()
          .x(d => d.y)
          .y(d => d.x))
        .attr("stroke", d => colorScale(d.source));

      // Create node groups
      const node = g.append("g")
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
        .selectAll("g")
        .data(root.descendants())
        .join("g")
        .attr("transform", d => `translate(${d.y},${d.x})`)
        .on("click", function (event, d) {
          // Toggle children on click
          if (d.children) {
            d._children = d.children;
            d.children = null;
          } else {
            d.children = d._children;
            d._children = null;
          }
          renderTree(d); // Re-render from clicked node
        });

      // Add shadows for better visibility
      const defs = svg.append("defs");
      defs.append("filter")
        .attr("id", "dropShadow")
        .append("feDropShadow")
        .attr("dx", "0")
        .attr("dy", "0")
        .attr("stdDeviation", "1");

      // Add node circles
      node.append("circle")
        .attr("fill", colorScale)
        .attr("r", d => {
          // Size based on importance or human allocation
          if (d.data.name && d.data.name.includes("Human")) return 10;
          if (d.depth === 0) return 12; // Root node
          if (d.depth === 1) return 10; // Top level nodes
          return 7; // Other nodes
        })
        .attr("filter", "url(#dropShadow)");

      // Add node labels
      node.append("text")
        .attr("dy", "0.31em")
        .attr("x", d => d.children ? -12 : 12)
        .attr("text-anchor", d => d.children ? "end" : "start")
        .text(d => d.data.name)
        .style("font-weight", d => {
          // Bold for important nodes
          if (d.depth < 2 || (d.data.name && d.data.name.includes("Human"))) return "bold";
          return "normal";
        })
        .style("fill", "#333")
        .clone(true).lower()
        .attr("stroke", "white")
        .attr("stroke-width", 3);

      // Add additional info (estimate, note, etc.)
      node.each(function(d) {
        const nodeG = d3.select(this);
        
        // Display estimate if available
        if (d.data.estimate) {
          nodeG.append("text")
            .attr("dy", "1.5em")
            .attr("x", d.children ? -12 : 12)
            .attr("text-anchor", d.children ? "end" : "start")
            .text(`Est: ${d.data.estimate}`)
            .style("font-size", "12px")
            .style("fill", "#666");
        }
        
        // Display note if available
        if (d.data.note) {
          nodeG.append("text")
            .attr("dy", d.data.estimate ? "2.7em" : "1.5em")
            .attr("x", d.children ? -12 : 12)
            .attr("text-anchor", d.children ? "end" : "start")
            .text(`Note: ${d.data.note}`)
            .style("font-size", "12px")
            .style("fill", "#666");
        }
        
        // Display access level if available
        if (d.data.access) {
          const yPos = d.data.estimate ? (d.data.note ? "3.9em" : "2.7em") : (d.data.note ? "2.7em" : "1.5em");
          nodeG.append("text")
            .attr("dy", yPos)
            .attr("x", d.children ? -12 : 12)
            .attr("text-anchor", d.children ? "end" : "start")
            .text(`Access: ${d.data.access}`)
            .style("font-size", "12px")
            .style("fill", d.data.access === "public" ? "#4CAF50" : "#FF5722");
        }
      });
    };

    renderTree(hierarchyData);

  }, [data]);

  return (
    <div className="w-full overflow-auto">
      <svg ref={svgRef} width="100%" height="800"></svg>
    </div>
  );
};

export default ProjectStructureTree;