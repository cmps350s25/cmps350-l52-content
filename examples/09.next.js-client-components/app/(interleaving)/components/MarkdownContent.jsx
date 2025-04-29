import { readFile } from "fs/promises";
import path from "path";
import { remark } from "remark";
import html from "remark-html";
import styles from "./styles.module.css";

/**
 * A Server Component that performs server-side operations (reading a file)
 * and renders content. Designed to be passed as children to other components.
 */
export default async function MarkdownContent({ contentFile }) {
  let content = `Default content for ${contentFile}.`;
  let errorReading = false;

  try {
    // Construct the full path relative to the project root
    // and 'content' subdirectory
    const filePath = path.join(process.cwd(), "content", contentFile);

    console.log(`[ServerContentSection] Reading file: ${filePath}`);

    // Read the file content (server-only operation)
    content = await readFile(filePath, "utf-8");

    // Use remark to convert markdown into HTML string
    content = (await remark().use(html).process(content)).toString();

    console.log(`[ServerContentSection] : Markdown content to HTML ${content}`);
  } catch (error) {
    console.error(
      `[ServerContentSection] Could not read server content file '${contentFile}':`,
      error.message
    );
    content = `Error loading content from ${contentFile}. Please ensure the file exists in the 'content' directory at the project root.`;
    errorReading = true;
  }

  // This JSX is rendered on the server
  return (
    <div>
      <p>
        <em>(This section below was rendered entirely on the server)</em>
      </p>
      {errorReading ? (
        <p className={styles.errorMessage}>{content}</p>
      ) : (
        <div
          className={styles.markdownContent}
          // Use dangerouslySetInnerHTML with care to render HTML content
          // Unless the markup is coming from a trusted source,
          // this can introduce an XSS vulnerability
          // https://en.wikipedia.org/wiki/Cross-site_scripting
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </div>
  );
}
