import React, { ChangeEvent, useCallback, useState } from "react";

type EssentialProtein = "Phenylalanine" |
	"Valine" |
	"Tryptophan" |
	"Threonine" |
	"Isoleucine" |
	"Methionine" |
	"Histidine" |
	"Leucine" |
	"Lysine";

type PlantToProtein = {
	[key: string]: EssentialProtein[];
}

const completeProtein = [
	"Phenylalanine",
	"Valine",
	"Tryptophan",
	"Threonine",
	"Isoleucine",
	"Methionine",
	"Histidine",
	"Leucine",
	"Lysine"
]

const plantToProteinMap: PlantToProtein = { "bean": ["Histidine"], "rice": ["Histidine"] }

export const PlantList: React.FC = () => {
	const allPlants = ["bean", "rice"];
	const [checked, setChecked] = useState<string[]>(['bean']);
	const [proteins, setProteins] = useState<EssentialProtein[]>([])

	const handleCheck = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			setChecked((x) => [...x, event.target.value]);
			console.log(plantToProteinMap);
			console.log("Event: ", event.target.value);
			setProteins((x) => {
				const uncleanedProteins = plantToProteinMap[event.target.value];
				const newProteins = uncleanedProteins.filter((potentialProtein) =>
					!x.includes(potentialProtein)
				);
				return [...x, ...newProteins];
			});
			console.log(proteins);
		} else {
			setChecked((x) => {
				const copy = x.filter((plant) => {
					return plant !== event.target.value;
				});
				return copy;
			});
			// remove proteins that are only from the plant unchecked
			setProteins((x) => {
				const copy = x.filter((plant) => {
					return plant !== event.target.value;
				})
				return copy;
			});
		}
	}, [])

	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			{allPlants.map((plant, index) => (
				<div key={index}>
					<input value={plant} type="checkbox" onChange={handleCheck} checked={checked.includes(plant)} />
					<span>{plant}</span>
				</div>
			))}
			<div>
				{proteins && proteins.map((protein, index) => (
					<p key={index}>{protein}</p>
				)
				)}
			</div>
		</div>
	)
}