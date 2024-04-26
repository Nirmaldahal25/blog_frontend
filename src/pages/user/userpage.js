import React, { useContext } from "react";
import AuthContext from "../../context/auth/authcontext";
const UserPage = (props) => {
  const { user, setUser } = useContext(AuthContext);

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(user).map((key, index) => {
            return (
              <tr key={index}>
                <td>{key}</td>
                <td>{user[key]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserPage;
