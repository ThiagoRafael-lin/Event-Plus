import React, { useContext, useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import MainContent from "../../Components/MainContent/MainContent";
import Title from "../../Components/Title/Title";
import Table from "./TableEvA/Table";
import Container from "../../Components/Container/Container";
import { Select } from "../../Components/FormComponents/FormComponents";
import Spinner from "../../Components/Spinner/Spinner";
import Modal from "../../Components/Modal/Modal";
import api from "../../Services/Service";

import "./EventosAlunoPage.css";
import { UserContext } from "../../context/AuthContext";

const EventosAlunoPage = () => {
  // state do menu mobile
  const [exibeNavbar, setExibeNavbar] = useState(false);
  const [eventos, setEventos] = useState([]);
  // select mocado
  const [quaisEventos, setQuaisEventos] = useState([
    { value: "1", text: "Todos os eventos" },
    { value: "2", text: "Meus eventos" },
  ]);

  const [notifyUser, setNotifyUser] = useState({});
  const [descricaoComentario, setDescricaoComentario] = useState ("")
  const [exibe, setExibe] = useState("");

  const [tipoEvento, setTipoEvento] = useState("1"); //código do tipo do Evento escolhido
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // recupera os dados globais do usuário
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    loadEventsType();
  }, [tipoEvento, userData.useRouteId]);


  async function loadEventsType() {
    
    setShowSpinner(true);
    try {
      if (tipoEvento === "1") {
        const promise = await api.get("/Evento");

        const promiseEventos = await api.get(
          `/PresencasEvento/ListarMinhas/${userData.useRouteId}`
          );

          const dadosMarcados = verificarPresenca(promise.data,promiseEventos.data);
          console.clear();
          console.log("Dados marcados");
          console.log(dadosMarcados);

        setEventos(promise.data)
      } else {
        let arrEventos = [];
        const promise = await api.get(
          `/PresencasEvento/ListarMinhas/${userData.useRouteId}`
          );
          promise.data.forEach((e) => {
            arrEventos.push( {
              ...e.evento, 
              situacao : e.situacao,
              idPresencaEvento : e.idPresencaEvento
            });
          });
          console.log(promise.data);
          setEventos(arrEventos);

        // let arrEventos = [];
        // const promiseEventos = await api.get(`/PresencasEvento/ListarMinhas${userData.userId}`);
        // promiseEventos.data.forEach((element) => {
        //   arrEventos.push( element.evento )
        // });
        // setEventos(arrEventos);
      }
      
    } catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Ocorreu um erro na api!`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de sucesso",
        showMessage: true,
      });
    }
    
    setShowSpinner(false);
    }


  const verificarPresenca = (arrAllEvents, eventsUser) => {
    for (let x = 0; x < arrAllEvents.length; x++) {
      for (let i = 0; i < eventsUser.length; i++) {
        if(arrAllEvents[x].idEvento === eventsUser[i].evento.idEvento){
          arrAllEvents[x].situacao = true;
          arrAllEvents[x].idPresencaEvento = eventsUser[i].idPresencaEvento;
          break;
        }
      } 
    }
    return arrAllEvents;
  }

  // toggle meus eventos ou todos os eventos
  function myEvents(tpEvent) {
    setTipoEvento(tpEvent);
  }

  async function loadMyComentary() {

    // try {
    //   const promise = await api.get(`/ComentariosEvento/BuscarPorIdUsuario`, {
        
        
    //   })
    //   console.log(promise.data);
    // } catch (error) {
      
    // }
    // alert("Carregar o comentário")
  }

  const showHideModal = () => {
    setShowModal(showModal ? false : true);
  };
  
  const postMyComentary = () => {

    try {

      const retorno = api.post(`/ComentariosEvento`, {

        descricao : descricaoComentario,
        exibe : exibe,

      })
      console.log(retorno.data);
      
    } catch (error) {
    alert("erro ao cadastrar") ;     
    }


    // setShowModal(showModal ? false : true);
  };

  const commentaryRemove = () => {
    alert("Remover o comentário");
  };

 async function handleConnect(idEvent, idPresencaEvento,  whatTheFunction = false) {

    if (whatTheFunction === true) {
      try {
       await api.post("/PresencasEvento", 
        {
          situacao : true,
          idUsuario : userData.useRouteId,
          IdEvento : idEvent,
        });

        loadEventsType();

      } catch (error) {
        console.log("Error ao conectar");
      }
      return;
    }
    

    try {
      await api.delete(`/PresencasEvento/${idPresencaEvento}`);
      loadEventsType();
    } catch (error) {
      console.log("Erro ao Desconectar" + error);
    }
    // try {
    //   const promiseDelete = await api.delete(`/PresencasEvento/${idPresencaEvento}`);
    //   console.log(promiseDelete);
    //   loadEventsType();
    // } catch (error) {
    //   console.log("Erro ao conectar");
    //   console.log(error);
    // }
  }
  return (
    <>
      {/* <Header exibeNavbar={exibeNavbar} setExibeNavbar={setExibeNavbar} /> */}

      <MainContent>
        <Container>
          <Title titleText={"Eventos"} className="custom-title" />

          <Select
            id="id-tipo-evento"
            name="tipo-evento"
            required={true}
            dados={quaisEventos} // aqui o array dos tipos
            manipulationFunction={(e) => myEvents(e.target.value)} // aqui só a variável state
            defaultValue={tipoEvento}
            additionalClass="select-tp-evento"
          />
          <Table
            dados={eventos}
            fnConnect={handleConnect}
            fnShowModal={() => {
              showHideModal();
            }}
          />
        </Container>
      </MainContent>

      {/* SPINNER -Feito com position */}
      {showSpinner ? <Spinner /> : null}

      {showModal ? (
        <Modal
          userId={userData.useRouteId}
          showHideModal={showHideModal}
          fnGet={loadMyComentary}
          fnPost={postMyComentary}
          fnDelete={commentaryRemove}
        />
      ) : null}
    </>
  );
};

export default EventosAlunoPage;
