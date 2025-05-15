"use client";

import { Copy } from "lucide-react";
import { Button } from "../ui/button";

interface CopyStringProps {
  string: string;
}

export default function CopyString({ string }: CopyStringProps) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(string);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="relative group">
      <Button
        variant="ghost"
        className="size-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={copyToClipboard}
      >
        <Copy className="size-4" />
      </Button>
    </div>
  );
}
