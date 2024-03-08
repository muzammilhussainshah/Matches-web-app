import {
  InputLabel,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import CustomCarousel from "../../components/CarouselComponent";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import Text from "../../components/Text";
import Image from "mui-image";
import { Logo } from "../../assets";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { forgotPassword, showError } from '../../store/actions/action';
import { useDispatch, useSelector } from 'react-redux';

export const Forget = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  let isError = useSelector((state) => state.reducer.isError);
  let isLoader = useSelector((state) => state.reducer.isLoader);
  const [email, setEmail] = useState('');
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
    }
    dispatch(forgotPassword(credentials, navigate))
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
          <Text fontWeight={"bold"} variant={"h6"}>Reset Password</Text>
          <Text variant={"h6"}>Input your Email Address </Text>
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
                marginTop: 10
              }}
              // onClick={() => navigate("/SixDigit")}
              onClick={() => submit()}
            >
              {
                isLoader && <CircularProgress style={{ 'color': 'white' }} size="1rem" />
              }
              {
                !isLoader &&
                <Text color="white" fontWeight="bold" fontSize="20px">
                  Reset Password
                </Text>
              }
            </CustomButton>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
