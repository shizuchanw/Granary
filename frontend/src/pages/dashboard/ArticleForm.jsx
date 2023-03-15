import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import TaggingComponent from "../../components/addTag/TaggingComponent";
import "../../quill.css";
import {
  createArticle,
  getArticle,
  updateArticle,
} from "../../utils/articleAPI";

const ArticleForm = () => {
  const navigate = useNavigate();
  const [fandoms, setFandoms] = useState([]);
  const [cps, setCPs] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [grading, setGrading] = useState("");
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const { articleID } = useParams();
  useEffect(() => {
    if (articleID) {
      getArticle(articleID).then((res) => {
        const article = res;
        setFandoms(article.fandoms);
        setCPs(article.cps);
        setCharacters(article.characters);
        setGrading(article.grading);
        setTags(article.tags);
        setTitle(article.title);
        setDescription(article.description);
        setContent(article.content);
      });
    }
  }, []);

  let modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ align: [] }],
      ["link"],
      ["clean"],
    ],
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: title,
      description: description,
      content: content,
      fandoms: fandoms,
      cps: cps,
      characters: characters,
      grading: grading,
      tags: tags,
    };
    // update
    if (articleID) {
      try {
        updateArticle({ payload, articleID }).then((res) => {
          alert("修改成功。");
          navigate("/article/" + articleID);
        });
      } catch (error) {
        console.log("error: ", JSON.stringify(error, null, 4));
        alert("修改失败，请联系管理员。");
      }
    } // create
    else {
      try {
        let id = await createArticle(payload);
        alert("发布成功。");
        navigate("/article/" + id);
      } catch (error) {
        console.log("error: ", JSON.stringify(error, null, 4));
        alert("发布失败，请联系管理员。");
      }
    }
  };

  return (
    <div className="container">
      <h1>发布新文章</h1>
      <form onSubmit={HandleSubmit} className="new-work-box">
        <div>
          <label htmlFor="title" className="form-label-required">
            标题
          </label>
          <div>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="description" className="form-label-required">
            简介
          </label>
          <div>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              required
            />
          </div>
        </div>

        <TaggingComponent
          fandoms={fandoms}
          cps={cps}
          tags={tags}
          characters={characters}
          grading={grading}
          setFandoms={setFandoms}
          setCPs={setCPs}
          setTags={setTags}
          setCharacters={setCharacters}
          setGrading={setGrading}
        />

        <ReactQuill value={content} onChange={setContent} modules={modules} />

        <button type="submit">发布</button>
        <button type="button" onClick={() => navigate(-1)}>
          取消
        </button>
      </form>
    </div>
  );
};

export default ArticleForm;
