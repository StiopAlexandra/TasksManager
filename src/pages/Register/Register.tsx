import {
  styled,
  TextField,
  Typography,
  Link,
  Button,
  CircularProgress,
} from "@mui/material";
import { useCallback, useContext, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { signup } from "../../api/mockApi";
import { User } from "../../types";
import ErrorContext from "../../contexts/ErrorContext";

const Container = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  width: "100%",
  backgroundColor: "#F4F6F8",
}));

const StyledForm = styled("form")(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
}));

const FormBox = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  borderRadius: "15px",
  margin: "20px",
  padding: "40px",
  boxShadow: "0px 10px 30px #00000012",
  maxWidth: "400px",
  flexGrow: 1,
  backgroundColor: "#FFF",
}));

type FormValues = User;

const Login = () => {
  const { setError } = useContext(ErrorContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const schema = Yup.object().shape({
    fname: Yup.string().trim().required("first-name-required"),
    lname: Yup.string().trim().required("last-name-required"),
    email: Yup.string().required("email-required").email("Not valid email"),
    password: Yup.string().required("password-required"),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    async (data) => {
      setLoading(true);
      const result = await signup(data);
      if (result.success) {
        navigate("/login", { replace: true });
      } else {
        setError(result.error);
      }
      setLoading(false);
    },
    [navigate, setLoading, setError]
  );

  return (
    <Container>
      <FormBox>
        <div
          style={{
            paddingBottom: "25px",
          }}
        >
          <Typography variant={"h4"} align={"center"} color={"primary"}>
            Register
          </Typography>
        </div>
        <StyledForm>
          <Controller
            name="fname"
            control={control}
            render={({ field: { name, onChange, value } }) => {
              return (
                <TextField
                  variant="outlined"
                  label={"First name"}
                  placeholder={"First name"}
                  autoComplete={"off"}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={value || ""}
                  onChange={onChange}
                  helperText={errors?.[name]?.message}
                  error={!!errors?.[name]}
                />
              );
            }}
          />
          <Controller
            name="lname"
            control={control}
            render={({ field: { name, onChange, value } }) => {
              return (
                <TextField
                  variant="outlined"
                  label={"Last name"}
                  placeholder={"Last name"}
                  autoComplete={"off"}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={value || ""}
                  onChange={onChange}
                  helperText={errors?.[name]?.message}
                  error={!!errors?.[name]}
                />
              );
            }}
          />
          <Controller
            name="email"
            control={control}
            render={({ field: { name, onChange, value } }) => {
              return (
                <TextField
                  variant="outlined"
                  label={"Email"}
                  placeholder={"Email"}
                  autoComplete={"off"}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={value || ""}
                  onChange={onChange}
                  helperText={errors?.[name]?.message}
                  error={!!errors?.[name]}
                />
              );
            }}
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { name, onChange, value } }) => {
              return (
                <TextField
                  type="password"
                  variant="outlined"
                  label={"Password"}
                  placeholder={"Password"}
                  autoComplete={"off"}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={value || ""}
                  onChange={onChange}
                  helperText={errors?.[name]?.message}
                  error={!!errors?.[name]}
                />
              );
            }}
          />
          <Button
            fullWidth
            variant={"contained"}
            color={"primary"}
            size={"large"}
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
          >
            {"Register"}
            {loading && (
              <CircularProgress
                size={20}
                sx={{
                  position: "absolute",
                  m: "auto",
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                }}
              />
            )}
          </Button>
        </StyledForm>
        <div
          style={{
            display: "flex",
            gap: "5px",
            paddingTop: "15px",
          }}
        >
          <Typography>{"Already have an account?"}</Typography>
          <Link
            component={RouterLink}
            to="/login"
            variant={"body1"}
            underline={"none"}
          >
            {"Login"}
          </Link>
        </div>
      </FormBox>
    </Container>
  );
};

export default Login;
