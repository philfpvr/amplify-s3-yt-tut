import { defineStorage } from '@aws-amplify/backend';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { RemovalPolicy } from 'aws-cdk-lib';

export const storage = defineStorage((context: any) => {
  return {
    // Must start with a letter and can contain letters, numbers, dashes, underscores, or spaces
    name: 'ampFpvrTest', // changed from 'amp-fpvr-test2' to remove possible hidden chars

    access: (allow: any) => ({
      '/*': [
        allow.authenticated().to(['read', 'write', 'delete']),
      ],
    }),

    overrides: (bucketResource: any, ctx: any) => {
      // The second arg here is the CDK construct ID. Must also start with letter, no hidden spaces.
      const existingBucket = s3.Bucket.fromBucketName(
        bucketResource,
        'MyS3Bucket', 
        // Actual bucket name in S3. Make sure it's spelled exactly,
        // no trailing spaces, no weird dashes. S3 allows dashes, so 'fpvr-test2' is typically ok.
        'fpvr-test2'
      );

      bucketResource.s3Bucket = existingBucket as unknown as typeof bucketResource.s3Bucket;
      existingBucket.applyRemovalPolicy(RemovalPolicy.RETAIN);
    },
  };
});
