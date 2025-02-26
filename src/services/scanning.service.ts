import axios, { AxiosError } from "axios";
import { Session } from "./scans.types";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export interface UploadResponse {
  message: string;
  sessionId: string;
}

export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post<UploadResponse>(
    `${BASE_URL}/uploads/files`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return response.data.sessionId;
};

export const uploadFolder = async (files: FileList): Promise<string> => {
  const formData = new FormData();
  Array.from(files).forEach((file) => formData.append("folder", file));

  const response = await axios.post<UploadResponse>(
    `${BASE_URL}/uploads/folders`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return response.data.sessionId;
};

export const fetchSessionStatus = async (sessionId: string) => {
  try {
    const response = await axios.get<Session>(
      `${BASE_URL}/scans/${sessionId}/stream`,
      {
        timeout: 2_000, // Short timeout for immediate result case
      }
    );
    if (response.headers["content-type"].includes("application/json")) {
      return { data: response.data, isStreaming: false };
    }
  } catch (err) {
    if ((err as AxiosError).status === 404) {
      console.log({ err });
      return { data: undefined, isStreaming: false };
    }
    console.warn(
      "Session not immediately available, switching to SSE stream..."
    );
  }

  return { data: undefined, isStreaming: true };
};

export const subscribeToSessionUpdates = (
  sessionId: string,
  onUpdate: (_: any) => any,
  onError: (_: any) => any
) => {
  const eventSource = new EventSource(`${BASE_URL}/scans/${sessionId}/stream`);

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onUpdate(data);

    if (["completed", "failed", "partially_failed"].includes(data.status)) {
      eventSource.close(); // Close connection when session is done
    }
  };

  eventSource.onerror = (err) => {
    console.error("SSE error:", err);
    onError("Failed to connect to stream.");
    eventSource.close();
  };

  return () => eventSource.close(); // Cleanup function
};
