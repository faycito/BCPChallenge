import React from 'react';
import BcpBenefit from '../shared/types/Benefit.types';
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

type Props = {
	onClick: (markerId: string) => void;
}

const BenefitCard: React.FC<BcpBenefit & Props> = ({title, image, description, address, promo, marker: {markerId}, onClick}) => (
	<TouchableWithoutFeedback
		onPress={() => onClick(markerId!)}
	>
		<View
			style={styles.benefitCard}
		>
			<Image
				source={{ uri: image }}
				width={160}
				height={100}
			/>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.description}>{description}</Text>
			<Text style={styles.address}>{address}</Text>
			<Text style={styles.address}>{promo.length} Promos </Text>
		</View>
    </TouchableWithoutFeedback>
)


const styles = StyleSheet.create({
	benefitCard: {
		width: 180,
		height: 200,
		borderRadius: 8,
		marginRight: 10, // Añadir espacio entre las tarjetas
		backgroundColor: '#fff',
		padding: 10, // Añadir algo de padding para que los textos no estén pegados
	},
	title: {
		fontWeight: 'bold',
		fontSize: 15
	},
	description: {
		fontWeight: '300',
		color: '#acacac'
	},
	address: {
		fontSize: 12,
		color: '#bababa'
	}
});

export default BenefitCard;