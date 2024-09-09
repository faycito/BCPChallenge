import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { emailRegex } from '../shared/utils/regex.utils';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FormValues {
	email: string;
	password: string;
}

const LoginPage: React.FC = () => {

	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string>();

	const { control, handleSubmit, formState: { errors } } = useForm<FormValues>();

	const navigation = useNavigation();

	useEffect(() => {
		const getUserSession = async () => {
			const userToken = await AsyncStorage.getItem('token');
			if(userToken){
				//@ts-expect-error
				navigation.navigate('Main');
			}
		};

		getUserSession();
	}, [navigation]);

	const onSubmit = async ({email, password}: FormValues) => {
		try {
			setLoading(true);
			setErrorMessage(undefined);
			const { user } = await auth().signInWithEmailAndPassword(email, password);
			const token = await user.getIdToken();

			await AsyncStorage.setItem('token', token);
			//@ts-expect-error
			navigation.navigate('Main');
		} catch (error) {
			if(error instanceof Error){
				setErrorMessage(error.message);
			} else {
				setErrorMessage('Ha ocurriod un error, porfavor intentálo en unos minutos');
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.contentStyle}
		>
			<Image
				source={require('../assets/bcp-logo.png')}
				width={200}
				height={150}
			/>
			<View style={styles.formContainer}>
				<Text style={styles.title}>Inicia Sesión</Text>
				<Controller
					control={control}
					rules={{
						required: 'El campo es obligatorio',
						pattern: {value: emailRegex, message: 'Ingresa un correo electrónico válido'},
					}}
					render={({field: { onChange, onBlur, value} }) => (
						<TextInput
							placeholder="Correo Electrónco"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							keyboardType={'email-address'}
							style={[styles.input, errors.email && styles.inputError ]}
						/>
					)}
					name="email"
				/>
				{errors.email && <Text style={styles.errorLabel}>{errors.email.message}</Text>}
				<Controller
					control={control}
					rules={{
						required: 'La contraseña no puede estar vacía',
					}}
					render={({field: { onChange, onBlur, value} }) => (
						<TextInput
							placeholder="Contraseña"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							secureTextEntry
							style={[styles.input, errors.password && styles.inputError ]}
						/>
					)}
					name="password"
				/>
				{errors.password && <Text style={styles.errorLabel}>{errors.password.message}</Text>}
				{errorMessage && <Text style={styles.errorLabel}>{errorMessage}</Text>}

				<TouchableOpacity
					activeOpacity={0.75}
					style={styles.btn}
					onPress={handleSubmit(onSubmit)}
					disabled={loading}
				>
					{ loading ? (
						<ActivityIndicator size={'large'} color={'white'} />
					) : (
						<Text style={styles.btnLabel}>Iniciar Sesión</Text>
					)}
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 18,
	},
	contentStyle: {
		flex: 1,
		alignItems: 'center',
		display: 'flex',
		padding: 16,
	},
	btn: {
		width: '100%',
		height: 45,
		backgroundColor: '#012FB2',
		padding: 10,
		marginVertical: 12,
		borderRadius: 12,
	},
	btnLabel: {
		fontSize: 16,
		color: 'white',
		textAlign: 'center',
	},
	input: {
		width: '100%',
		height: 45,
		paddingHorizontal: 12,
		borderColor: '#bababa',
		borderRadius: 8,
		marginBottom: 12,
		borderWidth: 1,
		color: '#1c1c1c',
	},
	inputError: {
		color: 'red',
		borderColor: 'red',
		marginBottom: 4,
	},
	errorLabel: {
		marginBottom: 12,
		color: 'red',
	},
	formContainer: {
		width: '100%',
	},
});

export default React.memo(LoginPage);
