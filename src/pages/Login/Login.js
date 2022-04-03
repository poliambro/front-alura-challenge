import { useState } from "react";
import { useNavigate } from "react-router";
import { User } from "../../models/User";
import { ConnectionFactory } from "../../services/ConnectionFactory";
import { UserDao } from "../../dao/UserDao";
import GlobalStyle from "../../theme/globalStyles";
import "../../App.css";
import "../../theme/fonts.css";

export default function Login() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleUserNameChange = (event) => {
    event.preventDefault();
    setUserName(event.target.value);
  };

  const saveUser = () => {
    const user = new User(userName);
    ConnectionFactory.getConnection()
      .then((connection) => new UserDao(connection))
      .then((dao) => dao.adiciona(user))
      .then(() => navigate("/home", { state: user }))
      .catch((error) => console.error(error));
    ConnectionFactory._closeConnection();
  };

  return (
    <div>
      <GlobalStyle />
      <section>
        <input
          type="text"
          placeholder="Digite seu nome..."
          value={userName}
          onChange={(e) => handleUserNameChange(e)}
        />
        <button type="button" onClick={saveUser}>
          Salvar
        </button>
      </section>
    </div>
  );
}