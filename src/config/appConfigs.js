const DEV =
{
	apiKey: "",
	apiEndpoint: "",
	apiBaseURL:"",

};

const COMMON =
{
	// i18n
	defaultLanguage: "en",
	supportedLanguages: ["ar", "en"],

	// direction
	defaultDirection: "ltr",
	supportedDirections: ["ltr", "rtl"],

	// Timezone
	defaultTimezone:'GMT+03:00',
	supportedTimezones:['GMT-11:00', 'GMT-10:00', 'GMT-09:30', 'GMT-09:00', 'GMT-08:00', 'GMT-07:00', 'GMT-06:00',
				'GMT-05:00', 'GMT-04:30', 'GMT-04:00', 'GMT-03:30', 'GMT-03:00', 'GMT-02:00', 'GMT-01:00',
				'GMT+00:00',
				'GMT+12:00', 'GMT+11:00', 'GMT+10:30', 'GMT+10:00', 'GMT+09:00', 'GMT+08:00', 'GMT+07:00',
				'GMT+06:30', 'GMT+06:00', 'GMT+05:30', 'GMT+05:00', 'GMT+04:30', 'GMT+04:00', 'GMT+03:00', 
				'GMT+02:00', 'GMT+01:00'],

	itemFrom: 1,
	itemTo: 6

};

const CONFIG =
{
	...(process.env.REACT_APP_ENV_STAGE === "DEV") ? DEV :  DEV,
	...COMMON
};

export default CONFIG;