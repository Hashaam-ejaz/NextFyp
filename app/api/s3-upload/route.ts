import { NextResponse, NextRequest } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import mime from 'mime-types';

    // Interface for S3 Credentials
    interface S3Credentials {
        accessKeyId: string;
        secretAccessKey: string;
    }

    const s3Client = new S3Client({
        region: process.env.AWS_S3_REGION,
        credentials: {
            accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID || "",
            secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY || "",
        } as S3Credentials
    });

    // Type for Upload Parameters
    interface UploadParams {
      Bucket: string;
      Key: string;
      Body: Buffer;
      ContentType: string;
    }
    // Upload image to S3
    async function uploadFileToS3(file: Buffer, fileName: string) {
        const fileBuffer = file;
        console.log(fileName);
        const contentType = mime.lookup(fileName) || "application/octet-stream"; // Determine the content type
        console.log(contentType);
        console.log(fileName);
        const params: UploadParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME || "",
            Key: `${fileName}`,
            Body: file,
            ContentType: contentType,
        };
        // const params: UploadParams = {
        // Bucket: process.env.AWS_S3_BUCKET_NAME || "",
        // Key: `${fileName}`,
        // Body: file,
        // ContentType: "image/jpg",
        // };
    
        const command = new PutObjectCommand(params);
        await s3Client.send(command);
        return fileName;
    }

    export async function POST(request: NextRequest) {
        try {
          const formData = await request.formData();
          const files = formData.getAll("files");

          if (files.length === 0) {
            return NextResponse.json({ error: "Files are required." }, { status: 400 });
          }

          const uploadedFiles: string[] = [];

          for (const file of files) {
            if (!(file instanceof Blob)) {
              return NextResponse.json({ error: "Invalid file format." }, { status: 400 });
            }

            const buffer = Buffer.from(await file.arrayBuffer());
            const fileName = await uploadFileToS3(buffer, file.name || "default.jpg");
            uploadedFiles.push(fileName);
          }

          return NextResponse.json({ success: true, fileNames: uploadedFiles });
        } catch (error) {
          return NextResponse.json({ error });
        }
      }