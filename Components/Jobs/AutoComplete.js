import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const { height, width } = Dimensions.get('window');

class PlacesInput extends Component {
  state = {
    places: [],
    showList: false,
    isLoading: false,
  };

  timeout = null;

  render() {
    return (
      <View style={[styles.container, this.props.stylesContainer]}>
        <View style={[styles.input, Platform.OS === 'ios' && { paddingVertical: 10 }]}>
          <TextInput
            placeholder={this.props.placeHolder}
            onChangeText={location => {
              this.props.onChangeLocation(location);
              this.onPlaceSearch()
            }
            }
            style={{ flex: 1 }}
            value={this.props.location}
            onFocus={() => this.setState({ showList: true })}
            {...this.props.textInputProps}
          />
          <TouchableOpacity onPress={() => this.props.onChangeLocation('')}>
            <Icon
              name={'times'}
              size={17}
              color={'#999'}
            />
          </TouchableOpacity>
        </View>
        {this.state.showList && (
          <ScrollView style={[styles.scrollView, this.props.stylesList]}>
            <TouchableOpacity onPress={() => this.setState({ showList: false })}
              style={{ flex: 1, alignItems: "flex-end", paddingTop: 10, paddingRight: 10 }}>
              <Icon
                name={'times-circle'}
                size={20}
                color={'red'}
              />
            </TouchableOpacity>
            {this.state.isLoading && (
              <ActivityIndicator
                size="small"
                style={[styles.loading, this.props.stylesLoading]}
              />
            )}
            {this.state.places.map(place => (
              <TouchableOpacity
                key={`place-${place.id}`}
                style={[styles.place, this.props.stylesItem]}
                onPress={() => this.onPlaceSelect(place.place_id)}>
                <Text style={[styles.placeText, this.props.stylesItemText]}>
                  {this.props.resultRender(place)}
                </Text>
                {this.props.iconResult}
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    );
  }

  onPlaceSearch = () => {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(
      this.fetchPlaces,
      this.props.requiredTimeBeforeSearch,
    );
  };

  buildCountryQuery = () => {
    const { queryCountries } = this.props;

    if (!queryCountries) {
      return '';
    }

    return `&components=${queryCountries
      .map(countryCode => {
        return `country:${countryCode}`;
      })
      .join('|')}`;
  };

  buildLocationQuery = () => {
    const { searchLatitude, searchLongitude, searchRadius } = this.props;

    if (!searchLatitude || !searchLongitude || !searchRadius) {
      return '';
    }

    return `&location=${searchLatitude},${searchLongitude}&radius=${searchRadius}`;
  };

  fetchPlaces = async () => {
    if (
      !this.props.location ||
      this.props.location.length < this.props.requiredCharactersBeforeSearch
    ) {
      return;
    }
    this.setState(
      {
        isLoading: true,
      },
      async () => {
        const places = await fetch(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${
          this.props.location
          }&key=${this.props.googleApiKey}&inputtype=textquery&language=${
          this.props.language
          }&fields=${
          this.props.queryFields
          }${this.buildLocationQuery()}${this.buildCountryQuery()}`,
        ).then(response => response.json());

        this.setState({
          isLoading: false,
          places: places.predictions,
        });
      },
    );
  };

  onPlaceSelect = async id => {
    const place = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&key=${
      this.props.googleApiKey
      }&fields=${this.props.queryFields}&language=${this.props.language}`,
    ).then(response => response.json());

    return this.setState(
      {
        showList: false,
      },
      () => {
        return this.props.onSelectLocation(place.result.formatted_address)
      },
    );
  };
}

PlacesInput.propTypes = {
  stylesInput: PropTypes.object,
  stylesContainer: PropTypes.object,
  stylesList: PropTypes.object,
  stylesItem: PropTypes.object,
  stylesItemText: PropTypes.object,
  stylesLoading: PropTypes.object,
  resultRender: PropTypes.func,
  queryFields: PropTypes.string,
  queryCountries: PropTypes.array,
  searchRadius: PropTypes.number,
  searchLatitude: PropTypes.number,
  searchLongitude: PropTypes.number,
  googleApiKey: PropTypes.string.isRequired,
  placeHolder: PropTypes.string,
  textInputProps: PropTypes.object,
  iconResult: PropTypes.any,
  iconInput: PropTypes.any,
  language: PropTypes.string,
  onSelect: PropTypes.func,
  requiredCharactersBeforeSearch: PropTypes.number,
  requiredTimeBeforeSearch: PropTypes.number,
};

PlacesInput.defaultProps = {
  stylesInput: {},
  stylesContainer: {},
  stylesList: {},
  stylesItem: {},
  stylesLoading: {},
  stylesItemText: {},
  queryFields: 'formatted_address,geometry,name',
  placeHolder: 'Search places...',
  textInputProps: {},
  language: 'en',
  resultRender: place => place.description,
  requiredCharactersBeforeSearch: 2,
  requiredTimeBeforeSearch: 1000,
};

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: '#fff'
  },
  scrollView: {
    backgroundColor: '#fff',
    maxHeight: 300,
    marginTop: 10,
  },
  place: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    padding: 15,
    width: width / 1.5,
  },
  placeIcon: {
    position: 'absolute',
    top: 10,
    right: 15,
    color: 'rgba(0,0,0,0.3)',
  },
  placeText: {
    color: 'rgba(0,0,0,0.8)',
    paddingRight: 60,
  },
  loading: {
    margin: 10,
  },
});

export default PlacesInput;
