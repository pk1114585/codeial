const nodemailer=require('../config/nodemailer');


// this is another way of exporting a method
exports.newComment=(comment)=>{

    let htmlString=nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
    console.log('inside newComment mailer');
    nodemailer.sendMail({
        from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: htmlString // html body
    },function(err, info){
        if(err){
            console.log('Error in sending mail',err);
            return;
        }
        console.log('Mail send', info);
        return;
    })
}