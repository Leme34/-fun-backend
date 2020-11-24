export {};

declare global {
  interface Window {
    SITE_CONFIG: {
      [key: string]: any;
    };
  }
  interface StringMap {
    [key: string]: any;
  }
}
