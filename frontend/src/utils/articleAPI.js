import { fanficPath } from "./constants";
import { makeRequest } from "./AxiosService";

const getAllTags = () => {
  return makeRequest(fanficPath + "all-tags/");
};

const getArticlesByAuthor = (authorID) => {
  return makeRequest(fanficPath + "author/" + authorID);
};

const getArticlesByTag = (tag, tagType) => {
  return makeRequest(fanficPath + "tag/" + tagType + "/" + tag);
};

const getArticlesByQuery = (query) => {
  return makeRequest(fanficPath + "search" + query);
};

const getArticle = (id) => {
  return makeRequest(fanficPath + "article/" + id + "/");
};

const createArticle = (payload) => {
  return makeRequest(fanficPath + "article/", {
    method: "POST",
    data: payload,
  });
};

const updateArticle = ({ payload, articleID }) => {
  return makeRequest(fanficPath + "article/" + articleID + "/", {
    method: "PUT",
    data: payload,
  });
};

const deleteArticle = (id) => {
  return makeRequest(fanficPath + "article/" + id + "/", {
    method: "DELETE",
  });
};

const toggleLike = (articleId) => {
  return makeRequest("/toggle-like/" + articleId, {
    method: "POST",
  });
};

const toggleBookmark = (articleId) => {
  return makeRequest("/toggle-bookmark/" + articleId, {
    method: "POST",
  });
};

const getLikedArticles = () => {
  return makeRequest(fanficPath + "liked");
};
const getBookmarkedArticles = () => {
  return makeRequest(fanficPath + "bookmarked");
};

export {
  getAllTags,
  getArticlesByAuthor,
  getArticlesByTag,
  getArticlesByQuery,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  toggleLike,
  toggleBookmark,
  getLikedArticles,
  getBookmarkedArticles,
};
