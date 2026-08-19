import React from "react";
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
  Stories,
} from "@storybook/blocks";

const css = `
  /* Remove only max-width from every Storybook wrapper level.
     Padding is intentionally left intact — the Primary/Canvas block uses
     negative margins equal to the wrapper padding; stripping it would push
     the canvas under the sidebar. */
  #storybook-docs,
  #storybook-docs > div,
  #storybook-docs > div > div,
  #storybook-docs > div > div > div {
    max-width: none !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }

  /* Our layout sits inside the naturally-padded wrapper */
  .eds-docs-split {
    display: grid;
    grid-template-columns: 60fr 40fr;
    gap: 1.5rem;
    align-items: start;
    width: 100%;
  }

  /* Left: visual examples — scrolls with the page */
  .eds-docs-split__preview {
    min-width: 0;
    width: 100%;
  }

  .eds-docs-split__preview > * {
    width: 100%;
    box-sizing: border-box;
  }

  /* Right: props reference — sticky while left scrolls */
  .eds-docs-split__controls {
    min-width: 0;
    position: sticky;
    top: 1rem;
    max-height: calc(100vh - 3rem);
    overflow-y: auto;
  }

  /* Below 1024px: stack vertically */
  @media (max-width: 1024px) {
    .eds-docs-split {
      grid-template-columns: 1fr;
    }
    .eds-docs-split__controls {
      position: static;
      max-height: none;
      overflow-y: visible;
    }
  }
`;

export function DocsPage() {
  return (
    <>
      <style>{css}</style>
      <div className="eds-docs-split">
        <div className="eds-docs-split__preview">
          <Primary />
          <Stories includePrimary={false} />
        </div>
        <div className="eds-docs-split__controls">
          <Title />
          <Subtitle />
          <Description />
          <Controls />
        </div>
      </div>
    </>
  );
}
