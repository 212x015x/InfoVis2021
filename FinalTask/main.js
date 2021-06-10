let input_data;
let sui_data;
let line_plot;
let sui_chart;
let filter = [];

d3.csv("https://212x015x.github.io/InfoVis2021/FinalTask/DP_LIVE_Tax_rate.csv")
    .then( data => {
        input_data = data;
        input_data.forEach( d => {
            d.l = d.LOCATION;
            d.i = d.INDICATOR;
            d.s = d.SUBJECT;
            d.m = d.MEASURE;
            d.f = d.FREQUENCY;
            d.x = +d.TIME;
            d.y = +d.Value;
            d.fr = d.Flag;
        });

        const color_scale = d3.scaleOrdinal( d3.schemeCategory10 );
        color_scale.domain(['setosa','versicolor','virginica']);

        line_plot = new LineChart( {
            parent: '#drawing_region_linechart',
            width: 900,
            height: 900,
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

d3.csv("https://212x015x.github.io/InfoVis2021/FinalTask/DP_LIVE_Suicide.csv")
    .then( data => {
        sui_data = data;
        sui_data.forEach( d => {
            d.l = d.LOCATION;
            d.i = d.INDICATOR;
            d.s = d.SUBJECT;
            d.m = d.MEASURE;
            d.f = d.FREQUENCY;
            d.x = +d.TIME;
            d.y = +d.Value;
            d.fr = d.Flag;
        });

        const color_scale = d3.scaleOrdinal( d3.schemeCategory10 );
        color_scale.domain(['setosa','versicolor','virginica']);

        sui_plot = new LineChart( {
            parent: '#drawing_region_sui_plot',
            width: 900,
            height: 900,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: 'Year',
            ylabel: 'Suicide',
            cscale: color_scale
        }, sui_data );
        sui_plot.update();
    })
    .catch( error => {
        console.log( error );
    });

function Filter() {
    if ( filter.length == 0 ) {
        sui_plot.data = sui_data;
        line_plot.data = input_data;
    }
    else {
        sui_plot.data = sui_data.filter( d => filter.includes( d.l ) );
        line_plot.data = input_data.filter( d => filter.includes( d.l ) );

        console.log("what")
        console.log(sui_plot.data)
    }
    sui_plot.update();
    line_plot.update();
}
