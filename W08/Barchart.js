
class BarChart{

    constructor(config, data){
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 128,
            margin: config.margin || {top:10, right:10, bottom:20, left:60},
            title: config.title || '',
            xlabel: config.xlabel || '',
            ylabel: config.ylabel || ''
        }
        this.data = data;
        this.init();
    }

    init(){
        let self = this;

        self.svg = d3.select(self.config.parent)
        .attr('width', self.config.width)
        .attr('height', self.config.height);

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);
        
        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

        //Initialize axis scales
        self.xscale = d3.scaleLinear()
            .domain([0, d3.max(self.data, d => d.w)])
            .range([0, self.inner_width])
        

        self.yscale = d3.scaleBand()
            .domain(self.data.map(d => d.l))
            .range([0, self.inner_height])
            .paddingInner(0.1);
        
        // Initialize axes
        
        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(5)
            .tickSizeOuter(0);

        self.yaxis = d3.axisLeft( self.yscale )
            .tickSizeOuter(0);

        //Draw the axis
        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`)
            .call( self.xaxis );
        
        self.yaxis_group = self.chart.append('g')
            .call( self.yaxis);

        const title_space = 10;
        self.svg.append('text')
            .style('font-size', '20px')
            .style('font-weight', 'bold')
            .attr('text-anchor', 'middle')
            .attr('x', self.config.width / 2)
            .attr('y', self.config.margin.top - title_space)
            .text( self.config.title );

        /*
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
            */

    }

    update(){
        let self = this;

        /*
        const space = 10;
        const xmin = d3.min( self.data, d => d.x ) - space;
        const xmax = d3.max( self.data, d => d.x ) + space;
        self.xscale.domain( [xmin, xmax] );

        const ymin = d3.min( self.data, d => d.y ) - space;
        const ymax = d3.max( self.data, d => d.y ) + space;
        self.yscale.domain( [ymax, ymin] );
        */
        self.render();   
    }

    render(){
        let self = this;

        self.chart.selectAll("rect").data(self.data).enter()
            .append("rect")
            .attr("x", 0)
            .attr("y", d => self.yscale(d.l))
            .attr("width", d => self.xscale(d.w))
            .attr("height", self.yscale.bandwidth());
    }
}