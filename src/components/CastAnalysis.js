
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import gujaratTopojson from './gujarat.json';

const GujaratMap = () => {
        const svgRef = useRef(null);

        useEffect(() => {
                const svg = d3.select(svgRef.current);

                // Convert topojson to geojson
                const gujaratGeojson = topojson.feature(gujaratTopojson, gujaratTopojson.objects.districts);

                // Set up projection and path generator
                const width  = 500; // Assuming a width for the map
                const height = 500; // Assuming a height for the map
                const projection = d3.geoMercator().fitSize([width, height], gujaratGeojson);
                const pathGenerator = d3.geoPath().projection(projection);

                // Plot the map
                svg
                        .selectAll('path')
                        .data(gujaratGeojson.features)
                        .enter()
                        .append('path')
                        .attr('d', pathGenerator)
                        .attr('fill', 'white')
                        .attr('stroke', 'steelblue')
                        .attr('stroke-width', '1')
                        .on('mouseover', (event, d) => {
                            // Show text label on hover
                            d3.select(event.target).attr('fill', 'pink')
                          })
                          .on('mouseout', (event, d) => {
                            // Hide text label when not hovering
                            d3.select(event.target).attr('fill', 'white')
                          })
                        ;

        }, []);

        return (
                <svg
                    ref={svgRef}
                    width="100%"
                    height="100%"
                    viewBox={`0 0 500 500`} // Adjust viewBox as per your map dimensions
                ></svg>
            );
        
};

export default GujaratMap;
