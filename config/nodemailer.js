const nodemailer = require('nodemailer');
const ejs=require('ejs');
const path=require('path');


let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
    },
});


let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
      path.join(__dirname,'../views/mailers', relativePath),
      data,
      function(err,template){
        if(err)
            {console.log('error in rendering template');
        return;
          }
        mailHTML=template;
      }

    )
    return mailHTML;
}

module.exports={
transporter:transporter,
renderTemplate:renderTemplate
}