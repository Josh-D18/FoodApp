import { useForm } from "react-hook-form";
// import axios from "axios";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Name"
        fullWidth
        {...register("name", {
          required: "Please Enter Your Name",
          maxLength: 20,
        })}
        error={!!errors?.name}
        helperText={errors?.name ? errors.name.message : null}
      />

      <input type="submit" />
    </form>
  );
}
