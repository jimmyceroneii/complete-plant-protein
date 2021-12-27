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
    <div className='flex flex-row justify-between'>
      <div className='flex flex-col'>
        {allPlants.map((plant, index) => (
          <div
            key={index}
            className='flex flex-row bg-slate-200 rounded-md m-2'
          >
            <input
              value={plant}
              type='checkbox'
              data-cy={`check-box-${plant}`}
              onChange={handleCheck}
              checked={checked.includes(plant)}
              className='m-2'
            />
            <span className='m-2'>{plant}</span>
          </div>
        ))}
      </div>
      <div>
        {proteins &&
          proteins.map((protein, index) => (
            <div className='m-2 bg-green-400 rounded-md' key={protein}>
              <p key={index}>{protein}</p>
            </div>
          ))}
      </div>
    </div>
  );
};
