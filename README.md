# Repository showcasing some deployments to Amazon Web Services for educational purposes

## The current state of the repository is not final. 
## It is still in development, so parts are unstable and need manual intervention to work.

## Tools used

1. AWS CDK
2. Java 11 + Maven
3. React

## How to deploy
1. Build the backend app using `mvn clean package`.
2. Build the frontend app using `npm run build`.
3. In the aws-cdk folder, execute `cdk bootstrap`, and then: `cdk deploy BackendExampleStack`, `cdk deploy FrontendExampleStack`.
