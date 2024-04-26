import React, { useState, useEffect } from "react";
import apiAxios from "../../utils/api";
import BlogList, { BlogListItem } from "../../components/blog/bloglist";

const BlogListPage = (props) => {
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
    try {
      const { data } = await apiAxios.get(`/blog/?page=${pg}`);
      setBlogs(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogs(page);
  }, [page]);
  return (
    <BlogList setPage={setPage} previous={blogs.previous} next={blogs.next}>
      {blogs.results.map((value, index) => {
        return <BlogListItem key={index} item={value}></BlogListItem>;
      })}
    </BlogList>
  );
};

export default BlogListPage;
