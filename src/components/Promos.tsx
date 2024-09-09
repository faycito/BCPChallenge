import React from 'react';
import BCPPromo from '../shared/types/BCPPromo.types';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moneyParser } from '../shared/utils/money.utils';

type Props = {
	promos: BCPPromo[], onClose: () => void
}

const PromoContainer: React.FC<Props> = ({promos, onClose}) => {

	return (
		<ScrollView
			style={styles.container}
		>
			{promos.map((promo, indx) => (
				<Promo {...promo} key={`promo-${indx}`}/>
			))}
			<TouchableOpacity
				onPress={onClose}
				style={styles.button}
			>
				<Text style={styles.buttonText}>Cerrar</Text>
			</TouchableOpacity>
		</ScrollView>
	);
};

const Promo: React.FC<BCPPromo> = ({amount, name, score}) => (
	<View style={styles.promoContainer}>
		<Text style={styles.name}>Promo {name}</Text>
		<Text>S/ {moneyParser(amount)}</Text>
		<Text>Puntuación: {score}</Text>
	</View>
);

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 15,
		padding: 12,
		backgroundColor: '#fff',
		width: '70%',
		height: '90%',
	},
	promoContainer: {
		borderBottomColor: '#ababab',
		borderBottomWidth: 1,
		padding: 4,
	},
	name: {
		fontWeight: 'bold',
	},
	button: {
		width: 100,
		height: 30,
		paddingTop: 5,
		marginVertical: 12,
		backgroundColor: '#012FB2',
	},
	buttonText: {
		color: 'white',
		textAlign: 'center',
	},
});

export default React.memo(PromoContainer);
