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
                    }
                    if (ObjJson.weather[0].main == 'Clouds') {
                        document.body.style.backgroundImage = "url('../Resource/WallapaperState/NubladoWall.png')"
                    }
                    if (ObjJson.weather[0].main == 'Rain'){
                        document.body.style.backgroundImage = "url('../Resource/WallapaperState/LluviaWall.png')"
                    }
                    if (ObjJson.weather[0].main == 'Thunderstorm'){
                        document.body.style.backgroundImage = "url('../Resource/WallapaperState/TormentaWall.png')"
                    }
                    if (ObjJson.weather[0].main == 'Snow'){
                        document.body.style.backgroundImage = "url('../Resource/WallapaperState/NevadoWall.png')"
                    } 
                }
                else{
                    document.body.style.backgroundImage = "url('../Resource/WallapaperState/NocheWall.png')"
                    let Card = document.body.querySelector('.Dashboard-Container-Medium');
                }
            })    

    }
    CargarWallpaper()

    
    
}   
    
    
    
