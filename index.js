import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand, PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const docClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.BARISTA_TEAM_TABLENAME;

module.exports.handler = async (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2));
  var response = {
    "statusCode": 200,
    "headers": {
      "Content-Type": "*/*"
    }
  };

  const path = event.path.split("/")
  const method = event.httpMethod
  var command = null;

  switch (path[0]) {
    
    // /baristaTeamInstance path can either POST a new team to the DB or GET a randomized one
    case 'baristaTeamInstance':
      switch(method) {
        
        case 'POST':
          if (!event.body) 
            throw new Error('baristaTeamInstance POST requires baristaTeamInstance in body')

          command = new PutCommand({
            TableName: tableName,
            Item: event.body
          });
          
          const res = await docClient.send(command);
          console.log(res)    
          break;

        case 'GET':
          const round = event.queryStringParameters.round

          if (!round)
            throw new Error('/baristaTeamInstance GET requires query parameter of ?round=[Number]')

          command = new QueryCommand({
            TableName: tableName,
            KeyConditionExpression:
              "round = :round",
            ExpressionAttributeValues: {
              ":round": round
            },
            ConsistentRead: false,
          });

          const getRes = await docClient.send(command);
          console.log(getRes)
          break;

        default:
          throw new error('Unimplemented Method for /baristaTeamInstance');
      }

      break;

    default:
      break;
  }

  response.body = "Success!";
  console.log(response)
  return response;
};