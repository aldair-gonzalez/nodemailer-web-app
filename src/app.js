import express from 'express'
import hbs from 'express-handlebars'
import path from 'path'

import { __dirname } from './dirname.js'

import { transport } from './utils/nodemailer.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(`${__dirname}/public`))
app.use(express.static(path.join(`${__dirname}/views`)))

app.engine('.hbs', hbs.engine({ extname: '.hbs' }))

app.set('view engine', 'hbs')
app.set('views', `${__dirname}/views`)

app.get('/', async (req, res) => {
  try {
    const username = 'Aldair'
    const resetLink = 'https://plataforma.coderhouse.com/cursos'
    app.render(
      'emails/reset',
      { username, resetLink },
      (err, html) => {
        if (err) {
          console.log(err)
        } else {
          transport.sendMail({
            from: 'Your App <noreply@yourapp.com>',
            to: 'test@example.com',
            subject: 'Reset Your Password',
            html
          })
          res.send('Send email')
        }
      }
    )
  } catch (error) {
    console.log(error)
  }
})

export default app
