const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
})
exports.sendEmail = (email, url) => {
  return new Promise((resolve, reject) => {
    const message = {
      from: process.env.EMAIL_USERNAME, // sender address
        to: email,
        subject: 'Confirm Email',
        html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`
    }
    transporter.sendMail(message, (error, info) => {
      if (error) {
        reject(error)
      } else {
        resolve(info)
      }
    }
    )
  })
}

exports.updateEmail = (email, text) => {
    return new Promise((resolve, reject) => {
        const message = {
            from: process.env.EMAIL_USERNAME, // sender address
            to: email, // list of receivers
            subject: "Notification Account Zwallet ✔", // Subject line
            html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .container{
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .wrapper {
            text-align: center;
            width: 100%;
            height: fit-content;
        }
        .message {
            display:flex;
            justify-content: center;
            width: 100%;
            margin-top: 20px;
        }
        .message>p {
            width: 15%
        }
        .logo{
            width: 120px;
            height: 120px;
            display: flex;
            margin: auto;
        }
        .logo>img{
            object-fit: contain;
            width: 100%;
            height: 100%;
        }
        .wrapper>a{
            color: black;
            text-decoration: none;
            padding: 10px 20px;
            background-color: #4460ff;
            border-radius: 5px;
            margin-top: 20px;
            color: white
        }
        .wrapper>a:hover{
            border: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="wrapper">
            <h2>Congratulation</h2>
            <div class="logo">
                <img src="https://www.freeiconspng.com/uploads/success-icon-10.png" alt="success" />
            </div>
            <h3>Your email has been successfully changed to ${text}</h3>
            <a href="#">Go to Zwallet</a>
        </div>
    </div>
</body>
<script>
</script>
</html>`,
        }
        transporter.sendMail(message, (error, info) => {
            if (error) {
                reject(error)
            } else {
                resolve(info)
            }
        }   
        )
    })
}

exports.emailForgotPassword = (email, url) => {
    return new Promise((resolve, reject) => {
      let message = {
        from: process.env.EMAIL_USERNAME, // sender address
        to: email, // list of receivers
        subject: "Reset Password ✔", // Subject line
        html: `Please click this link for reset your password <a href='${url}'>Reset Password</a>`, // html body
      }
      transporter.sendMail(message, (error, info) => {
        if (error) {
          reject(error)
        } else {
          resolve(info)
        }
      })
    })
  }