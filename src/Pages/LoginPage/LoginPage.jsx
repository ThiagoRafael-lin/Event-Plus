import React, { useContext, useEffect, useState } from "react";
import ImageIllustrator from "../../Components/ImageIllustrator/ImageIllustrator";
import logo from "../../Assets/images/logo-pink.svg";
import { Input, Button } from "../../Components/FormComponents/FormComponents";

import "./LoginPage.css";
import loginImage from "../../Assets/images/login.svg";
import api from "../../Services/Service";
import { UserContext, UserDecodeToken } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [user, setUser] = useState({ email: "", senha: "" });
  //dados globais do usuario

  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData.name) navigate("/")
  }, [userData])

  async function handleSubmit(e) {
    e.preventDefault();
    if (user.email.length >= 3 && user.senha.length > 3);
    //chamar a api
    try {
      const promise = await api.post("/Login", {
        email: user.email,
        senha: user.senha,
      });

      const userFullToken = UserDecodeToken(promise.data.token);

      setUserData(userFullToken);
      localStorage.setItem("token", JSON.stringify(userFullToken));
  navigate("/");

    } catch (error) {
      //aqui aparece quando da erro
      alert("Usuario ou Senha invalidos, ou conexão interrompida");
    }
    console.log(user);
  }

  return (
    <div className="layout-grid-login">
      <div className="login">
        <div className="login__illustration">
          <div className="login__illustration-rotate"></div>
          <ImageIllustrator
            imageRender={loginImage}
            imageName="login"
            altText="Imagem de um homem em frente de uma porta de entrada"
            additionalClass="login-illustrator "
          />
        </div>

        <div className="frm-login">
          <img src={logo} className="frm-login__logo" alt="" />

          <form className="frm-login__formbox" onSubmit={handleSubmit}>
            <Input
              additionalClass="frm-login__entry"
              type="email"
              id="login"
              name="login"
              required={true}
              value={user.email}
              manipulationFunction={(e) => {
                setUser({
                  ...user,
                  email: e.target.value.trim(),
                });
              }}
              placeholder="Username"
            />
            <Input
              additionalClass="frm-login__entry"
              type="password"
              id="senha"
              name="senha"
              required={true}
              value={user.senha}
              manipulationFunction={(e) => {
                setUser({
                  ...user,
                  senha: e.target.value,
                });
              }}
              placeholder="****"
            />

            <a href="" className="frm-login__link">
              Esqueceu a senha?
            </a>

            <Button
              textButton={"Login"}
              id="btn-login"
              name="btn-login"
              type="submit"
              additionalClass="frm-login__button"
              manipulationFunction={() => {}}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
