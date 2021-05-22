d3.csv("https://212x015x.github.io/InfoVis2021/W04/data.csv")
    .then( data => {
        data.forEach( d => { d.x = + d.x; d.y = + d.y; d.r = + d.r; });
        
        console.log(data)

        var config = {
            parent: '#drawing_region',
            botton: '#reverse',
            width: 256,
            height: 256,
            margin: {top:50, right:10, bottom:20, left:60},
            title: 'Value Data',
            xlabel: 'X label',
            ylabel: 'Y label'
        };

        const scatterplot = new ScatterPlot( config, data );
        scatterplot.update();
        

    })
    .catch( error => {
        console.log( error );
    });
