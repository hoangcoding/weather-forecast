import React from "react";
import {Card} from "antd";
import './index.css';

export const WeatherCard = ({weather}: { weather: any }) => {
    return (<>
            {weather &&
            <Card title={`Weather for ${weather.cityName}, ${weather.country}`} bordered={false} style={{textAlign: "center", marginTop: '3rem'}}>
                <p>as of {`${new Date(weather.dt * 1000).toUTCString()}`}</p>
                <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="" />
                <p>{`${(weather.temperature - 273.15).toFixed(2)} °C`}</p>
                <p>{`${weather.main} (${weather.description})`}</p>
            </Card>}
        </>

    )
};
