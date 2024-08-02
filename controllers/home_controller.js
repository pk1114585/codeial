const Post=require('../models/post');
module.exports.home = async function(req, res) {
   /*  try {
        let posts = await Post.find({});
        return res.render('home', {
            title: "Codial",
            posts: posts
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    } */

   // Populate the whole user object and comment
    try{
      let posts = await Post.find({}).populate('user').populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
      }).exec({});
      return res.render('home', {
        title: "Codial",
        posts: posts
    });
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};

