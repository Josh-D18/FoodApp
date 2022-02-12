import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import url from "../../config/config";
import "./Login.scss";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [error, setErrors] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginUser = (data) => {
    console.log(data);
    axios
      .post(`${url}/login`, {
        username: data.username,
        password: data.password,
      })
      .then(async (res) => {
        console.log(data.password);
        sessionStorage.setItem("token", res.data.token);
        await axios(`${url}/user/${res.data.user[0].id}`).then((res) => {
          sessionStorage.setItem("username", res.data[0].username);
          sessionStorage.setItem("hash", res.data[0].hash);
          sessionStorage.setItem("id", res.data[0].user_id);
          navigate("/recipes");
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) {
          if (
            error.response.data.message ===
            "Cannot read property 'password' of undefined"
          ) {
            setErrors("Incorrect Password");
          } else {
            setErrors(`${error.response.data.message}`);
          }
          console.log({ error });
        } else if (error.response.status === 500) {
          setErrors(`${error.response.data.message}`);
        }
      });
  };
  console.log(error);
  return (
    <div className="container">
      <div className="login__backgroundImage">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(loginUser)} className="login__form">
          <Container maxWidth="xs">
            <Box className="login__nameContainer" mb={2}>
              <label>Name:</label>
              <br />
              <TextField
                variant="outlined"
                color="secondary"
                placeholder="Name"
                fullWidth
                {...register("username", {
                  required: "Please Enter Your Name",
                  maxLength: 20,
                })}
                error={!!errors?.username}
                helperText={errors?.username ? errors.username.message : null}
              />
            </Box>

            <Box className="login__passwordContainer" mb={2} mt={2}>
              <label>Password:</label>
              <TextField
                variant="outlined"
                color="secondary"
                type={"password"}
                fullWidth
                placeholder="Password"
                {...register("password", {
                  required: "Please Enter Your Password",
                  maxLength: 20,
                })}
                error={!!errors?.password}
                helperText={errors?.password ? errors.password.message : null}
              />
              <code>{error}</code>
            </Box>
            <div className="login__btnContainer">
              <Box>
                <Button
                  sx={{
                    backgroundColor: "green",
                    color: "white",
                  }}
                  variant="contained"
                  color="secondary"
                  type="submit"
                  size="small"
                >
                  Submit
                </Button>
              </Box>
              <Box>
                <Button
                  sx={{
                    backgroundColor: "green",
                    color: "white",
                  }}
                  variant="outlined"
                  color="secondary"
                  size="small"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </Button>
              </Box>
            </div>
          </Container>
        </form>
      </div>
    </div>
  );
}

export default Login;
