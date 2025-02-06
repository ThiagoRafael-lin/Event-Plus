import React from "react";
import "./NextEvent.css";
import { dateFormatDbToView } from "../../Utils/stringFunction";
import { Tooltip } from "react-tooltip";

const NextEvent = ({ title, description, eventDate, idEvento }) => {
  function conectar(idEvento) {
    alert(`Conectando ao evento: ${idEvento}`);
  }

  return (
    <article className="event-card">
      <h2 className="event-card__title">{title.substr(0, 20)}</h2>

      <p
        data-tooltip-id={idEvento}
        data-tooltip-content={description}
        data-tooltip-place="top"
        className="event-card__description"
      > 
        <Tooltip id={idEvento} className="tootip"/>
        {description.substr(0, 16)}...
      </p>

      <p className="event-card__description">{dateFormatDbToView(eventDate)}</p>
      {/* <p className="event-card__description">{new Date(eventDate).toLocaleDateString()}</p> */}
      {/* <p className="event-card__description">{eventDate.substr(0,10).split("-").reverse().join("/")}</p> */}

      <a
        className="event-card__connect-link"
        onClick={() => {
          conectar(idEvento);
        }}
      >
        Conectar
      </a>
    </article>
  );
};

export default NextEvent;
