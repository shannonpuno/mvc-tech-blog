const router = require('express').Router();
const { comments } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all comments from blogPost

router.get('/', (req, res) => {
    comments.findAll({})
    .then(commentsData => res.json(commentsData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });

});

router.get('/:id', (req, res) => {
    comments.findAll({
        where: {
            id: req.params.id
        }
    })
    .then(commentsData => res.json(commentsData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// Create New Comment on blogPost

router.post('/', async (req, res) => {
    try {
        const newComm = await comments.create({
            ...req.body,
            username: req.session.user_id,
        });
        res.json(newComm);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Delete comment

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentsData = await comments.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        res.status(200).json(commentsData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
