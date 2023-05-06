const Handlebars = require('handlebars');
const Email = require('../utils/email');
const signupTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BFG: Signup Success</title>
</head>
<body>
    <h2>Dear {{recieverName}}
    <h3Welcome to the Nature tours</h3>
    <p>Congratulation you successfully booking tour {{tour}}</p>
    <br>
    <p>
        Thankyou,
    </p>
</body>
</html>
`;
exports.bookingemail = (email, tour) => {
  Email.send({
    from: `"${process.env.EMAIL_USERNAME}" <${process.env.EMAIL_FROM}>`, // sender address
    to: email,
    subject: 'Welcome to BFG',
    html: Handlebars.compile(signupTemplate)({ tour }), // html body
  });
};
