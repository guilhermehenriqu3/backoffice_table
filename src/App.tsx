import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { mock } from "./mock";

interface Mockdata {
  accepted: boolean;
  name: string;
  data: string;
  initialLatitude: number;
  initialLongitude: number;
  destinationLatitude: number;
  destinationLongitude: number;
}

function App() {
  const [receveMock, setReceveMock] = useState<Mockdata[]>([]);

  useEffect(() => {
    return setReceveMock(mock);
  }, []);
  console.log(receveMock);

  //   const [dataRender, setDataRender] = useState([]);

  //   const filePath = "./mock";
  //   async function importData() {
  //     try {
  //       const response = await axios.get(filePath);
  //       const data = response.data;
  //       console.log("Dados importados:", data);
  //       setDataRender(data);
  //       setTimeout(importData, 5000);
  //     } catch (error) {
  //       console.error("Ocorreu um erro ao importar os dados:", error);

  //       setTimeout(importData, 5000);
  //     }
  //     clearTimeout;

  //     let timeout = setTimeout(() => {
  //       chamada();
  //       importData();
  //     }, 5000);
  //   }

  //   useEffect(() => {
  //     importData();
  //   }, []);

  const handleAcceptClick = (key: number) => {
    const updateAccept = [...receveMock];
    updateAccept[key].accepted = !updateAccept[key].accepted;

    setReceveMock(updateAccept);
  };

  const handleSendClick = () => {
    const dataToSend = {
      table: receveMock,
    };
    axios
      .post("URL_DA_SUA_API_AQUI", dataToSend)
      .then((response) => {
        const data = response.data;
        console.log("Resposta da solicitação:", data);
      })
      .catch((error) => {
        console.error("Erro ao fazer a solicitação:", error);
      });
  };

  return (
    <div className="wrapper">
      <div className="tableNbutton">
        <table className="table">
          <thead>
            <tr id="rowUp">
              <th>Status</th>
              <th>Nome do Operador</th>
              <th>Data</th>
              <th>Lat e Long Inicial</th>
              <th>Lat e Long Destino</th>
              <th>Aceitar / Rejeitar</th>
            </tr>
          </thead>
          {receveMock.map((item, index) => (
            <>
              <tbody>
                <tr key={index} className="row">
                  <td>{item.accepted ? "Aceito" : "Não aceito"} </td>
                  <td>{item.name}</td>
                  <td>{item.data}</td>
                  <td>
                    Latitude {item.initialLatitude} - Longitude
                    {item.initialLongitude}
                  </td>
                  <td>
                    Latitude {item.destinationLatitude} - Longitude{" "}
                    {item.destinationLongitude}
                  </td>
                  <td>
                    <button onClick={() => handleAcceptClick(index)}>
                      {item.accepted ? "Rejeitar" : "Aceitar"}
                    </button>
                  </td>
                </tr>
              </tbody>
            </>
          ))}
        </table>
        <button className="send" onClick={() => handleSendClick}>
          Enviar
        </button>
      </div>
    </div>
  );
}
export default App;
