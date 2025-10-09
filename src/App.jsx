import Pages from "./pages/Pages";

import { BrowserRouter } from "react-router-dom"; // to navigate pages import
// import React, { useState } from "react";

// Mui: React UI framework
import MuiNavbar from "./components/MuiNavbar/MuiNavbar";
import MuiFooter from "./components/MuiFooter";

//Mui
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";

// Global Styles
import { theme } from "./Theme";

//Links
// import { Products } from "./Hooks/counterProducts";
// import ShoppingCartProvider from "./context/shoppingCartContext";

export default function App() {
	// const [counter, setCounter] = useState(0);
	// const addProduct = () => setCounter((counter) => counter + 1);

	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					{/* <Box as="main" sx={{ width: "80%", margin: "0 auto" }}> */}
					<Box as="main">
						<MuiNavbar />
						<Pages />
						<MuiFooter />
					</Box>
				</BrowserRouter>
			</ThemeProvider>
		</div>
	);
}
