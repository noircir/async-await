// USD, CAD, amount
// 20 USD is worth 26 CAD. You can spend these in the following countries: Canada

//http://data.fixer.io/api/latest?access_key=015be6885b9f855e318507dc02bdd1f9

const axios = require('axios');

// const getExchangeRate = (from, to) => {
// 	return axios.get('http://data.fixer.io/api/latest?access_key=015be6885b9f855e318507dc02bdd1f9&format=1').then((res) => {
// 		const euro = 1 / res.data.rates[from];
// 		const rate = euro * res.data.rates[to];
// 		return rate;
// 	});
// };

const getExchangeRate = async (from, to) => {

	try {
		const res = await axios.get('http://data.fixer.io/api/latest?access_key=015be6885b9f855e318507dc02bdd1f9&format=1');
		const euro = 1 / res.data.rates[from];
		const rate = euro * res.data.rates[to];

		// this error will be caught by 'catch'
		if (isNaN(rate)) {
			throw new Error();
		}
		return rate;

	} catch (e) {
		throw new Error(`Unable to get exchange rate for ${from} and ${to}`);
	};
	
};

// const getCountries = (currencyCode) => {
// 	return axios(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((res) => {
// 		return res.data.map((country) => country.name);
// 	});
// };

const getCountries = async (currencyCode) => {
	try {
		const res = await axios(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
		return res.data.map((country) => country.name);
	} catch (e) {
		throw new Error(`Unable to get countries that use ${currencyCode}`);
	};
};

// const convertCurrency = (from, to, amount) => {
// 	let convertedAmount;
// 	return getExchangeRate(from, to).then((rate) => {
// 		convertedAmount = (amount * rate).toFixed(2);
// 		return getCountries(to);
// 	}).then((countries) => {
// 		return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following country/countries: ${countries.join(', ')}.`;
// 	});

// };

const convertCurrency = async (from, to, amount) => {
	const rate = await getExchangeRate(from, to);
	const countries = await getCountries(to);
	const convertedAmount = (amount * rate).toFixed(2);
	return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following country/countries: ${countries.join(', ')}.`;
}

// getExchangeRate('CAD', 'RUB').then((rate) => {
// 	console.log(rate);
// });

// getCountries('RUB').then((country) => {
// 	console.log(country);
// })

convertCurrency('CAD', 'GBP', 50).then((message) => {
	console.log(message);
}).catch((e) => {
	console.log(e.message);
});