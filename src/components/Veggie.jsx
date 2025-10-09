import { useEffect, useState } from "react";
//Splide: the carousel
//SplideSlide: It's gonna be each individual image or card
import {
	Splide,
	SplideSlide,
} from "@splidejs/react-splide";
import { Link } from "react-router-dom";
//
import "@splidejs/splide/dist/css/splide.min.css";

//@query
import styled from "styled-components";
import { devices } from "../Theme";

export default function Veggie() {
	const [veggie, setVeggie] = useState([]);
	// when the page load
	useEffect(() => {
		//array function to invoke the function with empty array
		getVeggie();
	}, []); // Very important add , [] to the end of the arrow f() because because if you don't do that you create an infinite loop and you're left with no more API requests

	const getVeggie = async () => {
		// Storing our fetch in our localStorage for don't fetch over and over again and don't loose my maximun of request per day in spoonaculary API
		const check =
			// I was having problems to render the images because the local storage veggie value was the string of undefine. I created a condition to make false the undefine value and that the condition could be met the getItem veggie.
			localStorage.getItem("veggie") === "undefined" // If the local storage is "undefined" return false
				? false
				: // if not return the localStorage
				  localStorage.getItem("veggie"); // get in the item

		if (check) {
			// If there is an item in localStorage, set it and don't do the fetching
			setVeggie(JSON.parse(check)); // JSON.parse: takes the argument of the JSON source and converts it to the JSON format, because the data was in string
		} else {
			const api = await fetch(
				// 'await' expressions are only allowed within async functions to wait to process the code before pop in in the next line
				`https://api.spoonacular.com/recipes/random?apiKey=${
					import.meta.env.VITE_API_KEY
				}&number=9&tags=vegetarian`
			); //fetch 9 vegetarian recipes
			const data = await api.json();

			localStorage.setItem(
				"veggie",
				JSON.stringify(data.recipes)
			); // Saving the array like a string
			// console.log(data);
			setVeggie(data.recipes);
			console.log(data.recipes);
		}
	};

	// return Veggie
	return (
		<div>
			<Wrapper>
				<h3> Veggie Picks</h3>
				{/*Splide: carousel*/}
				{/*Splide options: to add the number of pictures per screem */}
				<Splide
					options={{
						perPage: 3,
						arrows: false,
						pagination: false,
						drag: "free",
						gap: "3rem",
						breakpoints: {
							1200: {
								perPage: 3,
							},
							900: {
								perPage: 1,
							},
							600: {
								perPage: 1,
							},
						},
					}}
				>
					{veggie.map((recipe) => {
						return (
							//key={recipe.id}:
							<SplideSlide key={recipe.id}>
								{/* each card would be a slide */}
								<Card>
									<Link
										to={"/pass-recipes/recipe/" + recipe.id}
									>
										{/* return img */}
										<img
											src={recipe.image}
											alt="recipe.title"
										/>
										{/*return Recipe Title*/}
										<p>{recipe.title}</p>
										{/* <Gradient /> */}
									</Link>
								</Card>
							</SplideSlide>
						);
					})}
				</Splide>
			</Wrapper>
		</div>
	);
}

//CSS
//Wrapper cards
const Wrapper = styled.div`
	margin: 4rem 0rem;
`;
//card style
const Card = styled.div`
	min-height: 15rem;
	border-radius: 2rem;
	border: 2px solid #718135;
	overflow: hidden;
	position: relative;
	background-color: #505c26;

	img {
		border-radius: 2rem 2rem 0 0;
		width: 100%;
	}
	a {
		text-decoration: none;
	}
	p {
		color: white;
		width: 80%;
		margin: 2% auto;
		text-align: center;
		font-size: 1rem;
		background: linear-gradient(
			(to right, #324001, #232d02)
		);
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;

		@media ${devices.desktop} {
			width: 80%;
		}
	}
`;
