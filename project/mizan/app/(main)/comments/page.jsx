import { getComments } from "@/app/actions/comments";
import { getCurrentUser } from "@/app/actions/auth";
import CommentsList from "./components/CommentsList";
import CommentForm from "./components/CommentForm";
import styles from "./comments.module.css";

export default async function CommentsPage({ searchParams }) {
  const user = await getCurrentUser();

  // Get the sectionCRN directly from URL params
  const params = await searchParams;
  const sectionCRN = params?.sectionCRN;

  // If we have a sectionCRN, fetch the comments for that section
  const comments = sectionCRN ? await getComments(sectionCRN) : [];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          {sectionCRN ? `Comments for Section ${sectionCRN}` : "Comments"}
        </h1>
      </header>

      {/* Display the comment form for creating new comments */}
      {sectionCRN && <CommentForm sectionCRN={sectionCRN} />}

      {/* Display the list of comments */}
      {sectionCRN ? (
        comments.length > 0 ? (
          <CommentsList comments={comments} />
        ) : (
          <div className={styles.noComments}>
            No comments yet. Be the first to add one!
          </div>
        )
      ) : (
        <div className={styles.noComments}>
          Please provide a section to view comments. Add
          ?sectionCRN=YourSectionCRN to the URL.
        </div>
      )}
    </div>
  );
}
