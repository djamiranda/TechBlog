const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to get all comments
router.get('/', (req, res) => {
    Comment.findAll({})
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Route to create a new comment with authentication
router.post('/', withAuth, (req, res) => {
    console.log(req.body);
    if (req.session) {
        Comment.create({
            text: req.body.text,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

// Route to update a comment by ID with authentication
router.put('/:id', withAuth, async (req, res) => {
    try {
        const comment = await Comment.findOne({ where: { id: req.params.id }});
        console.log(req.body, comment);
        const commentData = await Comment.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        console.log(commentData, 'commentData')
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to delete a comment by ID
router.delete('/:id', async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id.' });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;