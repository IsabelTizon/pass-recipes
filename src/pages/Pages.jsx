import React from "react";
import Home from "./Home";
import Cuisine from "./Cuisine";
import Searched from "./Searched";
import Recipe from "./Recipe";
import MealPlanning from "./mealPlanning";
import Login from "./login";
import SignUp from "./signup";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

export default function Pages() {
	const location = useLocation();

	return (
		<AnimatePresence mode="wait">
			<Routes Location={location} key={location.pathname}>
				<Route path="/" element={<Home />} />
				<Route path="/cuisine/:type" element={<Cuisine />} />
				<Route path="/searched/:search" element={<Searched />} />
				<Route path="/recipe/:id" element={<Recipe />} />
				<Route path="/mealPlanning" element={<MealPlanning />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
			</Routes>
		</AnimatePresence>
	);
}
