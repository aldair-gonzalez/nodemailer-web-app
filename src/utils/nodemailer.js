import nodemailer from 'nodemailer'

export const transport = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  source: true,
  auth: {
    user: 'your email user',
    pass: 'your pass'
  }
})
