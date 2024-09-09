import BcpBenefit from './types/Benefit.types';

const BENEFIT_DATA: BcpBenefit[] = [
	{
		title: 'La pizzeria',
		address: 'Calle Alfredez Alfredo Salazar 123, San Isidro',
		description: 'La pizza más Rica de Lima',
		image: 'https://images.adsttc.com/media/images/5fd1/71da/63c0/1772/8600/0036/newsletter/01_(PORTADA).jpg?1607561652',
		marker: {
			location: {
				lat: -12.1051624,
				lng: -77.0475905,
			},
			title: 'La pizzeria',
			markerId: 'PI001',
		},
		promo: [
			{
				amount: 1500,
				name: 'Promo Pizza Personal',
				score: 4.5,
			},
			{
				amount: 2500,
				name: 'Promo Pizza Grande',
				score: 4.3,
			},
			{
				amount: 3500,
				name: 'Promo 2x1 Pizza Grande',
				score: 4.5,
			},
		],
	},
	{
		title: 'La Cevicheria',
		address: 'Av De la aviación 37, Miraflores',
		description: 'La Cevichería más Rica de Lima',
		image: 'https://www.tuentrada.com.pe/wp-content/uploads/2021/10/Cevicheria-Lima.jpeg',
		marker: {
			location: {
				lat: -12.119889,
				lng: -77.0414319,
			},
			title: 'La Cevichería',
			markerId: 'CE001',
		},
		promo: [
			{
				amount: 1500,
				name: 'Promo Ceviche Carretillero',
				score: 4.5,
			},
			{
				amount: 2500,
				name: 'Promo Ceviche Limeño',
				score: 4.3,
			},
			{
				amount: 3500,
				name: 'Promo Ceviche Mixto',
				score: 4.5,
			},
		],
	},
	{
		title: 'La Pollería',
		address: 'Jirón Arica 1128, San Isidro',
		description: 'La Pollería más Rica de Lima',
		image: 'https://images.rappi.pe/restaurants_background/40773_1658851963341.jpg',
		marker: {
			location: {
				lat: -12.1094828,
				lng: -77.0315233,
			},
			title: 'La Pollería',
			markerId: 'PO001',
		},
		promo: [
			{
				amount: 1500,
				name: 'Promo 1/4 de Pollo con papas y ensalada',
				score: 4.5,
			},
			{
				amount: 2500,
				name: 'Promo 1/2 Pollo con papas y ensalada',
				score: 4.3,
			},
			{
				amount: 3500,
				name: 'Promo Pollo entero con papas y ensalada',
				score: 4.5,
			},
		],
	},
];

export {
	BENEFIT_DATA,
};
