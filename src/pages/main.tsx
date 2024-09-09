import React, { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, DeviceEventEmitter, FlatList, View } from 'react-native';
import { BcpMapView, Marker } from 'react-native-bcp-challenge-ismael';
import { BENEFIT_DATA } from '../shared/BenefitData';
import BenefitCard from '../components/BenefitCard';
import BcpBenefit from '../shared/types/Benefit.types';
import Promos from '../components/Promos';
import BCPPromo from '../shared/types/BCPPromo.types';
import { findMarkerDetail } from '../shared/utils/marker.utils';

const MainPage = () => {

	const [displayDetail, setDisplayDetail] = useState(false);
	const [promos, setPromos] = useState<BCPPromo[]>([]);

	useEffect(() => {
		const eventListener = DeviceEventEmitter.addListener(
			'onMarkerClick',
			(event) => {
				const { markerId } = event;
				const benefits = findMarkerDetail(markerId, BENEFIT_DATA)
				if(benefits) {
					setPromos(benefits.promo)
					setDisplayDetail(true)
				}
			}
		);

		return () => {
			eventListener.remove();
		};
	}, []);

	const onClosePromos = () => {
		setPromos([])
		setDisplayDetail(false)
	}

	const onCarouselPromoClick = (markerId: string) => {
		const benefits = findMarkerDetail(markerId, BENEFIT_DATA)
		if(benefits) {
			setPromos(benefits.promo)
			setDisplayDetail(true)
		}
	}

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<BcpMapView
				style={{width: '100%', height: '100%'}}
			>
				{ BENEFIT_DATA.map((benefit, index) => (
					<Marker
						location={benefit.marker.location}
						title={benefit.title}
						markerId={benefit.marker.markerId}
						key={`marker-${index}`}
					/>
				))}
			</BcpMapView>

			<View style={styles.carouselContainer}>
				<FlatList
					data={BENEFIT_DATA}
					renderItem={({ item, index }) => (
						<BenefitCard {...item} key={`benefit-${index}`} onClick={onCarouselPromoClick}/>
					)}
					keyExtractor={(_: BcpBenefit, index: number) => `benefit-${index}`}
					pagingEnabled
					horizontal
					snapToInterval={180}
					showsHorizontalScrollIndicator={false}
					style={{ width: '100%', height: 200 }}
				/>
			</View>
			{ displayDetail && (
				<Promos onClose={onClosePromos} promos={promos} />
			)}
		</ScrollView>
	);
};


const styles =  StyleSheet.create({
	container: {
		backgroundColor: 'white',
		paddingTop: 24,
		flex: 1,
	},
	carouselContainer: {
		position: 'absolute',
		bottom: 10,
		width: '100%',
		height: 200,
		backgroundColor: 'transparent',
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		color: 'black',
	},
});

export default React.memo(MainPage);
