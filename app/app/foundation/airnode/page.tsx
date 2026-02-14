import React, { Suspense } from "react";
import AirnodePageContent from "./AirnodePageContent";

export default function AirnodePage() {
  return (
    <Suspense fallback={<div>Loading Airnode...</div>}>
      <AirnodePageContent />
    </Suspense>
  );
}