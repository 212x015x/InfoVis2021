d3.csv("https://212x015x.github.io/InfoVis2021/W08/task02_data.csv")
    .then( data => {
        data.forEach( d => { d.x = + d.x; d.y = + d.y; });
        
        console.log(data)

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
            margin: {top:50, right:10, bottom:20, left:60},
            title: 'Value Data',
            xlabel: 'X label',
            ylabel: 'Y label'
        };

        const linechart = new LineChart( config, data );
        linechart.update();
    })
    .catch( error => {
        console.log( error );
    });
