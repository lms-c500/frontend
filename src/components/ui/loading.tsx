"use client";
export function LoadingSpinner() {
  return (
    <div className="m-4">
      <svg
        width="96"
        height="96"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>
          {`
      .spinner {
        fill: #FFFFFF;
        animation: spinner-animation 1.2s cubic-bezier(0.52, 0.6, 0.25, 0.99) infinite;
      }
      .spinner-delayed {
        animation-delay: 0.6s;
      }
      @keyframes spinner-animation {
        0% {
          transform: translate(12px, 12px) scale(0);
          opacity: 1;
        }
        100% {
          transform: translate(0, 0) scale(1);
          opacity: 0;
        }
      }
    `}
        </style>
        <path
          className="spinner"
          d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"
          transform="translate(12, 12) scale(0)"
        />
        <path
          className="spinner spinner-delayed"
          d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"
          transform="translate(12, 12) scale(0)"
        />
      </svg>
    </div>
  );
}

export function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900">
      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
