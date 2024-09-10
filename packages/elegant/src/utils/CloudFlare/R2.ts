import axios from "axios";
import { Save } from "./R2Server";
import { v4 as uuidv4 } from 'uuid';
import S3Client from './R2Client';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export default async function SaveFile(file: File) {
    const fileName = uuidv4();
    const [ preSignedUrl, publicUrl ] = await Save(
        `${fileName}.${file.name.split('.').pop()}`, 
        file.type, 
        file.size
    );

    await axios.put(preSignedUrl || "", file, {
      headers: {
        "Content-Type": file.type,
      }
    });

    return `${publicUrl}/${fileName}.${file.name.split('.').pop()}`;
}