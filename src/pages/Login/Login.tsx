import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  styled,
  TextField,
  Typography,
  Link,
  InputAdornment,
  IconButton,
  CircularProgress,
  Button,
} from "@mui/material";
import { useCallback, useContext, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import UserContext from "../../contexts/UserContext";
import { signin } from "../../api/mockApi";
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

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const { signIn } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const schema = Yup.object().shape({
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
      const result = await signin(data.email, data.password);
      if (result.success && result.user) {
        signIn(result.user.email);
        navigate("/dashboard", { replace: true });
      } else {
        setError(result.error);
      }
      setLoading(false);
    },
    [navigate, setLoading, setError, signIn]
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
            Login
          </Typography>
        </div>
        <StyledForm>
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
                  variant="outlined"
                  label={"Password"}
                  placeholder={"Password"}
                  type={showPassword ? "text" : "password"}
                  autoComplete={"off"}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOutlinedIcon />
                          ) : (
                            <VisibilityOffOutlinedIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
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
            disabled={loading}
            onClick={handleSubmit(onSubmit)}
          >
            {"Login"}
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
          <Typography>{"Don't have an account?"}</Typography>
          <Link
            component={RouterLink}
            to="/register"
            variant={"body1"}
            underline={"none"}
          >
            {"Register"}
          </Link>
        </div>
      </FormBox>
    </Container>
  );
};

export default Login;
