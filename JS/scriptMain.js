window.onload = () => {
    
        
    let apiFree = 'https://api.openweathermap.org/data/2.5/weather?lat=27.48&lon=-99.5105&units=metric&lang=sp&appid=75388a5617c4890016f8215a20d3ac3f';
    
    async function CargarWallpaper() {
        
        let HoraActual = new Date();
        var ObjJson = "initial";

        await fetch(apiFree)
            .then(res => res.json())
            .then(data => {
                ObjJson = data;
                // console.log(ObjJson);
                document.body.classList.add('card-animacion')
                if(HoraActual.getHours() >= 8  && HoraActual.getHours() < 20) {

                    if (ObjJson.weather[0].main == 'Clear' || ObjJson.weather[0].description == 'nubes dispersas') {
                        document.body.style.backgroundImage = "url('https://firebasestorage.googleapis.com/v0/b/climaitnl.appspot.com/o/WallpaperState%2FSoleadoWall.png?alt=media&token=fdc63a2b-1d16-4594-b015-0ac9730d3f49')"
                        document.querySelector(".card-container").style.backgroundColor = "#ffb80033";
                        document.querySelector('#icon-Card').src = 'https://firebasestorage.googleapis.com/v0/b/climaitnl.appspot.com/o/Iconos%2FCard%2FSunCloud.svg?alt=media&token=f31c9db2-f683-41d3-bc67-35ddad7e82a7'
                        document.querySelector('#condicionClimaApi').innerHTML = ObjJson.weather[0].description.toUpperCase()   
                    }
                    else if (ObjJson.weather[0].main == 'Clouds') {
                        document.body.style.backgroundImage = "url('https://firebasestorage.googleapis.com/v0/b/climaitnl.appspot.com/o/WallpaperState%2FNubladoWall.png?alt=media&token=eaf0f3af-b7d2-40ae-b380-4ac47e249a8d')"
                        document.querySelector(".card-container").style.backgroundColor = "#18293533";
                        document.querySelector('#icon-Card').src = 'https://firebasestorage.googleapis.com/v0/b/climaitnl.appspot.com/o/Iconos%2FCard%2FClouds.svg?alt=media&token=0b310a42-b288-4d58-86fc-4442fb84b04d'
                        document.querySelector('#condicionClimaApi').innerHTML = 'NUBLADO'

                    }
                    else if (ObjJson.weather[0].main == 'Rain'){
                        document.body.style.backgroundImage = "url('https://firebasestorage.googleapis.com/v0/b/climaitnl.appspot.com/o/WallpaperState%2FLluviaWall.png?alt=media&token=087a589a-866f-4bb3-a973-d9dad1e47d77')"
                        document.querySelector(".card-container").style.backgroundColor = "#52619633";
                        document.querySelector('#icon-Card').src = 'https://firebasestorage.googleapis.com/v0/b/climaitnl.appspot.com/o/Iconos%2FCard%2FRain%20Cloud.svg?alt=media&token=3db1b0b9-1bca-4f98-b46c-c920610c6cae'
                        document.querySelector('#condicionClimaApi').innerHTML = ObjJson.weather[0].description.toUpperCase()

                    }
                    else if (ObjJson.weather[0].main == 'Thunderstorm'){
                        document.body.style.backgroundImage = "url('https://firebasestorage.googleapis.com/v0/b/climaitnl.appspot.com/o/WallpaperState%2FTormentaWall.png?alt=media&token=8a6dd058-4831-44d4-9d7b-381319fbcd32')"
                        document.querySelector(".card-container").style.backgroundColor = "#18293533";
                        document.querySelector('#icon-Card').src = 'https://firebasestorage.googleapis.com/v0/b/climaitnl.appspot.com/o/Iconos%2FCard%2FThunder%20Cloud.svg?alt=media&token=a0ad9786-e23c-4bd7-887c-021f56a28e5d'
                        document.querySelector('#condicionClimaApi').innerHTML = ObjJson.weather[0].description.toUpperCase()
                    }
                    else if (ObjJson.weather[0].main == 'Snow'){
                        document.body.style.backgroundImage = "url('https://firebasestorage.googleapis.com/v0/b/climaitnl.appspot.com/o/WallpaperState%2FNevadoWall.png?alt=media&token=b2f3165a-9ea0-4361-9476-ef0ddd61569d')"
                        document.querySelector(".card-container").style.backgroundColor = "#6d949733";
                        document.querySelector('#icon-Card').src = 'https://firebasestorage.googleapis.com/v0/b/climaitnl.appspot.com/o/Iconos%2FCard%2FSnow%20Cloud.svg?alt=media&token=4452d40b-bc49-4639-b401-69360a869aa6'
                        document.querySelector('#condicionClimaApi').innerHTML = ObjJson.weather[0].description.toUpperCase()
                    } 
                }
                else{
                    document.body.style.backgroundImage = "url('https://firebasestorage.googleapis.com/v0/b/climaitnl.appspot.com/o/WallpaperState%2FNocheWall.png?alt=media&token=ad3359a4-e0b4-4a77-b351-7d06661c6f92')"
                    document.querySelector('#icon-Card').src = 'https://firebasestorage.googleapis.com/v0/b/climaitnl.appspot.com/o/Iconos%2FCard%2FNight%20Cloud.svg?alt=media&token=6e0a2eac-166f-4749-a89d-5793432aba30'
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
        fetch('PHP/request.php?url=' + LinkCurrentPeticion)
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
        fetch('PHP/request.php?url=' + LinkCurrentPeticion)
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
            fetch('PHP/request.php?url=' + LinkCurrentPeticion)
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