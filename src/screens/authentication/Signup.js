import {
  InputLabel,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import CustomCarousel from "../../components/CarouselComponent";
import InputField from "../../components/InputField";
import CustomCheckbox from "../../components/CustomCheckbox";
import CustomButton from "../../components/CustomButton";
import Text from "../../components/Text";
import Image from "mui-image";
import { Logo } from "../../assets";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signUp, showError } from '../../store/actions/action';
import toast from 'react-hot-toast';
import CircularProgress from '@mui/material/CircularProgress';

export const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  let isError = useSelector((state) => state.reducer.isError);
  let isLoader = useSelector((state) => state.reducer.isLoader);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isTermsChecked, setTerms] = useState(false);

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

  const submit = () => {
    let credentials = {
      email: email,
      password: password,
    }
    isTermsChecked && password === confirmPassword && password.length >= 8 && dispatch(signUp(credentials, navigate))
    if (password.length < 8) {
      toast.error('Password should be minimum 8 character');
    }
    else if (password != confirmPassword) {
      toast.error("Password doesn't matched");
    }
    if (!isTermsChecked) {
      toast.error('Please check terms and condition privecy policy');
    }
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

        <Stack width="100%" style={{ paddingBottom: 100 }}>
          <Text fontWeight={"bold"} variant={"h6"}>
            Sign Up
          </Text>
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
            <Stack>
              <InputLabel style={{ display: 'flex', flexDirection: 'row' }}>
                <Text fontSize={{ xs: "12px", md: "16px" }}>
                  Confirm Password
                </Text>
                {
                  isError && confirmPassword == '' && <Text style={{ top: 3, color: "red" }}>*</Text>
                }
              </InputLabel>
              <InputField
                placeholder="Confirm Password"
                required
                error={isError && confirmPassword == ''}
                type={"password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                size="small"
                inputProps={{
                  style: {
                    ...input,
                  },
                }}
              />
            </Stack>
          </Stack>
          <Stack direction={'row'} marginTop={1}>
            <CustomCheckbox
              checked={isTermsChecked}
              onChange={(e) => setTerms(e.target.checked)}
              size={!small ? "medium" : "small"}
            />
            <Stack
              marginTop={1.4}
              direction="row"
              spacing={0.7}
              flexWrap={"wrap"}
              sx={size}
            >
              <Text style={{ letterSpacing: -0.5, fontSize: 14, }}>I have read</Text>
              <Text>Terms and Conditions</Text>
              <Text style={{ letterSpacing: -0.5, fontSize: 14 }} >and</Text>
              <Text>Privacy Policy</Text>
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
                !isLoader &&
                <Text color="white" fontWeight="bold" fontSize="20px">
                  Sign Up
                </Text>
              }
            </CustomButton>
          </Stack>
        </Stack>
      </Stack>
    </Stack >
  );
};
