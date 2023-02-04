const router = require('express').Router();
const Accessory = require('../models/Accessory');
router.get('/create', (req, res) => {
      res.render('accessory/create')
})
router.post('/create', async(req, res) => {
      const {name, description, imageUrl} = req.body;
      try{
            await Accessory.create({name, description, imageUrl});
            res.redirect('/');
      }
      catch(err){
            console.log(err.message);
            res.render('404');
      }
     
})
module.exports = router;