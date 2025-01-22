# Lambda, DynamoDB, API Gateway and Cloudformation Example
## Summary
This is an example Serverless API made with API Gateway, Lambda, DynamoDB, and CloudFormation using vanilla CF.

Using vanilla CF (no SAM or Serverless transform) for practice.

Also not specifically using CodeBuild / CodeDeploy to save money since this is a personal free practice project : /

## Deploy
Deploy to AWS using

```
npm run package
```

  and

```
npm run deploy
```

Need to have AWS CLI installed.

## Test
Test with Jest and Babel using (this may surprise you)

```
npm run test
```