import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import NearBySearch from './NearBySearch';

function SearchByPlace({navigation}) {
  const DATA = [
    {
      id: 1,
      name: 'Attil',
    },
    {
      id: 2,
      name: 'Attil',
    },
    {
      id: 3,
      name: 'Attil',
    },
    {
      id: 4,
      name: 'Attil',
    },
    {
      id: 5,
      name: 'Attil',
    },
  ];
  return (
    <View>
      <View style={styles.searchByPlaceName}>
        <View style={styles.nearBy}>
          <Text style={styles.nearByText}>Near by places</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}>
          <View style={styles.nearByList}>
            {DATA.length > 0
              ? DATA.map(ele => {
                  return <NearBySearch key={ele.id} item={ele} />;
                })
              : null}
          </View>
        </ScrollView>
      </View>

      <View style={styles.nearBy}>
        <Text style={styles.nearByText}>Suggestions</Text>
      </View>
      <TouchableOpacity onPress={()=>{
        navigation.navigate('parameter',{name:'getTopPlace',headerName:"Top picks"})
      }}>
        <View style={styles.nearByPlaceList}>
          <Text style={styles.placeName}>Top pick</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{
        navigation.navigate('parameter',{name:'getPopularPlace',headerName:"Top picks"})
      }}>
        <View style={styles.nearByPlaceList}>
          <Text style={styles.placeName}>Popular</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.nearByPlaceList}>
          <Text style={styles.placeName}>Lunch</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.nearByPlaceList}>
          <Text style={styles.placeName}>Coffee</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchByPlaceName: {
    width: '100%',
    height: 230,
    backgroundColor: 'white',
  },

  nearByPlaceList: {
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: '#e4e4e4',
    flexDirection: 'row',
    alignItems: 'center',
  },

  placeName: {
    fontFamily: 'Avenir Book',
    fontSize: 18,
    marginLeft: 20,
    color: 'black',
  },

  nearBy: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#f2f1f1',
  },

  nearByText: {
    marginLeft: 30,
    fontSize: 18,
    fontFamily: 'Avenir Medium',
    color: '#858585',
  },

  nearByList: {
    flex: 1,
  },
});
export default SearchByPlace;
