import aws from 'aws-sdk';
import Multer from 'multer';
import multers3 from 'multer-s3'

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_KEY,
    acessKeyId: process.env.AWS_ACCESS_KEY,
    region: process.env.AWS_REGION,
})

