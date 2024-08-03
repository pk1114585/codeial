const Post= require('../models/post');
const Comment= require('../models/comment');
module.exports.create = async function(req, res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        console.log(req.body.content);
        
        if (req.xhr){
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }

       
        return res.redirect('back');

    }catch(err){
        
        return res.redirect('back');
    }
  
}

module.exports.destroy = async function(req, res) {
    try {
        let post = await Post.findById(req.params.id);

        // Check if the post belongs to the logged-in user
        if (post.user == req.user.id) {
            // Delete the post
            await Post.deleteOne({ _id: req.params.id });

            // Delete associated comments
            await Comment.deleteMany({ post: req.params.id });

            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
}

