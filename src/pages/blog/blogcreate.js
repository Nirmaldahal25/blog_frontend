import React, { useContext } from "react";
import apiAxios from "../../utils/api";
import AuthContext from "../../context/auth/authcontext";

const BlogCreate = () => {
  const { user } = useContext(AuthContext);

  const submitForm = async (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("title", event.target.title.value);
    formdata.append("date", event.target.date.value);
    formdata.append("content", event.target.content.value);
    formdata.append("user", user.id);
    console.log(event.target);
    if (event.target.files) {
      const file = event.target.files[0];
      formdata.append("thumbnail", file, file.filename);
    }
    try {
      await apiAxios.post("/blog/", formdata);
      alert("Submitted Successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <form onSubmit={submitForm}>
        <div className="container">
          <label htmlFor="title">
            <b>Title</b>
          </label>
          <input type="text" placeholder="Enter Title" name="title" required />

          <label htmlFor="date">
            <b>Date</b>
          </label>
          <input type="date" placeholder="Enter date" name="date" required />
          <br />
          <label htmlFor="content">
            <b>Content</b>
          </label>
          <input
            type="text"
            placeholder="Enter content"
            name="content"
            required
          />

          <label htmlFor="Image">
            <b>Image</b>
          </label>
          <input type="file" placeholder="Choose Image" name="thumbnail" />

          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
};

export default BlogCreate;
