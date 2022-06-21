window.onload = () => {
    
    console.log('Archivo Cargado')
        
    let LinkA = 'https://api.openweathermap.org/data/2.5/weather?lat=27.48&lon=-99.5105&units=metric&lang=sp&appid=75388a5617c4890016f8215a20d3ac3f';
    
    async function CargarWallpaper() {
        
        let HoraActual = new Date();
        var ObjJson = "initial";

        await fetch(LinkA)
            .then(res => res.json())
            .then(data => {
                ObjJson = data;
                //console.log(ObjJson);

                if(HoraActual.getHours() >= 8  && HoraActual.getHours() < 20) {

                    if (ObjJson.weather[0].main == 'Clear' || ObjJson.weather[0].description == 'nubes dispersas') {
                        document.body.style.backgroundImage = "url('../Resource/WallapaperState/SoleadoWall.png')"
                        document.querySelector('.card-container').style.backgroundColor = "#ffb7002d";
                        document.querySelector('#icon-Card').src = '/Resource/Iconos/Card/Sun Cloud.svg'
                    }
                    else if (ObjJson.weather[0].main == 'Clouds') {
                        document.body.style.backgroundImage = "url('../Resource/WallapaperState/NubladoWall.png')"
                        document.querySelector('.card-container').style.backgroundColor = "#B5B5B4";
                        document.querySelector('#icon-Card').src = '/Resource/Iconos/Card/Clouds.svg'
                    }
                    else if (ObjJson.weather[0].main == 'Rain'){
                        document.body.style.backgroundImage = "url('../Resource/WallapaperState/LluviaWall.png')"
                        document.querySelector('.card-container').style.backgroundColor = "#526196";
                        document.querySelector('#icon-Card').src = '/Resource/Iconos/Card/Rain Cloud.svg'
                    }
                    else if (ObjJson.weather[0].main == 'Thunderstorm'){
                        document.body.style.backgroundImage = "url('../Resource/WallapaperState/TormentaWall.png')"
                        document.querySelector('.card-container').style.backgroundColor = "#182935";
                        document.querySelector('#icon-Card').src = '/Resource/Iconos/Card/Thunder Cloud.svg'
                    }
                    else if (ObjJson.weather[0].main == 'Snow'){
                        document.body.style.backgroundImage = "url('../Resource/WallapaperState/NevadoWall.png')"
                        document.querySelector('.card-container').style.backgroundColor = "#6D9497";
                        document.querySelector('#icon-Card').src = '/Resource/Iconos/Card/Snow Cloud.svg'
                    } 
                }
                else{
                    document.body.style.backgroundImage = "url('../Resource/WallapaperState/NocheWall.png')"
                    document.querySelector('#icon-Card').src = '/Resource/Iconos/Card/Night Cloud.svg'
                    modoOcuroON()
                }
            })    

    }

    CargarWallpaper()
    
    function modoOcuroON(){
        const mode = document.querySelectorAll(".mode")
        const title = document.querySelectorAll(".Titulo-Dashboard")
        const dataApi = document.querySelectorAll(".Data-Content-Dashboard")

        
        mode.forEach((e)=>{
            e.classList.toggle("darkMode");
        })
        title.forEach((e)=>{
            e.classList.toggle("darkModeText");
        })
        dataApi.forEach((e)=>{
            e.classList.toggle("darkModeText");
        })
    }

    document.querySelector("#ColorMode").addEventListener("click", function() {
        modoOcuroON()
        });

        
    const firebaseConfig = {

    apiKey: "AIzaSyDXQ-UQI3N9Kyf0ShpZu2f1TSI9sWazMok",
    authDomain: "climaitnl.firebaseapp.com",
    databaseURL: "https://climaitnl-default-rtdb.firebaseio.com/",
    projectId: "climaitnl",
    storageBucket: "climaitnl.appspot.com",
    messagingSenderId: "639144950052",
    appId: "1:639144950052:web:d461d9875d84bda94f1bb1",
    measurementId: "G-41P9KTDXDQ"
    
    };
    
    
    firebase.initializeApp(firebaseConfig);
    var Database = firebase.database().ref('ClimaITNL')
    
    const save = (ruta) => {
        if (ruta == "formato"){
            const meses = ["-01-", "-02-", "-03-", "-04-", "-05-", "-06-","-07-", "-08-", "-09-", "-10-", "-11-", "-12-"
        ];
    
        const fecha = new Date();
        const dia = fecha.getDate() + "-";
        const mes = meses[fecha.getMonth()]
        const año = fecha.getFullYear();
        const hora = fecha.getHours()
    
        let fechaActual = año + mes + dia + hora
        var newObjeto = Database.child(fechaActual);
        fetch('/Resource/pruebaHora.json')
            .then((response) => {
                return response.json();
            })
            .then((object) => {
                let Objeto = object;
    
                newObjeto.set({
                obj:Objeto.Datos[0],
                });
            })
    
        }else{
    
            var newObjeto = Database.child("0-CurrentData");
            fetch('/Resource/pruebaMinutos.json')
            .then((response) => {
                return response.json();
            })
    
            .then((object) => {
                let Objeto = object;
    
                newObjeto.set({
                obj:Objeto.Datos[0],
                });
            })
        }
    }
    
    const readCurrentData = () => {
    
        var ref = firebase.database().ref('ClimaITNL')
    
        ref.limitToFirst(1).on('value' , (snapshot) => {
          //console.log(snapshot.val())
    
            let DataList = snapshot.val();
            for (let i in DataList) {
                // console.log(DataList[i].obj)
                let TemperaturaRedondeada = Math.trunc(DataList[i].obj.temp_out);
                document.querySelector('#temperaturaClimaApi').innerHTML = TemperaturaRedondeada;
                document.querySelector('#temperaturaTipoClimaApi').innerHTML = '°F';
                document.querySelector('#humedadClimaApi').innerHTML = DataList[i].obj.hum_out + '%';
                document.querySelector('#velClimaApi').innerHTML = DataList[i].obj.wind_speed + 'mph';
                document.querySelector('#temp_in').innerHTML = DataList[i].obj.temp_in + '℉'
                document.querySelector('#temp_out').innerHTML = DataList[i].obj.temp_out + '℉'
                document.querySelector('#hum_in').innerHTML = DataList[i].obj.hum_in + '%'
                document.querySelector('#hum_out').innerHTML = DataList[i].obj.hum_out + '%'
                document.querySelector('#vel_wind').innerHTML = DataList[i].obj.wind_speed + 'mph'
                document.querySelector('#dir_wind').innerHTML = DataList[i].obj.wind_dir
                document.querySelector('#cold_wind').innerHTML = DataList[i].obj.wind_chill + '℉'
                document.querySelector('#index_heat').innerHTML = DataList[i].obj.heat_index + '℉'
                document.querySelector('#uv').innerHTML = DataList[i].obj.uv
                document.querySelector('#rad_sol').innerHTML = DataList[i].obj.solar_rad + ' w/m²'
                document.querySelector('#rain-day').innerHTML = DataList[i].obj.rain_day_mm + ' mm'
                document.querySelector('#storm').innerHTML = DataList[i].obj.rain_storm_mm + ' mm'
                document.querySelector('#point-dew').innerHTML = DataList[i].obj.dew_point + ' ℉'
                let HoraActual = new Date();
                document.querySelector('#Clock').innerHTML = HoraActual.getHours() + ':' + HoraActual.getMinutes();
                document.querySelector('#rain-month').innerHTML = DataList[i].obj.rain_month_mm + ' mm'
                document.querySelector('#rain-year').innerHTML = DataList[i].obj.rain_year_mm + ' mm'
              }

    
        })
    
    }

    setInterval(function () {

        let Timestamp = Math.floor(Date.now() / 1000)
        if(Timestamp % 300  == 0) {
            console.log('Extrayendo Datos')
            ActualizarDatos();
            CargarWallpaper();
            //GenerarLink();
        }
        Timestamp++;

    } ,1000);

    const ActualizarDatos = () =>{
        let hoy = new Date();
        let minutos = hoy.getMinutes()
        let segundos = hoy.getSeconds();
        
        if(minutos == 0){
            let ruta = "formato" 
            save(ruta)
            
        }
        else if(minutos % 5  == 0 && segundos == 0){
            let ruta = "currentData"
            save(ruta)
        }
        else{
            readCurrentData();
        }
        
    }

    ActualizarDatos();
      
      
}    