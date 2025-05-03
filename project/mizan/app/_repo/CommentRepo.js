import fs from "fs-extra";
import path from "path";
import userRepo from "./UserRepo";

class CommentRepo {
  constructor() {
    this.commentsFilePath = path.resolve("data/comments.json");
  }

  async #readComments() {
    const comments = await fs.readJson(this.commentsFilePath);
    return comments.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  async #writeComments(comments) {
    await fs.writeJson(this.commentsFilePath, comments, { spaces: 2 });
  }

  async getComments(sectionCRN) {
    const comments = await this.#readComments();
    const sectionComments = comments.filter(
      (comment) => comment.sectionCRN === sectionCRN
    );
    // Assign author name to each comment
    const commentsWithAuthor = await Promise.all(
      sectionComments.map(async (comment) => {
        const author = await userRepo.getUser(comment.authorId);
        return {
          ...comment,
          authorName: `${author.firstName} ${author.lastName}`,
        };
      })
    );
    console.log("Comments with author:", commentsWithAuthor);
    return commentsWithAuthor;
  }

  async getCommentReplies(commentId) {
    const comments = await this.#readComments();
    const replies = comments.filter(
      ({ replyToCommentId }) => replyToCommentId === commentId
    );
    // Assign author name to each reply
    const repliesWithAuthor = await Promise.all(
      replies.map(async (reply) => {
        const author = await userRepo.getUser(reply.authorId);
        return {
          ...reply,
          authorName: `${author.firstName} ${author.lastName}`,
        };
      })
    );
    console.log("Replies with author:", repliesWithAuthor);
    return repliesWithAuthor;
  }

  async addComment(comment) {
    const comments = await this.#readComments();
    const newComment = {
      ...comment,
      id: Date.now(),
      createdDate: new Date().toISOString().split("T")[0],
    };

    comments.push(newComment);
    await this.#writeComments(comments);
    return newComment;
  }

  async deleteComment(commentId) {
    const comments = await this.#readComments();
    // Keep comments that are neither the target comment nor replies to it
    const filteredComments = comments.filter(
      ({ id, replyToCommentId }) =>
        !(id == commentId || replyToCommentId == commentId)
    );
    console.log("Filtered comments:", filteredComments);
    await this.#writeComments(filteredComments);
  }
}

export default new CommentRepo();
