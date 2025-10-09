//Mui Materials
import {
	CardHeader,
	CardMedia,
	CardContent,
	Avatar,
	Typography,
	Box,
	Button as CommonButton,
} from "@mui/material";

// Mui Colors
import { green } from "@mui/material/colors";

//Links
import { storeItems } from "../components/courses/storeItems";
import { formatCurrency } from "../utilities/formatCurrency";
import { appStore } from "../store/appStore";

// Images
import Logo from "../img/Logo.png";

// Mui Styles
import { styled } from "@mui/material/styles";

export default function Courses() {
	//Constant to set the course that the user cliked in the basket
	const addProduct = appStore((state) => state.addProduct);

	return (
		<>
			<MainCourses>
				<Box sx={containerTitle}>
					<Typography sx={title}>
						Pass Recipe Courses
					</Typography>
				</Box>
				<Box sx={wrapCourses}>
					{/* map() method to create a new array with the elements of the soreItems array */}
					{storeItems.map((item) => (
						<CardCourse
							key={item.id}
							sx={{ maxWidth: 345, mb: 5 }}
						>
							<CardHeader
								// Avatar image of the web
								avatar={
									<Avatar
										sx={{ bgcolor: green[800] }}
										aria-label="course"
									>
										<img
											src={Logo}
											width="40"
											height="30"
											alt="logo"
										></img>
									</Avatar>
								}
								//Title of the course
								title={
									<Typography sx={titleCart}>
										{item.name}
									</Typography>
								}
								//Subtitle
								subheader={
									<Box sx={subheaderCart}>
										<Typography>Beginners</Typography>
										<Typography>
											{/* formatCurrency() to add commas and decimals in the correct positions and to put each price output based on the currency with
										proper formatting. */}
											{formatCurrency(item.price)}
										</Typography>
									</Box>
								}
							/>
							{/* Image */}
							{/* the source need to have import.meta.env.BASE_URL to can access the public files because in the production I couldn't see then without import.meta.env.BASE_URL */}
							<CardMedia
								component="img"
								height="194"
								image={
									import.meta.env.BASE_URL + item.imgUrl
								}
								alt="courseImage"
							/>
							{/* Description of the course */}
							<CardContent>
								<Typography
									variant="body2"
									color="text.secondary"
								>
									{item.cardContent}
								</Typography>
							</CardContent>
							{/* Button to add course to the basket */}
							<Box sx={shoppingBtnContainer}>
								{/*  when click the button (event handler function onclick) add a product (arrow function) on the aapStore */}
								<CommonButton
									onClick={() => addProduct(item)}
									sx={addingCartBtn}
								>
									ADD TO CART
								</CommonButton>
							</Box>
						</CardCourse>
					))}
				</Box>
			</MainCourses>
		</>
	);
}

//Styles
// Main
const MainCourses = styled("div")(({ theme }) => ({
	[theme.breakpoints.up("mobile")]: {
		width: "90%",
		margin: "5% auto",
	},
	[theme.breakpoints.up("desktop")]: {
		width: "80%",
	},
}));
//card
const CardCourse = styled("div")(({ theme }) => ({
	[theme.breakpoints.up("mobile")]: {
		width: "100%",
		borderRadius: "10px",
		border: "1px solid #505c26",
	},
	[theme.breakpoints.up("tablet")]: {
		width: "50%",
	},
	[theme.breakpoints.up("desktop")]: {
		width: "30%",
	},
}));
//Title Page
const containerTitle = {
	display: "flex",
	justifyContent: "center",
	marginBottom: "2rem",
};
const title = {
	color: "#505c26",
	fontSize: "2rem",
};
//Courses wrap
const wrapCourses = {
	display: "flex",
	flexWrap: "wrap",
	gap: "4%",
};
const titleCart = {
	fontSize: "1.3rem",
};
const subheaderCart = {
	display: "flex",
	flexDirection: "row",
	justifyContent: "space-between",
};
const shoppingBtnContainer = {
	display: "flex",
	flexDirection: "row",
};

const addingCartBtn = {
	width: "95%",
	margin: "10px auto",
	color: "#ffffff",
	background: "#505c26",
	fontSize: "0.7rem",
	border: "1px solid #505c26",
	"&:hover": {
		color: "#000000",
		background: "#EED3C0",
	},
};
