import countries from "countries-list";

export const countryCodes = Object.keys(countries.countries);
export const countryNames = (countryCodes.map(code => countries.countries[code].name)).sort();
export const districts = ["Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya", "Galle", "Hambantota", "Matara", "Kurunegala", "Puttalam", "Batticaloa", "Trincomalee", "Ampara", "Ratnapura", "Kegalle", "Anuradhapura", "Polonnaruwa", "Jaffna", "Mullaitivu", "Vavuniya", "Kilinochchi", "Mannar", "Badulla", "Monaragala"];