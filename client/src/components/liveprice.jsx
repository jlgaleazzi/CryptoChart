import React from 'react';
import axios from 'axios';
class LivePrice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rate:0,
        };
    
    }
    componentDidMount() {
        // get new price
        axios.get('http://127.0.0.1:3002/currentprice')
        .then((result) => {
            let rate = result.data.bpi.USD.rate
            this.setState(
                    {
                        rate:rate
                    }
                )
        })
        .catch((error) => {
            console.log('there was an error loading da data');
            console.log(error);
        })

    }


    render() {
        return <div>
                <h1>Bitcoin</h1>
                <h2>{this.state.rate}</h2>
              </div>;
    } 
 
}

export default LivePrice;