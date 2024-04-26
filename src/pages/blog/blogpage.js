import React, { useState, useEffect, useContext } from "react";
import apiAxios from "../../utils/api";
import BlogList, { BlogListItem } from "../../components/blog/bloglist";
import AuthContext from "../../context/auth/authcontext";

const BlogListPage = (props) => {
  const { user } = useContext(AuthContext);
  const [personal, setPersonal] = useState(false);

  const [page, setPage_] = useState(1);
  const [blogs, setBlogs] = useState({
    previous: null,
    next: null,
    count: 0,
    results: [],
  });

  const setPage = (pgno) => {
    setPage_(pgno);
  };

  const fetchBlogs = async (pg) => {
    let url = `/blog/?page=${pg}`;
    if (personal) {
      url += `&user=${user.id}`;
    }
    try {
      const { data } = await apiAxios.get(url);
      setBlogs(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  return (
    <div className="container">
      {user ? (
        <button
          onClick={() => {
            setPersonal(!personal);
            setPage(1);
          }}
        >
          {personal ? "Show all" : "Show personal"}
        </button>
      ) : (
        <></>
      )}
      <BlogList setPage={setPage} previous={blogs.previous} next={blogs.next}>
        {blogs.results.map((value, index) => {
          return <BlogListItem key={index} item={value}></BlogListItem>;
        })}
      </BlogList>
    </div>
  );
};

export default BlogListPage;
