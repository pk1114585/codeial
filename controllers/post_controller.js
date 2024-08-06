const Post= require('../models/post');
const Comment= require('../models/comment');
const Like=require('../models/like');
module.exports.create = async function(req, res){
    
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        
        console.log("Post_controller: Post created successfully",req.body);

        // Check if the request is an AJAX request
        if (req.xhr){
            console.log("Post_controller: AJAX request detected");
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }

        console.log("Post_controller: Redirecting back");
        return res.redirect('back');

    }catch(err){
        console.log("Post_controller: Error occurred -", err);
        return res.status(500).json({message: "Internal Server Error"});
    }
}


module.exports.destroy = async function(req, res) {
    try {
        let post = await Post.findById(req.params.id);

        // Check if the post belongs to the logged-in user
        if (post.user == req.user.id) {
             
            // delete the associated likes for the post and all its comments likes too
            await Like.deleteMany({likeable:post,onModel:'Post'});
            await Like.deleteMany({_id:{$in:post.comments}});
            await post.remove();


            // Delete the post
            await Post.deleteOne({ _id: req.params.id });

            // Delete associated comments
            await Comment.deleteMany({ post: req.params.id });

            if (req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted successfully!"
                });
            }

            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
}

