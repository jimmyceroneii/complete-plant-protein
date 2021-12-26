import React, { ChangeEvent, useCallback, useState } from "react";
import { enumToProteinMap, EssentialProtein, PlantToProtein } from "./types";

export const plantToProteinMap: PlantToProtein = {
  bean: ["Histidine"],
  rice: ["Histidine"],
};

export const PlantList: React.FC = () => {
  // TODO: Fix the order of operations but in that setProteins is running before setProteinCount is completed
  const allPlants = ["bean", "rice"];
  const [checked, setChecked] = useState<string[]>(["bean"]);
  const [proteins, setProteins] = useState<EssentialProtein[]>(["Histidine"]);
  const [proteinCount, setProteinCount] = useState<number[]>([
    0, 0, 0, 0, 0, 0, 1, 0, 0,
  ]);

  const handleCheck = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setChecked((x) => [...x, event.target.value]);
        setProteinCount((x) => {
          const proteins = plantToProteinMap[event.target.value];

          const copy = x;

          proteins.map((protein) => {
            const proteinIndex = enumToProteinMap[protein];

            copy[proteinIndex] += 1;
          });

          return copy;
        });
        setProteins((x) => {
          const uncleanedProteins = plantToProteinMap[event.target.value];
          const newProteins = uncleanedProteins.filter(
            (potentialProtein) => !x.includes(potentialProtein)
          );
          return [...x, ...newProteins];
        });
      } else {
        setChecked((x) => {
          const copy = x.filter((plant) => {
            return plant !== event.target.value;
          });
          return copy;
        });
        setProteinCount((x) => {
          const proteins = plantToProteinMap[event.target.value];

          console.log("Proteins: ", proteins);

          const copy = x;

          proteins.map((protein) => {
            const proteinIndex = enumToProteinMap[protein];

            copy[proteinIndex] -= 1;
          });

          console.log("Copy: ", copy);

          return copy;
        });
        setProteins((x) => {
          return x.filter((protein) => {
            const proteinIndex = enumToProteinMap[protein];

            console.log("Protein Count: ", proteinCount);

            return proteinCount[proteinIndex] === 0;
          });
        });
      }
    },
    [proteinCount, proteins, checked]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {allPlants.map((plant, index) => (
        <div key={index}>
          <input
            value={plant}
            type="checkbox"
            onChange={handleCheck}
            checked={checked.includes(plant)}
          />
          <span>{plant}</span>
        </div>
      ))}
      <div>
        {proteins &&
          proteins.map((protein, index) => <p key={index}>{protein}</p>)}
      </div>
    </div>
  );
};
