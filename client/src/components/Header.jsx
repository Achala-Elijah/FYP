import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle }) => {
	const theme = useTheme();
	const color = tokens(theme.palette.mode);
	return (
		<Box mb="25px">
			<Typography
				variant="h2"
				color={color.grey[100]}
				fontWeight="bold"
				sx={{ mb: "5px" }}
			>
				{title}
			</Typography>

			<Typography variant="h5"></Typography>
		</Box>
			
	)
}


export default Header;
// This code defines a Header component that can be used in an admin dashboard.