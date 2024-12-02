import React from "react";

const Legend = ({ keys, colors }) => {
  const legKeys = [...keys].reverse();
  const legColors = [...colors].reverse();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginLeft: "-400px", 
      }}
    >
      {legKeys.map((key, index) => (
        <div
          key={key}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "5px",
          }}
        >
          <div
            style={{
              width: "15px",
              height: "15px",
              backgroundColor: legColors[index],
              marginRight: "10px",
            }}
          ></div>
          <span style={{ fontSize: "12px" }}>{key}</span>
        </div>
      ))}
    </div>
  );
};

export default Legend;