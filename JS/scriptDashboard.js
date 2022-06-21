
    console.log('HolaCargueDashboard')
    
    
    function GenerarLink () {
    
    
        let Fecha = Math.floor(Date.now() / 1000)
        console.log(Fecha);
    
        let keyApi = "api-keypmgoawwwjjeuwiuaypj0nukw98dnqxyzstation-id139322t"
        let Apiformat = keyApi + Fecha;
        let hash = CryptoJS.HmacSHA256(Apiformat ,"wb0zbi95gnwskkl4uybcgli6iqgaair5");
        let StringEncriptado = CryptoJS.enc.Hex.stringify(hash);
        console.log(StringEncriptado);
    
        let LinkCurrentPeticion = "https://api.weatherlink.com/v2/current/139322?api-key=pmgoawwwjjeuwiuaypj0nukw98dnqxyz&t=" + Fecha + "&api-signature=" + StringEncriptado;
        console.log(LinkCurrentPeticion);
    
        fetch(LinkCurrentPeticion)
            .then((response) => {
                return response.json()
            })
            .then((object) => {
                // Work with JSON data here
                console.log(object.sensors)
                JSONApi = data;
            })
            .catch((err) => {
                // Do something for an error here
            })
            
    }
    
     function PruebaJson () {
    
        fetch('/Resource/Pruebas.json')
        .then((response) => {
            return response.json();
        })
        .then((object) => {
            let Datos = object.sensors[0].data[0]
            let TemperaturaRedondeada = Math.trunc(Datos.temp_out);
            document.querySelector('#temperaturaClimaApi').innerHTML = TemperaturaRedondeada;
            document.querySelector('#temperaturaTipoClimaApi').innerHTML = '°F';
            document.querySelector('#humedadClimaApi').innerHTML = Datos.hum_out + '%';
            document.querySelector('#velClimaApi').innerHTML = Datos.wind_speed + 'mph';
            document.querySelector('#temp_in').innerHTML = Datos.temp_in + '℉'
            document.querySelector('#temp_out').innerHTML = Datos.temp_out + '℉'
            document.querySelector('#hum_in').innerHTML = Datos.hum_in + '%'
            document.querySelector('#hum_out').innerHTML = Datos.hum_out + '%'
            document.querySelector('#vel_wind').innerHTML = Datos.wind_speed + 'mph'
            document.querySelector('#dir_wind').innerHTML = Datos.wind_dir
            document.querySelector('#cold_wind').innerHTML = Datos.wind_chill + '℉'
            document.querySelector('#index_heat').innerHTML = Datos.heat_index + '℉'
            document.querySelector('#uv').innerHTML = Datos.uv
            document.querySelector('#rad_sol').innerHTML = Datos.solar_rad + ' w/m²'
            document.querySelector('#rain-day').innerHTML = Datos.rain_day_mm + ' mm'
            document.querySelector('#storm').innerHTML = Datos.rain_storm_mm + ' mm'
            document.querySelector('#point-dew').innerHTML = Datos.dew_point + ' ℉'
            let HoraActual = new Date();
            document.querySelector('#Clock').innerHTML = HoraActual.getHours() + ':' + HoraActual.getMinutes();
            document.querySelector('#rain-month').innerHTML = Datos.rain_month_mm + ' mm'
            document.querySelector('#rain-year').innerHTML = Datos.rain_year_mm + ' mm'
        })
    }
    
    PruebaJson()





    

