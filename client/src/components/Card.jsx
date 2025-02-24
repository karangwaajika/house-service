import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

function Card() {
  return (
    <div className="card-home--container">
      <div className="card-home">
        <PieChart
          series={[
            {
              arcLabel: (item) => `${item.value}%`,
              arcLabelMinAngle: 35,
              arcLabelRadius: "60%",
              data: [
                { id: 0, value: 60, label: "series A", color: "orange" },
                { id: 1, value: 15, label: "series B" },
                { id: 2, value: 20, label: "series C" },
              ],
            },
          ]}
          width={300}
          height={200}
        />
      </div>
      <div className="card-home">
        <Gauge
          value={75}
          startAngle={-110}
          endAngle={110}
          sx={{
            [`& .${gaugeClasses.valueText}`]: {
              fontSize: 40,
              transform: "translate(0px, 0px)",
            },
          }}
          text={({ value, valueMax }) => `${value} / ${valueMax}`}
          width={300}
          height={200}
        />
      </div>
    </div>
  );
}

export default Card;
