import React from "react";
//Components
import Veggie from "../components/Veggie";
import Popular from "../components/Popular";
import Category from "../components/Category";
import Search from "../components/Search";

// Framer Motion: React and JavaScript animation library
import { motion } from "framer-motion";

//Styles & @query
import styled from "styled-components";
import { devices } from "../Theme";

export default function Home() {
	return (
		<>
			{/* Animation for the transition to render the components */}
			<motion.div
				animate={{ opacity: 1 }}
				initial={{ opacity: 0 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.5 }}
			>
				<MainHome>
					<Search /> {/* Search component */}
					<Category /> {/* Category component */}
					<Veggie /> {/* Veggie comp      onent */}
					<Popular /> {/* Popular component */}
				</MainHome>
			</motion.div>
		</>
	);
}

//Styles
const MainHome = styled.div`
	//Mobile
	width: 90%;
	margin: 5% auto 10%;
	@media ${devices.tablet} {
		width: 80%;
	}
	@media ${devices.desktop} {
		width: 80%;
		margin: 3% auto 5%;
	}
`;
