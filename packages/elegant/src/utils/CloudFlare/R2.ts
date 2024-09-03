import axios from "axios";
import { Save } from "./R2Server";
import { v4 as uuidv4 } from 'uuid';

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
        "Access-Control-Allow-Origin": "*"
      }
    });

    return `${publicUrl}/${fileName}.${file.name.split('.').pop()}`;
}