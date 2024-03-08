import { Stack } from "@mui/material";
import React from "react";

export default function Tag({ text }) {
  return (
    <Stack
      direction={"row"}
      justifyContent="space-between"
      sx={{ border: "1px solid grey", borderRadius: 16 }}
    >
      {text} {"x"}
    </Stack>
  );
}
