import { FileResult, Session } from "@/services/scans.types";

export function SingleFileResult({
  file,
  session,
}: {
  file: FileResult;
  session: Session;
}) {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">File Scanning Results</h2>
      <small>
        Scan duration: {(session.updatedAt - session.createdAt) / 1_000} seconds
      </small>
      <br />
      <div
        key={file.filePath}
        className="grid grid-cols-4 gap-4 mb-4 p-4 border rounded-lg"
      >
        <div className="col-span-1 font-semibold">File Name:</div>
        <div className="col-span-3">{file.fileName}</div>
        <div className="col-span-1 font-semibold">File Size:</div>
        <div className="col-span-3">{file.fileSize.toLocaleString()} bytes</div>
        <div className="col-span-1 font-semibold">MD5:</div>
        <div className="col-span-3">{file.md5}</div>
        <div className="col-span-1 font-semibold">SHA256:</div>
        <div className="col-span-3">{file.sha256}</div>
        <div className="col-span-1 font-semibold">Scanning Result:</div>
        <div className="col-span-3">
          {file.isMalware
            ? `Is Malware (${file.malwareType})`
            : "No malware found"}
        </div>
        <div className="col-span-1 font-semibold">Confidence:</div>
        <div className="col-span-3">{file.confidence}%</div>
      </div>
    </div>
  );
}
