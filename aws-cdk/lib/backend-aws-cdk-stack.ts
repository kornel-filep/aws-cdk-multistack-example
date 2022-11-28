import * as cdk from 'aws-cdk-lib';
import { CfnOutput } from 'aws-cdk-lib';
import { AmazonLinuxGeneration } from 'aws-cdk-lib/aws-ec2';
import { Effect, PolicyStatement, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
const fs = require('fs');

export class BackendExampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new cdk.aws_ec2.Vpc(this, 'ExampleVPC');

    const backendJarBucket = cdk.aws_s3.Bucket.fromBucketName(this, 'BackendJarBucket', 'Examplebackend')

    new cdk.aws_s3_deployment.BucketDeployment(this, 'UploadJarToS3', {
      sources: [cdk.aws_s3_deployment.Source.asset('../Example.backend/target/')],
      destinationBucket: backendJarBucket,
    })

    new cdk.CfnOutput(this, 'backendBucketUrl', {
      value: backendJarBucket.bucketWebsiteUrl,
      description: 'The url of the s3 bucket',
      exportName: 'backendJarS3Url'
    })

    const autoScalingGroup = new cdk.aws_autoscaling.AutoScalingGroup(this, 'ModdszertanokASG', {
      vpc: vpc,
      instanceType: cdk.aws_ec2.InstanceType.of(cdk.aws_ec2.InstanceClass.T3, cdk.aws_ec2.InstanceSize.NANO),
      machineImage: cdk.aws_ec2.MachineImage.latestAmazonLinux({generation: AmazonLinuxGeneration.AMAZON_LINUX_2}),
      vpcSubnets: vpc.selectSubnets({subnetType: cdk.aws_ec2.SubnetType.PRIVATE_WITH_EGRESS}),
      minCapacity: 2,
    });

    autoScalingGroup.addUserData(fs.readFileSync('scripts/backend.sh'));
    autoScalingGroup.addToRolePolicy(new PolicyStatement({
      sid: "AllowEverythingForThisBucket",
      effect: Effect.ALLOW,
      actions: [
        "s3:GetObject",
        "s3:ListBucket",
        "s3:GetBucketLocation"
      ],
      resources: [
        "arn:aws:s3:::Examplebackend/*"
      ]
    }))

    const applicationLoadBalancer = new cdk.aws_elasticloadbalancingv2.ApplicationLoadBalancer(this, 'BackendALB', {
      vpc: vpc,
      internetFacing: true
    });

    const listener = applicationLoadBalancer.addListener('HttpListener', {
      port: 8080
    });

    listener.addTargets('Targets', {
      port: 8080,
      targets: [autoScalingGroup]
    });

    listener.connections.allowDefaultPortFromAnyIpv4('Allow access to port 80 from the internet.')

    new CfnOutput(this, 'LoadBalancerDNS', {value: applicationLoadBalancer.loadBalancerDnsName})
  }
}
