import { makeRequest } from "./AxiosService";

const getComments = (articleID) => {
  return makeRequest("comments/by-article/" + articleID);
};

const createComment = (payload) => {
  const data = {
    content: payload.message,
    article: payload.articleID,
    parent: payload.parentID,
  };
  return makeRequest("comments/comment/", {
    method: "POST",
    data: data,
  });
};

const updateComment = (payload) => {
  const data = {
    content: payload.message,
  };
  return makeRequest("comments/comment/" + payload.id + "/", {
    method: "PUT",
    data: data,
  });
};

const deleteComment = (id) => {
  return makeRequest("comments/comment/" + id + "/", {
    method: "DELETE",
  });
};
export { getComments, createComment, updateComment, deleteComment };
