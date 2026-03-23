import { Suspense } from "react";
import LucioPageClient from "../../components/LucioPageClient";

export default function LucioPage() {
  return (
    <Suspense fallback={null}>
      <LucioPageClient />
    </Suspense>
  );
}
