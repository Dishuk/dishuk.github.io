<template>
  <p basics-text>
    Tool with a web-based interface and an API for parsing large PDF files into Markdown format, supporting both
    standard
    <ExternalLink :address="links.markdown" label="Markdown" /> and
    <ExternalLink :address="links.jspWiki" label="JSPWiki" /> syntax.
  </p>
  <p basics-text>
    The main challenges of the project included dealing with the complex structure of PDF files, which made it
    difficult to combine letters into words and then into paragraphs. Additionally, some steps required recreating
    graphics using PDF graphic operators, such as detecting tables or other diagrams created by these operators.
  </p>
  <p basics-text>
    As the sole developer, I built the parsing pipeline for text with basic formatting such as bold and italics, images,
    tables and various list formats. I also added the option to render whole pages or selected regions as images.
  </p>
  <h3 basics-heading basics-text>Tech Stack</h3>
  <div basic-list>
      <p>Frontend: <ExternalLink :address="links.vue" label="Vue" /></p>
      <p>Backend: <ExternalLink :address="links.nodejs" label="Node.js" />, <ExternalLink :address="links.express" label="Express" />, <ExternalLink :address="links.typescript" label="TypeScript" /></p>
      <p>Formats: <ExternalLink :address="links.pdf" label="PDF" />, <ExternalLink :address="links.markdown" label="Markdown" />, <ExternalLink :address="links.jspWiki" label="JSPWiki" /></p>
  </div>
</template>
