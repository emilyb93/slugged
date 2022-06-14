import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://news-server-project.herokuapp.com/api",
});

export const fetchArticles = async (slug) => {
  const res = await newsApi.get("/articles", { params: { topic: slug } });

  return res.data.articles;
};
