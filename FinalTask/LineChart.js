class LineChart {
    constructor (config, data) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:10},
            title: config.title || '',
            xlabel: config.xlabel || '',
            ylabel: config.ylabel || ''
        };
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.svg = d3.select(self.config.parent)
            .attr('width', self.config.width)
            .attr('height', self.config.height);

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

        self.xscale = d3.scaleLinear()
            .range([0, self.inner_width]);

        self.yscale = d3.scaleLinear()
            .range([0, self.inner_height]);

        self.xaxis = d3.axisBottom(self.xscale)
            .ticks(5)
            .tickSizeOuter(0);

        self.yaxis = d3.axisLeft(self.yscale)
            .ticks(5)
            .tickSizeOuter(0);

        const xlabel_space = 40;
        self.svg.append('text')
            .attr('x', self.config.width / 2)
            .attr('y', self.inner_height + self.config.margin.top + xlabel_space)
            .text( self.config.xlabel );

        const ylabel_space = 50;
        self.svg.append('text')
            .attr('transform', `rotate(-90)`)
            .attr('y', self.config.margin.left - ylabel_space)
            .attr('x', -(self.config.height / 2))
            .attr('text-anchor', 'middle')
            .attr('dy', '1em')
            .text( self.config.ylabel );
    }

    update() {
        let self = this;

        self.chart.remove();
        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);
        
        
        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`);

        self.yaxis_group = self.chart.append('g');

        self.nested = d3.nest().key(d => d.l)
            .entries(self.data);
    
        console.log(self.nested)


        const space = 5;
        const xmin = d3.min(self.data, d => d.x) - space;
        const xmax = d3.max(self.data, d => d.x) + space;
        self.xscale.domain([xmin, xmax]);

        const ymin = d3.min(self.data, d => d.y) - space;
        const ymax = d3.max(self.data, d => d.y) + space;
        self.yscale.domain([ymax, ymin]);

        self.line = d3.line()
            .x( d => self.xscale(d.x) )
            .y( d => self.yscale(d.y) );

        self.render();
    }

    render() {
        let self = this;
        
        const line_width = 3;
        const line_color = 'firebrick';
        self.chart.selectAll('line')
            .data(self.nested)
            .enter()
            .append("path")
            .transition().duration(self.config.duration)
            .attr('d', d => self.line(d.values))
            .attr('stroke', line_color)
            .attr('stroke-width', line_width)
            .attr('fill', 'none');

        const circle_radius = 3;
        const circle_color = 'red';
        self.chart.selectAll("circle")
            .data(self.data)
            .enter()
            .append("circle")
            .attr('cx', self.line.x())
            .attr('cy', self.line.y())
            .attr('r', circle_radius)
            .attr('fill', circle_color)
            .on('mouseover', (e,d) => {
                d3.select('#tooltip')
                    .style('opacity', 1)
                    .html(`<div class="tooltip-label">${d.l}</div>(${d.x}, ${d.y})`);
            })
            .on('mousemove', (e) => {
                const padding = 10;
                d3.select('#tooltip')
                    .style('left', (e.pageX + padding) + 'px')
                    .style('top', (e.pageY + padding) + 'px');
            })
            .on('mouseleave', () => {
                d3.select('#tooltip')
                    .style('opacity', 0);
            })
            .on('click', function(ev,d) {
                const is_active = filter.includes(d.l);
                if ( is_active ) {
                    filter = filter.filter( f => f !== d.l );
                }
                else {
                    filter.push( d.l );
                }
                Filter();
                d3.select(this).classed('active', !is_active);
            });

        self.xaxis_group.call(self.xaxis);
        self.yaxis_group.call(self.yaxis);
    }
}
