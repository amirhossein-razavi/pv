import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const getItemProp = (item) => {
  if (item.active) {
    return 'location-autocomplete-item-active location-autocomplete-item';
  }
  return 'location-autocomplete-item';
};

export const validateAddress = (address = '') => {
  const addressParts = address.split(',').filter(addressPart => addressPart.trim());
  return addressParts.length > 1 || address === '';
};

class Address extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      err: null,
      timeOutPointer: null,
      isFocused: false,
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    const { onChange, onCoordsChange } = this.props;
    const { timeOutPointer } = this.state;
    onChange(value);
    if (timeOutPointer) {
      clearTimeout(timeOutPointer);
    }
    this.setState({
      timeOutPointer: setTimeout(() => {
        if (window.google && validateAddress(value) && onCoordsChange) {
          geocodeByAddress(value)
            .then(results => getLatLng(results[0]))
            .then((latLng) => {
              onCoordsChange(latLng);
            })
            .catch(() => {
              onCoordsChange(null);
            });
        }
      }, 200),
    });
  }

  componentDidCatch(err) {
    this.setState({
      err,
    });
  }

  render() {
    const { err, isFocused } = this.state;
    const { input, onChange, disabled, placeholder, progress } = this.props;

    if (err) {
      return (
        <div>
          <input
            type="text"
            className="form-control"
            placeholder={placeholder}
            value={input || ''}
            onChange={e => onChange(e.target.value)}
            disabled={disabled}
          />
          <span className="text-danger mt-1 text-small">
            <i className="far fa-exclamation-triangle mr-1" />
            {err.message.substr(0, 80)}
          </span>
        </div>
      );
    }

    return (
      <PlacesAutocomplete
        value={input}
        onChange={value => this.onChange(value)}
        // onSelect={value => this.onChange(value)}
        searchOptions={{ componentRestrictions: { country: 'au' } }}
        onError={() => { }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="position-relative">
            <div className="input-group">
              <input
                {...getInputProps({
                  className: 'form-control',
                })}
                disabled={progress || disabled}
                placeholder={placeholder}
                onBlur={() => { this.setState({ isFocused: false }); }}
                onFocus={() => { this.setState({ isFocused: true }); }}
              />
              <div className="input-group-append">
                {input && validateAddress(input) && (
                  <span className="input-group-text text-success"><i className="far fa-check" /></span>)}
                {input && !validateAddress(input) && (
                  <span className="input-group-text text-danger"><i className="far fa-times" /></span>)}
                {!input && <span className="input-group-text" />}
              </div>
            </div>
            {isFocused && (loading || (suggestions && suggestions.length > 0)) && (
              <div className="autocomplete-dropdown-container location-autocomplete">
                {loading && <div className="location-autocomplete-item">Loading...</div>}
                {suggestions.map(suggestion => (
                  <div
                    {...getSuggestionItemProps(suggestion, { className: getItemProp(suggestion) })}
                  >
                    <span>
                      <i className="far fa-map-marker-alt mr-1" />
                      {suggestion.description}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default Address;