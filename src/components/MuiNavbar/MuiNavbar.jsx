import * as React from "react";
//React
import { Link, useNavigate } from "react-router-dom";

//Mui
import { styled, useTheme } from "@mui/material/styles";
//Mui Icons
import {
	ChevronLeft,
	ChevronRight,
	Menu,
	ShoppingCartOutlined,
} from "@mui/icons-material";
//Mui  materials
import {
	AppBar as MuiAppBar,
	Box,
	IconButton,
	CssBaseline,
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Badge,
	Typography,
} from "@mui/material";

//Links
import { MuiNavbarItems } from "./MuiNavbarItems";
import { appStore } from "../../store/appStore";
import { authStore } from "../../store/authStore";

//Logo
import Logo from "../../img/Logo.png";

//top bar
import CommonButton from "../common/button";

// Drawer Style storage in a constant
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
	({ theme, open }) => ({
		flexGrow: 1,
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: `-${drawerWidth}px`,
		...(open && {
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginLeft: 0,
		}),
	})
);

//
const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	transition: theme.transitions.create(["margin", "width"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

// Left Navbar
const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const totalItems = appStore((state) => state.myItems.length);
	const user = authStore((state) => state.user);

	// Drawer
	const handleDrawerOpen = () => setOpen(true);

	const handleDrawerClose = () => setOpen(false);

	const navigate = useNavigate();

	return (
		<Box sx={{ isplay: "flex" }}>
			<CssBaseline />
			<AppBar position="fixed" open={open}>
				<Toolbar sx={muiToolbarStyles}>
					{/*Burger icon*/}
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{ color: "#000", mr: 2, ...(open && { display: "none" }) }}
					>
						<Menu />
					</IconButton>

					{/*Logo */}
					<Link to={"/pass-recipes/"}>
						<img src={Logo} width="80" height="45" alt="logo"></img>
					</Link>

					{/*Login Button */}
					<Box sx={userLogged}>
						{/* If the user is logged show the user name */}
						{user.id ? (
							<Typography sx={userName}>{user.firstName}</Typography>
						) : (
							//If not, show Login button
							<Link to={"/pass-recipes/login"}>
								<CommonButton
									sx={buttonStyles}
									variant="authentification"
									size="small"
								>
									Log in
								</CommonButton>
							</Link>
						)}

						{/* Icon Basket */}
						<Link to={"/pass-recipes/basket"} aria-label="link to basket">
							<IconButton size="medium" aria-label="icon basket">
								<Badge badgeContent={totalItems} max={999} color="error">
									<ShoppingCartOutlined fontSize="medium" />
								</Badge>
							</IconButton>
						</Link>
					</Box>
				</Toolbar>
			</AppBar>

			{/* Drawer */}
			<Drawer
				// Style List
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box",
					},
				}}
				variant="persistent"
				anchor="left"
				open={open}
			>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "ltr" ? <ChevronLeft /> : <ChevronRight />}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					{MuiNavbarItems.map((item, index) => (
						<ListItem
							key={item.id}
							sx={navbarStyles.listItem}
							onClick={() => navigate(item.route)}
						>
							<ListItemIcon sx={navbarStyles.icons}>{item.icon}</ListItemIcon>
							<ListItemText sx={navbarStyles.text} primary={item.label} />
						</ListItem>
					))}
				</List>
			</Drawer>
			<Main open={open}>
				<DrawerHeader />
			</Main>
		</Box>
	);
}

//Styles
const navbarStyles = {
	//Cursor
	listItem: {
		cursor: "pointer",
	},
	//Icons Drawer
	icons: {
		color: "#5e5d5d",
		marginLeft: "20px",
		minWidth: 35,

		"&:hover": {
			color: "#024e19",
		},
	},
	// Text Drawer
	text: {
		color: "#5e5d5d",

		"&:hover": {
			color: "#024e19",
			fontWeight: "900",
		},
	},
};

// Button Login
const buttonStyles = {
	color: "#505c26",
	fontSize: "0.7rem",
	border: "1px solid #505c26",
	"&:hover": {
		color: "#ffffff",
		background: "#505c26",
	},
};
//Elements of the top navbar
const muiToolbarStyles = {
	background: "#ffffff",
	display: "flex",
	flexDirection: "row",
	justifyContent: "space-between",
};
// User Name
const userName = {
	color: "#505c26",
	fontWeight: 600,
	marginTop: "10px",
	letterSpacing: "0.1em",
};
//User name and Icon flex container
const userLogged = {
	display: "flex",
	flexDirection: "row",
};
