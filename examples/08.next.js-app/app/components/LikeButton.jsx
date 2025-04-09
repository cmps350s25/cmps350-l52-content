"use client";

import { incrementLike } from "@/app/actions/postActions.js";
import { useState } from "react";
import styles from "./LikeButton.module.css";

export default function LikeButton({ postId, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);

  return (
    <span>
      <span>Likes Count: {likes}</span>
      <button
        className={styles.likeButton}
        onClick={async () => {
          const updatedLikes = await incrementLike(postId);
          setLikes(updatedLikes);
        }}
      >
        Like
      </button>
    </span>
  );
}
