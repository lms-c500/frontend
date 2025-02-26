export type FileResult = {
  fileName: string;
  filePath: string;
  fileSize: number;
  md5: string | null;
  sha256: string | null;
  status:
    | "pending"
    | "extracting_metadata"
    | "scanning"
    | "completed"
    | "failed";
  isMalware: boolean | null;
  malwareType: string | null;
  confidence: number | null; // Confidence score (0-100)
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
