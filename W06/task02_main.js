
d3.csv("https://212x015x.github.io/InfoVis2021/W04/data.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; });
        
        var options = {
            title: {    
              display: true,
              text: 'サンプルチャート'
            }
          };
          
        var config = {
            parent: '#drawing_region',
            width: 356,
            height: 296,
            margin: {top:50, right:10, bottom:50, left:80}
        };

        const scatter_plot = new ScatterPlot( config, data );
        scatter_plot.update();
    })
    .catch( error => {
        console.log( error );
    });

class ScatterPlot {

    
    constructor( config, data ) {

        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:20, right:20, bottom:20, left:100}
        }
        

        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.tag = d3.select("svg").append("text")
            .attr('transform', `translate(130, 20)`)
            .text("Scatter Plot")
            .style("font-size","20px")
            .style("font-weight","bold");


        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height);

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

        self.xscale = d3.scaleLinear()
            .range( [0, self.inner_width] );

        self.yscale = d3.scaleLinear()
            .range( [self.inner_height ,0] );

        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(6);

        self.yaxis = d3.axisLeft( self.yscale )
            .ticks(6);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height + 10})`);
        
        self.yaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_weight  + 10})` );
        
        self.xlabel = d3.select("svg")
            .append("text")
            .attr('transform', `translate(200, ${self.inner_height + 100})`)
            .text("xlabel")

        self.ylabel = d3.select("svg")
            .append("text")
            .attr('transform', 'translate(5, 150)')
            .text("ylabel");


    
    }

    update() {
        let self = this;

        const xmin = d3.min( self.data, d => d.x );
        const xmax = d3.max( self.data, d => d.x );
        self.xscale.domain( [xmin, xmax] );

        const ymin = d3.min( self.data, d => d.y );
        const ymax = d3.max( self.data, d => d.y );
        self.yscale.domain( [ymin, ymax] );

        self.render();
    }

    render() {
        let self = this;

        self.chart.selectAll("circle")
            .data(self.data)
            .enter()
            .append("circle")
            .attr("cx", d => self.xscale( d.x ) )
            .attr("cy", d => self.yscale( d.y ) )
            .attr("r", d => d.r );

        self.xaxis_group
            .call( self.xaxis );
        
        self.yaxis_group
            .call( self.yaxis );

}