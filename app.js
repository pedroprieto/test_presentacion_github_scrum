const express = require('express')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const bodyParser = require('body-parser')
const app = express()
const router = express.Router()

app.set('view engine', 'pug')

router.use(bodyParser.json())

router.use(bodyParser.urlencoded({ extended: true }))
router.use(awsServerlessExpressMiddleware.eventContext())


router.get('/', (req, res) => {
    res.render('index', {
        apiUrl: req.query.data
    })
})

router.get('/hola', (req, res) => {
    res.status(400).send({message: 'hello Benidorm'});
})

router.get('/charlascrum', (req, res) => {
    res.status(200).send({message: 'hello Benidorm'});
})
// The aws-serverless-express library creates a server and listens on a Unix
// Domain Socket for you, so you can remove the usual call to app.listen.
// app.listen(3000)
app.use('/', router)

// Export your express server so you can import it in the lambda function.
module.exports = app
