import React, { useContext, useEffect, useState } from "react";
import MainContent from "../../Components/MainContent/MainContent";
import Banner from "../../Components/Banner/Banner";
import VisionSection from "../../Components/VisionSection/VisionSection";
import ContactSection from "../../Components/ContactSection/ContactSection";
import NextEvent from "../../Components/NextEvent/NextEvent";
import Container from "../../Components/Container/Container";
import Title from "../../Components/Title/Title";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./HomePage.css";

import { Pagination } from "swiper/modules";

import api from "../../Services/Service";
import { UserContext } from "../../context/AuthContext";

const HomePage = () => {
  const {userData} = useContext (UserContext)

  console.log("dados globais do usuario");
  console.log(userData);
  useEffect(() => {
    async function getProximosEventos() {
      try {
        const retorno = await api.get(
          "/Evento/ListarProximos"
        );
        console.log(retorno.data);
        setNextEvents(retorno.data);
      } catch (error) {
        console.log("Deu ruim na api");
      }
    }
    getProximosEventos();
    console.log("A Home foi montada!!!");
  }, []);

  const [nextEvents, setNextEvents] = useState([]);

  return (
    <MainContent>
      <Banner />

      {/* Próximos eventos */}

      <section className="proximos-eventos">
        <Container>
          <Title titleText={"Próximos Eventos"} />

          <div className="events-box">
            <Swiper
              slidesPerView={ window.innerWidth >= 992 ? 3 : 1 }
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {nextEvents.map((e) => {
                return (
                  <SwiperSlide>
                    <NextEvent
                      title={e.nomeEvento}
                      description={e.descricao}
                      eventDate={e.dataEvento}
                      idEvento={e.idEvento}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </Container>
      </section>

      <VisionSection />
      <ContactSection />
    </MainContent>
  );
};

export default HomePage;
