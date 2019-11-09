import React from 'react';
import axios from 'axios';
import Chart from 'chart.js';
import moment from 'moment';

class BChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start: moment().subtract(1,'week').format('YYYY-MM-DD'),
            chartData:{},
            end: moment().format('YYYY-MM-DD'),
            selectedButton:'btn_1',
            chart:null 
        }
        this.rangeButtonClicked = this.rangeButtonClicked.bind(this);
    }
    componentDidMount() {
         console.log('componentDidMount')
        this.getDataFromAPI();

    }

    getDataFromAPI(){

        let params = {
            index:'USD',
            start:this.state.start,
            end: this.state.end,
        };

        axios.get('http://127.0.0.1:3002/historical', {
            params: params
        })
        .then((result) => {
            // TODO , do something with data
            this.parseData(result.data);
        })
        .catch((error) => {
            console.log('there was an error loading da data');
            console.log('irrore :'+error);
        })
       // this.drawChart(data); 

    }

    parseData(rawData) {
        let data = [];
        let bpi = rawData.bpi;
        for (let key in bpi) {
            let dateString = key;
            let date = new Date(dateString)
            data.push({t:date.valueOf(),y:bpi[key]})

        }
        this.setState({chartData:data});
        if (this.state.chart === null) {
            this.drawChart(this.state.chartData);
        } else {
            this.state.chart.destroy();
            this.drawChart(this.state.chartData);
        }
        
    }
    
   
    
    rangeButtonClicked(event) {
       
        let btn = event.target.id;
        this.setState({
            selectedButton:btn
        })
        switch (btn) {
            case 'btn_1':
                // one week range
                this.setState({
                  start: moment().subtract(1,'week').format('YYYY-MM-DD')
                })
                break;
            case 'btn_2':
                // one month range
                this.setState({
                    start: moment().subtract(1,'month').format('YYYY-MM-DD')
                  })
                break;
            case 'btn_3':
                // three months range
                this.setState({
                    start: moment().subtract(3,'month').format('YYYY-MM-DD')
                  })
                 break;
            case 'btn_4':
                // six months range
                this.setState({
                    start: moment().subtract(6,'month').format('YYYY-MM-DD')
                  })
                 break;
            case 'btn_5':
                // year to date range
                this.setState({
                    start: moment().startOf('year').format('YYYY-MM-DD')
                  })
                 break;
            case 'btn_6':
                // one year range
                this.setState({
                    start: moment().subtract(1,'year').format('YYYY-MM-DD')
                  })
                 break;
            case 'btn_7':
                // two years range
                this.setState({
                    start: moment().subtract(2,'year').format('YYYY-MM-DD')
                  })
                  break;
        }
        this.getDataFromAPI();
    }
    

    drawChart(chartData) {
        let canvas = this.refs.canvas;
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let myChart = new Chart(ctx, {
            type: 'line',
            data: {
               
                datasets:[{
                    label: 'Bitcoin Historical Prices',
                    backgroundColor: '#000000',
                    data:chartData,
                    borderColor:'#00FF00',
                    type: 'line',
                    pointRadius: 0,
                    fill: false,
                    lineTension: 0,   
                    borderWidth: 2
                }]
            },
            options: {
                legend:{
                    display:false,
                },
                animation: {
                    duration:0
                },
                scales: {
                    xAxes: [{
                        type:'time',
                        distribution:'series',
                        offset: true,
                        ticks: {
                            major: {
                                enabled:true,
                                fontStyle:'bold',
                                fontColor:'#FFFFFF'
                            },
                            fontColor:'#FFFFFF',
                            source: 'data',
                            autoSkip: true,
                            autoSkipPadding: 75,
                            maxRotation: 0,
                            sampleSixe:100
                        },
                        afterBuildTicks: (scale,ticks) => {
                            var majorUnit = scale._majorUnit;
                            var firstTick = ticks[0];
                            var i, ilen, val, tick, currMajor, lastMajor;

                            val = moment(ticks[0].value);
                            if ((majorUnit === 'minute' && val.second() === 0)
                                    || (majorUnit === 'hour' && val.minute() === 0)
                                    || (majorUnit === 'day' && val.hour() === 9)
                                    || (majorUnit === 'month' && val.date() <=3 && val.isoWeekday() === 1)
                                    || (majorUnit === 'year' && val.month() === 0)) {
                                        firstTick.major = true;
                                    } else {
                                        firstTick.major = false;
                                    }
                                    lastMajor = val.get(majorUnit);

                                    for (i = 1, ilen=ticks.length;i< ilen;i++) {
                                        tick = ticks[i];
                                        val = moment(tick.value);
                                        currMajor = val.get(majorUnit);
                                        tick.major = currMajor !== lastMajor;
                                        lastMajor = currMajor;
                                    }
                                    return ticks;

                        }

                    }],
                    yAxes: [{
                        ticks: {
                            fontColor:"#FFFFFF",
                        },
                        gridLines: {
                            drawBorder:false,
                           
                        },
                        scaleLabel: {
                            fontColor:"#FFFFFF",
                            display:true,
                            labelString: 'Closing Price ($)'
                        }
                    }]
                 },
                 tooltips: {
                     intersect: false,
                     mode: 'index',
                     callbacks: {
                         label: (tooltipItem,myData) => {
                             var label = myData.datasets[tooltipItem.datasetIndex].label || '';
                             if (label) {
                                 label += ': ';
                             }
                             label += parseFloat(tooltipItem.value).toFixed(2);
                             return label;
                         }
                     }
                 }

            }
        })
       this.setState({chart:myChart});
    }

    render() {
        return <div className='chartContainer'>
                <div className='buttonContainer'>
                    <button id='btn_1' onClick={this.rangeButtonClicked}>1W</button>
                    <button id='btn_2' onClick={this.rangeButtonClicked}>1M</button>
                    <button id='btn_3' onClick={this.rangeButtonClicked}>3M</button>
                    <button id='btn_4' onClick={this.rangeButtonClicked}>6M</button>
                    <button id='btn_5' onClick={this.rangeButtonClicked}>YTD</button>
                    <button id='btn_6' onClick={this.rangeButtonClicked}>1Y</button>
                    <button id='btn_7' onClick={this.rangeButtonClicked}>2Y</button>
                </div>
                <div className='chart'>
                    <canvas ref="canvas"></canvas>   
                </div>
            </div>

    }
}

export default BChart;