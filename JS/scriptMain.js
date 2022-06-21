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
                console.log(ObjJson);

                if(HoraActual.getHours() >= 8  && HoraActual.getHours() < 20) {

                    if (ObjJson.weather[0].main == 'Clear') {
                        document.body.style.backgroundImage = "url('../Resource/WallapaperState/SoleadoWall.png')"
                        document.querySelector('.card-container').style.backgroundColor = "#ffb7002d";
                        //document.querySelector('.icono-temperatura') = "url('../Resource/Iconos/Card/Sun Cloud.svg')"
                    }
                    if (ObjJson.weather[0].main == 'Clouds') {
                        document.body.style.backgroundImage = "url('../Resource/WallapaperState/NubladoWall.png')"
                        document.querySelector('.card-container').style.backgroundColor = "#B5B5B4";
                        //document.querySelector('.icono-temperatura') = "url('../Resource/Iconos/Card/Clouds.svg')"
                    }
                    if (ObjJson.weather[0].main == 'Rain'){
                        document.body.style.backgroundImage = "url('../Resource/WallapaperState/LluviaWall.png')"
                        document.querySelector('.card-container').style.backgroundColor = "#526196";
                        //document.querySelector('.icono-temperatura') = "url('../Resource/Iconos/Card/Rain Cloud.svg')"
                    }
                    if (ObjJson.weather[0].main == 'Thunderstorm'){
                        document.body.style.backgroundImage = "url('../Resource/WallapaperState/TormentaWall.png')"
                        document.querySelector('.card-container').style.backgroundColor = "#182935";
                        //document.querySelector('.icono-temperatura') = "url('../Resource/Iconos/Card/Thunder Cloud.svg')"
                    }
                    if (ObjJson.weather[0].main == 'Snow'){
                        document.body.style.backgroundImage = "url('../Resource/WallapaperState/NevadoWall.png')"
                        document.querySelector('.card-container').style.backgroundColor = "#6D9497";
                        //document.querySelector('.icono-temperatura') = "url('../Resource/Iconos/Card/Snow Cloud.svg')"
                    } 
                }
                else{
                    document.body.style.backgroundImage = "url('../Resource/WallapaperState/NocheWall.png')"
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
          // console.log(snapshot.val())
    
          let DataList = snapshot.val();
    
          for (let i in DataList) {
            console.log(DataList[i].obj)
          }
    
        })
    
    }


    const ActualizarDatos = () =>{
        let hoy = new Date();
        let minutos = hoy.getMinutes()
        let segundos = hoy.getSeconds();
        
        if(minutos == 0){
            let ruta = "formato" 
            save(ruta)
            
        }
        else if(minutos % 5){
            let ruta = "currentData"
            save(ruta)
        }
        else{
            readCurrentData()
        }
        
    }

    ActualizarDatos();
      
      
}    