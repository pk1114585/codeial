const Post=require('../../../models/post');
const Comment=require('../../../models/comment');

module.exports.index=async function(req,res)
{
  let posts= await Post.find({})
  .sort('-createdAt')
  .populate('user')
  .populate({
    path: 'comments',
    populate:{
        path: 'user'
    }
  });
    return res.json(200, {
        message: 'List of post',
        posts:posts
    });
}

module.exports.destroy = async function(req, res) {
    try {
        let post = await Post.findById(req.params.id);

        // Check if the post belongs to the logged-in user
       
            // Delete the post
            await Post.deleteOne({ _id: req.params.id });

            // Delete associated comments
            await Comment.deleteMany({ post: req.params.id });

            return res.status('200').json({
                message: 'Post deleted successfully',
            });
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message:'Internal Server Error'
    });
    }
}