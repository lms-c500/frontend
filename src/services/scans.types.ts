export type FileResult = {
  fileName: string;
  relativePath: string;
  fileSize: number;
  md5: string | null;
  sha256: string | null;
  status:
    | "pending"
    | "extracting_metadata"
    | "scanning"
    | "completed"
    | "failed";
  malwareStatus: string | null;
  scanDetails: string | null;
  isELF: boolean;
  architecture: string | null;
};

export type Session = {
  sessionId: string;
  status:
    | "pending"
    | "in_progress"
    | "completed"
    | "partially_failed"
    | "failed";
  files: FileResult[];
  scanType: "quick" | "deep";
  scanTarget: "file" | "folder";
  createdAt: number;
  updatedAt: number;
};
