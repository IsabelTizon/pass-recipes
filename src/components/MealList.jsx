import React from "react";
import Meal from "../components/Meal";
import styled from "styled-components";

export default function MealList({ mealData }) {
	const nutrients = mealData.nutrients;
	console.log(mealData);

	return (
		<>
			<Flex>
				<h1>Your Daily Plan</h1>
			</Flex>
			<Macros>
				<List>
					{/* toFixed: rounded number, no decimal */}
					<li>Calories: {nutrients.calories.toFixed(0)}</li>
					<li>Carbohydrates: {nutrients.carbohydrates.toFixed(0)}</li>
					<li>Fat: {nutrients.fat.toFixed(0)}</li>
					<li>Protein: {nutrients.protein.toFixed(0)}</li>
				</List>
			</Macros>
			<Meals>
				{/* for each meal return */}
				{mealData.meals.map((meal) => {
					return <Meal key={meal.id} meal={meal} />;
				})}
			</Meals>
		</>
	);
}

//Styles
const Flex = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;

	h1 {
		margin-top: 20px;
		margin-bottom: 20px;
	}
`;
const Macros = styled.div`
	display: flex;
	flex-wrap: wrap;

	margin-top: 20px;
	margin-bottom: 40px;
`;
const Meals = styled.div`
	width: 60%;
	margin: 0 auto;

	display: flex;
	flex-wrap: wrap;
	gap: 2rem;
`;

const List = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	width: 50%;
	margin: 0 auto;
	list-style-type: none;
`;
