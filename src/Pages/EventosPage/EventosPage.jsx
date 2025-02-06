import React, { useEffect, useState } from "react";
import "./EventosPage.css";
import Title from "../../Components/Title/Title";
import MainContent from "../../Components/MainContent/MainContent";
import Container from "../../Components/Container/Container";
import { Button, Input, Select } from "../../Components/FormComponents/FormComponents";
import ImageIllustrator from "../../Components/ImageIllustrator/ImageIllustrator";
import imagemEvento from "../../Assets/images/evento.svg"
import TableE from "./TableE/TableE";
import api from "../../Services/Service";
import Notification from "../../Components/Notification/Notification";
import { dateFormatDbToViewR } from "../../Utils/stringFunction";
import Spinner from "../../Components/Spinner/Spinner"

const EventosPage = () => {

  const [frmEdit, setFrmEdit] = useState(false)//boolean
  const [nome, setNome] = useState("");
  const [desc, setDesc] = useState("");
  const [tipoEvento, setTipoEvento] = useState([]);
  const [selecionado, setSelecionado] = useState("");
  const [data, setData] = useState("");
  const [evento, setEvento] = useState([]);
  const [notifyUser, setNotifyUser] = useState({});
  const [inst, setInst] = useState("");
  const [idEvento, setIdEvento] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  //array indice 0 . inst[0].


  useEffect(() => {

    async function getEventos() {

      setShowSpinner(true);

      try {
        const retorno = await api.get("/Evento");
        console.log(retorno.data);
        setEvento(retorno.data)
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
    getEventos()
    
    async function getTipoEvento() {
      try {
        const retorno = await api.get("/TiposEvento")
        
        const dadosApi = retorno.data;

        const arrMold = [];

        dadosApi.forEach(element => {
          arrMold.push({
            value : element.idTipoEvento,
            text : element.titulo
          })
        });
        setTipoEvento(arrMold)
        
        console.log("dhfsbjhfb");
        console.log(arrMold);
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
    }
    getTipoEvento()
    
    async function getInst() {
      try {
        const retorno = await api.get("/Instituicao")
        setInst(retorno.data[0].idInstituicao)
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
    }
    getInst()
    console.log("A home foi montada")
    
  },[])


  function editActionAbort() {
    setFrmEdit(false);
    setNome("");
    setDesc("");
    setSelecionado("");
    setData("");
    setIdEvento(null)
  }

  async function showUpdateForm(id) {

    setFrmEdit(true);
    //fazer um getById para pegar os dados
    //alert(idElemento)
    try {
      const retorno = await api.get(`/Evento/${id}`)

      console.log(retorno.data);
      setNome(retorno.data.nomeEvento)
      setDesc(retorno.data.descricao) 
      setSelecionado(retorno.data.idTipoEvento)
      setData(dateFormatDbToViewR(retorno.data.dataEvento))
      setIdEvento(retorno.data.idEvento)
      
    } catch (error) {
      alert("Não foi possivel mostrar a tela de edição. Tente novamente")
    }

    // Input Atualizar

  };

  async function handleSubmit(e)
  {
    e.preventDefault();

    if (nome.trim().length < 3) {
      alert("É preciso ter mais de três caracteres para o nome!")
      return;
    }

    try {
      const retorno = await api.post("/Evento", {
        nomeEvento: nome,
        descricao: desc,
        idTipoEvento: selecionado,
        dataEvento: data,
        idInstituicao: inst
      })
      setNotifyUser({
        titleNote: "Sucesso",
        textNote: `Cadastrado com sucesso!`,
        imgIcon: "success",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true
      });
      console.log(retorno.data);
      getState();

    } catch (error) {
      console.log(error);
      setNotifyUser({
        titleNote: "Atenção",
        textNote: `Erro ao cadastrar`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true
      });
    }
  }


  async function getState()
  {
    try {
      const retornoGet = await api.get("/Evento");
      setEvento(retornoGet.data)
    } catch (error) {
      alert("Algo deu Errado")
    }
  }

async function handleDelete(id) {
  try {
    const retorno = await api.delete(`/Evento/${id}`);
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
}

async function handleUpdate(e)
{
  e.preventDefault();

    if (nome.trim().length < 3) {
      alert("É preciso ter mais de três caracteres para o nome!")
      return;
    }

    try {
      const retorno = await api.put(`/Evento/${idEvento}`, {
        nomeEvento: nome,
        descricao: desc,
        idTipoEvento: selecionado,
        dataEvento: data,
        idInstituicao: inst
      })
      setNotifyUser({
        titleNote: "Sucesso",
        textNote: `Atualizado com sucesso!`,
        imgIcon: "success",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true
      });
      console.log(retorno.data);

      editActionAbort()
      getState();

    } catch (error) {
      console.log(error);
      setNotifyUser({
        titleNote: "Atenção",
        textNote: `Erro ao atualizar`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true
      });
    }
}



  return (
    <MainContent>
      <Notification {...notifyUser} setNotifyUser={setNotifyUser}/>
      {showSpinner ? <Spinner /> : null}

      <section className="cadastro-evento-section">
      <Container>
      <div className="cadastro-evento__box">
      <Title titleText={"Cadastro de Eventos"} />

      <ImageIllustrator 
      alterText={"???????"}
      imageRender={imagemEvento}
      />

      <form onSubmit={frmEdit ? handleUpdate : handleSubmit} className="ftipo-evento">

      {!frmEdit ?
        (
      <>
        <Input 
            type={"text"}
            id={"nome"}
            placeholder={"Nome"}
            required={"required"}
            name={"nome"} // usa a propriedade name para postar no formulario
            value={nome}
            manipulationFunction={
              (e) => {
                setNome(e.target.value)
              }
            }
        />

        <Input 
            type={"text"}
            id={"desc"}
            placeholder={"Descrição"}
            required={"required"}
            name={"desc"} // usa a propriedade name para postar no formulario
            value={desc}
            manipulationFunction={
              (e) => {
                setDesc(e.target.value)
              }
            }
        />
        
        {/* <select name="" id="select"> <option value="Evento">Tipo Evento</option></select> */}

        <Select 
            dados={tipoEvento}
            name={"tipoEvento"} 
            id={"tipoEvento"}
            required={"required"}
            manipulationFunction={(e)=>{
              setSelecionado(e.target.value)
            }}
            defaultValue={selecionado}
          />
   

        <Input 
            type={"date"}
            id={"data"}
            required={"required"}
            name={"data"} // usa a propriedade name para postar no formulario
            value={data}
            manipulationFunction={
              (e) => {
                setData(e.target.value)
              }
            }
        />

        <Button 
            type={"submit"}
            id={"botao"}
            name={"button"}
            textButton={"Cadastrar"}
        />
        </>)
          :
          <>
        <Input 
            type={"text"}
            id={"nome"}
            placeholder={"Nome"}
            required={"required"}
            name={"nome"} // usa a propriedade name para postar no formulario
            value={nome}
            manipulationFunction={
              (e) => {
                setNome(e.target.value)
              }
            }
        />

        <Input 
            type={"text"}
            id={"desc"}
            placeholder={"Descrição"}
            required={"required"}
            name={"desc"} // usa a propriedade name para postar no formulario
            value={desc}
            manipulationFunction={
              (e) => {
                setDesc(e.target.value)
              }
            }
        />
        
        <Select 
            dados={tipoEvento}
            name={"tipoEvento"} 
            id={"tipoEvento"}
            required={"required"}
            manipulationFunction={(e)=>{
              setSelecionado(e.target.value)
            }}
            defaultValue={selecionado}
          />
   

        <Input 
            type={"date"}
            id={"data"}
            required={"required"}
            name={"data"} // usa a propriedade name para postar no formulario
            value={data}
            manipulationFunction={
              (e) => {
                setData(e.target.value)
              }
            }
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

      <section className="lista-eventos-section">
          <Container>

            <Title  titleText={"Lista de Eventos"} color="white" />
            <TableE 
              dados={evento}
              fnUpdate={showUpdateForm}
              fnDelete={handleDelete}
            />
            
          </Container>
      </section>

    </MainContent>

    //tipo evento listagem do que foi cadastrado select, preencher duas variavei, no mesmo use effect dois gets tipo evento e eventos faltara um campo na api tipo evento, state para tipo evento, get get para instituicao tambem e guarda-los dentro do state, tres get em um try



  );
};

export default EventosPage;
