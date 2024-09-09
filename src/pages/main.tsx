import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, DeviceEventEmitter, FlatList, View, Dimensions } from 'react-native';
import { BcpMapView, Marker } from 'react-native-bcp-challenge-ismael';
import { BENEFIT_DATA } from '../shared/BenefitData';
import BenefitCard from '../components/BenefitCard';
import BcpBenefit from '../shared/types/Benefit.types';
import Promos from '../components/Promos';
import BCPPromo from '../shared/types/BCPPromo.types';
import { findMarkerDetail } from '../shared/utils/marker.utils';

const width = Dimensions.get('screen').width - 42;

const MainPage = () => {

	const [promos, setPromos] = useState<BCPPromo[]>([]);
	const [displayDetail, setDisplayDetail] = useState(false);

	const carouselRef = useRef<FlatList<BcpBenefit>>(null);

	useEffect(() => {
		const eventListener = DeviceEventEmitter.addListener(
			'onMarkerClick',
			(event) => {
				const { markerId } = event;
				const benefits = findMarkerDetail(markerId, BENEFIT_DATA);
				if(benefits) {
					const index = BENEFIT_DATA.findIndex(benefit => benefit.marker.markerId === markerId);
					setPromos(benefits.promo);
					setDisplayDetail(true);
					onCarouselMove(index);
				}
			}
		);

		return () => {
			eventListener.remove();
		};
	}, []);

	const onCarouselMove = (index: number) => {
		carouselRef?.current?.scrollToOffset({animated: true, offset: index * width });
	};

	const onClosePromos = () => {
		setPromos([]);
		setDisplayDetail(false);
	};

	const onCarouselPromoClick = (markerId: string) => {
		const benefits = findMarkerDetail(markerId, BENEFIT_DATA);
		if(benefits) {
			setPromos(benefits.promo);
			setDisplayDetail(true);
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<BcpMapView
				style={styles.mapView}
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
					ref={carouselRef}
					data={BENEFIT_DATA}
					renderItem={({ item, index }) => (
						<BenefitCard {...item} key={`benefit-${index}`} onClick={onCarouselPromoClick}/>
					)}
					keyExtractor={(_: BcpBenefit, index: number) => `benefit-${index}`}
					pagingEnabled
					horizontal
					snapToInterval={180}
					showsHorizontalScrollIndicator={false}
					style={styles.flatListContainer}
				/>
			</View>
			{ displayDetail && (
				<Promos onClose={onClosePromos} promos={promos} />
			)}
		</ScrollView>
	);
};


const styles =  StyleSheet.create({
	mapView: {
		width: '100%', height: '100%',
	},
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
	flatListContainer: {
		width: '100%', height: 200,
	},
});

export default React.memo(MainPage);
