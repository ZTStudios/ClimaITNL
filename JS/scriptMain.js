window.onload = () => {
    
        
    let LinkA = 'https://api.openweathermap.org/data/2.5/weather?lat=27.48&lon=-99.5105&units=metric&lang=sp&appid=75388a5617c4890016f8215a20d3ac3f';
    
    async function CargarWallpaper() {
        
        let HoraActual = new Date();
        var ObjJson = "initial";

        await fetch(LinkA)
            .then(res => res.json())
            .then(data => {
                ObjJson = data;
                // console.log(ObjJson);
                document.body.classList.add('card-animacion')
                if(HoraActual.getHours() >= 8  && HoraActual.getHours() < 20) {

                    if (ObjJson.weather[0].main == 'Clear' || ObjJson.weather[0].description == 'nubes dispersas') {
                        document.body.style.backgroundImage = "url('Resource/WallapaperState/SoleadoWall.png')"
                        document.querySelector(".card-container").style.backgroundColor = "#ffb80033";
                        document.querySelector('#icon-Card').src = '/Resource/Iconos/Card/Sun Cloud.svg'
                        document.querySelector('#condicionClimaApi').innerHTML = ObjJson.weather[0].description.toUpperCase()   
                    }
                    else if (ObjJson.weather[0].main == 'Clouds') {
                        document.body.style.backgroundImage = "url('Resource/WallapaperState/NubladoWall.png')"
                        document.querySelector(".card-container").style.backgroundColor = "#18293533";
                        document.querySelector('#icon-Card').src = 'Resource/Iconos/Card/Clouds.svg'
                        document.querySelector('#condicionClimaApi').innerHTML = 'NUBLADO'

                    }
                    else if (ObjJson.weather[0].main == 'Rain'){
                        document.body.style.backgroundImage = "url('Resource/WallapaperState/LluviaWall.png')"
                        document.querySelector(".card-container").style.backgroundColor = "#52619633";
                        document.querySelector('#icon-Card').src = 'Resource/Iconos/Card/Rain Cloud.svg'
                        document.querySelector('#condicionClimaApi').innerHTML = ObjJson.weather[0].description.toUpperCase()

                    }
                    else if (ObjJson.weather[0].main == 'Thunderstorm'){
                        document.body.style.backgroundImage = "url('Resource/WallapaperState/TormentaWall.png')"
                        document.querySelector(".card-container").style.backgroundColor = "#18293533";
                        document.querySelector('#icon-Card').src = 'Resource/Iconos/Card/Thunder Cloud.svg'
                        document.querySelector('#condicionClimaApi').innerHTML = ObjJson.weather[0].description.toUpperCase()
                    }
                    else if (ObjJson.weather[0].main == 'Snow'){
                        document.body.style.backgroundImage = "url('Resource/WallapaperState/NevadoWall.png')"
                        document.querySelector(".card-container").style.backgroundColor = "#6d949733";
                        document.querySelector('#icon-Card').src = 'Resource/Iconos/Card/Snow Cloud.svg'
                        document.querySelector('#condicionClimaApi').innerHTML = ObjJson.weather[0].description.toUpperCase()
                    } 
                }
                else{
                    document.body.style.backgroundImage = "url('Resource/WallapaperState/NocheWall.png')"
                    document.querySelector('#icon-Card').src = 'Resource/Iconos/Card/Night Cloud.svg'
                    /*document.querySelector('.card-container').classList.add("color-noche");*/
                    document.querySelector(".card-container").style.backgroundColor = "#62626233";
                    document.querySelector('#condicionClimaApi').innerHTML = ObjJson.weather[0].description.toUpperCase()
                    document.body.classList.add('card-animacion')
                    modoOcuroON()
                }
            })    

    }


    // CargarWallpaper()
    
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

        modificarChart()
        
    }

    document.querySelector("#ColorMode").addEventListener("click", function() {
        modoOcuroON()
    });
        
    let seleccionarGrados = document.querySelector("#CambiarGrados");

    seleccionarGrados.addEventListener("click",function(){
        cambiarGrados()
    })
        
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

        let Fecha = Math.floor(Date.now() / 1000)

    
        let keyApi = "api-keypmgoawwwjjeuwiuaypj0nukw98dnqxyzstation-id139322t"
        let Apiformat = keyApi + Fecha;
        let hash = CryptoJS.HmacSHA256(Apiformat ,"wb0zbi95gnwskkl4uybcgli6iqgaair5");
        let StringEncriptado = CryptoJS.enc.Hex.stringify(hash);
    
        let LinkCurrentPeticion = "https://api.weatherlink.com/v2/current/139322?api-key=pmgoawwwjjeuwiuaypj0nukw98dnqxyz&t=" + Fecha + "&api-signature=" + StringEncriptado;

        if (ruta == "formato"){
            const meses = ["-01-", "-02-", "-03-", "-04-", "-05-", "-06-","-07-", "-08-", "-09-", "-10-", "-11-", "-12-"];
    
        const fecha = new Date();
        const dia = fecha.getDate() + "-";
        const mes = meses[fecha.getMonth()]
        const año = fecha.getFullYear();
        const hora = fecha.getHours()
    
        let fechaActual = año + mes + dia + hora
        var newObjeto = Database.child(fechaActual);
        fetch(LinkCurrentPeticion, {mode: 'no-cors'})
            .then((response) => {
                return response.json();
            })
            .then((object) => {
                let Objeto = object;
          
    
                newObjeto.set({
                    obj:Objeto.sensors[0].data[0],
                    hora: hora,
                });
            })

        var newObjeto2 = Database.child("0-CurrentData");
        fetch(LinkCurrentPeticion, {mode: 'no-cors'})
            .then((response) => {
                return response.json();
            })
            .then((object) => {
                let Objeto2 = object;
                newObjeto2.set({
                    obj:Objeto2.sensors[0].data[0],
                    hora: hora,
                });
            })
        
            modificarChart();
        }else{

            const fecha = new Date();
            const hora = fecha.getHours()
            var newObjeto = Database.child("0-CurrentData");
            fetch(LinkCurrentPeticion, {mode: 'no-cors'})
            .then((response) => {
                return response.json();
            })
    
            .then((object) => {
                let Objeto = object;
                newObjeto.set({
                    obj:Objeto.sensors[0].data[0],
                    hora: hora,
                });
            })
        }
    }

    let labels = [];
    let valuesBar = [];

    const data = {
        labels: labels,
        datasets: [{
                label: 'Presion Atmosferica',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: valuesBar,
                fill: false,
                cubicInterpolationMode: 'monotone',
                tension: 0.4,
                color: '#ffff',
            }]
        };

    const config = {
    type: 'line',
    data: data,
    options: {}
    };


    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );

    function modificarChart () {

        let labels = [];
        let valuesBar = [];

        var ref = firebase.database().ref('ClimaITNL')

        ref.limitToLast(5).on('value' , (snapshot) => {
            
            
            let labels = [];
            let valuesBar = [];
            let DataList = snapshot.val();
            
            for (let i in DataList) {
                valuesBar.push(DataList[i].obj.bar);
                labels.push(DataList[i].hora);
            }

            if(document.querySelector('#containerChart').className == 'Dashboard-Container-Big mode darkMode') {
                myChart.options.scales.x.grid.color = '#a1a1a1'
                myChart.options.scales.y.grid.color = '#a1a1a1'
                myChart.options.scales.x.ticks.color = 'white'
                myChart.options.scales.y.ticks.color = 'white'
                myChart.options.color = 'white';
                myChart.data.labels = labels;
                myChart.data.datasets.forEach((dataset) => {
                    dataset.data = valuesBar;
                });
                myChart.update();
            }else {
                myChart.options.scales.x.grid.color = '#a1a1a1'
                myChart.options.scales.y.grid.color = '#a1a1a1'
                myChart.options.scales.x.ticks.color = 'black'
                myChart.options.scales.y.ticks.color = 'black'
                myChart.options.color = 'black';
                myChart.data.labels = labels
                myChart.data.datasets.forEach((dataset) => {
                    dataset.data = valuesBar;
                });
                myChart.update();
            }

        })
    }   
        
    const readCurrentData = (rutaGrados) => {
    
        var ref = firebase.database().ref('ClimaITNL')
    
        ref.limitToFirst(1).on('value' , (snapshot) => {
        //   console.log(snapshot.val())
    
          let DataList = snapshot.val();
          for (let i in DataList) {
            //   console.log(DataList[i].obj)
              let TemperaturaRedondeada = Math.trunc(DataList[i].obj.temp_out);
              let temperaturaGrados = TemperaturaRedondeada
              let velocidadClima = DataList[i].obj.hum_out
              let temperaturaInterna = DataList[i].obj.temp_in
              let temperaturaExterna = DataList[i].obj.temp_out
              let velocidadViento = DataList[i].obj.wind_speed
              let coldWind = DataList[i].obj.wind_chill
              let indexHeat = DataList[i].obj.heat_index
              let pointDew = DataList[i].obj.dew_point

              if (rutaGrados === "centigrados"){
                  document.querySelector('#temperaturaClimaApi').innerHTML = ConvertirCentigrados(temperaturaGrados);
                  document.querySelector('#temperaturaTipoClimaApi').innerHTML = '°C';
                  document.querySelector('#humedadClimaApi').innerHTML = DataList[i].obj.hum_out + '%';
                  document.querySelector('#velClimaApi').innerHTML = ConvertirKilometros(velocidadClima) + ' km';
                  document.querySelector('#temp_in').innerHTML = RedondearDecimales(temperaturaInterna) + ' °C'
                  document.querySelector('#temp_out').innerHTML = RedondearDecimales(temperaturaExterna) + ' °C'
                  document.querySelector('#hum_in').innerHTML = DataList[i].obj.hum_in + '%'
                  document.querySelector('#hum_out').innerHTML = DataList[i].obj.hum_out + '%'
                  document.querySelector('#vel_wind').innerHTML = ConvertirKilometros(velocidadViento) + ' km'
                  document.querySelector('#dir_wind').innerHTML = DataList[i].obj.wind_dir
                  document.querySelector('#cold_wind').innerHTML = RedondearDecimales(coldWind) + ' °C'
                  document.querySelector('#index_heat').innerHTML = RedondearDecimales(indexHeat) + ' °C'
                  document.querySelector('#uv').innerHTML = DataList[i].obj.uv
                  document.querySelector('#rad_sol').innerHTML = DataList[i].obj.solar_rad + ' w/m²'
                  document.querySelector('#rain-day').innerHTML = DataList[i].obj.rain_day_mm + ' mm'
                  document.querySelector('#storm').innerHTML = DataList[i].obj.rain_storm_mm + ' mm'
                  document.querySelector('#point-dew').innerHTML = RedondearDecimales(pointDew) + '  °C'
                  let HoraActual = new Date();
                  document.querySelector('#Clock').innerHTML = HoraActual.getHours() + ':' + HoraActual.getMinutes();
                  document.querySelector('#rain-month').innerHTML = DataList[i].obj.rain_month_mm + ' mm'
                  document.querySelector('#rain-year').innerHTML = DataList[i].obj.rain_year_mm + ' mm'
              }
              else{
                document.querySelector('#temperaturaClimaApi').innerHTML = temperaturaGrados;
                document.querySelector('#temperaturaTipoClimaApi').innerHTML = '°F';
                document.querySelector('#humedadClimaApi').innerHTML = DataList[i].obj.hum_out + '%';
                document.querySelector('#velClimaApi').innerHTML = velocidadClima + ' mph';
                document.querySelector('#temp_in').innerHTML = RedondearFarenheits(temperaturaInterna) + ' °F'
                document.querySelector('#temp_out').innerHTML = RedondearFarenheits(temperaturaExterna) + ' °F'
                document.querySelector('#hum_in').innerHTML = DataList[i].obj.hum_in + '%'
                document.querySelector('#hum_out').innerHTML = DataList[i].obj.hum_out + '%'
                document.querySelector('#vel_wind').innerHTML = velocidadViento + ' mph'
                document.querySelector('#dir_wind').innerHTML = DataList[i].obj.wind_dir
                document.querySelector('#cold_wind').innerHTML = coldWind + ' °F'
                document.querySelector('#index_heat').innerHTML = indexHeat + ' °F'
                document.querySelector('#uv').innerHTML = DataList[i].obj.uv
                document.querySelector('#rad_sol').innerHTML = DataList[i].obj.solar_rad + ' w/m²'
                document.querySelector('#rain-day').innerHTML = DataList[i].obj.rain_day_mm + ' mm'
                document.querySelector('#storm').innerHTML = DataList[i].obj.rain_storm_mm + ' mm'
                document.querySelector('#point-dew').innerHTML = pointDew + '  °F'
                let HoraActual = new Date();
                document.querySelector('#Clock').innerHTML = HoraActual.getHours() + ':' + HoraActual.getMinutes();
                document.querySelector('#rain-month').innerHTML = DataList[i].obj.rain_month_mm + ' mm'
                document.querySelector('#rain-year').innerHTML = DataList[i].obj.rain_year_mm + ' mm'
              }

          }
    
        })
    
    }

    setInterval(function () {

        let Timestamp = Math.floor(Date.now() / 1000)
        if(Timestamp % 300  == 0) {

            document.body.classList.remove('card-animacion')
            document.querySelector('.actualizacion').innerHTML = "Actualizando"

            const dot = document.querySelectorAll('.dot')

            dot.forEach((e)=>{
                e.style.backgroundColor = 'orange';
            })

            setTimeout(function(){
                // console.log("Hola Mundo");
                document.querySelector('.actualizacion').innerHTML = "Actualizado"
                dot.forEach((e)=>{
                    e.style.backgroundColor = '#39ff14';
                })

                //GenerarLink();
                CargarWallpaper();
            }, 3000);
            setTimeout(function(){
                ActualizarDatos();
            },5000)
        }
        Timestamp++;

    } ,1000);

    const ActualizarDatos = () =>{
        let hoy = new Date();
        let minutos = hoy.getMinutes()
        let segundos = hoy.getSeconds();
        
        if(minutos == 0 && segundos < 6){
            let ruta = "formato"
            save(ruta)
        }
        else if(minutos != 0 && minutos % 5  == 0 && segundos < 6){
            let ruta = "currentData"
            save(ruta)
        }
        else{
            readCurrentData();
        }
        
    }

    ActualizarDatos();      

    function ConvertirCentigrados(dato) {
        dato = (dato -32) * 5 / 9
        return (Math.trunc(dato))
    }  
    function RedondearDecimales(dato) {
        dato = (dato -32) * 5 / 9
        return (dato.toFixed(2))
    }  

    function ConvertirKilometros(dato) {
        dato = dato * 1.609
        return (dato.toFixed(2))
    } 

    function RedondearFarenheits(dato){
        return (dato.toFixed(2))
    }

    function cambiarGrados(){
        seleccionarGrados.classList.toggle("centigrados")
        if (seleccionarGrados.classList.contains("centigrados")){

            let rutaGrados = "centigrados"
            readCurrentData(rutaGrados)
        }
        else{
            
            let rutaGrados = "farenheit"
            readCurrentData(rutaGrados)
        }
        
    }

    const verificarCentigrados = () =>{
        if (seleccionarGrados.classList.contains("centigrados")){
            let rutaGrados = "centigrados"
            readCurrentData(rutaGrados)
        }
    }

    verificarCentigrados()

    setTimeout(()=>{
        document.querySelector("#Splash").classList.toggle("fade")
        document.querySelector("body").classList.toggle("enableScroll")
        document.querySelector("#Splash").classList.toggle("fadeDiv")
        CargarWallpaper()
        modificarChart();
    },1000)

    
}    