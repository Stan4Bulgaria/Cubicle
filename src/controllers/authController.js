const router = require('express').Router();
const authManager = require('../manager/authManager');

router.get('/login', (req, res) => {
    res.render('auth/login');
});
router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const token = await authManager.login(username, password)
        res.cookie('auth', token, {httpOnly:true});
        return res.redirect('/');
    }
    catch (err) {
       return res.render('404');
    }
});
router.post('/register', async (req, res) => {
    const { username, password, repeatPassword } = req.body;
    if (password !== repeatPassword) {
        res.render('404');
        return
    };
    const existingUser = await authManager.getUserByUserName(username);
    if (existingUser) {
        res.render('404');
        return
    }
    const user = await authManager.register(username, password);
    res.redirect('/login');

});
router.get('/logout', async (req, res) => {
     res.clearCookie('auth');
     res.redirect('/');
})

module.exports = router;