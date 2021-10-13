import React, { useState } from "react";
import { Typography, Box, Stack, Button } from "@mui/material";
import LanguageDropDown from "../components/LanguageDropDown";
import { TextFieldComponent } from "../components/TextFieldComponent";

import supported_languages from "../data/supported_languages.json";

import { postTranslate } from "../services/api";

const Translator = () => {
  const [language, setLanguage] = useState({
    source: "",
    target: "",
  });

  const [originText, setOriginText] = useState("");
  const [translatorText, setTranslatorText] = useState("");
  const [correction, setCorrection] = useState("");

  const [loading, setLoading] = useState(false);

  const btnTranslate = async (text) => {
    setLoading(true);
    setTranslatorText("");
    setCorrection("");
    const dataSend = {
      text: text || originText,
      source: language.source,
      target: language.target,
    };

    try {
      const { data } = await postTranslate(dataSend);
      const { translation, spell } = data;
      console.log(data);
      if (spell) {
        setTranslatorText(spell);
        setCorrection(spell);
      } else {
        setTranslatorText(translation);
      }

      // console.log(translation);
    } catch (error) {
      console.log("error", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const btnCond =
    originText !== "" && language.source !== "" && language.target !== "";

  const correctionHandler = (text) => {
    setOriginText(text);
    btnTranslate(text);
  };

  return (
    <Box mt={5}>
      <Typography variant="h4" component="div">
        Simple Transaltor App
      </Typography>

      <Stack
        mt={1}
        direction={{ xs: "column", sm: "column", md: "row" }}
        spacing={1}
      >
        <Stack sx={{ width: "100%" }} spacing={1}>
          <Stack direction="row" spacing={2}>
            <LanguageDropDown
              option={supported_languages.text}
              value={language.source}
              onChange={(data) => setLanguage({ ...language, source: data })}
              disabled={loading}
            />
            <Button
              variant="contained"
              onClick={() => btnTranslate()}
              disabled={!btnCond || loading}
            >
              Translate
            </Button>
          </Stack>
          <TextFieldComponent
            placeholder="Enter Text"
            value={originText}
            onChange={setOriginText}
            disabled={loading}
          />

          {correction !== "" && (
            <>
              <Box display="flex" flexDirection="row" alignItems="center">
                <Typography
                  variant="body1"
                  component="div"
                  sx={{ fontWeight: 500 }}
                >
                  Showing translation for
                </Typography>
                <Button
                  size="small"
                  variant="text"
                  value={correction}
                  onClick={(e) => correctionHandler(e.target.value)}
                  sx={{
                    fontWeight: 600,
                    textDecoration: "underline",
                  }}
                >
                  {correction}
                </Button>
              </Box>

              <Box display="flex" flexDirection="row" alignItems="center">
                <Typography
                  variant="body1"
                  component="div"
                  sx={{ fontWeight: 500 }}
                >
                  Translate instead
                </Typography>
                <Button
                  sx={{
                    fontWeight: 600,
                    textDecoration: "underline",
                  }}
                  size="small"
                  variant="text"
                >
                  {originText}{" "}
                </Button>
              </Box>
            </>
          )}
        </Stack>
        <Stack sx={{ width: "100%" }} spacing={1}>
          <LanguageDropDown
            option={supported_languages.text}
            value={language.target}
            onChange={(data) => setLanguage({ ...language, target: data })}
            disabled={loading}
          />
          <TextFieldComponent
            placeholder="Translation"
            InputProps={{ readOnly: true }}
            value={translatorText}
            disabled={loading}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default Translator;
