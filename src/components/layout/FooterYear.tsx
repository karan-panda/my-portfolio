import { cacheLife } from "next/cache";

/** Copyright year, computed at build/revalidation time (Cache Components). */
export async function FooterYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
