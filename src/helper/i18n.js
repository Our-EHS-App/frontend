import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";

import en from "../lang/en.json";
import ar from "../lang/ar.json";
import AppConfigs from "../config/appConfigs";

const resources = {
	en: {
		translation: en,
	},
	ar: {
		translation: ar,
	},
};

i18n
	.use(detector)
	.use(reactI18nextModule)
	.init({
		resources,
		lng: localStorage.getItem("lang") ? localStorage.getItem("lang"): AppConfigs?.defaultLanguage,
		keySeparator: false,
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;