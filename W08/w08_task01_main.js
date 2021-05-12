d3.csv("https://212x015x.github.io/InfoVis2021/W08/task01_data.csv")
    .then( data => {
        data.forEach( d => { d.l = + d.l; d.w = + d.w; });
        data.forEach(function (l) {
            console.log(data.l)
        })

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
            margin: {top:50, right:10, bottom:20, left:60},
            title: 'Sample Data',
            xlabel: 'X label',
            ylabel: 'Y label'
        };

        const barchart = new BarChart( config, data );
        barchart.update();
    })
    .catch( error => {
        console.log( error );
    });
