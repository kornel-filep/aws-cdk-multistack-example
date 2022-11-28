# Repository showcasing some deployments to Amazon Web Services for educational purposes

## Tools used

1. AWS CDK
1. Github Actions
1. Java 11 + Maven
1. React

## How to deploy
1. Build the backend app using `mvn clean package`.
1. Build the frontend app using `npm run build`.
1. In the aws-cdk folder, execute `cdk bootstrap`, and then: `cdk deploy BackendExampleStack`, `cdk deploy FrontendExampleStack`.

## Whats happening

Github Actions is used as the CI/CD solution.  
1. Backend is built & JAR is published to an S3 bucket.
1. Backend is deployed using aws-cdk and ECS. The user-data script contains a download from the S3 bucket of the jar and executed on the instance.
    1. There is an output file archived here, for the frontend to consume for ELB url.
1. Frontend is built and artifact archived to Github.
1. Frontend is deployed from the Github Archive to S3 Static Website Hosting.
