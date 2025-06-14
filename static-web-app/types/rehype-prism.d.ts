declare module '@mapbox/rehype-prism' {
  import { Plugin } from 'unified';

  interface RehypePrismOptions {
    subset?: string[];
    ignoreMissing?: boolean;
  }

  const rehypePrism: Plugin<[RehypePrismOptions?]>;
  export default rehypePrism;
}
