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

}