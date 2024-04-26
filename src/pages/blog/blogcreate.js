import React, { useContext, useReducer, useEffect } from "react";
import apiAxios from "../../utils/api";
import AuthContext from "../../context/auth/authcontext";
import { useNavigate, useParams } from "react-router-dom";
import blogReducer, { Actions, InitialState } from "../../reducer/blogreducer";
import { BlogListItem } from "../../components/blog/bloglist";

const BaseForm = ({ blog, dispatch, submitForm, buttonType, children }) => {
  return (
    <div className="container">
      <form onSubmit={submitForm} encType="multipart/form-data">
        <label htmlFor="title">
          <b>Title</b>
        </label>
        <input
          type="text"
          placeholder="Enter Title"
          name="title"
          value={blog.title}
          onChange={(event) => {
            dispatch({
              type: Actions.UPDATE_TITLE,
              payload: event.target.value,
            });
          }}
          required
        />
        <br />
        <label htmlFor="date">
          <b>Date</b>
        </label>
        <input
          type="date"
          placeholder="Enter date"
          name="date"
          value={blog.date}
          onChange={(event) => {
            dispatch({
              type: Actions.UPDATE_DATE,
              payload: event.target.value,
            });
          }}
          required
        />
        <br />
        <label htmlFor="content">
          <b>Content</b>
        </label>
        <textarea
          placeholder="Enter content"
          name="content"
          value={blog.content}
          onChange={(event) => {
            dispatch({
              type: Actions.UPDATE_CONTENT,
              payload: event.target.value,
            });
          }}
          required
        />
        <br />
        <label htmlFor="Image">
          <b>Image</b>
        </label>
        <input
          type="file"
          name="thumbnail"
          onChange={(event) => {
            dispatch({
              type: Actions.UPDATE_IMAGE,
              payload: event.target.files[0],
            });
          }}
        />

        <button type="submit">{buttonType}</button>
      </form>
      {children}
    </div>
  );
};

const UpdateOrDeleteForm = ({ blog, dispatch, user }) => {
  const deleteItem = async (event) => {
    event.preventDefault();
    try {
      await apiAxios.delete(`/blog/${blog.id}/`);
      alert("Operation Completed Successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const updateItem = async (event) => {
    event.preventDefault();
    try {
      const form = new FormData();
      form.append("user", user.id);
      form.append("title", blog.title);
      if (blog.date.length > 0) {
        form.append("date", blog.date);
      }
      form.append("content", blog.content);
      if (blog.thumbnail !== null) {
        form.append("thumbnail", blog.thumbnail, blog.thumbnail.name);
      }

      const { data } = await apiAxios.put(`/blog/${blog.id}/`, form);
      dispatch({ key: Actions.REPLACE_STATE, payload: data });
      alert("Operation completed successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <BaseForm
      blog={blog}
      dispatch={dispatch}
      submitForm={updateItem}
      buttonType={"Update"}
    >
      <button onClick={deleteItem}>Delete</button>
    </BaseForm>
  );
};

const CreateForm = ({ blog, dispatch, user }) => {
  const submitNewItem = async (event) => {
    event.preventDefault();
    try {
      const form = new FormData();
      form.append("user", user.id);
      form.append("title", blog.title);
      if (blog.date.length > 0) {
        form.append("date", blog.date);
      }
      form.append("content", blog.content);
      if (blog.thumbnail !== null) {
        form.append("thumbnail", blog.thumbnail, blog.thumbnail.name);
      }
      await apiAxios.post("/blog/", form);
      dispatch({ key: Actions.REPLACE_STATE, payload: InitialState });
      alert("Submitted Successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <BaseForm
      blog={blog}
      dispatch={dispatch}
      user={user}
      submitForm={submitNewItem}
      buttonType={"Create"}
    ></BaseForm>
  );
};

const BlogCreate = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [blog, dispatch] = useReducer(blogReducer, InitialState);

  const fetchBlog = async (id) => {
    try {
      const { data } = await apiAxios.get(`/blog/${id}`);
      console.log(data);
      dispatch({ type: Actions.REPLACE_STATE, payload: data });
    } catch (error) {
      if (error.response.status === 404) {
        navigate("/edit");
      }
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBlog(id);
    }
  }, [id]);

  if (!id) {
    return <CreateForm blog={blog} dispatch={dispatch} user={user} />;
  } else if (id && blog.user === user.id) {
    return <UpdateOrDeleteForm blog={blog} dispatch={dispatch} user={user} />;
  } else {
    return <BlogListItem item={blog}></BlogListItem>;
  }
};

export default BlogCreate;
