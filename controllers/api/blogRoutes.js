const router = require('express').Router();
const { blogPosts } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE new blogPost
router.post('/', withAuth, async (req, res) => {
    try {
        const newBlogPost = await blogPosts.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newBlogPost);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Delete blogPost
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const blogPostData = await blogPosts.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if(!blogPostData) {
            console.log(err);
            res.status(500).json({message: 'Blog ID could not be found'});
            return;
        }
        res.status(200).json(blogPostData);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;