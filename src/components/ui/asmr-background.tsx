import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const Component = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={cn("flex flex-col items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10")}>
      <h1 className="text-2xl font-bold mb-2 text-white">Component Example</h1>
      <h2 className="text-xl font-semibold text-white">{count}</h2>
      <div className="flex gap-2">
        <button 
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-white" 
          onClick={() => setCount((prev) => prev - 1)}
        >
          -
        </button>
        <button 
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-white" 
          onClick={() => setCount((prev) => prev + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
};
