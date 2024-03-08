import { useState, useEffect, useRef } from "react";
import React from "react";
import { Stack, Grid, Dialog, DialogContent, InputLabel, useTheme, useMediaQuery } from "@mui/material";
import { colors } from "../../util/colors";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TocIcon from '@mui/icons-material/Toc';
import Text from "../../components/Text";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/CustomButton";
import { useDispatch, useSelector } from 'react-redux'
import InputField from "../../components/InputField";
import CircularProgress from '@mui/material/CircularProgress';
import ClearIcon from '@mui/icons-material/Clear';
import { showError } from '../../store/actions/action';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default function Matches() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  let isError = useSelector((state) => state.reducer.isError);
  let isLoader = useSelector((state) => state.reducer.isLoader);
  let matches = useSelector((state) => state.reducer.matches);
  // let isSearch = useSelector((state) => state.reducer.isSearch);
  const [showModal, setshowModal] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [age, setAge] = useState('');

  const [users, setusers] = useState([]);

  useEffect(() => {
    setusers(matches)
  }, [matches])

  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("md"));
  const input = {
    height: small && "10px",
    fontSize: small && "11px",
  };

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const createUser = () => {
    let credentials = {
      name: name,
      email: email,
      phone_number: '+' + phoneNumber,
      age: age,
    }
    // dispatch(createUserFromAdmin(credentials, navigate, setshowModal))
    dispatch(showError())
  }

  // useEffect(() => {
  //   searchFunction(isSearch)
  // }, [isSearch])

  // const searchFunction = (search) => {
  //   let filteredItems = [];
  //   if (search && search.length) {
  //     const searchPattern = new RegExp(search.map(term => `(?=.*${term})`).join(''), 'i');
  //     filteredItems = users.filter(e => {
  //       return e.email.match(searchPattern)
  //     });
  //   } else {
  //     filteredItems = userListAdmin;
  //   }
  //   if (search[0] == '') {
  //     // dispatch(getUserListAdmin(navigate))
  //   }
  //   else {
  //     // setusers(filteredItems)
  //   }
  // }

  return (
    <Stack sx={{ marginX: 3, }}>
      <Stack justifyContent={'space-between'} direction={'row'}>
        <Stack ml={3} marginTop={7}>
          <CustomButton
            backColor=""
            color="inherit"
            component="label"
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
            // onClick={() => setshowModal(true)}
          >
            <TocIcon
              // fontSize="small"
              sx={{ color: colors.green, marginRight: 1, marginTop: -0.2 }}
            />
            <Text>Match List</Text>
          </CustomButton>
        </Stack>
      </Stack>

      <Stack direction={"row"} flexWrap="wrap" style={{ marginTop: 10 }}>
        <Grid container justifyContent={'center'} alignItems={'center'} paddingLeft={2} marginLeft={2} marginRight={1} marginTop={1} style={{ height: 40, backgroundColor: colors.white, borderRadius: 5 }} >
          <Grid item xs>
            <Text fontWeight='bold'>Name</Text>
          </Grid>
          <Grid item xs>
            <Text fontWeight='bold'>Email</Text>
          </Grid>
          <Grid item xs>
            <Text fontWeight='bold'>Phone Number</Text>
          </Grid>
          <Grid item xs>
            <Text fontWeight='bold'>Age</Text>
          </Grid>
        </Grid>
        {
          users.length != 0 &&
          users.map((key, index) => {
            return (
              <Grid key={index} container justifyContent={'center'} alignItems={'center'} paddingLeft={2} marginLeft={2} marginRight={1} marginTop={1} style={{ height: 40, backgroundColor: colors.white, borderRadius: 5 }} >
                <Grid item xs>
                  <Text style={{ color: key.flagged ? 'red' : 'black' }}>{key.name && key.name}</Text>
                </Grid>
                <Grid item xs >
                  <Text style={{ color: key.flagged ? 'red' : 'black' }}>{key.email && key.email.substring(0, 30)}</Text>
                </Grid>
                <Grid item xs >
                  <Text style={{ color: key.flagged ? 'red' : 'black' }}>{key.phone && key.phone}</Text>
                </Grid>
                <Grid item xs >
                  <Text style={{ color: key.flagged ? 'red' : 'black' }}>{key.age && key.age}</Text>
                </Grid>
              </Grid>
            )
          })
        }
        <Dialog
          open={showModal}
          onClose={() => setshowModal(false)}
          fullScreen
        >
          <DialogContent>
            <Stack spacing={2} flexDirection={"row-reverse"}>


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

                <Stack width="100%" style={{ paddingBottom: 100, }}>

                  <Stack justifyContent={'space-between'} alignItems={'center'} direction={'row'} style={{}}>
                    <Text fontWeight={"bold"} variant={"h6"}>
                      Add user
                    </Text>
                    <ClearIcon fontSize={'large'} style={{ cursor: 'pointer' }} onClick={() => { setshowModal(false) }} />
                  </Stack>

                  <Stack mt={{ xs: 4, md: 7 }} spacing={{ xs: 2, md: 1 }}>
                    <Stack spacing={1}>
                      <InputLabel style={{ display: 'flex', flexDirection: 'row' }}>
                        <Text fontSize={{ xs: "12px", md: "16px" }}>Full Name</Text>
                        {
                          isError && name == '' && <Text style={{ top: 3, color: "red" }}>*</Text>
                        }
                      </InputLabel>
                      <InputField
                        required
                        error={isError && name == ''}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        size={"small"}
                        placeholder="Full Name"
                        inputProps={{
                          style: {
                            ...input,
                          },
                        }}
                      />
                    </Stack>

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
                        <Text fontSize={{ xs: "12px", md: "16px" }}>
                          Phone Number
                        </Text>
                        {
                          isError && phoneNumber == '' && <Text style={{ top: 3, color: "red" }}>*</Text>
                        }
                      </InputLabel>

                      <PhoneInput
                        country={'us'}
                        value={phoneNumber}
                        onChange={phone => setphoneNumber(phone)}
                        inputStyle={{ width: '100%', }}
                      />
                    </Stack>

                    <Stack spacing={1}>
                      <InputLabel style={{ display: 'flex', flexDirection: 'row' }}>
                        <Text fontSize={{ xs: "12px", md: "16px" }}>Age</Text>
                        {
                          isError && age == '' && <Text style={{ top: 3, color: "red" }}>*</Text>
                        }
                      </InputLabel>
                      <InputField
                        required
                        error={isError && age == ''}
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        size={"small"}
                        placeholder="Age"
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
                      }}
                      onClick={() => createUser()}
                    >
                      {
                        isLoader && <CircularProgress style={{ 'color': 'white' }} size="1rem" />
                      }
                      {
                        !isLoader &&
                        <Text color="white" fontWeight="bold" fontSize="20px">
                          Add user
                        </Text>
                      }
                    </CustomButton>
                  </Stack>

                </Stack>
              </Stack>
            </Stack>
          </DialogContent>
        </Dialog>
      </Stack>
    </Stack>
  );
};
