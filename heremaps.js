
// initializing the here platform
const platform = new H.service.Platform({
    "app_id": "jVwbQacEA9oFX5cM1UQc",
    "app_code": "b4u6JOGTulrIAiwCl787pA"
   });

document.getElementById('btn').addEventListener(
    'click',()=>{
           var location=document.getElementById('loc').value
    
                //initializing the geocoder platform 
                const geocoderService = platform.getGeocodingService();

               //fuction to get userlocation
               const geocoder = query => {
               return new Promise((resolve, reject) => {
               geocoderService.geocode(
            {
                "searchtext": query
            },
            success => {
                //Getting the the location which is given by success function
                resolve(success.Response.View[0].Result[0].Location.DisplayPosition);
            },
            error => {
                reject(error);
            }
        );
    });
}

const search = new H.places.Search(platform.getPlacesService());
//function to find the places
const places = (query, coords, radius) => {
    return new Promise((resolve, reject) => {
        search.request(
            {
                q: query,
                in: coords.Latitude + "," + coords.Longitude + ";r=" + radius
            },
            {},
            success => {
                resolve(success.results.items);
            },
            error => {
                reject(error);
            }
        )
    });
}
var parkingPlaces= new Array(3)
var evChargingPlaces=new Array(3)
var eatDrinkPlaces=new Array(3)
const start = async () => {
    //calling geocoder function
    const userLocation = await geocoder(location);
    
   const parkings = await places("parkings", userLocation, 1000);
   const evChargingStations=await places("Ev charging stations",userLocation,1000);
   const eatDrink= await places("Eat-Drink",userLocation,1000);
    
     
         // getting the closest POI's
              parkings.sort(function(a,b){
             return a.distance - b.distance;
         });
         console.log(parkings);

         evChargingStations.sort(function(a,b){
            return a.distance - b.distance;
        });
        console.log(evChargingStations);

        eatDrink.sort(function(a,b){
            return a.distance - b.distance;
        });
        console.log(eatDrink);
      
        for (let i = 0; i < parkingPlaces.length; i++) {
            parkingPlaces[i]=parkings[i].title
            evChargingPlaces[i]=evChargingStations[i].title
            eatDrinkPlaces[i]=eatDrink[i].title
            
        }
       console.log(parkingPlaces)
       console.log(evChargingPlaces)
       console.log(eatDrinkPlaces)

       document.getElementById('resultsparking').innerHTML=`The Closest Parking stations are `
       document.getElementById('res1parking').innerHTML= `1.`+ parkingPlaces[0] 
       document.getElementById('res2parking').innerHTML= `2.`+ parkingPlaces[1]
       document.getElementById('res3parking').innerHTML= `3.`+ parkingPlaces[2]

       document.getElementById('resultsev').innerHTML=`The Closest EV Charging stations are `
       document.getElementById('res1ev').innerHTML= `1.`+ evChargingPlaces[0] 
       document.getElementById('res2ev').innerHTML= `2.`+ evChargingPlaces[1]
       document.getElementById('res3ev').innerHTML= `3.`+ evChargingPlaces[2]

       document.getElementById('resultseat').innerHTML=`The Closest Eat and Drink places are `
       document.getElementById('res1eat').innerHTML= `1.`+ eatDrinkPlaces[0] 
       document.getElementById('res2eat').innerHTML= `2.`+ eatDrinkPlaces[1]
       document.getElementById('res3eat').innerHTML= `3.`+ eatDrinkPlaces[2]
}

start();

}

)



