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

   // Populate the whole user object
    try{
      let posts = await Post.find({}).populate('user').exec({});
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

