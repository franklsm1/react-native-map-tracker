import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {mapDelta : {
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        }};
    }
    success = (position) => {
        var coordinates = position.coords;

        this.setState({
            coordinate: {
                latitude: coordinates.latitude,
                longitude: coordinates.longitude
            }
        });
    };

    error = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    getMap = () => {
        if (this.state.coordinate) {
            return (
                <MapView 
                    region={{
                        ...this.state.coordinate,
                        ...this.state.mapDelta
                    }}
                    style={styles.map}
                >
                    <MapView.Marker
                        coordinate={this.state.coordinate}
                        title={"Phone Tracker"}
                        description={"current location"}
                    />
                </MapView>
            );
        }
        return <Text> No location yet </Text>
    }

    render() {
        navigator
            .geolocation
            .getCurrentPosition(this.success, this.error);

        return (
            <View style={{ flex: 1 }}>
                <View style={styles.textContainer}>
                    <Text>
                        Map of phones current location
                    </Text>
                </View>
                <View style={styles.mapContainer}>
                    {this.getMap()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textContainer: {
        height: 100,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    mapContainer: {
        ...StyleSheet.absoluteFillObject,
        top: 100,
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: 10
    },
    map: {
        ...StyleSheet.absoluteFillObject,
     }
});