export function importAll(r: any) {
  return r.keys().map((fileName: string) => ({
    fileName,
    module: r(fileName),
  }))
};