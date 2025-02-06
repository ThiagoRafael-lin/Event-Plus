import React, { useEffect, useState } from "react";
import "./TipoEventoPage.css";
import Title from "../../Components/Title/Title";
import MainContent from "../../Components/MainContent/MainContent";
import ImageIllustrator from "../../Components/ImageIllustrator/ImageIllustrator";
import imageEvento from "../../Assets/images/tipo-evento.svg"
import Container from "../../Components/Container/Container";
import { Button, Input } from "../../Components/FormComponents/FormComponents";
import "../../Components/FormComponents/FormComponents.css"
import api from "../../Services/Service"
import Tabletp from "./Tabletp/Tabletp";
import Notification from "../../Components/Notification/Notification"
import Spinner from "../../Components/Spinner/Spinner"

const TipoEventoPage = () => {
  
  const [frmEdit, setFrmEdit] = useState(false)//boolean
  const [titulo,setTitulo] = useState("");//string
  const [tipoEvento, setTipoEvento] = useState([]);//array

  const [showSpinner, setShowSpinner] = useState(false);
  
  const [notifyUser, setNotifyUser] = useState({});

  const [idEvento, setIdEvento] = useState(null);



  
  useEffect(() => {
    async function getTiposEvento() {

      setShowSpinner(true);

      try {
        const promise = await api.get("/TiposEvento");
        console.log(promise.data);
        setTipoEvento(promise.data)
      } catch (error) {
        setNotifyUser({
          titleNote: "Atenção",
          textNote: `Deu ruim na API`,
          imgIcon: "danger",
          imgAlt:
            "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
          showMessage: true
        });
      }

      setShowSpinner(false);
    }
    getTiposEvento();
    console.log("A Home foi montada!!!");
  }, [])

  

  async function getState()
  {
    try {
      const retornoGet = await api.get("/TiposEvento");
      setTipoEvento(retornoGet.data)
    } catch (error) {
      alert("Algo deu Errado")
    }
  }
  
  async function handleSubmit(e) {
    //parar o submit do formulario
    e.preventDefault();
    //validar pelo menos 3 caracteres
    if (titulo.trim().length < 3) {
      alert("O título deve conter mais de três caracteres")
      return;
      //chamar a api
    }
    try {
      const retorno = await api.post("/TiposEvento", {titulo}) /* {titulo:titulo} para {titulo} short sintaxe quando o valor da propriedade possuir o mesmo nome podera ser usado apenas uma vez*/
      setNotifyUser({
        titleNote: "Sucesso",
        textNote: `Cadastrado com sucesso!`,
        imgIcon: "success",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true
      }); 
      console.log(retorno.data);
      setTitulo("")
      getState();
    } catch (e) {
      setNotifyUser({
        titleNote: "Atenção",
        textNote: `Erro ao cadastrar`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true
      });
    }

    //pasta do notifications e a do spinner
  };

  function editActionAbort() {
    setFrmEdit(false);
    setTitulo("");
    setIdEvento(null)
  }

  async function handleUpdate(e) {    
    //parar o submit do formulario
    e.preventDefault();
    //validar pelo menos 3 caracteres
    if (titulo.trim().length < 3) {
      alert("O título deve conter mais de três caracteres")
      return;
    }
      //chamar a api
      try {
        const retorno = await api.put(`/TiposEvento/${idEvento}`, {titulo})

        setNotifyUser({
          titleNote: "Sucesso",
          textNote: `Atualizado com sucesso!`,
          imgIcon: "success",
          imgAlt:
            "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
          showMessage: true
        });

        setTitulo("")
        getState();

        editActionAbort()

      } catch (error) {
        setNotifyUser({
          titleNote: "Atenção",
          textNote: `Falha na atualização`,
          imgIcon: "danger",
          imgAlt:
            "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
          showMessage: true
        });
      }
    }
  

    // atualização dos dados
    async function showUpdateForm(idElemento) {

      setFrmEdit(true);
      //fazer um getById para pegar os dados
      //alert(idElemento)
      try {
        const retorno = await api.get(`/TiposEvento/${idElemento}`)

        setTitulo(retorno.data.titulo)

        setIdEvento(retorno.data.idTipoEvento)
      } catch (error) {
        alert("Não foi possivel mostrar a tela de edição. Tente novamente")
      }

      // Input Atualizar

    };
    
 async function handleDelete(id) {
    try {
      const retorno = await api.delete(`/TiposEvento/${id}`);
      setNotifyUser({
        titleNote: "Sucesso",
        textNote: `Apagado com sucesso!`,
        imgIcon: "success",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true
      }); 
      getState();
    } catch (error) {
      setNotifyUser({
        titleNote: "Atenção",
        textNote: `Erro ao tentar apagar`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true
      });
    }
  };

//filter no array onde todos que serem diferentes do apagado, retornando um array modificado. atualizar state com o novo array


  return (

    
    <MainContent>
      <Notification {...notifyUser} setNotifyUser={setNotifyUser}/>
      {showSpinner ? <Spinner /> : null}

    {/* Cadastro de tipos de evento */}
    <section className="cadastro-evento-section">
    <Container>
      <div className="cadastro-evento__box">
      <Title titleText={"Cadastro Tipos de Evento"} />

      <ImageIllustrator 
      alterText={"???????"}
      imageRender={imageEvento}
      />

      <form 
      className="ftipo-evento"
      onSubmit={frmEdit ? handleUpdate : handleSubmit}>

        {!frmEdit ? 
      /*Cadastrar*/

        (
        <>
        
          <Input
            type={"text"}
            id={"titulo"}
            placeholder={"Título"}
            required={"required"}
            name={"titulo"} // usa a propriedade name para postar no formulario
            value={titulo}
            manipulationFunction={
              (e) => {
                setTitulo(e.target.value)
              }
            }

          />
          <span>{titulo}</span>
          <Button
            type={"submit"}
            id={"botao"}
            name={"button"}
            textButton={"Cadastrar"}
          />

        </>) 
        : 
        /*Atualizar*/

            <>
              <Input 
                id="titulo"
                placeholder="Título"
                name="titulo"
                type="text"
                required="required"
                value={titulo}
                manipulationFunction={(e) => {
                  setTitulo(e.target.value)
                }}
              />

              <div className="buttons-editbox">
                <Button
                  textButton="Atualizar"
                  id="atualizar"
                  name="atualizar"
                  type="submit"
                  additionalClass="button-component--middle"
                />

                <Button
                  textButton="Cancelar"
                  id="cancelar"
                  nam="cancelar"
                  type="button"
                  manipulationFunction={editActionAbort}
                  additionalClass="button-component--middle"
                />
              </div>
            </>
        }

      </form>

      </div>

    </Container>
    </section>


    {/* Listagem de tipos de eventos */}
    <section className="lista-eventos-section">
        <Container>
          <Title  titleText={"Lista Tipos de Eventos"} color="white" />

          <Tabletp
            dados={tipoEvento}
            fnUpdate={showUpdateForm}
            fnDelete={handleDelete}
          />

        </Container>
    </section>


    </MainContent>
  );
};

export default TipoEventoPage;

// usar o use state que voce usou na home dso que agora trazer dados de tipo eventos, home page ja temos dados que trazem proximos evento, dados mocados por enquanto estao vindo de tipos eventos da variaveis, use o use effect 