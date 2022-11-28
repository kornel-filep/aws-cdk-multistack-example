import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class FrontendExampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const websiteBucket = new cdk.aws_s3.Bucket(this, 'FrontendBucket', {
      websiteIndexDocument: 'index.html',
      publicReadAccess: true,
    })

    new cdk.aws_s3_deployment.BucketDeployment(this, 'FrontendDeploy', {
      sources: [cdk.aws_s3_deployment.Source.asset('../Example.frontend/build')],
      destinationBucket: websiteBucket,
    })

    new cdk.CfnOutput(this, 'bucketUrl', {
      value: websiteBucket.bucketWebsiteUrl,
      description: 'The url of the s3 bucket',
      exportName: 'frontendWebsiteBucketURL'
    })
  }
}
