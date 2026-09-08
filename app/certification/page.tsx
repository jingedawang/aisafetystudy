import { Suspense } from "react";
import CertificatePage from "./CertificatePage";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CertificatePage />
    </Suspense>
  );
}
