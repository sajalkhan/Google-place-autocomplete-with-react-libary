import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import scriptLoader from "react-async-script-loader";

const API_KEY ='AIzaSyBLVHqBpK4pTUHkxRLctTj6a3nHrt1d-uI';

function App({ isScriptLoaded, isScriptLoadSucceed }) {
  const [address, setAddress] = React.useState("");

  const handleChange = (value) => {
    setAddress(value)
  }

  const handleSelect = (value) => {
    setAddress(value)
  }

  if (isScriptLoaded && isScriptLoadSucceed) {
    return (
      <div>
        <PlacesAutocomplete
          value={address}
          onChange={handleChange}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
              <div style={{width: '400px', margin: '100px auto'}}>
              <input
                style={{width: '100%'}}
                {...getInputProps({
                  placeholder: "Enter Address...",
                })}
              />
              <div style={{border: '1px solid black', overflow:'hidden'}}>
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const style = suggestion.active
                    ? { backgroundColor: "#A6ACAF", cursor: "pointer", borderBottom: '1px solid black'}
                    : { backgroundColor: "#ffffff", cursor: "pointer", borderBottom: '1px solid black'};

                  return (
                    <div {...getSuggestionItemProps(suggestion, { style })}>
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default scriptLoader([
  `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`,
])(App);
