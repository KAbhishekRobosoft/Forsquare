import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';


function ListDisplay({item, navigation}) {
  const {height, width} = useWindowDimensions();
  const favourites= useSelector(state=>state.auth.favourites)
  const authData= useSelector(state=>state.auth)
  const loading = useSelector(state => state.auth.stateLoader);

  const width1 =
    width > height
      ? Platform.OS === 'ios'
        ? '90%'
        : '90%'
      : Platform.OS === 'ios'
      ? '90%'
      : '90%';

  const width2 =
    width > height
      ? Platform.OS === 'ios'
        ? '85%'
        : '85%'
      : Platform.OS === 'ios'
      ? '69%'
      : '69%';

  const margin =
    width > height
      ? Platform.OS === 'ios'
        ? 10
        : 10
      : Platform.OS === 'ios'
      ? 5
      : 5;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('particular', {
          distance: Math.round(
            ((item.distance.calculated / 1609) * 100) / 100,
          ).toFixed(2),
          id: item._id,
        });
      }}>
      <View style={[styles.listContainer, styles.shadowProp, {margin: margin}]}>
        <View style={styles.listDisplay}>
          <Image
            style={styles.listImg}
            source={{uri: 'https' + item.placeImage.substring(4)}}
          />
          <View style={{width: width2}}>
            <View style={[styles.textWithImage, {width: width1}]}>
              <Text style={styles.listName}>{item.placeName}</Text>

              {authData.userToken !== null ? (
                  favourites.favouritePlaces.length > 0 ? (
                    favourites.favouritePlaces.filter(ele => ele.placeId === item._id)
                      .length > 0 ? (
                      !loading ? (
                        <TouchableOpacity
                          onPress={() => {
                            handleFavourite(route.params.id);
                          }}>
                          <View style={styles.iconHeader} key={item._id}>
                            <Image
                              style={styles.favouriteImg}
                              source={require('../assets/images/favourite_icon_selected.png')}
                            />
                          </View>
                        </TouchableOpacity>
                      ) : (
                        <View style={styles.iconHeader}>
                          <ActivityIndicator color="yellow" />
                        </View>
                      )
                    ) : !loading ? (
                      <TouchableOpacity
                        onPress={() => {
                          handleFavourite(route.params.id);
                        }}>
                        <View style={styles.iconHeader} key={item._id}>
                          <Image
                            style={styles.favouriteImg}
                            source={require('../assets/images/favourite_icon.png')}
                          />
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <View style={styles.iconHeader}>
                        <ActivityIndicator color="yellow" />
                      </View>
                    )
                  ) : !loading ? (
                    <TouchableOpacity
                      onPress={() => {
                        handleFavourite(item._id);
                      }}>
                      <View style={styles.iconHeader}>
                        <Image
                          style={styles.favouriteImg}
                          source={require('../assets/images/favourite_icon.png')}
                        />
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.iconHeader}>
                      <ActivityIndicator color="yellow" />
                    </View>
                  )
                ) : (
                  <View>
                    <Image
                      style={styles.favouriteImg}
                      source={require('../assets/images/favourite_icon.png')}
                    />
                  </View>
                )}
            </View>
            <View style={styles.ratingView}>
              <Text style={styles.listRating}>{item.rating * 2}</Text>
            </View>
            <View style={styles.typeDist}>
              <Text style={styles.typeText}>
                Indian .
                {item.priceRange > 750
                  ? '₹₹₹₹'
                  : item.priceRange > 500
                  ? '₹₹₹'
                  : item.priceRange > 250
                  ? '₹₹'
                  : '₹'}
              </Text>
              <Text style={styles.distText}>
                {(item.distance.calculated / 1609).toFixed(2)} Km
              </Text>
            </View>
            <View style={styles.addressView}>
              <Text style={styles.addressText}>
                {item.address.trim()}, {item.city}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    height: 125,
    width: '97.5%',
    backgroundColor: 'white',
    borderColor: 'white',
  },

  shadowProp: {
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.9,
    shadowRadius: 1,
    elevation: 2,
  },

  listImg: {
    height: 123,
    width: 120,
  },

  addressText: {
    color: 'grey',
  },

  addressView: {
    marginLeft: 20,
  },

  favouriteImg: {
    height: 21,
    width: 21,
  },

  textWithImage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  typeDist: {
    flexDirection: 'row',
    marginTop: 5,
  },

  ratingView: {
    backgroundColor: '#73cf42',
    width: '6%',
    height: '16%',
    marginTop: 5,
    marginLeft: 20,
    alignItems: 'center',
    borderRadius: 3,
    justifyContent: 'center',
  },

  listDisplay: {
    flexDirection: 'row',
    width: '100%',
  },

  typeText: {
    color: 'grey',
    marginLeft: 20,
    fontFamily: 'Avenir Book',
  },

  distText: {
    fontFamily: 'Avenir Book',
    marginLeft: 10,
    color: 'grey',
  },

  listRating: {
    fontFamily: 'Avenir Book',
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },

  listName: {
    fontSize: 20,
    marginLeft: 20,
    fontFamily: 'Avenir Book',
    color: 'black',
    marginTop: 5,
  },
});

export default ListDisplay;
