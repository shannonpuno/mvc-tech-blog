const router = require('express').Router();
const { User } = require('../../models');

// CREATE new user 
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            user_id: req.body.user_id,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//User login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                user_id: req.body.user_id,
            }
        });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect username or password, Please try again!' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect username or password. Please try again!' });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;

            res
                .status(200)
                .json({ user: userData, message: 'You are logged in!' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

    
});

// Logout User
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(400).end();
    }
});

module.exports = router;
