import Link from "next/link";
import Accordion from "../components/Accordion";
import MarkdownContent from "../components/MarkdownContent";

export default function HomePage() {
  // This Server Component renders the Client Component <Accordion>
  // and passes Server Components <ServerContentSection> as children.
  return (
    <div>
      <h1>Server Component (SC) renders Client Component (CC) - Demo</h1>
      <Link href="/products/123">Product 123 (SC Renders a CC)</Link>
      <br />
      <Link href="/products/456">Product 456 (SC Renders a CC)</Link>
      <br />
      <br />
      <h1>CC accepts SC via children Prop (CC &lt;- SC as children) - Demo</h1>

      <Accordion title="Readme.md (Server Rendered)">
        {/* This is a Server Component being passed as children */}
        <MarkdownContent contentFile="README.md" />
      </Accordion>

      <Accordion title="Static Content Section">
        {/* You can also pass simple JSX rendered by the parent SC */}
        <p>
          This is just static JSX defined within the parent server component.
        </p>
      </Accordion>
    </div>
  );
}
