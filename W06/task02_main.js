
d3.csv("https://212x015x.github.io/InfoVis2021/W04/data.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; d.r = +d.r});
        
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