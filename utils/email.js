const nodemailer = require('nodemailer');
const pug = require('pug');
// await new sendmail(postss, url).sendWelcome();
const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: 'smtp.gmail.com',
  auth: {
    user: 'vinayk1131@gmail.com',
    pass: 'uzhqyfrxtndhzoqn',
  },
});

exports.send = (data) => {
  console.log(data);
  transporter.sendMail(data, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
  });
};
