import { defineStorage } from '@aws-amplify/backend';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { RemovalPolicy } from 'aws-cdk-lib';

export const storage = defineStorage((context: any) => {
  return {
    // Alphanumeric, dashes, underscores, or spaces, starting with alpha
    name: 'amp-fpvr-test2',

    access: (allow: any) => ({
      '/*': [
        allow.authenticated().to(['read', 'write', 'delete']),
      ],
    }),

    overrides: (bucketResource: any, ctx: any) => {
      const existingBucket = s3.Bucket.fromBucketName(
        // scope
        bucketResource,
        // Construct ID - must be valid: alpha start, only letters/numbers/dashes
        'MyS3Bucket',
        // Actual existing bucket name (no extra spaces/dashes)
        'fpvr-test2'
      );

      bucketResource.s3Bucket = existingBucket as unknown as typeof bucketResource.s3Bucket;
      existingBucket.applyRemovalPolicy(RemovalPolicy.RETAIN);
    },
  };
});
