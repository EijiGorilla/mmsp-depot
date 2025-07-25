import { dateTable, depotBuildingStructureLayer } from "./layers";
import StatisticDefinition from "@arcgis/core/rest/support/StatisticDefinition";

// dropdown list for depot buildings
export const buildingNamesList = [
  {
    name: "CAT",
  },
  {
    name: "DB",
  },
  {
    name: "ER",
  },
  {
    name: "ESB",
  },
  {
    name: "HZD",
  },
  {
    name: "LRS",
  },
  {
    name: "MCS",
  },
  {
    name: "OCC",
  },
  {
    name: "OT",
  },
  {
    name: "PA",
  },
  {
    name: "PRI",
  },
  {
    name: "SEC",
  },
  {
    name: "SHT",
  },
  {
    name: "SS",
  },
  {
    name: "TC",
  },
  {
    name: "TG",
  },
  {
    name: "TMO",
  },
  {
    name: "WFTF",
  },
  {
    name: "WHS",
  },
  {
    name: "WKS",
  },
  {
    name: "WPH",
  },
];

// Updat date
export async function dateUpdate() {
  const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const query = dateTable.createQuery();
  query.where = "category = 'Depot Buildings'";

  return dateTable.queryFeatures(query).then((response: any) => {
    const stats = response.features;
    const dates = stats.map((result: any) => {
      const date = new Date(result.attributes.date);
      const year = date.getFullYear();
      const month = monthList[date.getMonth()];
      const day = date.getDate();
      const final = year < 1990 ? "" : `${month} ${day}, ${year}`;
      return final;
    });
    return dates;
  });
}

// Generate chart data
const depotType = [
  "Beam",
  "Column",
  "Footing",
  "Girder",
  "Mecha Equip Foundation",
  "Mecha & Electirc Space",
  "Parapet",
  "Roof Deck Slab",
  "Rooftop Stair Enclosure",
  "Skylight",
  "Slab",
  "Tie Beam",
  "Wall Footing",
  "Vertical Brace",
  "Side Wall Girts",
  "Purlin",
  "Girt",
  "Foundation",
  "Rail",
  "Sleepers",
  "Rafter",
  "Tension Brace",
  "Rubble Concrete",
];

export const depotTypeChart = [
  {
    category: depotType[0],
    value: 1,
  },
  {
    category: depotType[1],
    value: 2,
  },
  {
    category: depotType[2],
    value: 3,
  },
  {
    category: depotType[3],
    value: 4,
  },
  {
    category: depotType[4],
    value: 5,
  },
  {
    category: depotType[5],
    value: 6,
  },
  {
    category: depotType[6],
    value: 7,
  },
  {
    category: depotType[7],
    value: 8,
  },
  {
    category: depotType[8],
    value: 9,
  },
  {
    category: depotType[9],
    value: 10,
  },
  {
    category: depotType[10],
    value: 11,
  },
  {
    category: depotType[11],
    value: 12,
  },
  {
    category: depotType[12],
    value: 13,
  },
  {
    category: depotType[13],
    value: 14,
  },
  {
    category: depotType[14],
    value: 15,
  },
  {
    category: depotType[15],
    value: 16,
  },
  {
    category: depotType[16],
    value: 17,
  },
  {
    category: depotType[17],
    value: 18,
  },
  {
    category: depotType[18],
    value: 19,
  },
  {
    category: depotType[19],
    value: 20,
  },
  {
    category: depotType[20],
    value: 21,
  },
  {
    category: depotType[21],
    value: 22,
  },
  {
    category: depotType[22],
    value: 23,
  },
];

export async function generateChartData(depotname: any) {
  var total_beam_tobeC = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 1 and Status = 1) THEN 1 ELSE 0 END", // D-Wall and to be Constructed
    outStatisticFieldName: "total_beam_tobeC",
    statisticType: "sum",
  });

  var total_beam_done = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 1 and Status = 4) THEN 1 ELSE 0 END", // D-Wall and Complete
    outStatisticFieldName: "total_beam_done",
    statisticType: "sum",
  });

  var total_beam_delay = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 1 and Status = 3) THEN 1 ELSE 0 END", // D-Wall and Complete
    outStatisticFieldName: "total_beam_delay",
    statisticType: "sum",
  });

  // Column
  var total_column_tobeC = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 2 and Status = 1) THEN 1 ELSE 0 END", // D-Wall and to be Constructed
    outStatisticFieldName: "total_column_tobeC",
    statisticType: "sum",
  });

  var total_column_done = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 2 and Status = 4) THEN 1 ELSE 0 END", // D-Wall and Complete
    outStatisticFieldName: "total_column_done",
    statisticType: "sum",
  });

  var total_column_delay = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 2 and Status = 3) THEN 1 ELSE 0 END", // D-Wall and Complete
    outStatisticFieldName: "total_column_delay",
    statisticType: "sum",
  });

  // Footing
  var total_footing_tobeC = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 3 and Status = 1) THEN 1 ELSE 0 END", // D-Wall and to be Constructed
    outStatisticFieldName: "total_footing_tobeC",
    statisticType: "sum",
  });

  var total_footing_done = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 3 and Status = 4) THEN 1 ELSE 0 END", // D-Wall and Complete
    outStatisticFieldName: "total_footing_done",
    statisticType: "sum",
  });

  var total_footing_delay = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 3 and Status = 3) THEN 1 ELSE 0 END", // D-Wall and Complete
    outStatisticFieldName: "total_footing_delay",
    statisticType: "sum",
  });

  // Girder
  var total_girder_tobeC = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 4 and Status = 1) THEN 1 ELSE 0 END", // D-Wall and to be Constructed
    outStatisticFieldName: "total_girder_tobeC",
    statisticType: "sum",
  });

  var total_girder_done = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 4 and Status = 4) THEN 1 ELSE 0 END", // D-Wall and Complete
    outStatisticFieldName: "total_girder_done",
    statisticType: "sum",
  });

  var total_girder_delay = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 4 and Status = 3) THEN 1 ELSE 0 END", // D-Wall and Complete
    outStatisticFieldName: "total_girder_delay",
    statisticType: "sum",
  });

  // Mechanical Equipment Foundation (mef)
  var total_mef_tobeC = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 5 and Status = 1) THEN 1 ELSE 0 END", // D-Wall and to be Constructed
    outStatisticFieldName: "total_mef_tobeC",
    statisticType: "sum",
  });

  var total_mef_done = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 5 and Status = 4) THEN 1 ELSE 0 END", // D-Wall and Complete
    outStatisticFieldName: "total_mef_done",
    statisticType: "sum",
  });

  var total_mef_delay = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 5 and Status = 3) THEN 1 ELSE 0 END", // D-Wall and Complete
    outStatisticFieldName: "total_mef_delay",
    statisticType: "sum",
  });

  // Mechanical and Electrical Space (mes)
  var total_mes_tobeC = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 6 and Status = 1) THEN 1 ELSE 0 END", // D-Wall and to be Constructed
    outStatisticFieldName: "total_mes_tobeC",
    statisticType: "sum",
  });

  var total_mes_done = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 6 and Status = 4) THEN 1 ELSE 0 END", // D-Wall and Complete
    outStatisticFieldName: "total_mes_done",
    statisticType: "sum",
  });

  var total_mes_delay = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 6 and Status = 3) THEN 1 ELSE 0 END", // D-Wall and Complete
    outStatisticFieldName: "total_mes_delay",
    statisticType: "sum",
  });

  // parapet
  var total_parapet_tobeC = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 7 and Status = 1) THEN 1 ELSE 0 END", // D-Wall and to be Constructed
    outStatisticFieldName: "total_parapet_tobeC",
    statisticType: "sum",
  });

  var total_parapet_done = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 7 and Status = 4) THEN 1 ELSE 0 END", // D-Wall and Complete
    outStatisticFieldName: "total_parapet_done",
    statisticType: "sum",
  });

  var total_parapet_delay = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 7 and Status = 3) THEN 1 ELSE 0 END", // D-Wall and Complete
    outStatisticFieldName: "total_parapet_delay",
    statisticType: "sum",
  });

  // Roof Deck Slabe (roofdeck)
  var total_roofdeck_tobeC = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 8 and Status = 1) THEN 1 ELSE 0 END", // D-Wall and to be Constructed
    outStatisticFieldName: "total_roofdeck_tobeC",
    statisticType: "sum",
  });

  var total_roofdeck_done = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 8 and Status = 4) THEN 1 ELSE 0 END", // D-Wall and Complete
    outStatisticFieldName: "total_roofdeck_done",
    statisticType: "sum",
  });

  var total_roofdeck_delay = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 8 and Status = 3) THEN 1 ELSE 0 END", // D-Wall and Complete
    outStatisticFieldName: "total_roofdeck_delay",
    statisticType: "sum",
  });

  // Rooftop Stair Enclsore (rooftop)
  var total_rooftop_tobeC = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 9 and Status = 1) THEN 1 ELSE 0 END", // D-Wall and to be Constructed
    outStatisticFieldName: "total_rooftop_tobeC",
    statisticType: "sum",
  });

  var total_rooftop_done = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 9 and Status = 4) THEN 1 ELSE 0 END", // D-Wall and Complete
    outStatisticFieldName: "total_rooftop_done",
    statisticType: "sum",
  });

  var total_rooftop_delay = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 9 and Status = 3) THEN 1 ELSE 0 END", // D-Wall and Complete
    outStatisticFieldName: "total_rooftop_delay",
    statisticType: "sum",
  });

  // Skylight
  var total_sky_tobeC = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 10 and Status = 1) THEN 1 ELSE 0 END", // D-Wall and to be Constructed
    outStatisticFieldName: "total_sky_tobeC",
    statisticType: "sum",
  });

  var total_sky_done = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 10 and Status = 4) THEN 1 ELSE 0 END", // D-Wall and Complete
    outStatisticFieldName: "total_sky_done",
    statisticType: "sum",
  });

  var total_sky_delay = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 10 and Status = 3) THEN 1 ELSE 0 END", // D-Wall and Complete
    outStatisticFieldName: "total_sky_delay",
    statisticType: "sum",
  });

  // Slab
  var total_slab_tobeC = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 11 and Status = 1) THEN 1 ELSE 0 END", // D-Wall and to be Constructed
    outStatisticFieldName: "total_slab_tobeC",
    statisticType: "sum",
  });

  var total_slab_done = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 11 and Status = 4) THEN 1 ELSE 0 END", // D-Wall and Complete
    outStatisticFieldName: "total_slab_done",
    statisticType: "sum",
  });

  var total_slab_delay = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 11 and Status = 3) THEN 1 ELSE 0 END", // D-Wall and Complete
    outStatisticFieldName: "total_slab_delay",
    statisticType: "sum",
  });

  // Tie Beam
  var total_tiebeam_tobeC = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 12 and Status = 1) THEN 1 ELSE 0 END", // D-Wall and to be Constructed
    outStatisticFieldName: "total_tiebeam_tobeC",
    statisticType: "sum",
  });

  var total_tiebeam_done = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 12 and Status = 4) THEN 1 ELSE 0 END", // D-Wall and Complete
    outStatisticFieldName: "total_tiebeam_done",
    statisticType: "sum",
  });

  var total_tiebeam_delay = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 12 and Status = 3) THEN 1 ELSE 0 END", // D-Wall and Complete
    outStatisticFieldName: "total_tiebeam_delay",
    statisticType: "sum",
  });

  // Wall Footing
  var total_wallfoot_tobeC = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 13 and Status = 1) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_wallfoot_tobeC",
    statisticType: "sum",
  });

  var total_wallfoot_done = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 13 and Status = 4) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_wallfoot_done",
    statisticType: "sum",
  });

  var total_wallfoot_delay = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 13 and Status = 3) THEN 1 ELSE 0 END", // D-Wall and Complete
    outStatisticFieldName: "total_wallfoot_delay",
    statisticType: "sum",
  });

  // Vertical Brace
  var total_verticalbrace_tobeC = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 14 and Status = 1) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_verticalbrace_tobeC",
    statisticType: "sum",
  });

  var total_verticalbrace_done = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 14 and Status = 4) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_verticalbrace_done",
    statisticType: "sum",
  });

  var total_verticalbrace_delay = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 14 and Status = 3) THEN 1 ELSE 0 END", // D-Wall and Complete
    outStatisticFieldName: "total_verticalbrace_delay",
    statisticType: "sum",
  });

  // Side Wall Girts
  var total_sidewallgirt_tobeC = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 15 and Status = 1) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_sidewallgirt_tobeC",
    statisticType: "sum",
  });

  var total_sidewallgirt_done = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 15 and Status = 4) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_sidewallgirt_done",
    statisticType: "sum",
  });

  var total_sidewallgirt_delay = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 15 and Status = 3) THEN 1 ELSE 0 END", // D-Wall and Complete
    outStatisticFieldName: "total_sidewallgirt_delay",
    statisticType: "sum",
  });

  // Purlin
  var total_purlin_tobeC = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 16 and Status = 1) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_purlin_tobeC",
    statisticType: "sum",
  });

  var total_purlin_done = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 16 and Status = 4) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_purlin_done",
    statisticType: "sum",
  });

  var total_purlin_delay = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 16 and Status = 3) THEN 1 ELSE 0 END", // D-Wall and Complete
    outStatisticFieldName: "total_purlin_delay",
    statisticType: "sum",
  });

  // Girt
  var total_girt_tobeC = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 17 and Status = 1) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_girt_tobeC",
    statisticType: "sum",
  });

  var total_girt_done = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 17 and Status = 4) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_girt_done",
    statisticType: "sum",
  });

  var total_girt_delay = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 17 and Status = 3) THEN 1 ELSE 0 END", // D-Wall and Complete
    outStatisticFieldName: "total_girt_delay",
    statisticType: "sum",
  });

  // Foundation
  var total_found_tobeC = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 18 and Status = 1) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_found_tobeC",
    statisticType: "sum",
  });

  var total_found_done = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 18 and Status = 4) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_found_done",
    statisticType: "sum",
  });

  var total_found_delay = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 18 and Status = 3) THEN 1 ELSE 0 END", // D-Wall and Complete
    outStatisticFieldName: "total_found_delay",
    statisticType: "sum",
  });

  //Rail
  var total_rail_tobeC = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 19 and Status = 1) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_rail_tobeC",
    statisticType: "sum",
  });

  var total_rail_done = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 19 and Status = 4) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_rail_done",
    statisticType: "sum",
  });

  var total_rail_delay = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 19 and Status = 3) THEN 1 ELSE 0 END", // D-Wall and Complete
    outStatisticFieldName: "total_rail_delay",
    statisticType: "sum",
  });

  // Sleepers
  var total_sleepers_tobeC = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 20 and Status = 1) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_sleepers_tobeC",
    statisticType: "sum",
  });

  var total_sleepers_done = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 20 and Status = 4) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_sleepers_done",
    statisticType: "sum",
  });

  var total_sleepers_delay = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 20 and Status = 3) THEN 1 ELSE 0 END", // D-Wall and Complete
    outStatisticFieldName: "total_sleepers_delay",
    statisticType: "sum",
  });

  // Rafter
  var total_rafter_tobeC = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 21 and Status = 1) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_rafter_tobeC",
    statisticType: "sum",
  });

  var total_rafter_done = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 21 and Status = 4) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_rafter_done",
    statisticType: "sum",
  });

  var total_rafter_delay = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 21 and Status = 3) THEN 1 ELSE 0 END", // D-Wall and Complete
    outStatisticFieldName: "total_rafter_delay",
    statisticType: "sum",
  });

  // Tension Brace
  var total_tensionbrace_tobeC = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 22 and Status = 1) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_tensionbrace_tobeC",
    statisticType: "sum",
  });

  var total_tensionbrace_done = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 22 and Status = 4) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_tensionbrace_done",
    statisticType: "sum",
  });

  var total_tensionbrace_delay = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 22 and Status = 3) THEN 1 ELSE 0 END", // D-Wall and Complete
    outStatisticFieldName: "total_tensionbrace_delay",
    statisticType: "sum",
  });

  // Rubble concrete
  var total_rubblec_tobeC = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 23 and Status = 1) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_rubblec_tobeC",
    statisticType: "sum",
  });

  var total_rubblec_done = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 23 and Status = 4) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_rubblec_done",
    statisticType: "sum",
  });

  var total_rubblec_delay = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 23 and Status = 3) THEN 1 ELSE 0 END", // D-Wall and Complete
    outStatisticFieldName: "total_rubblec_delay",
    statisticType: "sum",
  });

  // Query
  var query = depotBuildingStructureLayer.createQuery();
  query.outStatistics = [
    total_beam_tobeC,
    total_beam_done,
    total_beam_delay,
    total_column_tobeC,
    total_column_done,
    total_column_delay,
    total_footing_tobeC,
    total_footing_done,
    total_footing_delay,
    total_girder_tobeC,
    total_girder_done,
    total_girder_delay,
    total_mef_tobeC,
    total_mef_done,
    total_mef_delay,
    total_mes_tobeC,
    total_mes_done,
    total_mes_delay,
    total_parapet_tobeC,
    total_parapet_done,
    total_parapet_delay,
    total_roofdeck_tobeC,
    total_roofdeck_done,
    total_roofdeck_delay,
    total_rooftop_tobeC,
    total_rooftop_done,
    total_rooftop_delay,
    total_sky_tobeC,
    total_sky_done,
    total_sky_delay,
    total_slab_tobeC,
    total_slab_done,
    total_slab_delay,
    total_tiebeam_tobeC,
    total_tiebeam_done,
    total_tiebeam_delay,
    total_wallfoot_tobeC,
    total_wallfoot_done,
    total_wallfoot_delay,
    total_verticalbrace_tobeC,
    total_verticalbrace_done,
    total_verticalbrace_delay,
    total_sidewallgirt_tobeC,
    total_sidewallgirt_done,
    total_sidewallgirt_delay,
    total_purlin_tobeC,
    total_purlin_done,
    total_purlin_delay,
    total_girt_tobeC,
    total_girt_done,
    total_girt_delay,
    total_found_tobeC,
    total_found_done,
    total_found_delay,
    total_rail_tobeC,
    total_rail_done,
    total_rail_delay,
    total_sleepers_tobeC,
    total_sleepers_done,
    total_sleepers_delay,
    total_rafter_tobeC,
    total_rafter_done,
    total_rafter_delay,
    total_tensionbrace_tobeC,
    total_tensionbrace_done,
    total_tensionbrace_delay,
    total_rubblec_tobeC,
    total_rubblec_done,
    total_rubblec_delay,
  ];

  // Query
  const defaultExpression = "1=1";
  const expression = "Building_Names = '" + depotname + "'";
  if (!depotname) {
    depotBuildingStructureLayer.definitionExpression = defaultExpression;
    query.where = defaultExpression;
  } else {
    query.where = expression;
    depotBuildingStructureLayer.definitionExpression = expression;
  }

  return depotBuildingStructureLayer
    .queryFeatures(query)
    .then((response: any) => {
      var stats = response.features[0].attributes;

      // Beam
      const beam_tobeC = stats.total_beam_tobeC;
      const beam_done = stats.total_beam_done;
      const beam_delay = stats.total_beam_delay;

      // Column
      const column_tobeC = stats.total_column_tobeC;
      const column_done = stats.total_column_done;
      const column_delay = stats.total_column_delay;

      // footing
      const footing_tobeC = stats.total_footing_tobeC;
      const footing_done = stats.total_footing_done;
      const footing_delay = stats.total_footing_delay;

      // Girder
      const girder_tobeC = stats.total_girder_tobeC;
      const girder_done = stats.total_girder_done;
      const girder_delay = stats.total_girder_delay;

      // Mechanical Equipment Foundation
      const mef_tobeC = stats.total_mef_tobeC;
      const mef_done = stats.total_mef_done;
      const mef_delay = stats.total_mef_delay;

      // Mechanical and Electrical Space
      const mes_tobeC = stats.total_mes_tobeC;
      const mes_done = stats.total_mes_done;
      const mes_delay = stats.total_mes_delay;

      // Parapet
      const parapet_tobeC = stats.total_parapet_tobeC;
      const parapet_done = stats.total_parapet_done;
      const parapet_delay = stats.total_parapet_delay;

      // Roof Deck Slab
      const roofdeck_tobeC = stats.total_roofdeck_tobeC;
      const roofdeck_done = stats.total_roofdeck_done;
      const roofdeck_delay = stats.total_roofdeck_delay;

      // Rooftop Stair Enclosure
      const rooftop_tobeC = stats.total_rooftop_tobeC;
      const rooftop_done = stats.total_rooftop_done;
      const rooftop_delay = stats.total_rooftop_delay;

      // Skylight
      const sky_tobeC = stats.total_sky_tobeC;
      const sky_done = stats.total_sky_done;
      const sky_delay = stats.total_sky_delay;

      // Slab
      const slab_tobeC = stats.total_slab_tobeC;
      const slab_done = stats.total_slab_done;
      const slab_delay = stats.total_slab_delay;

      // Tie Beam
      const tiebeam_tobeC = stats.total_tiebeam_tobeC;
      const tiebeam_done = stats.total_tiebeam_done;
      const tiebeam_delay = stats.total_tiebeam_delay;

      // Wall Footing
      const wallfoot_tobeC = stats.total_wallfoot_tobeC;
      const wallfoot_done = stats.total_wallfoot_done;
      const wallfoot_delay = stats.total_wallfoot_delay;

      // verticalbrace
      const verticalbrace_tobeC = stats.total_verticalbrace_tobeC;
      const verticalbrace_done = stats.total_verticalbrace_done;
      const verticalbrace_delay = stats.total_verticalbrace_delay;

      // Side Wall Girt
      const sidewallgirt_tobeC = stats.total_sidewallgirt_tobeC;
      const sidewallgirt_done = stats.total_sidewallgirt_done;
      const sidewallgirt_delay = stats.total_sidewallgirt_delay;

      // Purlin
      const purlin_tobeC = stats.total_purlin_tobeC;
      const purlin_done = stats.total_purlin_done;
      const purlin_delay = stats.total_purlin_delay;

      // Girt
      const girt_tobeC = stats.total_girt_tobeC;
      const girt_done = stats.total_girt_done;
      const girt_delay = stats.total_girder_delay;

      // Foundation
      const found_tobeC = stats.total_found_tobeC;
      const found_done = stats.total_found_done;
      const found_delay = stats.total_found_delay;

      // Rail
      const rail_tobeC = stats.total_rail_tobeC;
      const rail_done = stats.total_rail_done;
      const rail_delay = stats.total_rail_delay;

      // Sleepers
      const sleepers_tobeC = stats.total_sleepers_tobeC;
      const sleepers_done = stats.total_sleepers_done;
      const sleepers_delay = stats.total_sleepers_delay;

      // Rafter
      const rafter_tobeC = stats.total_rafter_tobeC;
      const rafter_done = stats.total_rafter_done;
      const rafter_delay = stats.total_rafter_delay;

      // Tension Brace
      const tensionbrace_tobeC = stats.total_tensionbrace_tobeC;
      const tensionbrace_done = stats.total_tensionbrace_done;
      const tensionbrace_delay = stats.total_tensionbrace_delay;

      // Rubble Concrete
      const rubblec_tobeC = stats.total_rubblec_tobeC;
      const rubblec_done = stats.total_rubblec_done;
      const rubblec_delay = stats.total_rubblec_delay;

      const data = [
        {
          category: depotType[0],
          comp: beam_done,
          incomp: beam_tobeC,
          delay: beam_delay,
        },
        {
          category: depotType[1],
          comp: column_done,
          incomp: column_tobeC,
          delay: column_delay,
        },
        {
          category: depotType[2],
          comp: footing_done,
          incomp: footing_tobeC,
          delay: footing_delay,
        },
        {
          category: depotType[3],
          comp: girder_done,
          incomp: girder_tobeC,
          delay: girder_delay,
        },
        {
          category: depotType[4],
          comp: mef_done,
          incomp: mef_tobeC,
          delay: mef_delay,
        },
        {
          category: depotType[5],
          comp: mes_done,
          incomp: mes_tobeC,
          delay: mes_delay,
        },
        {
          category: depotType[6],
          comp: parapet_done,
          incomp: parapet_tobeC,
          delay: parapet_delay,
        },
        {
          category: depotType[7],
          comp: roofdeck_done,
          incomp: roofdeck_tobeC,
          delay: roofdeck_delay,
        },
        {
          category: depotType[8],
          comp: rooftop_done,
          incomp: rooftop_tobeC,
          delay: rooftop_delay,
        },
        {
          category: depotType[9],
          comp: sky_done,
          incomp: sky_tobeC,
          delay: sky_delay,
        },
        {
          category: depotType[10],
          comp: slab_done,
          incomp: slab_tobeC,
          delay: slab_delay,
        },
        {
          category: depotType[11],
          comp: tiebeam_done,
          incomp: tiebeam_tobeC,
          delay: tiebeam_delay,
        },
        {
          category: depotType[12],
          comp: wallfoot_done,
          incomp: wallfoot_tobeC,
          delay: wallfoot_delay,
        },
        {
          category: depotType[13],
          comp: verticalbrace_done,
          incomp: verticalbrace_tobeC,
          delay: verticalbrace_delay,
        },
        {
          category: depotType[14],
          comp: sidewallgirt_done,
          incomp: sidewallgirt_tobeC,
          delay: sidewallgirt_delay,
        },
        {
          category: depotType[15],
          comp: purlin_done,
          incomp: purlin_tobeC,
          delay: purlin_delay,
        },
        {
          category: depotType[16],
          comp: girt_done,
          incomp: girt_tobeC,
          delay: girt_delay,
        },
        {
          category: depotType[17],
          comp: found_done,
          incomp: found_tobeC,
          delay: found_delay,
        },
        {
          category: depotType[18],
          comp: rail_done,
          incomp: rail_tobeC,
          delay: rail_delay,
        },
        {
          category: depotType[19],
          comp: sleepers_done,
          incomp: sleepers_tobeC,
          delay: sleepers_delay,
        },
        {
          category: depotType[20],
          comp: rafter_done,
          incomp: rafter_tobeC,
          delay: rafter_delay,
        },
        {
          category: depotType[21],
          comp: tensionbrace_done,
          incomp: tensionbrace_tobeC,
          delay: tensionbrace_delay,
        },
        {
          category: depotType[22],
          comp: rubblec_done,
          incomp: rubblec_tobeC,
          delay: rubblec_delay,
        },
      ];
      return data;
    });
}

export async function generateTotalProgress(depotname: any) {
  var total_depot_number = new StatisticDefinition({
    onStatisticField: "Name",
    outStatisticFieldName: "total_depot_number",
    statisticType: "count",
  });

  var total_depot_comp = new StatisticDefinition({
    onStatisticField: "CASE WHEN Status = 4 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_depot_comp",
    statisticType: "sum",
  });

  var query = depotBuildingStructureLayer.createQuery();
  const defaultExpression = "1=1";
  const expression = "Building_Names = '" + depotname + "'";

  if (!depotname) {
    query.where = defaultExpression;
  } else {
    query.where = expression;
  }
  query.outStatistics = [total_depot_number, total_depot_comp];

  return depotBuildingStructureLayer
    .queryFeatures(query)
    .then((response: any) => {
      var stats = response.features[0].attributes;
      const comp = stats.total_depot_comp;
      const total = stats.total_depot_number;
      const progress = ((comp / total) * 100).toFixed(1);

      return [total, comp, progress];
    });
}

// Thousand separators function
export function thousands_separators(num: any) {
  if (num) {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }
}

export function zoomToLayer(layer: any, view: any) {
  return layer.queryExtent().then((response: any) => {
    view
      ?.goTo(response.extent, {
        //response.extent
        speedFactor: 2,
      })
      .catch((error: any) => {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      });
  });
}

export const defineActions = (event: any) => {
  const item = event.item;
  if (item.layer.type !== "group") {
    item.panel = {
      content: "legend",
      open: true,
    };
  }
  item.title === "Land Acquisition"
    ? (item.visible = false)
    : (item.visible = true);
};
