import React, { ChangeEvent, useCallback, useState } from "react";

export const PlantList: React.FC = () => {
	const allPlants = ["bean", "rice"];
	const [checked, setChecked] = useState<string[]>(['bean']);

	const handleCheck = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			setChecked((x) => [...x, event.target.value]);
		} else {
			setChecked((x) => {
				const copy = x.filter((plant) => {
					return plant !== event.target.value;
				});
				return copy;
			});
		}
	}, [])

	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			{allPlants.map((plant, index) => (
				<div key={index}>
					<input value={plant} type="checkbox" onChange={handleCheck} checked={checked.includes(plant)}/>
					<span>{plant}</span>
				</div>
			))}
			<div>
  			{`Items checked are: ${checked}`}
			</div>
		</div>
	)
}