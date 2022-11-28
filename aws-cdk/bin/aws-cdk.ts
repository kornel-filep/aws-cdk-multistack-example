#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { FrontendExampleStack } from '../lib/frontend-aws-cdk-stack';
import { BackendExampleStack } from '../lib/backend-aws-cdk-stack';

const app = new cdk.App();
new FrontendExampleStack(app, 'FrontendExampleStack', {
});

new BackendExampleStack(app, 'BackendExampleStack', {

});