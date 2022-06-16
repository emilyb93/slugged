import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticles } from "../../api";
import infoContext from "../../contexts/InfoContext";
import ArticleList from "../ArticleList.jsx/ArticleList";

function Slugged({ topics }) {
  const [articles, setArticles] = useState([]);
  const { slug } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [selectedSort, setSelectedSort] = useState({
    sort_by: "date",
    order: "desc",
  });

  const { setInfo } = useContext(infoContext);

  useEffect(() => {
    const { sort_by, order } = selectedSort;

    fetchArticles(slug, sort_by, order)
      .then((fetchedArticles) => {
        setArticles(fetchedArticles);
        setIsLoading(false);
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
  }, [slug, selectedSort]);

  useEffect(() => {
    if (slug) {
      setInfo(() => {
        let slugObj;
        topics.forEach((topic) => {
          if (topic.slug === slug) {
            slugObj = topic;
          }
        });
        return slugObj;
      });
    }
  }, [slug, topics]);

  if (isLoading) return <p>... Loading ...</p>;
  if (error) return <p>Somethings gone wrong there sorry</p>;

  return <ArticleList articles={articles} setSelectedSort={setSelectedSort} />;
}

export default Slugged;
