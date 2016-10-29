declare namespace webcomponents {
    export interface CustomElementsPolyfill {
      define(name: string, element: any): void;
    }
}

interface Window {
  customElements: webcomponents.CustomElementsPolyfill;
}
