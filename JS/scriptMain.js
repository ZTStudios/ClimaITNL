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
                    ModoOscuroON()
                }
            })    

    }

    function ModoOscuroON() {
        Medium = document.getElementsByClassName('Dashboard-Container-Medium');
        for (var i = 0; i < Medium.length; i++) {
            Medium[i].style.backgroundColor="#474759";
        }
      
        document.querySelector('.Dashboard-Container-Big').style.backgroundColor = '#474759'

        Small = document.getElementsByClassName('Dashboard-Container-Small');
        for (var i = 0; i < Medium.length; i++) {
            Small[i].style.backgroundColor="#474759";
        }

        Rain = document.getElementsByClassName('Dashboard-Container-Rain');
        for (var i = 0; i < Rain.length; i++) {
            Rain[i].style.backgroundColor="#474759";
        }

        Titulo = document.getElementsByClassName('Titulo-Dashboard');
        for (var i = 0; i < Titulo.length; i++) {
            Titulo[i].style.color="white";
        }

        DataApi = document.getElementsByClassName('Data-Content-Dashboard');
        for (var i = 0; i < DataApi.length; i++) {
            DataApi[i].style.color="white";
        }


    }
    CargarWallpaper()
    
}   
    
    
    
