import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/Ionicons';
import {getVerifiedKeys} from '../utils/Functions';
import {addReviewImage} from '../services/Places';
import {useSelector, useDispatch} from 'react-redux';
import {setToken} from '../redux/AuthSlice';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-simple-toast';
import {setInitialState} from '../redux/AuthSlice';

const ImageDisplay = ({navigation, route}) => {
  const [users, setUsers] = useState([]);
  const [image, setImage] = useState(false);
  const dispatch = useDispatch();
  const authData = useSelector(state => state.auth);
  const state = useSelector(state => state.auth.initialState);

  const getUsers = async () => {
    const response = await axios.post(
      `https://four-square-three.vercel.app/api/getReviewImage`,
      {
        _id: route.params.id,
      },
    );
    setUsers([...response.data.reviewImage]);
  };

  const pickImage = () => {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
    }).then(async image => {
      const payload = new FormData();
      payload.append('_id', route.params.id);
      payload.append('image', {
        uri: image.path,
        type: image.mime,
        name: `${image.filename}.${image.mime.substring(
          image.mime.indexOf('/') + 1,
        )}`,
      });
      let cred = await getVerifiedKeys(authData.userToken);
      dispatch(setToken(cred));
      const resp = await addReviewImage(payload, cred);
      if (resp.hasOwnProperty('message')) {
        dispatch(setInitialState(state))
        Toast.show('Photo updated');
      }
    });
  };

  useEffect(() => {
    getUsers();
  }, [state]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.reviewHeader}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <View style={styles.iconHeader}>
            <Image
              style={styles.backIcon}
              source={require('../assets/images/back_icon.png')}
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.reviewHotelText}>{route.params.name}</Text>
        <TouchableOpacity
          onPress={() => {
            pickImage();
          }}>
          <View style={styles.iconHeader}>
            <Icon
              style={{marginRight: 15}}
              color="white"
              size={30}
              name="camera-outline"
            />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          flexWrap: 'wrap',
          flexDirection: 'row',
          backgroundColor: 'black',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        {users.length > 0
          ? users.map(item => {
              return item.image.map(ele => {
                return (
                  <TouchableOpacity key={uuid.v4()}>
                    <View>
                      <Image
                        style={styles.itemImageStyle}
                        source={{uri: 'https' + ele.substring(4)}}
                      />
                    </View>
                  </TouchableOpacity>
                );
              });
            })
          : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemImageStyle: {
    width: 122,
    height: 124,
    margin: 3.5,
  },
  reviewHeader: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#370F24',
  },

  txtNameStyle: {
    fontSize: 16,
  },
  txtEmailStyle: {
    color: '#777',
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },
  iconHeader: {
    height: 64,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  reviewHotelText: {
    fontFamily: 'Avenir Book',
    color: 'white',
    fontSize: 20,
  },
  review: {
    height: 20,
    width: 20,
    tintColor: 'white',
    marginRight: 10,
  },

  backIcon: {
    height: 20,
    width: 20,
  },
});

export default ImageDisplay;