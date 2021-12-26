import React, { ChangeEvent, useCallback, useState } from 'react';
import { enumToProteinMap, EssentialProtein, PlantToProtein } from './types';

export const plantToProteinMap: PlantToProtein = {
  bean: ['Histidine'],
  rice: ['Histidine'],
};

export const PlantList: React.FC = () => {
  const allPlants = ['bean', 'rice'];
  const [checked, setChecked] = useState<string[]>(['bean']);
  const [proteins, setProteins] = useState<EssentialProtein[]>(['Histidine']);
  const [, setProteinCount] = useState<number[]>([0, 0, 0, 0, 0, 0, 1, 0, 0]);

  const handleCheck = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setChecked((x) => [...x, event.target.value]);
      setProteinCount((x) => {
        const proteins = plantToProteinMap[event.target.value];

        const copy = x;

        proteins.map((protein) => {
          const proteinIndex = enumToProteinMap[protein];

          copy[proteinIndex] += 1;
        });

        setProteins((x) => {
          const uncleanedProteins = plantToProteinMap[event.target.value];
          const newProteins = uncleanedProteins.filter(
            (potentialProtein) => !x.includes(potentialProtein)
          );
          return [...x, ...newProteins];
        });

        return copy;
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

        const copy = x;

        proteins.map((protein) => {
          const proteinIndex = enumToProteinMap[protein];

          copy[proteinIndex] -= 1;
        });

        setProteins((y) => {
          return y.filter((protein) => {
            const proteinIndex = enumToProteinMap[protein];

            return copy[proteinIndex] !== 0;
          });
        });

        return copy;
      });
    }
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {allPlants.map((plant, index) => (
        <div key={index}>
          <input
            value={plant}
            type='checkbox'
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
