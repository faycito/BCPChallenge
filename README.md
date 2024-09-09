# BCP ChapterLead Code Challenge

## Set Up the project

First need to install the map library as main dependency of this challenge

With NPM
```bash
npm i --save react-native-bcp-challenge-ismael
```

With Yarn
```bash
yarn add react-native-bcp-challenge-ismael
```

Updated your **AndroidManifest.xml** you can located on `android/app/src/main/AndroidManifest.xml` add the following inside the `<application>` tag

```xml
      <meta-data
        android:name="com.google.android.geo.API_KEY"
        android:value="YOUR_API_KEY"
      />
```

change `YOUR_API_KEY` for your API KEY from Google Console

## Usage

you can access it from:

`import { BcpMapView, Marker } from 'react-native-bcp-challenge-ismael';`

linsten the event `onMarkerClick` when the user clicks the marker;

```js
const eventListener = DeviceEventEmitter.addListener(
	'onMarkerClick',
	(event) => {
		//your code goes here...
	}
);
```

remove the event listener

`eventListener.remove();`

Map View:

```tsx
<BcpMapView
	style={styles.mapView}
>
	<Marker
		location={{
		    lat: -12.742881,
		    lng: -71.083612
		}}
		title={"Marker Title"}
		markerId={"Marker Id"}
	/>
</BcpMapView>
```

## Properties

**BcpMapView**

| Property Name | description | Type |Default |
|---------------|-------------|--|--------|
| style         | property to set the styles of the mapview |Object |{} |

**Marker**
| Property Name | description | Type |Default |
|---------------|-------------|-----|-----|
| title         | Title or name of the marker | String | undefined |
| location      | Position of the marker | Object | {lat: number, lng: number} |
| markerId      | Marker Id to get the marker detail that you selected | String | undefined |


### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.