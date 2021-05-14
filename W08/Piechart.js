class PieChart{

    constructor(config, data){
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:30, right:10, bottom:20, left:30},
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
        .attr('height', self.config.height)
        .append('g');

        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;
        self.radius = Math.min(self.inner_width, self.inner_height) / 2;
        
        
        const title_space = 10;
        self.svg.append('text')
            .style('font-size', '20px')
            .style('font-weight', 'bold')
            .attr('text-anchor', 'middle')
            .attr('x', self.config.margin.left)
            .attr('y', self.config.margin.top - title_space)
            .text( self.config.title );
        

        self.pie = d3.pie()
            .value( d => d.w);

        self.arc = d3.arc()
            .innerRadius(0)
            .outerRadius(self.radius);
        
        self.text = d3.arc()
            .innerRadius(50)
            .outerRadius(self.radius - 40 );
        

    }

    update(){
        let self = this;

        self.render();   
    }

    render(){
        let self = this;
                          
        self.svg.selectAll('pie')
            .data( self.pie(self.data) )
            .enter()
            .append('path')
            .attr('transform', `translate(${self.config.width/2 }, ${self.config.height/2 + 20 })`)
            .attr('d', self.arc)
            .attr('fill', 'pink')
            .attr('stroke', 'white')
            .style('stroke-width', '2px');
        
        self.svg.selectAll('pie')
            .data(self.pie(self.data)).enter()
            .append('text')
            //.attr('transform', `translate(${self.config.width/2 }, ${self.config.height/2 + 20 })`)
            .attr('x',self.inner_width/2)
            .attr('y',self.inner_height/2 + self.config.margin.top)
            .attr("transform", function(d) { return "translate(" + self.text.centroid(d) + ")"; })
            .attr("font", "20px")
            .attr('fill', 'black')
            .text(d => d.data.l);
            
            
        
        self.tes = self.pie(self.data)
        console.log(self.data)
        
    }

}
