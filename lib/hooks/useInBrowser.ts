import { useEffect, useState } from "react";

export default function useInBrowser(): boolean {
  const [inBrowser, setInBrowser] = useState(false);
  useEffect(() => {
    if (process.browser) setInBrowser(true);
  }, []);
  return inBrowser;
}
