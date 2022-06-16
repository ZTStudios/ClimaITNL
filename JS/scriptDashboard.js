window.onload = () => {
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
            .then((data) => {
                // Work with JSON data here
                console.log(data.sensors)
                JSONApi = data;
            })
            .catch((err) => {
                // Do something for an error here
            })
    }

    

}