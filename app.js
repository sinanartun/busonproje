const http = require('http');
const AWS = require('aws-sdk');

const hostname = '0.0.0.0';
const port = 3000;

// Configure AWS Region
AWS.config.update({region: 'eu-west-1'}); // Replace 'your-region' with your AWS region

// Create DynamoDB service object
const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

const server = http.createServer((req, res) => {
  // Define the parameters for the query
  var params = {
    TableName: 'busontable', // Replace with your DynamoDB table name
    Key: {
      'id': {S: '1'} // Replace with the key of the item you want to fetch
    }
  };

  // Fetch the item from DynamoDB
  ddb.getItem(params, (err, data) => {
    if (err) {
      console.error("Error:", err);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end("Error fetching data from DynamoDB");
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data.Item)); // Send the DynamoDB item as the response
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});