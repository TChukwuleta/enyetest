const express = require('express')
const request = require('request')
const app = express()
 
app.get('/api/rates', (req, res) => { 
    const base = req.query.base
    const currency = req.query.currency

    const url = 'https://api.exchangeratesapi.io/latest?base=' + base 
    request({url: url, json: true}, (err, response, body) => {
        if (!err && response.statusCode === 200) {
            const basee = body.base
            const datee = body.date
            //const ratee = body.rates
            let bodee = {
                "results": {
                    base: basee,
                    date: datee,
                    rates: body.rates
                }
            }
            console.log(bodee)
            res.json(bodee)
        }
        else {
            res.json(err)
        }
    })
})

const port = process.env.PORT || 2000
app.listen(port, () => {
    console.log('omo eh')
})