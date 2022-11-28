import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class FrontendExampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    if (!this.bundlingRequired) {
      // We must skip undesired stacks to be able to deploy specific stacks.
      // Refer to: https://github.com/aws/aws-cdk/issues/6743
      console.info('Skipping ' + this.stackName);
      return;
  }

    const websiteBucket = new cdk.aws_s3.Bucket(this, 'FrontendBucket', {
      websiteIndexDocument: 'index.html',
      publicReadAccess: true,
    })

    new cdk.aws_s3_deployment.BucketDeployment(this, 'FrontendDeploy', {
      sources: [cdk.aws_s3_deployment.Source.asset('../example.frontend/build')],
      destinationBucket: websiteBucket,
    })

    new cdk.CfnOutput(this, 'bucketUrl', {
      value: websiteBucket.bucketWebsiteUrl,
      description: 'The url of the s3 bucket',
      exportName: 'frontendWebsiteBucketURL'
    })
  }
}
