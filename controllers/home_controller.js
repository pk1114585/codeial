const Post=require('../models/post');
const User=require('../models/user');
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
         // populate the user of each post
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
    
        let users = await User.find({});

        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts,
            all_users: users
        });

    }catch(err){
        console.log('Error', err);
        return;
    }        
    
};

