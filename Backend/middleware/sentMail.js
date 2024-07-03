const nodemailer=require('nodemailer');
const sentMail=(option)=>{
  
  console.log("hello",option)
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "a4915084401470",
          pass: "742ab457980e3e"
        }
      });
      const mailOption={
        from:option.from,
        to:option.to,
        subject:option.subject,
        text:option.text,
        html:option.html
      }

      // transport.sendMail(mailOption)
      transport.sendMail(mailOption, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}
module.exports=sentMail;
