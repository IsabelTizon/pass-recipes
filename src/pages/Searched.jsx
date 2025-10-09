import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import Category from "../components/Category";
import Search from "../components/Search";

//Styles & @query
import styled from "styled-components";
import { devices } from "../Theme";

export default function Searched() {
	const [searchedRecipes, setSearchedRecipes] = useState(
		[]
	);
	//The useParams hook returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path>.
	let params = useParams();

	const getSearched = async (name) => {
		const check =
			// I was having problems to render the images because the local storage veggie value was the string of undefine. I created a condition to make false the undefine value and that the condition could be met the getItem veggie.
			localStorage.getItem("searchedRecipes") ===
			"undefined" // If the local storage is "undefined" return false
				? false
				: // if not return the localStorage
				  localStorage.getItem("searchedRecipes"); // get in the

		if (check) {
			// If there is an item in localStorage, set it and don't do the fetching
			setSearchedRecipes(JSON.parse(check));
		} else {
			//fetching the Spoonacular API to see the input searched
			const data = await fetch(
				`https://api.spoonacular.com/recipes/complexSearch?apiKey=${
					import.meta.env.VITE_API_KEY
				}&query=${name}`
			);

			const recipes = await data.json();
			// 'await' expressions are only allowed within async functions to wait to process the code before pop in in the next line

			localStorage.setItem(
				"searched",
				JSON.stringify(recipes.results)
			);

			setSearchedRecipes(recipes.results);
		}
	};

	//The useEffect Hook allows you to perform side effects in your components like fetching data
	// the useEffect  always have two parameters: 1 f() and one array of dependencies, this last one can be empty
	useEffect(() => {
		getSearched(params.search); //f()
	}, [params.search]); // dependency array

	return (
		<>
			{/* Search component */}
			<Search />
			{/* Category component */}
			<Category />
			{/* section of recipes cards searched */}
			<Grid>
				{/* map() method to create a new array with the searched recipes array */}
				{searchedRecipes.map((item) => {
					return (
						//Card with image and title recipe
						<Card key={item.id}>
							<Link to={"/pass-recipes/recipe/" + item.id}>
								<img src={item.image} alt="" />
								<Box>
									<h4>{item.title}</h4>
								</Box>
							</Link>
						</Card>
					);
				})}
			</Grid>
		</>
	);
}

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(
		auto-fit,
		minmax(15rem, 1fr)
	);
	grid-gap: 2rem;
	width: 90%;
	margin: 5% auto;

	@media ${devices.tablet} {
		width: 85%;
	}
	@media ${devices.desktop} {
		width: 80%;
	}
`;

const Card = styled.div`
	img {
		width: 100%;
		border-radius: 2rem;
	}
	a {
		text-decoration: none;
	}
	h4 {
		text-align: center;
		padding: 1rem;
	}
`;
