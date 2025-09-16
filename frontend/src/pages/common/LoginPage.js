import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import {
	Box,
	Paper,
	AppBar,
	Toolbar,
	Typography,
	Container,
	Card,
	CardMedia,
	CardContent,
} from "@mui/material";

import AdminImage from "./admin.png";
import InstructorImage from "./instructor.png";
import StudentImage from "./student.png";

import { loginAdmin } from "../../redux/actions/adminAuth";
import { loginInstructor } from "../../redux/actions/instructorAuth";
import { loginStudent } from "../../redux/actions/studentAuth";

function LoginPage({ loginType }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const loginURL =
		process.env.REACT_APP_DEV === "true"
			? "http://localhost:5000/auth/googlelogin"
			: "https://g6p16-online-examination.herokuapp.com/auth/googlelogin";

	function handleCallbackResponse(response) {
		var userObject = jwt_decode(response.credential);
		console.log("login type", loginType);
		console.log("userObject", userObject);
		axios({
			method: "POST",
			url: loginURL,
			data: { emailID: userObject.email, type: loginType },
		})
			.then((response) => {
				if (response.status === 200) {
					localStorage.setItem(`${loginType}_token`, response.data.token);
					if (loginType === "admin") {
						dispatch(loginAdmin());
					}
					if (loginType === "instructor") {
						dispatch(loginInstructor());
					}
					if (loginType === "student") {
						localStorage.setItem("studentEmail", response.data.student.emailID);
						console.log(
							"Logging in as student ",
							response.data.student.emailID
						);
						dispatch(loginStudent());
					}
					navigate(`/${loginType}`);
				}
			})
			.catch((err) => {
				alert("Invalid Credentials");
			});
	}

	useEffect(() => {
		/* global google */
		google.accounts.id.initialize({
			client_id:
				"630790416751-g3tk05k5j2kmgtqkl151o7rch4ol441r.apps.googleusercontent.com",
			callback: handleCallbackResponse,
		});
		google.accounts.id.renderButton(document.getElementById("signInDiv"), {
			theme: "outline",
			size: "large",
		});
	}, []);

	const images = {
		admin: AdminImage,
		instructor: InstructorImage,
		student: StudentImage,
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Examination System
					</Typography>
				</Toolbar>
			</AppBar>
			<Container
				maxWidth="sm"
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					minHeight: "calc(100vh - 64px)", // 64px is the height of the AppBar
				}}
			>
				<Card sx={{ maxWidth: 345, textAlign: "center" }}>
					<CardMedia
						component="img"
						height="140"
						image={images[loginType]}
						alt={loginType}
						sx={{ padding: "1em", objectFit: "contain" }}
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							Login as {loginType.charAt(0).toUpperCase() + loginType.slice(1)}
						</Typography>
						<Box
							id="signInDiv"
							sx={{
								display: "flex",
								justifyContent: "center",
								marginTop: 2,
							}}
						></Box>
					</CardContent>
				</Card>
			</Container>
		</Box>
	);
}

export default LoginPage;