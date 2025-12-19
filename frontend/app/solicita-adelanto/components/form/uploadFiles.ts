export async function uploadAllFiles(data: any, fileUpload: any): Promise<Record<string, string | string[]>> {
  const result: Record<string, string | string[]> = {};

  const uploadSingle = async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    const response = await fileUpload.mutateAsync(fd);
    fd.delete("file");
    return response.filePath;
  };

  if (data.uploads?.dpi instanceof File) {
    result['dpi'] = await uploadSingle(data.uploads.dpi);
  }
  if (data.uploads?.bankStatements instanceof File) {
    result['bankStatements'] = await uploadSingle(data.uploads.bankStatements);
  }
  if (data.uploads?.electricityBill instanceof File) {
    result['electricityBill'] = await uploadSingle(data.uploads.electricityBill);
  }
  if (data.uploads?.selfieWithDpi instanceof File) {
    result['selfieWithDpi'] = await uploadSingle(data.uploads.selfieWithDpi);
  }

  return result;
}
