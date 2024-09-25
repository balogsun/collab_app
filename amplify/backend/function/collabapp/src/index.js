const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'ca-central-1' });  // Set your AWS region

exports.handler = async (event) => {
  const params = {
    Destination: {
      ToAddresses: ['seunbalog@outlook.com'],  // Replace with recipient email
    },
    Message: {
      Body: {
        Text: { Data: "A new task was created." }
      },
      Subject: { Data: "New Task Alert" }
    },
    Source: 'balogsun@hotmail.com'  // Replace with your email (must be verified in SES)
  };

  try {
    await ses.sendEmail(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send email', error }),
    };
  }
};
