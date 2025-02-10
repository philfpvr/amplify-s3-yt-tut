import { defineStorage } from '@aws-amplify/backend';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { RemovalPolicy } from 'aws-cdk-lib';

export const storage = defineStorage((context: any) => {
  return {
    name: 'amp-fpvr-test2',
    access: (allow: any) => ({
      '/*': [
        allow.authenticated().to(['read', 'write', 'delete']),
      ],
    }),
    overrides: (bucketResource: any, ctx: any) => {
      const existingBucket = s3.Bucket.fromBucketName(
        bucketResource,
        'fpvr-test2',
        'fpvr-test2'
      );

      bucketResource.s3Bucket = existingBucket as unknown as typeof bucketResource.s3Bucket;
      existingBucket.applyRemovalPolicy(RemovalPolicy.RETAIN);
    },
  };
});
