import "../index.css";
import "../App.css";
import "@esri/calcite-components/dist/components/calcite-switch";
import "@esri/calcite-components/dist/calcite/calcite.css";
import { CalciteSwitch } from "@esri/calcite-components-react";
import { useEffect, useState } from "react";

function UndergroundSwitch() {
  const arcgisScene = document.querySelector("arcgis-scene");
  const [underground, setUnderground] = useState(false);

  useEffect(() => {
    if (arcgisScene) {
      arcgisScene.map.ground.opacity = underground === false ? 0.3 : 0.8;
    }
  }, [underground]);

  return (
    <>
      <div
        className="groundSwitchDiv"
        style={{
          position: "fixed",
          zIndex: 10,
          bottom: 5,
          // left: 0,
          color: "white",
          borderStyle: "solid",
          borderColor: "grey",
          backgroundColor: "#2b2b2b",
          paddingLeft: 5,
          paddingRight: 5,
          paddingTop: 4,
          paddingBottom: 4,
        }}
      >
        Ground: {""}
        Off{" "}
        <CalciteSwitch
          onCalciteSwitchChange={(event) =>
            setUnderground(event.target.checked)
          }
        ></CalciteSwitch>{" "}
        On
      </div>
    </>
  );
}

export default UndergroundSwitch;
