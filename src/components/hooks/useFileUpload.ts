import { useState } from "react";
import { uploadFile, uploadFolder } from "@/services/scanning.service";
import useScanSession from "./useScanSessions";

export interface UploadState {
  handleUpload: (files: FileList | null, isFolder?: boolean) => Promise<void>;
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
    isFolder: boolean = false
  ) => {
    if (!files || (isFolder && files.length === 0)) return;

    setUploading(true);
    setError(null);

    try {
      const session = isFolder
        ? await uploadFolder(files)
        : await uploadFile(files[0]);
      setSessionId(session);
    } catch (err) {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return { handleUpload, uploading, sessionId, error };
};

export default useFileUpload;
