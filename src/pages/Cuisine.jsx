import React from "react";

// Framer Motion: React and JavaScript animation library
import { motion } from "framer-motion";

//Router
import { Link, useParams } from "react-router-dom"; //useParams: to put the keyword in the URL

//Hooks
import { useEffect, useState } from "react";

//Components
import Category from "../components/Category";
import Search from "../components/Search";

//Styles & @query
import styled from "styled-components";
import { devices } from "../Theme";

function Cuisine() {
	//useState() is React Hook that allows you to add state to a functional component. It returns an array with two values: the current state and a function to update it. The Hook takes an initial state value as an argument and returns an updated state value whenever the setter function is called.
	//useState() components to store dynamic values depending of the categories button that you pressed
	//useState() the component changes depending on the state
	const [cuisine, setCuisine] = useState([]);

	//The useParams hook returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path>.
	let params = useParams();

	//The useEffect Hook allows you to perform side effects in your components like fetching data
	// the useEffect  always have two parameters: 1 f() and one array of dependencies, this last one can be empty
	useEffect(() => {
		getCuisine(params.type); //f()
		console.log(params.type);
	}, [params.type]); // dependency array

	const getCuisine = async (name) => {
		//fetchin the data from Spoonacular API to get different cuisines by their name
		const data = await fetch(
			`https://api.spoonacular.com/recipes/complexSearch?apiKey=${
				import.meta.env.VITE_API_KEY
			}&cuisine=${name}`
		);

		const cuisine = await data.json();

		setCuisine(cuisine.results);
	};

	return (
		<Flex>
			{/* Search component */}
			<Search />
			{/* Category component */}
			<Category />
			{/* Section with the cuisine cards */}
			<Grid
				animate={{ opacity: 1 }}
				initial={{ opacity: 0 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.5 }}
			>
				{/* map() method to create a new array with the elements of tcuisine array */}

				{cuisine.map((item) => {
					return (
						//Card that is a link and contains the image of the recipe and its title
						<Card key={item.id}>
							<Link to={"/pass-recipes/recipe/" + item.id}>
								<img src={item.image} alt="" />
								<h4>{item.title}</h4>
							</Link>
						</Card>
					);
				})}
			</Grid>
		</Flex>
	);
}

const Flex = styled.div`
	display: flex;
	flex-direction: column;

	width: 90%;
	margin: 5% auto;

	@media ${devices.desktop} {
		width: 60%;
		margin: 3% auto;
	}
`;
const Grid = styled(motion.div)`
	display: grid;
	grid-template-columns: repeat(
		auto-fit,
		minmax(15rem, 1fr)
	);
	grid-gap: 3rem;
	margin-top: 5%;
	margin-bottom: 15%;
	@media ${devices.tablet} {
		margin-bottom: 10%;
	}
	@media ${devices.desktop} {
		margin-top: 2%;
		margin-bottom: 0;
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
export default Cuisine;
