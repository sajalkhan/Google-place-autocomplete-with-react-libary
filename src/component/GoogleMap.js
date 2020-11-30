import React, { useState, useEffect } from "react";
import PlacesAutocomplete, { geocodeByAddress } from "react-places-autocomplete";
import scriptLoader from "react-async-script-loader";

const API_KEY = 'AIzaSyBLVHqBpK4pTUHkxRLctTj6a3nHrt1d-uI';

function SearchLocationInput({ isScriptLoaded, isScriptLoadSucceed, updateMapInfo }) {
    
    const [address, setAddress] = React.useState("");
    
    const [MapState, setMapState] = useState({
        location: '',
        streetNumber: '',
        street: '',
        city: '',
        stateCode: [{
            label: '',
            value: ''
        }],
        zipCode: '',
        county: '',
    });

    useEffect(() => {
        updateMapInfo(MapState);
    }, [MapState]);

    const handleChange = (value) => {
        setAddress(value)
    }

    const handleSelect = async (value) => {

        const result = await geocodeByAddress(value);
        var Gmap_Address = "", streetNumber = "", street = "", city = "", stateCode1 = "", stateCode2 = "", county = "", zipCode = "";

        const place = result[0];
        for (var i = 0; i < place.address_components.length; i++) {

            var addressType = place.address_components[i].types[0];

            switch (addressType) {
                case "street_number":
                    streetNumber = place.address_components[i]["short_name"];
                    Gmap_Address += streetNumber + " ";
                    break;
                case "route":
                    street = place.address_components[i]["long_name"];
                    Gmap_Address += street + ", ";
                    break;
                case "locality":
                    city = place.address_components[i]["long_name"];
                    Gmap_Address += city + ", ";
                    break;
                case "administrative_area_level_1":
                    stateCode1 = place.address_components[i]["long_name"];
                    stateCode2 = place.address_components[i]["short_name"];
                    Gmap_Address += stateCode2 + " ";
                    break;
                case "administrative_area_level_2":
                    county = place.address_components[i]["long_name"];
                    Gmap_Address += county + ' ';
                    break;
                case "postal_code":
                    zipCode = place.address_components[i]["short_name"];
                    Gmap_Address += zipCode;
                    break;
                default:
                    break;
            }
        }

        setMapState({
            location: Gmap_Address,
            streetNumber: streetNumber,
            street: street,
            city: city,
            stateCode: [{ label: stateCode1, value: stateCode2 }],
            zipCode: zipCode,
            county: county
        });

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
                            <div style={{ width: '500px', margin: '100px auto' }}>
                                <input
                                    style={{ width: '90%' }}
                                    {...getInputProps({
                                        placeholder: "Enter Address...",
                                    })}
                                />
                                <div style={{ border: '1px solid black', width: '90%', overflow: 'hidden' }}>
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map((suggestion) => {
                                        const style = suggestion.active
                                            ? { backgroundColor: "#A6ACAF", cursor: "pointer", width: '90%', borderBottom: '1px solid black' }
                                            : { backgroundColor: "#ffffff", cursor: "pointer", width: '90%', borderBottom: '1px solid black' };

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
])(SearchLocationInput);