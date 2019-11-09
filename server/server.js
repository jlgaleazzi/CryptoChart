const express = require('express');
const app = express()
const port = '3002';
const cors = require('cors')
const axios = require('axios');
const coindesk = 'https://api.coindesk.com/v1/bpi/'

app.use(cors());
app.listen(port, () => console.log(`Server listening on port ${port}!`));

app.get('/currentprice', (req,res) => {
    // get current price from coindesk
    axios.get(`${coindesk}currentprice.json`)
    .then((result) => {
        res.send(result.data)
    })
    .catch((error) => {
        console.log(error)
    })

})

app.get('/historical', (req,res) => {
    // get historical prices from coindesk
    var params = req.query;

    console.log(JSON.stringify(params));
   
    axios.get(`${coindesk}historical/close.json`, {
        params: {
        index:params.index,
        start:params.start,
        end:params.end
        }
    })
    .then((result) => {
        console.log(result.data);
        res.send(result.data)
    })
    .catch((err) => {
        console.log(error);
    })
})
