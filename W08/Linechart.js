class LineChart{

    constructor(config, data){
        this.config = {
            parent: config.parent,
            width: config.width || 356,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:30, left:60},
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
            .domain([0, d3.max(self.data, d => d.x)])
            .range([0, self.inner_width])
        

        self.yscale = d3.scaleLinear()
            .domain(0, d3.max(self.data, d => d.y))
            .range([0 , self.inner_height])
    
        
        // Initialize axes
        
        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(5)
            

        self.yaxis = d3.axisLeft( self.yscale )
            .ticks(5)
            

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
        

        self.line = d3.line()
            .x( d => self.config.margin.left + self.xscale(d.x) )
            .y( d => self.config.margin.top + self.yscale(d.y) );

    }

    update(){
        let self = this;

        
        const space = 10;
        const xmin = d3.min( self.data, d => d.x ) - space;
        const xmax = d3.max( self.data, d => d.x ) + space;
        self.xscale.domain( [xmin, xmax] );

        const ymin = d3.min( self.data, d => d.y ) - space;
        const ymax = d3.max( self.data, d => d.y ) + space;
        self.yscale.domain( [ymax, ymin] );
        
        self.render();   
    }

    render(){
        let self = this;
                          
        self.svg.append('path')
            .attr('d', self.line(self.data))
            .attr('stroke', 'black')
            .attr('fill', 'none');
        
        self.xaxis_group
            .call( self.xaxis );
        
        self.yaxis_group
            .call( self.yaxis );
    }

}
