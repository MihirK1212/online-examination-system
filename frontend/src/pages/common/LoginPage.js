import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

import jwt_decode from "jwt-decode";

import { Box, Paper } from "@mui/material";

import AdminImage from "./admin.png";
import InstructorImage from "./instructor.png";
import StudentImage from "./student.png";

import { loginAdmin } from "../../redux/actions/adminAuth";
import { loginInstructor } from "../../redux/actions/instructorAuth";
import { loginStudent } from "../../redux/actions/studentAuth";

import "./style.css";


function LoginPage({loginType}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginURL =
        process.env.REACT_APP_DEV === "true"
            ? "http://localhost:5000/auth/googlelogin"
            : "https://g6p16-online-examination.herokuapp.com/auth/googlelogin";

    function handleCallbackResponse(response) {
        var userObject = jwt_decode(response.credential);
        console.log('login type', loginType)
        console.log('userObject', userObject);
        axios({
            method: "POST",
            url: loginURL,
            data: { emailID: userObject.email, type: loginType },
        })
        .then((response) => {
            if (response.status === 200) {
                localStorage.setItem(`${loginType}_token`, response.data.token);
                if (loginType === "admin") {
                    // console.log("Logging in as admin ", response.data.admin.emailId)
                    dispatch(loginAdmin());
                }
                if (loginType === "instructor") {
                    // console.log("Logging in as instructor ", response.data.instructor.emailId)
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
            //google client id
            client_id:
                "630790416751-g3tk05k5j2kmgtqkl151o7rch4ol441r.apps.googleusercontent.com",
            callback: handleCallbackResponse,
        });
        google.accounts.id.renderButton(document.getElementById("signInDiv"), {
            theme: "outline",
            size: "large",
        });
    }, []);

    
    return (
        <>
            <nav
                class="navbar navbar-expand-lg navbar-dark bg-primary"
                style={{ justifyContent: "center" }}
            >
                <h1>Welcome to the Examination System. Logging in as {loginType}</h1>
            </nav>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                    marginLeft: "30px",
                    marginRight: "30px",
                }}
            >
                <Paper
                    sx={{
                        maxWidth: "320px",
                        zIndex: 10,
                        borderRadius: "25px",
                        margin: "0, 20px",
                        display: "flex",
                        justifyContent: "center",
                    }}
                    elevation={3}
                >
                    <Box gap={5} padding={3}>
                        <img
                            src={{"admin": AdminImage, "instructor": InstructorImage, "student": StudentImage}[loginType]}
                            style={{ borderRadius: "25px", objectFit: "cover" }}
                            alt={"dsadsa"}
                            height={180}
                            width={"100%"}
                        />
                        <Box
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "10px",
                            }}
                        >
                            <div id="signInDiv"></div>
                        </Box>
                    </Box>
                </Paper>
            </div>
        </>
    );
}

export default LoginPage;