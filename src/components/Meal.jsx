import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { devices } from "../Theme";

export default function Meal({ meal }) {
	const [imageUrl, setImageUrl] = useState("");

	//fetching the data fron Spoonacular API to get the daily plan cards recipes based on calories
	useEffect(() => {
		fetch(
			`https://api.spoonacular.com/recipes/${
				meal.id
			}/information?apiKey=${
				import.meta.env.VITE_API_KEY
			}&includeNutrition=false`
		)
			.then((response) => response.json())
			.then((data) => {
				setImageUrl(data.image);
			});
	}, [meal.id]);

	return (
		<>
			{/*return card meal */}
			<Card>
				<Link to={"/pass-recipes/recipe/" + meal.id}>
					{/*return image */}
					<img
						className="imageMealCard"
						src={imageUrl}
						alt="recipe"
					/>
					{/*return Recipe Title*/}
					<div>
						<h4>{meal.title}</h4>
						<Flex>
							{/*return preparation time and number of servings */}
							<p>
								<strong>Preparation time:</strong>{" "}
								{meal.readyInMinutes} minutes
							</p>
							<p>
								<strong>Number of servings:</strong>{" "}
								{meal.servings}
							</p>
						</Flex>
					</div>
				</Link>
			</Card>
		</>
	);
}

//card style
const Card = styled.div`
	border-radius: 2rem;
	overflow: hidden;
	border: 1px solid #718135;
	width: 100%;

	//Desktop
	@media ${devices.desktop} {
		width: 30%;
	}

	img.imageMealCard {
		border-radius: 2rem 2rem 0 0;
		width: 100%;
		object-fit: cover;
	}
	div {
		padding: 0 10px 10px 10px;
	}
	h4 {
		font-size: 1rem;
		font-weight: bolder;
		padding: 10px 10px 0 10px;
		color: #56622d;
	}
	p {
		color: #000000;
		padding-top: 0.5rem;
		font-size: 0.8rem;
	}
	a {
		text-decoration: none;
	}
`;
const Flex = styled.div`
	display: flex;
	flex-direction: column;
`;
