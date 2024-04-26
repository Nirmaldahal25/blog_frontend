import React from "react";
import "./style.css";

const getParameter = (url) => {
  if (url) {
    const urlParams = new URL(url);
    if (urlParams.searchParams.has("page")) {
      return urlParams.searchParams.get("page");
    }
  }
  return 1;
};

const BlogList = ({ pagination = true, setPage, previous, next, children }) => {
  const handleClick = async (event) => {
    event.preventDefault();
    const url = event.target.getAttribute("href");
    const parm = getParameter(url);
    setPage(parm);
  };
  return (
    <div className="container">
      <div className="row">{children}</div>
      {pagination ? (
        <div className="pagination">
          <a
            href={previous ?? "#"}
            onClick={handleClick}
            style={{ pointerEvents: previous === null ? "none" : "auto" }}
          >
            ❮
          </a>
          <a
            href={next ?? "#"}
            onClick={handleClick}
            style={{ pointerEvents: next === null ? "none" : "auto" }}
          >
            ❯
          </a>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

const BlogListItem = ({ item, ...props }) => {
  return (
    <div className="card">
      <h2>{item.title}</h2>
      <h5>{item.username}</h5>
      <h5>{item.date}</h5>

      {item.image_url.length > 0 ? (
        <img
          stype={{
            height: "100px",
            width: "100px",
            maxHeight: "100px !important",
            maxWidth: "100px !important",
          }}
          src={item.image_url}
        ></img>
      ) : (
        <div
          className="fakeimg"
          style={{ height: "100px", width: "100px" }}
        ></div>
      )}

      <p>{item.content}</p>
      <a href={`/edit/${item.id}`}>View</a>
    </div>
  );
};

export default BlogList;
export { BlogListItem };
