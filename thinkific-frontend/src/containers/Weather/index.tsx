import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Input, notification, Skeleton} from 'antd';
import {PageHeader} from 'antd';

import PlacesAutocomplete, {geocodeByAddress} from 'react-places-autocomplete'
import './index.css';
import {rootState} from "../../states/types";
import {WeatherCard} from "../../components/WeatherCard";
import {weatherActions} from "./weather.action";

const Weather = () => {
    const dispatch = useDispatch();
    const {Search} = Input;
    const [address, setAddress] = useState('');
    const weather = useSelector<rootState, any>(state => state.weather);

    useEffect(() => {
        const error = weather.get('error');
        if (error && error !== '') {
            notification['error']({
                message: 'Weather Error',
                description:
                error,
            });
            setAddress('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [weather.get('error')]);

    const handleChange = (address: string) => {
        setAddress(address);
    };

    const handleSelect = (address: string) => {
        geocodeByAddress(address)
            .then(function (results) {
                setAddress(results[0].formatted_address);
            })
            .catch(error => console.error('Error', error))
    };
    const handleSearch = (value: string) => {
        if (value !== '') {
            dispatch(weatherActions.getWeather(value));
        } else {
            notification['error']({
                message: 'Search Error',
                description:
                    'Please enter a city and try again',
            });
        }
    };

    const renderWeatherCard = () => {
        const data = weather.get('weather');
        return <>
            <Skeleton loading={weather.get('isLoading')}>
                {data && <WeatherCard weather={data}/>}
            </Skeleton>
        </>
    };

    const renderInputField = ({getInputProps, getSuggestionItemProps, suggestions}: { getInputProps: any, getSuggestionItemProps: any, suggestions: any }) => (
        <div className="autocomplete-root">
            <Search
                placeholder="Enter a City"
                enterButton="Search"
                size="large"
                onSearch={handleSearch}
                {...getInputProps()}
            />
            <div className="autocomplete-dropdown-container">
                {suggestions.map((suggestion: any) => (
                    <div {...getSuggestionItemProps(suggestion)} className="suggestion">
                        <span>{suggestion.description}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    const searchOptions = {
        types: ['(cities)'],
    };

    return (<>
            <PageHeader

                title="Weather Report by City"
            />
            <div className="searchbox-container">
                <PlacesAutocomplete
                    value={address}
                    onChange={handleChange}
                    onSelect={handleSelect}
                    searchOptions={searchOptions}
                >
                    {renderInputField}
                </PlacesAutocomplete>

                {renderWeatherCard()}
            </div>
        </>
    );
}

export default Weather;
