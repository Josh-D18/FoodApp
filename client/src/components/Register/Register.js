import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const url = "https://serverfoodapp.herokuapp.com";
export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginUser = async (data) => {
    await axios
      .post(`${url}/register`, {
        username: data.username,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      })
      .then(async () => {
        navigate("/login");
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alert(
            `Error Please Check Your Username or Last Name. They may have already been taken!`
          );
        } else if (error.response.status === 500) {
          alert(`${error.response.data.error}`);
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(loginUser)}>
      <Container maxWidth="xs">
        <h2 className="login__title">Sign Up</h2>
        <Box mb={2} mt={14}>
          <TextField
            label="Username"
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

        <Box mb={2} mt={2}>
          <TextField
            label="First Name"
            variant="outlined"
            color="secondary"
            fullWidth
            {...register("firstName", {
              required: "Please Enter Your firstname",
              maxLength: 15,
            })}
            error={!!errors?.firstname}
            helperText={errors?.firstname ? errors.firstname.message : null}
          />
        </Box>

        <Box mb={2} mt={2}>
          <TextField
            label="Last Name"
            variant="outlined"
            color="secondary"
            fullWidth
            placeholder="Last Name"
            {...register("lastName", {
              required: "Please Enter Your lastname",
              maxLength: 15,
            })}
            error={!!errors?.lastname}
            helperText={errors?.lastname ? errors.lastname.message : null}
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
            Sign Up
          </Button>
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
      </Container>
    </form>
  );
}
