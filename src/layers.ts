import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import SceneLayer from '@arcgis/core/layers/SceneLayer';
import LabelClass from '@arcgis/core/layers/support/LabelClass';
import UniqueValueRenderer from '@arcgis/core/renderers/UniqueValueRenderer';
import {
  MeshSymbol3D,
  FillSymbol3DLayer,
  LabelSymbol3D,
  TextSymbol3DLayer,
  SimpleFillSymbol,
  TextSymbol,
  SimpleLineSymbol,
} from '@arcgis/core/symbols';
import SolidEdges3D from '@arcgis/core/symbols/edges/SolidEdges3D';
import { labelSymbol3DLine } from './Label';

/* Standalone table for Dates */
export const dateTable = new FeatureLayer({
  portalItem: {
    id: 'a084d9cae5234d93b7aa50f7eb782aec',
    portal: {
      url: 'https://gis.railway-sector.com/portal',
    },
  },
});

/* Station point layer */
var labelClass = new LabelClass({
  symbol: new LabelSymbol3D({
    symbolLayers: [
      new TextSymbol3DLayer({
        material: {
          color: '#d4ff33',
        },
        size: 15,
        halo: {
          color: 'black',
          size: 0.5,
        },
        font: {
          family: 'Ubuntu Mono',
          //weight: "bold"
        },
      }),
    ],
    verticalOffset: {
      screenLength: 100,
      maxWorldLength: 700,
      minWorldLength: 80,
    },

    callout: {
      type: 'line', // autocasts as new LineCallout3D()
      color: [128, 128, 128, 0.5],
      size: 0.2,
      border: {
        color: 'grey',
      },
    },
  }),
  labelPlacement: 'above-center',
  labelExpressionInfo: {
    expression: '$feature.Station',
    //value: "{TEXTSTRING}"
  },
});

export const stationLayer = new FeatureLayer({
  portalItem: {
    id: '52d4f29105934e3f95f6b39c7e5fba6e',
    portal: {
      url: 'https://gis.railway-sector.com/portal',
    },
  },
  layerId: 1,
  title: 'Station',
  labelingInfo: [labelClass],
  definitionExpression: "Project = 'MMSP'",
  elevationInfo: {
    mode: 'relative-to-ground',
  },
});
stationLayer.listMode = 'hide';

/* Land */

const lotColor = [
  [112, 173, 71],
  [0, 112, 255],
  [255, 255, 0],
  [255, 170, 0],
  [255, 0, 0],
  [0, 115, 76],
];

const defaultSymbolLot = new SimpleFillSymbol({
  color: [0, 0, 0, 0],
  style: 'solid',
  outline: new SimpleLineSymbol({
    color: [110, 110, 110],
    width: 0.7,
  }),
});

const lotLayerStatusRenderer = new UniqueValueRenderer({
  field: 'StatusNVS3',
  defaultSymbol: defaultSymbolLot,
  uniqueValueInfos: [
    {
      value: 1,
      label: 'Paid',
      symbol: new SimpleFillSymbol({
        color: lotColor[0],
      }),
    },
    {
      value: 2,
      label: 'For Payment Processing',
      symbol: new SimpleFillSymbol({
        color: lotColor[1],
      }),
    },
    {
      value: 3,
      label: 'For Legal Pass',
      symbol: new SimpleFillSymbol({
        color: lotColor[2],
      }),
    },
    {
      value: 4,
      label: 'For Appraisal/Offer to Buy',
      symbol: new SimpleFillSymbol({
        color: lotColor[3],
      }),
    },
    {
      value: 5,
      label: 'For Expro',
      symbol: new SimpleFillSymbol({
        color: lotColor[4],
      }),
    },
    {
      value: 6,
      label: 'with WOP Fully Turned-over',
      symbol: new SimpleFillSymbol({
        color: lotColor[5],
      }),
    },
  ],
});

const lotLabel = new LabelClass({
  symbol: new TextSymbol({
    color: 'black',
    font: {
      size: 8,
    },
  }),
  labelPlacement: 'above-center',
  labelExpressionInfo: {
    expression: '$feature.CN',
  },
});

export const lotLayer = new FeatureLayer({
  portalItem: {
    id: '0c172b82ddab44f2bb439542dd75e8ae',
    portal: {
      url: 'https://gis.railway-sector.com/portal',
    },
  },
  layerId: 8,
  // outFields: ['*'],
  title: 'Land Acquisition',
  labelingInfo: [lotLabel],
  renderer: lotLayerStatusRenderer,
  definitionExpression: "Station1 = 'Depot'",
  popupTemplate: {
    title: '<p>{Id}</p>',
    lastEditInfoEnabled: false,
    returnGeometry: true,
    content: [
      {
        type: 'fields',
        fieldInfos: [
          {
            fieldName: 'OWNER',
            label: 'Land Owner',
          },
          {
            fieldName: 'Station1',
          },
          {
            fieldName: 'StatusNVS3',
            label: '<p>Status of Land Acquisition</p>',
          },
        ],
      },
    ],
  },
});

/* construction boundary */
const ConstructionBoundaryFill = new UniqueValueRenderer({
  field: 'MappingBoundary',
  uniqueValueInfos: [
    {
      value: 1,
      label: '',
      symbol: new SimpleFillSymbol({
        color: [0, 0, 0, 0],
        outline: {
          width: 2.5,
          color: [255, 255, 255],
          style: 'short-dash',
        },
      }),
    },
  ],
});

export const constructionBoundaryLayer = new FeatureLayer({
  portalItem: {
    id: '0c172b82ddab44f2bb439542dd75e8ae',
    portal: {
      url: 'https://gis.railway-sector.com/portal',
    },
  },
  layerId: 4,
  // outFields: ['*'],
  renderer: ConstructionBoundaryFill,
  // definitionExpression: 'MappingBoundary = 1',
  definitionExpression: "Station = 'Depot'",
  title: 'Construction Boundary',
  elevationInfo: {
    mode: 'on-the-ground',
  },
  popupEnabled: false,
});

/* Depot Buildings */
const colorStationStructure = [
  [225, 225, 225, 0], // To be Constructed (white)
  [130, 130, 130, 0.3], // Under Construction
  [255, 0, 0, 0.6], // Delayed
  [0, 197, 255, 0.5], // Completed
];

function renderDepotBuildingStructureLayer() {
  const renderer = new UniqueValueRenderer({
    field: 'Status',
  });

  for (var i = 0; i < colorStationStructure.length; i++) {
    renderer.addUniqueValueInfo({
      value: i + 1,
      symbol: new MeshSymbol3D({
        symbolLayers: [
          new FillSymbol3DLayer({
            material: {
              color: colorStationStructure[i],
              colorMixMode: 'replace',
            },
            edges: new SolidEdges3D({
              color: [225, 225, 225, 0.3],
            }),
          }),
        ],
      }),
    });
  }
  depotBuildingStructureLayer.renderer = renderer;
}

export const depotBuildingStructureLayer = new SceneLayer({
  portalItem: {
    id: 'ce9adf201b654116956d721a17be5b17',
    portal: {
      url: 'https://gis.railway-sector.com/portal',
    },
  },
  popupTemplate: {
    title: '<h5>{Status}</h5>',
    lastEditInfoEnabled: false,
    // outFields: ['*'],
    returnGeometry: true,
    content: [
      {
        type: 'fields',
        fieldInfos: [
          {
            fieldName: 'Type',
            label: 'Type of Structure',
          },
          {
            fieldName: 'Type2',
            label: 'Mark',
          },
          {
            fieldName: 'Floor',
            label: 'Floor',
          },
          {
            fieldName: 'Name',
            Label: 'Building',
          },
        ],
      },
    ],
  },
  elevationInfo: {
    mode: 'absolute-height',
    offset: 0,
  },
  title: 'Station Structure',
  // when filter using date, example below. use this format
  //definitionExpression: "EndDate = date'2020-6-3'"
});

renderDepotBuildingStructureLayer();

/* Building Scene Layer for station structures */
const buildingSpotLabel = labelSymbol3DLine({
  materialColor: '#d4ff33',
  fontSize: 15,
  fontFamily: 'Ubuntu Mono',
  fontWeight: 'normal',
  haloColor: 'black',
  haloSize: 0.5,
  vOffsetScreenLength: 100,
  vOffsetMaxWorldLength: 700,
  vOffsetMinWorldLength: 80,
  calloutColor: 'gray',
  calloutSize: 0.3,
});

var labelClassBulding = new LabelClass({
  symbol: buildingSpotLabel,
  labelPlacement: 'above-center',
  labelExpressionInfo: {
    expression: 'DefaultValue($feature.Building_Names, "no data")',
    //value: "{TEXTSTRING}"
  },
});

export const buildingSpotLayer = new FeatureLayer({
  portalItem: {
    id: '25611ac3ee734c548fcb1e5c4ca7b4db',
    portal: {
      url: 'https://gis.railway-sector.com/portal',
    },
  },
  popupEnabled: false,
  outFields: ['*'],
  labelingInfo: [labelClassBulding],
  elevationInfo: {
    mode: 'relative-to-ground',
    offset: 3,
  },
});
buildingSpotLayer.listMode = 'hide';
