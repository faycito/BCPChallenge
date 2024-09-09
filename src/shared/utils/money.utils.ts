const moneyParser = (amount: number ) => {
	return (amount / 100).toFixed(2);
};

export {
	moneyParser,
};
