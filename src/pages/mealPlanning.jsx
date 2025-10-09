import React from "react";
// Hook
import { useState } from "react";
//MUI Component
import CommonButton from "../components/common/button";
//Page
import MealList from "../components/MealList";
//Image
import hero from "../img/meal-plan.jpg";

//Styles & @query
import styled from "styled-components";
import { devices } from "../Theme";

export default function MealPlanning() {
	//useState() is React Hook that allows you to add state to a functional component.
	//It returns an array with two values: the current state and a function to update it.The Hook takes an initial state value as an argument and returns an updated state value whenever the setter function is called.
	//useState() components to store dynamic values like meal data and its calories
	//useState() the component changes depending on the state2
	const [mealData, setMealData] = useState(null);
	const [calories, setCalories] = useState(2000);

	const getMealData = async () => {
		const api = await fetch(
			// 'await' expressions are only allowed within async functions to wait to process the code before pop in in the next line
			`https://api.spoonacular.com/mealplanner/generate?apiKey=${
				import.meta.env.VITE_API_KEY
			}&timeFrame=day&targetCalories=${calories}` //fetching the daily recipes per calories with the Spoonacular API
		);

		const data = await api.json();
		setMealData(data);
		console.log(data);
	};

	return (
		<>
			<Hero>
				{/* Hero image */}
				<img
					className="hero"
					src={hero}
					alt="hero meal plan"
				/>
				{/* React Fragment */}
				<Plan>
					<h1>Get Daily Meal Plan</h1>
					<h4>
						Choose your daily plan based in the calories you
						want to ingest
					</h4>
					<form>
						<input
							//The onchange event occurs when the value of an HTML element is changed. In this case the user change the calories in the input search
							onChange={(e) => setCalories(e.target.value)}
							type="number"
							placeholder="Calories e.g. 2000"
						/>
						<CommonButton
							aria-label="Get meal"
							sx={buttonStyles}
							size="small"
							onClick={getMealData} //The onclick event occurs when the user clicks on the button to get the daily meal. It allows to execute the function getMealData.
						>
							Get
						</CommonButton>
					</form>
				</Plan>
				{mealData && <MealList mealData={mealData} />}
			</Hero>
		</>
	);
}

//Styles
const Hero = styled.div`
	img.hero {
		width: 100vw;
		height: calc(100vh - 100px);
		position: relative;
	}
`;
const Plan = styled.form`
	//Mobile
	padding: 3%;
	text-align: center;
	background-color: rgba(224, 224, 224, 0.5);
	border-radius: 5px;

	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	display: flex;
	flex-direction: column;

	width: 80%;

	@media ${devices.tablet} {
		width: 70%;
	}
	@media ${devices.desktop} {
		width: 45%;
	}

	h1 {
		color: #515c26;
		margin-bottom: 3%;
	}
	h4 {
		color: #000000;
		margin-bottom: 10%;
	}
	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		@media ${devices.tablet} {
			flex-direction: row;
		}
	}

	input {
		border: 1px solid #505c26;
		background-color: #ffffff;
		font-size: 1rem;
		color: #000000;
		padding: 0.5rem 3rem;
		border-radius: 5px;
		outline: none;
		width: 100%;
		margin-bottom: 5%;
		@media ${devices.tablet} {
			width: 70%;
			margin-bottom: 0;
		}
	}
`;
const buttonStyles = {
	color: "#ffffff",
	background: "#505c26",
	"&:hover": {
		color: "#ffffff",
		background: "#576a04",
	},
};
