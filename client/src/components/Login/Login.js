import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginUser = (data) => {
    axios
      .post(`http://localhost:5000/login`, {
        username: data.username,
        password: data.password,
      })
      .then(async (res) => {
        sessionStorage.setItem("token", res.data.token);
        await axios(`http://localhost:5000/user/${res.data.user[0].id}`).then(
          (res) => {
            sessionStorage.setItem("username", res.data[0].username);
            sessionStorage.setItem("hash", res.data[0].hash);
            sessionStorage.setItem("id", res.data[0].user_id);
            navigate("/recipes");
          }
        );
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alert(`${error.response.data.error}`);
        } else if (error.response.status === 500) {
          alert(`${error.response.data.error}`);
        }
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(loginUser)}>
        <Container maxWidth="xs">
          <h2>Login</h2>
          <Box mb={2} mt={14}>
            <TextField
              label="Name"
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

          <Box mb={2} mt={2}>
            <TextField
              label="Password"
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
          </Box>

          <Box>
            <Button
              sx={{
                backgroundColor: "#62ee",
              }}
              variant="contained"
              color="secondary"
              type="submit"
              size="small"
            >
              Login
            </Button>
          </Box>
          <Box>
            {/* <Button variant="outlined" color="secondary" size="small">
              Delete
            </Button> */}
          </Box>
        </Container>
      </form>
    </>
  );
}

export default Login;
