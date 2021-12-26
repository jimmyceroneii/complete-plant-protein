import React, { ChangeEvent, useCallback, useState } from "react";
import { enumToProteinMap, EssentialProtein, PlantToProtein } from "./types";

const completeProteinCount = [0, 0, 0, 0, 0, 0, 0, 0, 0];

const plantToProteinMap: PlantToProtein = {
	bean: ["Histidine"],
	rice: ["Histidine"],
};

export const PlantList: React.FC = () => {
	const allPlants = ["bean", "rice"];
	const [checked, setChecked] = useState<string[]>(["bean"]);
	const [proteins, setProteins] = useState<EssentialProtein[]>([]);

	const handleCheck = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			setChecked((x) => [...x, event.target.value]);
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
					// if the protein is only on the current plant, remove it
					return plant !== event.target.value;
				});
				return copy;
			});
			setProteins((x) => {
				const proteinIndex = enumToProteinMap[event.target.value];
				completeProteinCount[proteinIndex]--;
				if (completeProteinCount[proteinIndex] === 0) {
					const copy = proteins;
					const updatedList = copy.filter((protein) => {
						return protein !== event.target.value;
					});
					return updatedList;
				}
			});
		}
	}, []);

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
