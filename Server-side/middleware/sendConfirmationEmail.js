const nodemailer = require('nodemailer');


module.exports =  function({toUser, hash}) {
    return new Promise((res, rej) => {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'kalibacardi@gmail.com',
          pass: '()riginS@123'
        }
      })
  
      const message = {
        from: 'kalibacardi@gmail.com',
        // to: toUser.email // in production uncomment this
        to: toUser,
        subject: 'Your App - Activate Account',
        html: `
          <h3> Hello ${toUser} </h3>
          <p>Thank you for registering into our Application. Much Appreciated! Just one last step is laying ahead of you...</p>
          <p>To activate your account please follow this link: <a target="_" href="http://localhost:8080/auth/user/${hash}">Activate your account</a></p>
          <p>Cheers</p>
          <p>Your Application Team</p>
        `
      }
  
      transporter.sendMail(message, function(err, info) {
        if (err) {
          rej(err)
        } else {
          res(info)
        }
      })
    })
  }