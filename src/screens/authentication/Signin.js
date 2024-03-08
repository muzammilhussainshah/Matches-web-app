import {
  Divider,
  InputLabel,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState, useEffect } from "react";
import CustomCarousel from "../../components/CarouselComponent";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import Text from "../../components/Text";
import Image from "mui-image";
import { Logo } from "../../assets";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { signIn, showError, } from '../../store/actions/action';
import CircularProgress from '@mui/material/CircularProgress';
import CustomCheckbox from "../../components/CustomCheckbox";

export const Signin = () => {
  const dispatch = useDispatch();
  let isError = useSelector((state) => state.reducer.isError);
  let isLoader = useSelector((state) => state.reducer.isLoader);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setRememberMe] = useState(false);
  const items = JSON.parse(localStorage.getItem('isRemember'));

  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("md"));

  const size = {
    fontSize: { xs: "10.5px", sm: "15px" },
    color: "black",
  };

  const input = {
    height: small && "10px",
    fontSize: small && "11px",
  };

  useEffect(() => {
    document.cookie = "__Secure-3PSIDCC=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }, [])

  useEffect(() => {
    window.sessionStorage.clear()
    window.localStorage.clear();
    if (items) {
      navigate("/matches")
    }
  }, [])

  const submit = () => {
    let credentials = {
      email: email,
      password: password,
    }
    dispatch(signIn(credentials, navigate, isRemember))
    dispatch(showError())
  }

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      width="100vw"
      alignItems={"center"}
      justifyContent="center"
      height={"100vh"}
    >
      {
        (items) ? (
          <CircularProgress style={{ 'color': '#24A59E' }} size="10rem" />
        ) : (
          <>
            <Stack
              justifyContent="center"
              display={{ xs: "none", md: "flex" }}
              position="relative"
              width={{ xs: "100vw", md: "55vw" }}
            >
              <CustomCarousel />
            </Stack>

            <Stack
              sx={{
                width: {
                  xs: "80vw",
                  md: "35vw",
                },
                paddingLeft: { xs: 0, md: 8 },
              }}
              marginRight={{ xs: 0, md: 14 }}
              marginTop={{ xs: 0, md: 8 }}
            >
              <Stack
                display={{ xs: "flex", md: "none" }}
                marginBottom={7}
                marginTop={-7}
              >
                <Image src={Logo} style={{ width: "50vw" }} />
              </Stack>

              <Stack width="100%">
                <Text fontWeight={"bold"} variant={"h6"}>Welcome Back!</Text>
                <Text variant={"h6"}>Input your Email Address & Password</Text>
                <Stack mt={{ xs: 4, md: 7 }} spacing={{ xs: 2, md: 1 }}>
                  <Stack spacing={1}>
                    <InputLabel style={{ display: 'flex', flexDirection: 'row' }}>
                      <Text fontSize={{ xs: "12px", md: "16px" }}>Email Address</Text>
                      {
                        isError && email == '' && <Text style={{ top: 3, color: "red" }}>*</Text>
                      }
                    </InputLabel>
                    <InputField
                      required
                      error={isError && email == ''}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      size={"small"}
                      placeholder="E-mail"
                      inputProps={{
                        style: {
                          ...input,
                        },
                      }}
                    />
                  </Stack>
                  <Stack>
                    <InputLabel style={{ display: 'flex', flexDirection: 'row' }}>
                      <Text fontSize={{ xs: "12px", md: "16px" }}>Password</Text>
                      {
                        isError && password == '' && <Text style={{ top: 3, color: "red" }}>*</Text>
                      }
                    </InputLabel>
                    <InputField
                      required
                      error={isError && password == ''}
                      type={"password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      size="small"
                      placeholder="Password"
                      inputProps={{
                        style: {
                          ...input,
                        },
                      }}
                    />
                  </Stack>
                </Stack>

                <Stack direction={'row'} justifyContent={'space-between'}>
                  <Stack direction={'row'}>
                    <CustomCheckbox
                      checked={isRemember}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      size={!small ? "medium" : "small"}
                    />
                    <Stack
                      marginTop={1.2}
                      direction="row"
                      spacing={0.7}
                      flexWrap={"wrap"}
                      sx={size}
                    >
                      <Text fontSize={{ xs: "12px", md: "16px", cursor: 'pointer' }}>Remember me</Text>
                    </Stack>
                  </Stack>
                  <Stack marginTop={1.2} onClick={() => navigate("/Forget")}>
                    <Text fontSize={{ xs: "12px", md: "16px", cursor: 'pointer' }}>Forgot Password?</Text>
                  </Stack>
                </Stack>

                <Stack>
                  <CustomButton
                    variant="contained"
                    sx={{
                      height: { xs: "40px", md: "60px" },
                      marginTop: {
                        xs: 2,
                        sm: 3,
                      },
                    }}
                    onClick={() => submit()}
                  >
                    {
                      isLoader && <CircularProgress style={{ 'color': 'white' }} size="1rem" />
                    }
                    {
                      !isLoader && <Text color="white" fontWeight="bold" fontSize="20px">
                        Log in
                      </Text>
                    }
                  </CustomButton>
                </Stack>
                <Stack
                  display={{ xs: "flex", md: "flex" }}
                  marginBottom={3}
                  marginTop={5}
                >
                  <Divider>
                    <u
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        cursor: "pointer",
                        color: "grey",
                      }}
                    >
                      or login with
                    </u>
                  </Divider>
                </Stack>
                <Stack display={{ xs: "flex", md: "flex" }} alignItems={"center"}>
                  <Text fontSize={{ xs: "12px", md: "16px", cursor: 'pointer', marginTop: 20 }}
                    onClick={() => navigate("/signup")}
                  >New to Assignment app? Join Now</Text>
                </Stack>
              </Stack>
            </Stack>
          </>
        )
      }
    </Stack>
  );
};
