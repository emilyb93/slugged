import React, { useState, useEffect } from "react";
import { fetchComments } from "../../api";
import CommentCard from "../CommentCard/CommentCard";

export default function CommentsList({ article_id }) {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchComments(article_id)
      .then(setComments)
      .catch(() => {
        setError(true);
      });
  }, [article_id]);

  if (error)
    return (
      <section>
        <p>Sorry something went wrong there</p>
      </section>
    );

  return (
    <section>
      {comments.length < 1
        ? null
        : comments.map((comment) => (
            <CommentCard
              key={`comment-${comment.comment_id}`}
              comment={comment}
            />
          ))}
    </section>
  );
}
