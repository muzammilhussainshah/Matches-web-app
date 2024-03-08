import { IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
import { colors } from "../util/colors";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ChatBox } from "./ChatBox";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from 'react-redux';

export default function MainContainer({
  Box1,
  Box2,
  variant = 1,
  showContainer = true,
  handleBack,
  showBoxTwo = false,
  submit,
  soortedChat,

}) {
  let cID = useSelector((state) => state.reducer.cID);
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("md"));
  const medium = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const large = useMediaQuery(theme.breakpoints.up("md"));
  const path = useLocation().pathname;
  return (
    <Stack
      marginLeft={{ xs: 1, sm: 3 }}
      paddingTop={{ xs: 5, md: 5 }}
      marginRight={variant === 3 ? 0 : 3}
      sx={{ background: colors.background_color }}
      height={{ xs: `calc(80vh - 100px)`, md: `calc(100vh - 100px)` }}
      direction={{ xs: variant === 3 ? "row-reverse" : "row" }}
      flexWrap={"wrap"}
    >
      {(variant === 2 && showContainer === true && small) ||
        (variant === 4 && showContainer === true && small) ||
        (variant === 3 && showContainer === false && small) ||
        (variant === 5 && showContainer === true && medium) ||
        (variant === 6 && showContainer === true && small) ||
        (variant === 1 && small) ? (
        <Stack
          flexGrow={{ lg: 1 }}
          sx={{
            background: "#fff",
            width: { xs: "100%", lg: variant === 1 ? "30vw" : "10vw" },
            marginRight: { lg: variant === 1 ? 3 : 7 },
          }}
        >
          {Box1}
          {variant === 3 ? (
            <Stack display={{ xs: "flex", md: "none" }}>
              <IconButton sx={{ alignSelf: "start" }} onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </Stack>
          ) : null}
        </Stack>
      ) : (
        (variant === 5 && medium) ||
        (large && (
          <Stack
            flexGrow={{ lg: 1 }}
            sx={{
              background: "#fff",
              width: {
                xs: "100%",
                lg: variant === 1 || variant === 4 ? "30vw" : "10vw",
              },
              marginRight: { lg: variant === 1 || variant === 4 ? 3 : 7 },
            }}
          >
            <Stack
              display={path === "/chat" ? "flex" : "none"}
              height={`calc(100vh - 100px)`}
            >
              {Box1}
            </Stack>
            <Stack display={path === "/chat" ? "none" : "flex"}>{Box1}</Stack>
          </Stack>
        ))
      )}

      {(variant === 2 && showContainer === false && small) ||
        (variant === 4 && showContainer === false && small) ||
        (variant === 3 && showContainer === true && small) ||
        (variant === 5 && showContainer === false && medium) ||
        (variant === 6 && showContainer === false && medium) ||
        (variant === 1 && small) ? (
        <Stack
          flexGrow={{ lg: 1 }}
          sx={{ background: "#fff", width: { xs: "100%", lg: "30vw" } }}
          position="relative"
        >
          {variant === 3 || variant === 1 ? null : (
            <Stack marginBottom={-3} marginTop={2}>
              <IconButton sx={{ alignSelf: "start" }} onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </Stack>
          )}
          <Stack
            height={
              variant === 2 && {
                xs: `calc(100vh - 100px)`,
                sm: `calc(83vh - 100px)`,
              }
            }
            display={{
              xs: variant === 2 && path === "/chat" ? "flex" : "none",
              md: "none",
            }}
          >
            <Stack
              position={"absolute"}
              top={-1}
              width="100%"
              sx={{ background: "#fff" }}
            >
              <IconButton sx={{ alignSelf: "start" }} onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </Stack>
            <Stack
              paddingTop={1}
              overflow={"scroll"}
              height={`calc(90vh - 100px)`}
              sx={{
                "::-webkit-scrollbar": { display: "none" },
              }}
            >
              {Box2}
            </Stack>
            <Stack
              display={{ xs: variant === 2 ? "flex" : "none", md: "none" }}
              position="sticky"
              bottom={-1}
              width="100%"
              sx={{ background: "#fff" }}
              paddingTop={1}
            >
              {/* {
                soortedChat.lenght != 0 || channel && <ChatBox submit={submit} />
              } */}

              {
                (soortedChat && soortedChat.length != 0) ? (<ChatBox submit={submit} />) : null
              }
              {
                (cID != '' && soortedChat && soortedChat.length == 0) ? (<ChatBox submit={submit} />) : null
              }
            </Stack>
          </Stack>

          <Stack
            display={{
              xs: variant === 2 && path === "/chat" ? "none" : "flex",
              sm: path === "/chat" ? "none" : "flex",
            }}
          >
            {Box2}
          </Stack>
        </Stack>
      ) : (
        (variant === 5 && medium) ||
        (large && (
          <Stack
            marginRight={{
              xs: variant === 3 && 10,
              md: variant === 3 && 0,
              lg: variant === 3 && 10,
            }}
            flexGrow={{ lg: 1 }}
            sx={{ background: "#fff", width: { xs: "100%", lg: "30vw" } }}
          >
            {showBoxTwo ? (
              Box2
            ) : (
              <Stack
                position={"relative"}
                height={`calc(100vh - 100px)`}
                display={{ sm: "none", md: path === "/chat" ? "flex" : "none" }}
              >
                <Stack
                  height={`calc(90vh - 100px)`}
                  overflow={"auto"}
                  sx={{
                    "::-webkit-scrollbar": { display: "none" },
                  }}
                >
                  {Box2}
                </Stack>
                <Stack position={"sticky"} width="100%">
                  {
                    (soortedChat && soortedChat.length != 0) ? (<ChatBox submit={submit} />) : null
                  }
                  {
                    (cID != '' && soortedChat && soortedChat.length == 0) ? (<ChatBox submit={submit} />) : null
                  }
                  {/* <ChatBox submit={submit} /> */}
                </Stack>
              </Stack>
            )}
          </Stack>
        ))
      )}
    </Stack>
  );
}
