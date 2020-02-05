const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit=require('@pusher/chatkit-server')
const app = express()
const chatkit=new Chatkit.default({
  
  instanceLocator: 'v1:us1:b61a63ab-2a30-4a4e-b25e-02af5d77ca04',
  key:'9749cdd0-cc02-4730-a1a1-746943c5d427:Lg01S2Bg03B+5DZxs/FCyJaT7UgCSUzo2bTvyCiysEo='
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.post('/users', (req,res) => { 
const { username } = req.body
const user = { name: username , id: username }
chatkit.createUser(user)
.then(() => {console.log('Created user ', user.name)
res.sendStatus(200)})
.catch(error => {
  if(error.error_type === 'services/chatkit/user_already_exists')
  {

    console.log('user already exists', user.name )
    res.sendStatus(201)

  }else{
    res.status(error.status).json(error)
  }
})
})
app.post('/authenticate', (req, res) => {
    const authData = chatkit.authenticate({ userId: req.query.user_id })
    res.status(authData.status).send(authData.body)
  })

PORT= process.env.PORT || 3001;
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})