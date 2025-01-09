declare module 'next-svgr' {
    import type { NextConfig } from 'next';
    
    function withSvgr(config: NextConfig): NextConfig;
    
    export default withSvgr;
  }