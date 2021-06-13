const { Router } = require('express')
const router = Router()
const { config } = require('../config/index')
const nodemailer = require('nodemailer')

router.post('/send-email', async (req, res) => {
  const { name, email, textarea } = req.body

  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      port: 587,
      secure: true,
      auth: {
        user: config.email,
        pass: config.pass
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    var mailOptionsToMy = {
      from: `Ashram ${config.email}`,
      to: config.email,
      subject: `Nuevo Comentario de ${name} ${email}`,
      text: textarea
    };

    var mailOptionsToUser = {
      from: `Ashram ${config.email}`,
      to: email,
      subject: `Gracias ${name}`,
      text: 'Gracias por contactarnos en breves le responderemos!!'
    };

    const info = await transporter.sendMail(mailOptionsToMy)
    const infoUser = await transporter.sendMail(mailOptionsToUser)

    console.log('Message sent my: %s', info.messageId)
    console.log('Message sent user: %s', infoUser.messageId)

    res.send({
      url: `/contact`
    })
  } catch (err) {
    console.log(err)
  }


})

module.exports = router
