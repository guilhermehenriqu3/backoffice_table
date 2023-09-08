import { useEffect, useState } from "react";
import "./App.css";
interface Mockdata {
  accepted: boolean;
  name: string;
  date: string;
  initialLatitude: number;
  initialLongitude: number;
  destinationLatitude: number;
  destinationLongitude: number;
}

function App() {
  const [dataRender, setDataRender] = useState<Mockdata | any>([]);

  const importData = async () => {
    fetch("http://10.10.1.121:3056/users").then(async (a) => {
      let objs = await a.json();
      setDataRender(() => objs);
    });
  };

  const handleAcceptClick = async (obj: any) => {
    await fetch(`http://10.10.1.121:3056/users/${obj.id}`, {
      method: "PUT",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...obj, accepted: true }),
    });

    importData();
  };

  useEffect(() => {
    importData();
  }, []);

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
          {dataRender.map((item: Mockdata, index: number) => (
            <>
              <tbody key={index}>
                <tr className="row">
                  <td>{item.accepted ? "Aceito" : "Não aceito"} </td>
                  <td>{item.name}</td>
                  <td>{new Date(item.date)?.toLocaleString("pt-BR")}</td>
                  <td>
                    Latitude {item.initialLatitude} - Longitude
                    {item.initialLongitude}
                  </td>
                  <td>
                    Latitude {item.destinationLatitude} - Longitude{" "}
                    {item.destinationLongitude}
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        handleAcceptClick(item);
                      }}
                    >
                      {item.accepted ? "Rejeitar" : "Aceitar"}
                    </button>
                  </td>
                </tr>
              </tbody>
            </>
          ))}
        </table>
      </div>
    </div>
  );
}
export default App;
