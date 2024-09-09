import BcpBenefit from '../types/Benefit.types';

const findMarkerDetail = (markerId: string, list: BcpBenefit[]) => {
	return list.find((benefit) => benefit.marker.markerId === markerId);
};

export {
	findMarkerDetail,
};
