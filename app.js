const express = require('express')
const request = require('request')
const app = express()
 
app.get('/', (req, res) => {
    res.status(200).send('Cheers to the amazing team at Enye')
})
app.get('/api/rates', (req, res) => { 
    const base = req.query.base
    const {currency} = req.query;

    const url = 'https://api.exchangeratesapi.io/latest?base=' + base 
    request({url: url, json: true}, (err, response, body) => {
      const currencies = currency.split(",");
        if (!err && response.statusCode === 200) {
            const basee = body.base
            const datee = body.date
            //const ratee = body.rates
            const customRates = {}
            for (let c of currencies){
              customRates[c] = body.rates[c];
            }
            let bodee = {
                "results": {
                    base: basee,
                    date: datee,
                    rates: customRates
                } 
            }
            //console.log(bodee);
            res.status(200).json(bodee)
        }
        else {
            res.status(400).json(err)
        }
    })
})

const port = process.env.PORT || 2000
app.listen(port, () => {
    console.log('omo eh')
})