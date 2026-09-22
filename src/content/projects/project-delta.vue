<template>
  <CaseStudy>
    <template #overview>
      <p basics-text>
        Tool with a web-based interface and an API for parsing large PDF files into Markdown format, supporting both
        standard
        <ExternalLink :address="links.markdown" label="Markdown" /> and
        <ExternalLink :address="links.jspWiki" label="JSPWiki" /> syntax.
      </p>
      <p>
        The main challenges of the project included dealing with the complex structure of PDF files, which made it
        difficult to combine letters into words and then into paragraphs. Additionally, some steps required recreating
        graphics using PDF graphic operators, such as detecting tables or other diagrams created by these operators.
      </p>
    </template>

    <template #responsibilities>
      <p>Developed a text parsing system that preserves basic formatting, such as italic and bold text</p>
      <p>Implemented the image parsing process to extract and convert images from PDF files</p>
      <p>Created a table parsing process to accurately detect and convert table structures</p>
      <p>Developed a parsing process for various list formats, ensuring proper representation in Markdown</p>
      <p>Added the ability to render entire pages or parts of pages as images</p>
    </template>

    <template #team>
      <p>1 developer</p>
    </template>

    <template #tech>
      <p>Frontend: <ExternalLink :address="links.vue" label="Vue" /></p>
      <p>Backend: <ExternalLink :address="links.nodejs" label="Node.js" />, <ExternalLink :address="links.express" label="Express" />, <ExternalLink :address="links.typescript" label="TypeScript" /></p>
      <p>Formats: <ExternalLink :address="links.pdf" label="PDF" />, <ExternalLink :address="links.markdown" label="Markdown" />, <ExternalLink :address="links.jspWiki" label="JSPWiki" /></p>
    </template>
  </CaseStudy>
</template>
