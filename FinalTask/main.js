let input_data;
let scatter_plot;
let bar_chart;
let filter = [];

d3.csv("https://212x015x.github.io/InfoVis2021/FinalTask/DP_LIVE_tax.csv")
    .then( data => {
        input_data = data;
        input_data.forEach( d => {
            d.l = +d.LOCATION;
            d.t = +d.TIME;
            d.v = +d.Value;
        });

        const color_scale = d3.scaleOrdinal( d3.schemeCategory10 );
        color_scale.domain(['setosa','versicolor','virginica']);

        line_plot = new LineChart( {
            parent: '#drawing_region_linechart',
            width: 1024,
            height: 1024,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: 'Year',
            ylabel: 'Social security contributions',
            cscale: color_scale
        }, input_data );
        line_plot.update();
    })
    .catch( error => {
        console.log( error );
    });

d3.csv("https://212x015x.github.io/InfoVis2021/FinalTask/DP_LIVE_01062021063129849.csv")
    .then( data => {
        input_data = data;
        input_data.forEach( d => {
            d.l = +d.LOCATION;
            d.t = +d.TIME;
            d.v = +d.Value;
        });

        const color_scale = d3.scaleOrdinal( d3.schemeCategory10 );
        color_scale.domain(['setosa','versicolor','virginica']);

        sui_plot = new LineChart( {
            parent: '#drawing_region_sui_plot',
            width: 1024,
            height: 1024,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: 'Year',
            ylabel: 'Social security contributions',
            cscale: color_scale
        }, input_data );
        sui_plot.update();
    })
    .catch( error => {
        console.log( error );
    });

function Filter() {
    if ( filter.length == 0 ) {
        scatter_plot.data = input_data;
    }
    else {
        scatter_plot.data = input_data.filter( d => filter.includes( d.species ) );
    }
    scatter_plot.update();
}
