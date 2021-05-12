class LineChart{

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

        const title_space = 10;
        self.svg.append('text')
            .style('font-size', '20px')
            .style('font-weight', 'bold')
            .attr('text-anchor', 'middle')
            .attr('x', self.config.width / 2)
            .attr('y', self.config.margin.top - title_space)
            .text( self.config.title );

    
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
            .attr('d',line(self.data))
            .attr('stroke', 'block')
            .attr('fill', 'none');
    }

}
