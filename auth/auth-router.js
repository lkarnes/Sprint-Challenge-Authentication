const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./auth-model');

const genToken = (user) => {
  console.log('in gen')
  const payload = {
    subject: user.id,
    username: user.username,
  }
  const secret = 'token'

  const options = {
    expiresIn: '1d'
  } 
  return jwt.sign(payload, secret, options);
}

router.post('/register', (req, res) => {
  const body = req.body;
  
  const hash = bcrypt.hashSync(body.password, 12);
  body.password = hash;
  console.log(body)
  db.add(body).then(user => {
    res.status(201).json({message: "You have been added to the database!"})
  }).catch(err => {
    res.status(500).json(err)
  })
});

router.post('/login', (req,res) => {
  const {username, password} = req.body;
  db.findBy({username}).then(user => {
      if(user&&bcrypt.compareSync(password, user.password)){
          const token = genToken(user)
          res.status(200).json({message: 'logged in',token: token})
      }else{
          res.status(401).json({message: "wrong password"})
      }
  }).catch(err => res.status(500).json({error: err}))
})

module.exports = router;
