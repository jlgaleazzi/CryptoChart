import React from 'react';
import axios from 'axios';
import Chart from 'chart.js';

class BChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: this.getDate(),
            data:{},
        }
    }
    componentDidMount() {
        axios.get('http://127.0.0.1:3002/historical', {
            params: {
                index:'USD',
                start:'2019-11-01',
                end: "2019-11-08",
            }
        })
        .then((result) => {
            // TODO , do somethiing with data
            console.log('result '+JSON.stringify(result.data));
        })
        .catch((error) => {
            console.log('there was an error loading da data');
            console.log('irrore :'+error);
        })
       this.drawChart(); 

    }
    
    getDate() {
        return "2019-11-01"
    }

    drawChart(data) {
        let canvas = this.refs.canvas;
        let ctx = canvas.getContext('2d');
        let myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [
                    'Red',
                    'Blue',
                    'Yellow', 
                    'Green',
                    'Purple',
                    'Orange'
                ],
                datasets:[{
                    label: '# of something',
                    data:[12,19,3,5,2,3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                 }
            }
        })
    }

    render() {
        return <div>
                <canvas ref="canvas" width="640" height="480"></canvas>   
            </div>

    }
}

export default BChart;