import { Button } from "@/components/ui/button";
import { Session } from "@/services/scans.types";

export function FolderResult({ session }: { session: Session }) {
  return (
    <div className="w-full flex flex-col items-center px">
      <h2 className="text-xl font-bold mb-4">File Scanning Summary</h2>
      <table className="w-full mb-4">
        <thead>
          <tr>
            <th className="border px-4 py-2">Folder Size</th>
            <th className="border px-4 py-2">Number of Files</th>
            <th className="border px-4 py-2">Time Taken</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">
              {session.files
                .reduce((total, file) => total + file.fileSize, 0)
                .toLocaleString()}{" "}
              bytes
            </td>
            <td className="border px-4 py-2">{session.files.length}</td>
            <td className="border px-4 py-2">
              {(session.updatedAt - session.createdAt) / 1_000} seconds
            </td>
          </tr>
        </tbody>
      </table>

      {session.files.some((file) => file.isMalware) ? (
        <>
          <h2 className="text-xl font-bold mb-4">MALWARES FOUND</h2>
          <table className="w-full mb-4">
            <thead>
              <tr>
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">File Name</th>
                <th className="border px-4 py-2">Malware Type</th>
                <th className="border px-4 py-2">Confidence %</th>
              </tr>
            </thead>
            <tbody>
              {session.files
                .filter((file) => file.isMalware)
                .map((file, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{file.fileName}</td>
                    <td className="border px-4 py-2">{file.malwareType}</td>
                    <td className="border px-4 py-2">{file.confidence}%</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      ) : (
        <h2 className="text-xl font-bold mb-4">NO MALWARE FOUND</h2>
      )}
      <div className="w-full">
        <Button className="mt-4 text-white bg-blue-500 hover:bg-blue-600">
          More details
        </Button>
      </div>
    </div>
  );
}
