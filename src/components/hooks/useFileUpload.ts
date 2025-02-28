import { uploadFile, uploadFolder } from "@/services/scanning.service";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export interface UploadState {
  handleUpload: (
    files: FileList | null,
    isFolder?: boolean,
    scanType?: string
  ) => Promise<void>;
  uploading: boolean;
  sessionId?: string;
  error: string | null;
}

const useFileUpload = (): UploadState => {
  const [sessionId, setSessionId] = useState<string>();
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (
    files: FileList | null,
    isFolder: boolean = false,
    scanType: string = "quick"
  ) => {
    if (!files || (isFolder && files.length === 0)) return;

    const size = Array.from(files).reduce((acc, file) => acc + file.size, 0);
    const sizeLimit = parseInt(process.env.NEXT_UPLOAD_SIZE_LIMIT_MB ?? "600");
    if (size > sizeLimit * 1024 * 1024) {
      setError(`Total upload size must not exceed ${sizeLimit}MB.`);
      return;
    }
    setUploading(true);
    setError(null);

    try {
      const session = isFolder
        ? await uploadFolder(files, scanType)
        : await uploadFile(files[0], scanType);
      setSessionId(session);
    } catch (err) {
      const e = err as AxiosError;
      setError(`Upload failed. Reason: ${(e.response?.data as any)?.error}`);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (error) {
      alert(error);
      setError(null);
    }
  });

  return { handleUpload, uploading, sessionId, error };
};

export default useFileUpload;
