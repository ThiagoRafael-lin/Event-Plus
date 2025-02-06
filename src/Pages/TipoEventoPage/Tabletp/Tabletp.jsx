import React from "react";
import "./Tabletp.css";
import editPen from "../../../Assets/images/edit-pen.svg"
import trashDelete from "../../../Assets/images/trash-delete.svg"


const Tabletp = ({dados, fnUpdate, fnDelete}) => {
    console.log(dados);

  return (
    <table className="table-data">
      <thead className="table-data__head">
        <tr className="table-data__head-row">
          <th className="table-data__head-title table-data__head-title--big">
            Título
          </th>
          <th className="table-data__head-title table-data__head-title--little">
            Editar
          </th>
          <th className="table-data__head-title table-data__head-title--little">
            Deletar
          </th>
        </tr>
      </thead>

      <tbody>

            {dados.map((e) => {
                return(
                    //uma linha completa
                    <tr className="table-data__head-row">

                    <td className="table-data__data table-data__data--big">
                      {e.titulo}
                    </td>
                    <td className="table-data__data table-data__data--little">
                    <img 
                          onClick={() => {
                            //adicionando o id do tipo evento para a função
                              fnUpdate(e.idTipoEvento);
                          }}
                          className="table-data__icon" 
                          src={editPen} 
                          alt="" />
                    </td>
                    <td className="table-data__data table-data__data--little">
                    <img 
                          onClick={() => {
                              fnDelete(e.idTipoEvento);
                          }}
                          className="table-data__icon" 
                          src={trashDelete} 
                          alt="" />
                    </td>
                  </tr>
                )
            })}

      </tbody>

    </table>
  );
  // <table>
  //     {/* cabeçalho */}
  //     <thead>
  //         <tr>
  //             <th>Titulo</th>
  //             <th>Editar</th>
  //             <th>Apagar</th>
  //         </tr>
  //     </thead>

  //     {/* corpo */}
  //     <tbody>
  //         <tr>
  //             <td>Eventos</td>
  //             <td>Eventos</td>
  //             <td>Eventos</td>
  //         </tr>
  //     </tbody>
  // </table>
};

export default Tabletp;
