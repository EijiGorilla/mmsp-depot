import { useEffect, useState, use } from "react";
import Select from "react-select";
import "../index.css";
import "../App.css";
import { MyContext } from "../App";
import { buildingNamesList } from "../Query";

export default function DropdownData() {
  const { updateBuildings } = use(MyContext);
  const [buildingName, setBuildingName] = useState<null | any>(null);
  const [initBuildingNames, setInitBuildingNames] = useState<any>([]);

  useEffect(() => {
    setInitBuildingNames(buildingNamesList);
  }, []);

  // handle change event of the Municipality dropdown
  const handleBuildingChange = (obj: any) => {
    setBuildingName(obj);
    updateBuildings(obj.name);
  };

  return (
    <>
      <DropdownListDisplay
        handleBuildingChange={handleBuildingChange}
        building={buildingName}
        initBuildingNames={initBuildingNames}
      ></DropdownListDisplay>
    </>
  );
}

export function DropdownListDisplay({
  handleBuildingChange,
  building,
  initBuildingNames,
}: any) {
  // Style CSS
  const customstyles = {
    option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
      // const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isFocused
          ? "#999999"
          : isSelected
          ? "#2b2b2b"
          : "#2b2b2b",
        color: "#ffffff",
      };
    },

    control: (defaultStyles: any) => ({
      ...defaultStyles,
      backgroundColor: "#2b2b2b",
      borderColor: "#949494",
      color: "#ffffff",
      touchUi: false,
      width: "160px",
    }),
    singleValue: (defaultStyles: any) => ({ ...defaultStyles, color: "#fff" }),
  };

  return (
    <div style={{ margin: "auto", marginRight: "-80px" }}>
      <div
        style={{
          color: "white",
          fontSize: "0.85rem",
          margin: "auto",
          paddingRight: "0.5rem",
        }}
      ></div>
      <Select
        placeholder="Select Building"
        value={building}
        options={initBuildingNames}
        onChange={handleBuildingChange}
        getOptionLabel={(x: any) => x.name}
        styles={customstyles}
      />
    </div>
  );
}
