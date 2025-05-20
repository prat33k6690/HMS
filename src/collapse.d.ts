// src/types/react-collapse.d.ts
declare module "react-collapse" {
  import * as React from "react";

  interface CollapseProps {
    isOpened: boolean;
    children?: React.ReactNode;
    // Add other props if you want for better type safety
    // e.g. springConfig?, theme?, etc.
  }

  export class Collapse extends React.Component<CollapseProps> {}
}
