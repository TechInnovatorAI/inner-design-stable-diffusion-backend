import * as AWS from 'aws-sdk';

// import fs from 'fs';
// import * as fs from 'fs';
import fs = require('fs');
import path_m = require('path');

const s3_baseImage_path = 'images/uploadimage/';
const s3_maskImage_path = 'images/maskimage/';
const s3_avatarImage_path = 'images/avatarimage/';
const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET_NAME;
const s3 = new AWS.S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
});
// const credentials = new AWS.Credentials(JWT_ACCESS_SECRET, JWTSECRET);
const AWS_S3_REGION = process.env.AWS_S3_BUCKET_REGION;

export const s3Service = async (file) => {
  const readData = fs.readFileSync(`${file.destination}/${file.filename}`);

  return await s3_upload(
    readData,
    AWS_S3_BUCKET,
    file.filename,
    s3_baseImage_path,
    'image/png',
  );
};

export const s3Service_converted = async (path: string, file: any) => {
  const readData = fs.readFileSync(`${path}`);
  console.log('read data:', readData);
  return await s3_upload(
    readData,
    AWS_S3_BUCKET,
    file.filename,
    s3_baseImage_path,
    'image/png',
  );
};

export const s3Service_download = async (path: string, filename: string) => {
  const readData = fs.readFileSync(`${path}`);

  return await s3_upload(
    readData,
    AWS_S3_BUCKET,
    filename,
    s3_baseImage_path,
    'image/png',
  );
};

export const s3Service_mask = async (file) => {
  const readData = fs.readFileSync(`${file.destination}/${file.filename}`);

  return await s3_upload(
    readData,
    AWS_S3_BUCKET,
    file.filename,
    s3_maskImage_path,
    'image/png',
  );
};

export const s3Service_mask_converted = async (path: string, file: any) => {
  const readData = fs.readFileSync(`${path}`);

  console.log('s3Service_mask_converted', path, 'file', file);
  return await s3_upload(
    readData,
    AWS_S3_BUCKET,
    file.filename,
    s3_maskImage_path,
    'image/png',
  );
};

export const s3Service_avatar = async (path: string, file: any) => {
  const readData = await fs.readFileSync(`${path}`);

  console.log('s3Service_avatar', path, 'file', file);
  return await s3_upload(
    readData,
    AWS_S3_BUCKET,
    file.filename,
    s3_avatarImage_path,
    'image/png',
  );
};

export const s3Service_nonemask_converted = async (
  path: string,
  fileName: string,
) => {
  console.log('s3Service_mask_converted', path, 'file', fileName);
  const readData = fs.readFileSync(`${path}`);

  return await s3_upload(
    readData,
    AWS_S3_BUCKET,
    fileName,
    s3_maskImage_path,
    'image/png',
  );
};

const s3_upload = async (
  file: any,
  bucket: string,
  name: string,
  path: string,
  mimetype: string,
) => {
  const params = {
    Bucket: bucket,
    Key: String(`${path}${name}.png`),
    Body: file,
    ACL: 'public-read',
    ContentType: mimetype,
    ContentDisposition: 'inline',
    CreateBucketConfiguration: {
      LocationConstraint: AWS_S3_REGION,
    },
  };

  try {
    const s3Response = await s3.upload(params).promise();
    return s3Response;
  } catch (e) {
    console.log('why don`t upload image:', e);
  }
};
