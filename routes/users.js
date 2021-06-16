var express = require('express');
var router = express.Router();
const userLib=require('../Backend/Lib/UserLib')
/* GET users listing. */
router.post('/login', function(req, res) {
  userLib.isUserValid(req.body, function(resultJson){
    if(resultJson.success==true){
      console.log("Session for User Initialized");
      req.session.user = {username: resultJson.username}; // Init session object for this user
  }
    res.json(resultJson);
})
});
router.get('/mailbox', function(req, res) {
  // if this is a valid user having session, return his mailbox
  if(req.session && req.session.user.username){
      // User is authenticated and his session table has an entry, so we know his username
      // Can we get his details from db?
      // Can we make a db call using userLib or mailboxLib to get his data and return back?
      res.json({success:true, username:req.session.username, 'mailbox': req.session.user.username});
  }
  else{
      // Redirect him to login page
      res.json({success:false, message:'Need to be logged in to get mailbox'});
  }
}); 

module.exports = router;
