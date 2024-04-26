import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authcontext";
const UserPage = (props) => {
  const { user, setUser } = useContext(AuthContext);

  return (
    <div className="container">
      <table>
        <th>
          <th>Key</th>
          <th>Value</th>
        </th>
        {Object.keys(user).map((key, index) => {
          return (
            <tr key={index}>
              <td>{key}</td>
              <td>{user[key]}</td>
            </tr>
          );
        })}
      </table>

      <section className="blogs">
        <h2>My personal Blogs</h2>
      </section>
    </div>
  );
};

export default UserPage;
