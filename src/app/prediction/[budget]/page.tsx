"use client";

import { useParams } from "next/navigation";

export default function Prediction() {
  const param = useParams<{ budget: string }>;
  const { budget } = useParams<{ budget: string }>();

  console.log("Budget:", budget);

  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-gray-700 via-gray-900 to-black">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1
              className="mr-3 text-5xl font-semibold"
              style={{ color: "white" }}
            >
              Work In Progress! Hello 
            </h1>
            <p className="text-white mt-4">
              Budget: {budget} {/* Display the retrieved budget */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
