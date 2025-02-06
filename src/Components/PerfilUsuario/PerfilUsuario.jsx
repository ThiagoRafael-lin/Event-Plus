import React, { useContext } from "react";
import { UserContext } from "../../context/AuthContext";
import iconeLogout from "../../Assets/images/icone-logout.svg";
import "./PerfilUsuario.css";
import { Link, useNavigate } from "react-router-dom";

const PerfilUsuario = () => {
    const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);

const logout = () => {
    localStorage.clear();
    setUserData({})
    navigate("/")
}

  return (
    <div className="perfil-usuario">
      {userData.name ? (
        <>
          <span className="perfil-usuario__menuitem">{userData.name}</span>

          <img
          onClick={logout}
            title="Deslogar"
            className="perfil-usuario__icon"
            src={iconeLogout}
            alt="imagem ilustrativa de uma porta de saída do usuário "
          />
        </>
      ) : (
        <Link to="/login" className="perfil-usuario__menuitem">
          Login
        </Link>
      )}
    </div>
  );
};

export default PerfilUsuario;
