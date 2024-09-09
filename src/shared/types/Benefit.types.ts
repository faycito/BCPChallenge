import BCPMarker from './BcpMarker.types';
import BCPPromo from './BCPPromo.types';

export default interface BcpBenefit {
	title: string;
	description: string;
	image: string;
	address: string;
	marker: BCPMarker;
	promo: BCPPromo[];
}
