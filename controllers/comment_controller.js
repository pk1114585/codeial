const Comment = require('../models/comment');
const Post = require('../models/post');
const commentMailer=('../mailers/commentMailer');
const Like=require('../models/like');
module.exports.create = async function (req, res) {
    try {
        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            await post.save();
            comment=await comment.populate('user','name email').execPopulate();
            commentMailer.newComent(comment);
            if(req.xhr){
                return res.status(200).json({data: {comment: comment},message:'Post created'});
                
            }
            res.redirect('/');
        } else {
            res.status(404).send('Post not found');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

module.exports.destroy = async function(req, res) {
    try {
        // Find the comment by ID
        let comment = await Comment.findById(req.params.id);

        // Check if the comment belongs to the logged-in user
        if (comment.user == req.user.id) {
            // Get the post ID associated with the comment
            let postId = comment.post;
            console.log("PostID = " + postId);

            // Remove the comment
            await Comment.findByIdAndDelete(req.params.id);

            //destroy the associated likes for this comment
            await Like.deleteMany({likeable:comment._id,onModel:'Comment'});

            
            // Update the post to remove the reference to the deleted comment
            await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });

            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
}

