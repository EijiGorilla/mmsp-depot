import { use, useEffect, useRef, useState } from "react";
import { buildingSpotLayer, depotBuildingStructureLayer } from "../layers";
import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import { CalcitePanel } from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-panel";
import "../App.css";
import {
  depotTypeChart,
  generateChartData,
  generateTotalProgress,
  thousands_separators,
  zoomToLayer,
} from "../Query";
import { MyContext } from "../App";
import { ArcgisScene } from "@arcgis/map-components/dist/components/arcgis-scene";
const primaryLabelColor = "#9ca3af";
const valueLabelColor = "#d1d5db";

// Dispose function
function maybeDisposeRoot(divId: any) {
  am5.array.each(am5.registry.rootElements, function (root) {
    if (root.dom.id === divId) {
      root.dispose();
    }
  });
}

// Draw chart
const Chart = () => {
  const arcgisScene = document.querySelector("arcgis-scene") as ArcgisScene;
  const { buildings } = use(MyContext);

  const legendRef = useRef<unknown | any | undefined>({});
  const chartRef = useRef<unknown | any | undefined>({});
  const [chartData, setChartData] = useState([]);
  const [progress, setProgress] = useState([]);

  const chartID = "depot-bar";
  useEffect(() => {
    generateChartData(buildings).then((response: any) => {
      setChartData(response);
    });

    generateTotalProgress(buildings).then((response: any) => {
      setProgress(response);
    });

    !buildings
      ? (buildingSpotLayer.definitionExpression = "1=1")
      : (buildingSpotLayer.definitionExpression =
          "Building_Names = '" + buildings + "'") &&
        zoomToLayer(depotBuildingStructureLayer, arcgisScene);
  }, [buildings]);

  // Define parameters
  const marginTop = 0;
  const marginLeft = 0;
  const marginRight = 0;
  const marginBottom = 0;
  const paddingTop = 10;
  const paddingLeft = 5;
  const paddingRight = 5;
  const paddingBottom = 0;

  const xAxisNumberFormat = "#'%'";
  const seriesBulletLabelFontSize = "0.9vw";

  // axis label
  const yAxisLabelFontSize = "0.75vw";
  const xAxisLabelFontSize = "0.8vw";
  const legendFontSize = "0.8vw";

  // 1.1. Point
  const chartIconWidth = 35;
  const chartIconHeight = 35;
  const chartIconPositionX = -21;
  const chartPaddingRightIconLabel = 10;

  const chartSeriesFillColorComp = "#0070ff";
  const chartSeriesFillColorIncomp = "#000000";
  const chartSeriesFillColorDelay = "#FF0000"; // original: #FF0000
  const chartBorderLineColor = "#00c5ff";
  const chartBorderLineWidth = 0.4;

  // Utility Chart
  useEffect(() => {
    maybeDisposeRoot(chartID);

    var root = am5.Root.new(chartID);
    root.container.children.clear();
    root._logo?.dispose();

    // Set themesf
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root),
      am5themes_Responsive.new(root),
    ]);

    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        layout: root.verticalLayout,
        marginTop: marginTop,
        marginLeft: marginLeft,
        marginRight: marginRight,
        marginBottom: marginBottom,
        paddingTop: paddingTop,
        paddingLeft: paddingLeft,
        paddingRight: paddingRight,
        paddingBottom: paddingBottom,
        scale: 1,
        height: am5.percent(100),
      })
    );
    chartRef.current = chart;

    var yRenderer = am5xy.AxisRendererY.new(root, {
      inversed: true,
    });
    var yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: yRenderer,
        bullet: function (root, axis, dataItem: any) {
          return am5xy.AxisBullet.new(root, {
            location: 0.5,
            sprite: am5.Picture.new(root, {
              width: chartIconWidth,
              height: chartIconHeight,
              centerY: am5.p50,
              centerX: am5.p50,
              x: chartIconPositionX,
              src: dataItem.dataContext.icon,
            }),
          });
        },
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    yRenderer.labels.template.setAll({
      paddingRight: chartPaddingRightIconLabel,
    });

    yRenderer.grid.template.setAll({
      location: 1,
    });

    // Label properties Y axis
    yAxis.get("renderer").labels.template.setAll({
      oversizedBehavior: "wrap",
      textAlign: "center",
      fill: am5.color("#ffffff"),
      //maxWidth: 150,
      fontSize: yAxisLabelFontSize,
    });
    yAxis.data.setAll(chartData);

    var xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        max: 100,
        strictMinMax: true,
        numberFormat: xAxisNumberFormat,
        calculateTotals: true,
        renderer: am5xy.AxisRendererX.new(root, {
          strokeOpacity: 0,
          strokeWidth: 1,
          stroke: am5.color("#ffffff"),
        }),
      })
    );

    xAxis.get("renderer").labels.template.setAll({
      //oversizedBehavior: "wrap",
      textAlign: "center",
      fill: am5.color("#ffffff"),
      //maxWidth: 150,
      fontSize: xAxisLabelFontSize,
    });

    var legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        centerY: am5.percent(50),
        x: am5.percent(60),
        y: am5.percent(97),
        marginTop: 20,
        scale: 0.8,
        layout: root.horizontalLayout,
      })
    );
    legendRef.current = legend;

    legend.labels.template.setAll({
      oversizedBehavior: "truncate",
      fill: am5.color("#ffffff"),
      fontSize: legendFontSize,
      scale: 1.2,
      //textDecoration: "underline"
      //width: am5.percent(600),
      //fontWeight: '300',
    });

    function makeSeries(name: any, fieldName: any) {
      var series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: name,
          stacked: true,
          xAxis: xAxis,
          yAxis: yAxis,
          baseAxis: yAxis,
          valueXField: fieldName,
          valueXShow: "valueXTotalPercent",
          categoryYField: "category",
          fill:
            fieldName === "delay"
              ? fieldName === "incomp"
                ? am5.color(chartSeriesFillColorIncomp)
                : am5.color(chartSeriesFillColorDelay)
              : am5.color(chartSeriesFillColorComp),
          stroke: am5.color(chartBorderLineColor),
        })
      );

      series.columns.template.setAll({
        fillOpacity:
          fieldName === "comp" // first condition
            ? fieldName === "incomp" // second condition
              ? 0 // if first condition is false and second condition is true,
              : 1 // if first condition is true
            : fieldName === "delay" // third condition
            ? 0.5 // if first and second conditions are false but third condition is true
            : 0, // else
        tooltipText: "{name}: {valueX}", // "{categoryY}: {valueX}",
        tooltipY: am5.percent(90),
        strokeWidth: chartBorderLineWidth,
      });
      series.data.setAll(chartData);

      series.appear();

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Label.new(root, {
            text:
              fieldName === "incomp" || fieldName === "delay"
                ? ""
                : "{valueXTotalPercent.formatNumber('#.')}%", //"{valueX}",
            fill: root.interfaceColors.get("alternativeText"),
            opacity: fieldName === "incomp" ? 0 : 1,
            fontSize: seriesBulletLabelFontSize,
            centerY: am5.p50,
            centerX: am5.p50,
            populateText: true,
          }),
        });
      });

      // Click event
      series.columns.template.events.on("click", (ev) => {
        const selected: any = ev.target.dataItem?.dataContext;
        const categorySelect: string = selected.category;
        const find = depotTypeChart.find(
          (emp: any) => emp.category === categorySelect
        );
        const typeSelect = find?.value;
        const selectedStatus: number | null = fieldName === "comp" ? 4 : 1;

        const defaultExpression =
          "Type = " + typeSelect + " AND " + "Status = " + selectedStatus;
        const expression =
          "Building_Names = '" +
          buildings +
          "'" +
          " AND " +
          "Type = " +
          typeSelect +
          " AND " +
          "Status = " +
          selectedStatus;

        // Define Query
        var query = depotBuildingStructureLayer.createQuery();

        if (!buildings) {
          query.where = defaultExpression;
        } else {
          query.where = expression;
        }

        // layerView filter and highlight
        let highlightSelect: any;
        arcgisScene
          ?.whenLayerView(depotBuildingStructureLayer)
          .then((layerView: any) => {
            depotBuildingStructureLayer
              .queryFeatures(query)
              .then((results: any) => {
                const lengths = results.features;
                const rows = lengths.length;

                let objID = [];
                for (var i = 0; i < rows; i++) {
                  var obj = results.features[i].attributes.OBJECTID;
                  objID.push(obj);
                }

                if (highlightSelect) {
                  highlightSelect.remove();
                }
                highlightSelect = layerView.highlight(objID);

                arcgisScene?.view.on("click", () => {
                  layerView.filter = new FeatureFilter({
                    where: undefined,
                  });
                  highlightSelect.remove();
                });
              });
            layerView.filter = new FeatureFilter({
              where: !buildings ? defaultExpression : expression,
            });
          });
      });
      legend.data.push(series);
    }
    makeSeries("Complete", "comp");
    makeSeries("Incomplete", "incomp");
    makeSeries("Delayed", "delay");
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  });

  return (
    <>
      <div
        slot="panel-end"
        style={{
          width: "40vw",
          borderStyle: "solid",
          borderRightWidth: 5,
          borderLeftWidth: 5,
          borderBottomWidth: 5,
          overflowY: "auto",
        }}
      >
        <div
          style={{
            color: primaryLabelColor,
            fontSize: "1.2rem",
            marginLeft: "13px",
            marginTop: "15px",
            marginBottom: "6px",
          }}
        >
          TOTAL PROGRESS
        </div>

        <div
          style={{
            color: valueLabelColor,
            fontSize: "2.7rem",
            fontWeight: "bold",
            fontFamily: "calibri",
            lineHeight: "1.2",
            marginLeft: "30px",
          }}
        >
          {thousands_separators(progress[2])} %{" "}
        </div>
        <div
          style={{
            color: valueLabelColor,
            fontSize: "1.3rem",
            fontFamily: "calibri",
            lineHeight: "1.2",
            marginLeft: "30px",
          }}
        >
          ({thousands_separators(progress[0])})
        </div>

        <img
          src="https://EijiGorilla.github.io/Symbols/subway_station_icon.png"
          alt="Utility Logo"
          height={"80px"}
          width={"100px"}
          style={{ marginLeft: "70%", display: "flex", marginTop: "-95px" }}
        />

        <div
          id={chartID}
          style={{
            width: "27vw",
            height: "130vh",
            backgroundColor: "rgb(0,0,0,0)",
            color: "white",
            marginRight: "10px",
            marginTop: "20px",
          }}
        ></div>
      </div>
    </>
  );
};

export default Chart;
