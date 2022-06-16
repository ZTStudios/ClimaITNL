window.onload = () => {
    
    console.log('Archivo Cargado')
    
    function CargarWallpaper () {
        
        let tiempoActual = new Date();
        console.log(tiempoActual.getHours())
        
        if ( tiempoActual.getHours() >= 8 && tiempoActual.getHours() < 20 ) {
            
            
            document.body.style.backgroundImage = "url('../Resource/WallapaperState/LluviaWall.png')"
            
        }
    }

    CargarWallpaper();

    
    function ApiLol () {
        
        fetch('https://api.openweathermap.org/data/2.5/weather?lat=65.41506&lon=-52.89822&units=metric&lang=sp&appid=75388a5617c4890016f8215a20d3ac3f')
        .then(response => {
            return response.json();
        })
        .then(response =>  ClimaState = response.weather[0].main);
    }


    ApiLol()

    
    
}   
    
    
    
