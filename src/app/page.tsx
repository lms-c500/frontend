"use client";
import { Button } from "@/components/ui/button"; // If using shadcn/ui
import { FileScannerIcon } from "@/components/vectors/file-scanner";
import { cn } from "@/lib/utils"; // Ensure you have this helper function
import { useRef, useState } from "react";
import { Oswald } from "next/font/google";

const oswald = Oswald();

export default function MalwareScanUI() {
  const [activeTab, setActiveTab] = useState<"file" | "folder">("file");
  const [fileStructure, setFileStructure] = useState<Record<string, File>>({});

  const folderInputRef = useRef<HTMLInputElement | null>(null);

  // Handle file/folder selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const structuredFiles: Record<string, File> = {};

      files.forEach((file) => {
        if (file.webkitRelativePath) {
          // Store relative path -> file mapping
          structuredFiles[file.webkitRelativePath] = file;
        } else {
          // Handle single file selection
          structuredFiles[file.name] = file;
        }
      });

      setFileStructure(structuredFiles);
    }
  };

  // Handle tab change
  const handleTabChange = (tab: "file" | "folder") => {
    setActiveTab(tab);
    setFileStructure({});
  };

  return (
    <div className="flex flex-col items-center bg-gray-900 text-white min-h-screen p-8">
      <div className="flex flex-col items-center w-[48rem] gap-8">
        <h1
          className={`text-4xl font-normal text-blue-400 ${oswald.className}`}
        >
          LINUX MALWARE SCAN C500
        </h1>
        <p className="text-gray-400 mt-2 text-center max-w-lg">
          Analyse suspicious files, folders to detect malware and other
          breaches, protect your Linux computers.
        </p>
        <div className="w-full">
          <div className="flex space-x-6 mt-6 border-b border-gray-700 w-full">
            {["file", "folder"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab as "file" | "folder")}
                className={cn(
                  "text-sm font-semibold pb-2 transition-colors w-1/2",
                  activeTab === tab
                    ? "text-white border-b-2 border-blue-400"
                    : "text-gray-500"
                )}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="flex flex-col items-center mt-8">
            <FileScannerIcon />
            {/* File Selection */}
            {activeTab === "file" ? (
              <>
                <input
                  id="file-input"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <Button
                  onClick={() => document.getElementById("file-input")?.click()}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Choose file
                </Button>
              </>
            ) : (
              <>
                <input
                  ref={folderInputRef}
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleFileChange}
                  {...{ webkitdirectory: "true", directory: "true" }} // TypeScript fix
                />
                <Button
                  onClick={() => folderInputRef.current?.click()}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Choose folder
                </Button>
              </>
            )}

            {/* Display Folder Structure */}
            <div className="mt-4 text-sm text-gray-400 w-full max-w-md">
              {Object.keys(fileStructure).length > 0 ? (
                <ul className="text-left">
                  {Object.keys(fileStructure).map((path, index) => (
                    <li key={index} className="truncate">
                      {path}
                    </li>
                  ))}
                </ul>
              ) : (
                <p></p>
              )}
            </div>
          </div>

          <div className="flex flex-row justify-center gap-4">
            <Button
              className={`mt-4 text-white ${
                Object.keys(fileStructure).length === 0
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
              disabled={Object.keys(fileStructure).length === 0}
              onClick={() => alert("Perform quick scan")}
            >
              Quick scan
            </Button>
            <Button
              className={`mt-4 text-white ${
                Object.keys(fileStructure).length === 0
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
              disabled={Object.keys(fileStructure).length === 0}
              onClick={() => alert("Perform deep scan")}
            >
              Deep scan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
