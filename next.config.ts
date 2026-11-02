import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true, // auto-memoization, so we rarely need useMemo/useCallback
};

export default nextConfig;
