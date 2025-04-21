import React, { useState } from 'react';
import { Boosty, Discord, DeviantArt, FullScreen, Settings, Share, Furaffinity, En, Ru } from "@/svg/Other_SVGs.jsx";

const LanguageButton = ({ lang, currentLang, toggleLanguage }) => {
  const languageComponents = {
    Ru: Ru,
    En: En
  };

  return (
    <button className="navigation-buttons" onClick={() => toggleLanguage(languageComponents, lang)}>{ languageComponents[currentLang] }</button>
  );
};

const Multi_Lang_Button = () => {
  const [currentLang, setCurrentLang] = useState('Ru');

  const toggleLanguage = (languageComponents, lang) => {


    if (languageComponents[lang]) {
      setCurrentLang(lang);
    } else if (lang == "Next") {
        var max_langs = Object.keys(languageComponents).length
        var curr_lang_id = Object.keys(languageComponents).indexOf(currentLang)
        if (curr_lang_id < max_langs - 1) {setCurrentLang(Object.keys(languageComponents)[curr_lang_id + 1])}
        else {setCurrentLang(Object.keys(languageComponents)[0])}
        

    }
  };

  return (
    <LanguageButton lang="Next" currentLang={currentLang} toggleLanguage={toggleLanguage} />
  );
};

export default Multi_Lang_Button;