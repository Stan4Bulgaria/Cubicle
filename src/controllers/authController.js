const router = require('express').Router();
const authManager = require('../manager/authManager');
const errorHandlingFunc = require('../utils/errorHandlingUtil');
router.get('/login', (req, res) => {
    res.render('auth/login');
});
router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const token = await authManager.login(username, password)
        res.cookie('auth', token, {httpOnly:true});
        return res.redirect('/');
    }
    catch (err) {
        const Error = err
        res.render('auth/login', {Error});
    }
});
router.post('/register', async (req, res, next) => {
    try {
        const { username, password, repeatPassword } = req.body;
        if (password !== repeatPassword) {
            const Error = {message:'Password missmatch'};
            return  res.render('auth/register',{Error});
            
        };
        const existingUser = await authManager.getUserByUserName(username);
        if (existingUser) {
            const Error = {message:'User already exists'};
            return  res.render('auth/register',{Error});
        }
        const user = await authManager.register(username, password);
        res.redirect('/login');
    }
    catch(err){
           const Error = errorHandlingFunc(err)
           res.render('auth/register',{Error});
    }   

});
router.get('/logout', async (req, res) => {
     res.clearCookie('auth');
     res.redirect('/');
})

module.exports = router;