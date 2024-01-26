export class API {
  public static uploadImage = async (file: File) => {
    await new Promise(r => setTimeout(r, 100));

    const blob = URL.createObjectURL(file);

    return blob;
  }
}

export default API
