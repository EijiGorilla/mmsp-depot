import { useEffect, useState } from "react";
import "../index.css";
import "../App.css";
import "@arcgis/map-components/dist/components/arcgis-scene";
import "@arcgis/map-components/components/arcgis-scene";
import "@arcgis/map-components/components/arcgis-zoom";
import "@arcgis/map-components/components/arcgis-legend";
import "@arcgis/map-components/components/arcgis-basemap-gallery";
import "@arcgis/map-components/components/arcgis-layer-list";
import "@arcgis/map-components/components/arcgis-expand";
import "@arcgis/map-components/components/arcgis-placement";
import "@arcgis/map-components/components/arcgis-compass";
import {
  stationLayer,
  constructionBoundaryLayer,
  depotBuildingStructureLayer,
  lotLayer,
  buildingSpotLayer,
} from "../layers";

function MapDisplay() {
  const [sceneView, setSceneView] = useState();
  const arcgisScene = document.querySelector("arcgis-scene");

  useEffect(() => {
    if (sceneView) {
      arcgisScene.map.add(depotBuildingStructureLayer);
      arcgisScene.map.add(constructionBoundaryLayer);
      arcgisScene.map.add(lotLayer);
      arcgisScene.map.add(stationLayer);
      arcgisScene.map.add(buildingSpotLayer);
      arcgisScene.map.ground.navigationConstraint = "none";
      arcgisScene.view.environment.atmosphereEnabled = false;
      arcgisScene.view.environment.starsEnabled = false;
      arcgisScene.map.ground.opacity = 0.7;
    }
  });

  return (
    <arcgis-scene
      basemap="dark-gray-vector"
      ground="world-elevation"
      viewingMode="local"
      zoom="19"
      camera-position="121.019, 14.6800462, 1000"
      camera-tilt="65"
      onarcgisViewReadyChange={(event) => {
        setSceneView(event.target);
      }}
    >
      <arcgis-compass position="top-right"></arcgis-compass>
      <arcgis-zoom position="bottom-right"></arcgis-zoom>
    </arcgis-scene>
  );
}

export default MapDisplay;
