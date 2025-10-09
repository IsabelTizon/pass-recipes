import React from "react";
//Hooks
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//MUI Materials
import { Button, Box } from "@mui/material";

//Styles and @query
import styled from "styled-components";
import { devices } from "../Theme";

export default function Recipe() {
	let params = useParams();
	//useState() is React Hook that allows you to add state to a functional component.
	//It returns an array with two values: the current state and a function to update it.The Hook takes an initial state value as an argument and returns an updated state value whenever the setter function is called.
	//useState() components to store dynamic values like the details of the recipe or to active the elaboration or ingredients tab
	const [details, setDetails] = useState([]);
	const [activeTab, setActiveTab] = useState("Recipe"); //Active Buttons
	//set elaboration button by default when the page is render

	//The useEffect Hook allows you to perform side effects in your components like fetching the recipe details
	// the useEffect  always have two parameters: 1 f() and one array of dependencies, this last one can be empty
	useEffect(() => {
		const fetchDetails = async () => {
			const data = await fetch(
				`https://api.spoonacular.com/recipes/${
					params.name
				}/information?apiKey=${
					import.meta.env.VITE_API_KEY
				}`
			);
			const detailData = await data.json();
			setDetails(detailData);
		};
		fetchDetails();
	}, [params.name]);

	return (
		<DetailWrapper>
			<Box sx={boxTitle}>
				<h2>{details.title}</h2>
			</Box>
			<Box sx={boxStyles}>
				{/* Recipe Image */}
				<img
					style={{
						minWidth: 300,
					}}
					src={details.image}
					alt="imageRecipe"
				/>
				<section>
					<BoxBtns>
						<Button
							sx={buttonStyles}
							size="small"
							className={
								activeTab === "Recipe" ? "active" : ""
							}
							onClick={() => setActiveTab("Recipe")} //when click the button (event handler function onclick) activate the tab elaboration and show the elaboration description of the recipe
						>
							Recipe
						</Button>
						<Button
							sx={buttonStyles}
							size="medium"
							className={
								activeTab === "Ingredients" ? "active" : ""
							}
							onClick={() => setActiveTab("Ingredients")} //when click the button (event handler function onclick) activate the tab ingredients and show the ingredients of the recipe
						>
							Ingredients
						</Button>
					</BoxBtns>
					{/* Elaboration tab */}
					{activeTab === "Recipe" ? (
						<div>
							<h4
								dangerouslySetInnerHTML={{
									__html: details.summary,
								}}
							></h4>
							<h4
								dangerouslySetInnerHTML={{
									__html: details.recipe,
								}}
							></h4>
						</div>
					) : null}

					{/* Ingredients tab */}
					{activeTab === "Ingredients" ? (
						<ul>
							{details.extendedIngredients.map(
								(ingredient) => (
									<li key={ingredient.id}>
										{ingredient.original}
									</li>
								)
							)}
						</ul>
					) : null}
				</section>
			</Box>
		</DetailWrapper>
	);
}

//STYLES
const boxStyles = {
	display: "flex",
	flexWrap: "wrap",
};

const DetailWrapper = styled.div`
	@media ${devices.mobile} {
		width: 90%;
		margin: 4rem auto 5rem;
	}
	@media ${devices.tablet} {
		width: 80%;
	}
	@media ${devices.desktop} {
		width: 70%;
	}

	.active {
		background: linear-gradient(to right, #515d26, #505c26);

		color: #ffffff;
	}
	div {
		margin: 0;
		display: flex;
	}
	section {
		@media ${devices.mobile} {
			width: 100%;
			margin-left: 0;
			display: flex;
			flex-direction: column;
		}
		@media ${devices.desktop} {
			width: 47%;
			margin-left: 3%;
		}
	}

	h2 {
		margin-bottom: 3rem;
	}
	li {
		font-size: 0.9rem;
		line-height: 2rem;
	}
	ul {
		//Mobile
		margin-top: 2rem;
		padding-left: 20px;
		@media ${devices.tablet} {
			padding-left: 25px;
		}
	}

	h4 {
		margin-top: 2rem;
	}
	img {
		@media ${devices.mobile} {
			width: 100%;
			margin: 0;
			border-radius: 10px;
		}

		@media ${devices.tablet} {
			width: 100%;
		}

		@media ${devices.desktop} {
			width: 50%;
			height: 75%;
		}
	}
`;
const BoxBtns = styled.div`
	@media ${devices.mobile} {
		display: flex;
		flex-direction: column;
	}
	@media ${devices.tablet} {
		flex-direction: row;
	}
`;
const boxTitle = {
	width: "100%",
	display: "flex",
	flexDirection: "row",
	justifyContent: "center",
	textAlign: "center",
};

const buttonStyles = {
	margin: "0.3rem",
	color: "#505c26",
	border: "1px solid #505c26",
	"&:hover": {
		color: "#ffffff",
		background: "#505c26",
	},
};
