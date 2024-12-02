import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Tooltip = ({ data, color, position }) => {
  const ref = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const width = 300;
    const height = 150;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    d3.select(ref.current).selectAll("*").remove();

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height);

    const x_scale = d3
      .scaleBand()
      .domain(data.map((d) => d.month))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y_scale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x_scale(d.month))
      .attr("y", (d) => y_scale(d.value))
      .attr("width", x_scale.bandwidth())
      .attr("height", (d) => y_scale(0) - y_scale(d.value))
      .attr("fill", color);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x_scale).tickSizeOuter(0));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y_scale).ticks(5));
  }, [data, color]);

  return (
    <div
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        pointerEvents: "none",
        background: "lightgray",
        border: "1px solid lightgray",
        borderRadius: "4px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        padding: "10px",
        transform: "translate(-50%, 0px)",
        zIndex: 1000,
      }}
    >
      <svg ref={ref}></svg>
    </div>
  );
};

export default Tooltip;