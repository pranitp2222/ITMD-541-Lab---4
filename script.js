

const reg = document.getElementById("region");
const curCon = document.getElementById("currentcondition");
const dHr = document.getElementById("dayhour");
const prec = document.getElementById("Precip");
const humi = document.getElementById("humidity");
const wind = document.getElementById("wind");
const temp = document.getElementById("temp");
const mainImg = document.getElementById("mainImg");
const cel = document.getElementById("cel");
const fer = document.getElementById("fer");
const tempunit  = document.getElementById("tempunit");
const tempunit1  = document.getElementById("tempunit1");
const miles = document.getElementById("Miles");
const km = document.getElementById("KM");
const measureUnit = document.getElementById("mesureunit");

const days = ['day0','day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7']
const condition = ['condition0','condition1','condition2','condition3','condition4','condition5','condition6','condition7']
const maxtemp = ['maxtemp0','maxtemp1','maxtemp2','maxtemp3','maxtemp4','maxtemp5','maxtemp6','maxtemp7']
const mintemp = ['mintemp0','mintemp1','mintemp2','mintemp3','mintemp4','mintemp5','mintemp6','mintemp7']
const img = ['img0', 'img1', 'img2', 'img3', 'img4', 'img5', 'img6', 'img7']
const maxunit = ['maxunit0', 'maxunit1', 'maxunit2', 'maxunit3', 'maxunit4', 'maxunit5', 'maxunit6', 'maxunit7']
const minunit = ['minunit0', 'minunit1', 'minunit2', 'minunit3', 'minunit4', 'minunit5', 'minunit6', 'minunit7']

//getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        console.log(success)
        const {latitude, longitude} = success.coords;
        console.log(success.coords.latitude)
        console.log(success.coords.longitude)
        fetch(`https://weatherdbi.herokuapp.com/data/weather/${latitude},${longitude}`)
        .then((response) => response.json())
        .then((data) => {
         console.log(data)

        if(data.code === 0){
            console.log(data.message);
            alert("Error : 200 " + data.message + "Location doesn't exist, Kindly check spelling of location, latitude and latitude or enter correct location ");
            return;
        }
        if(data.code === 1){
            console.log(data.message);
            alert("Error : 400 " + data.message + " Do not put anything other than A-Z, a-z, 0-9, hyphen, comma, plus, space, &, full stop in the search");
            return;
        }
        if(data.code === 2){
            console.log(data.message);
            alert("Error : 500 " + data.message);
            return;
        }
        document.getElementById('search').value = "";
        reg.innerHTML = data.region
        curCon.innerHTML = data.currentConditions.comment
        dHr.innerHTML = data.currentConditions.dayhour
        prec.innerHTML = data.currentConditions.precip
        humi.innerHTML = data.currentConditions.humidity
        wind.innerHTML = data.currentConditions.wind.mile
        temp.innerHTML = data.currentConditions.temp.f
        mainImg.src = data.currentConditions.iconURL

        for (let i = 1; i < days.length; i++) {
            document.getElementById(days[i]).innerHTML = data.next_days[i].day;
        }

        for (let i = 1; i < condition.length; i++) {
            document.getElementById(condition[i]).innerHTML = data.next_days[i].comment;
        }

        for (let i = 1; i < maxtemp.length; i++) {
            document.getElementById(maxtemp[i]).innerHTML = data.next_days[i].max_temp.f;
        }

        for (let i = 1; i < mintemp.length; i++) {
            document.getElementById(mintemp[i]).innerHTML = data.next_days[i].min_temp.f;
        }

        for (let i = 1; i < img.length; i++) {
            document.getElementById(img[i]).src = data.next_days[i].iconURL;
        }

        cel.addEventListener("click", function () {
        

            temp.innerHTML = data.currentConditions.temp.c;
            tempunit.innerHTML = ' C';
            
            for (let i = 1; i < maxtemp.length; i++) {
                document.getElementById(maxtemp[i]).innerHTML = data.next_days[i].max_temp.c;
                document.getElementById(maxunit[i]).innerHTML = " C"
                
            }
        
            for (let i = 1; i < mintemp.length; i++) {
                document.getElementById(mintemp[i]).innerHTML = data.next_days[i].min_temp.c;
                document.getElementById(minunit[i]).innerHTML = " C"
            }
            
            
        
         })
    
         fer.addEventListener("click", function () {
            
    
            temp.innerHTML = data.currentConditions.temp.f;
            tempunit.innerHTML = ' F';
            
            for (let i = 1; i < maxtemp.length; i++) {
                document.getElementById(maxtemp[i]).innerHTML = data.next_days[i].max_temp.f;
                document.getElementById(maxunit[i]).innerHTML = " F"
                
            }
        
            for (let i = 1; i < mintemp.length; i++) {
                document.getElementById(mintemp[i]).innerHTML = data.next_days[i].min_temp.f;
                document.getElementById(minunit[i]).innerHTML = " F"
            }
            
            miles.addEventListener("click", function () {
                wind.innerHTML = data.currentConditions.wind.mile
                measureUnit.innerHTML = "Mile/Hr "
        
             })
        
             km.addEventListener("click", function () {
                wind.innerHTML = data.currentConditions.wind.km
                measureUnit.innerHTML = "KM/Hr "
        
             })
        
         })

      })

    .catch(error => {
        alert('There was an error!, GeoLocation API not working', error);
    })
       

    })
    
}

const lcbtn = document.getElementById('locbtn');

lcbtn.addEventListener("click", function () {
    getWeatherData();
    
 })


const searchbtn = document.getElementById('searbtn');
searchbtn.addEventListener("click", function () {
    let searchVal = document.getElementById('search').value;
    fetch(`https://weatherdbi.herokuapp.com/data/weather/${searchVal}`)
    .then((response) => response.json())
    .then((data) => {
     console.log(data)
    //  let ans = data;
    //   console.log(data.region)
    //   console.log(data.currentConditions.comment)
    //   console.log(data.currentConditions.dayhour)
    //   console.log(data.currentConditions.temp.c)
    //   console.log(data.next_days[0].max_temp.c)
    if(data.code === 0){
        console.log(data.message);
        alert("Error : 200 " + data.message + "Location doesn't exist, Kindly check spelling of location, latitude and latitude or enter correct location ");
        return;
    }
    if(data.code === 1){
        console.log(data.message);
        alert("Error : 400 " + data.message + " Do not put anything other than A-Z, a-z, 0-9, hyphen, comma, plus, space, &, full stop in the search");
        return;
    }
    if(data.code === 2){
        console.log(data.message);
        alert("Error : 500 " + data.message);
        return;
    }

    reg.innerHTML = data.region
    curCon.innerHTML = data.currentConditions.comment
    dHr.innerHTML = data.currentConditions.dayhour
    prec.innerHTML = data.currentConditions.precip
    humi.innerHTML = data.currentConditions.humidity
    wind.innerHTML = data.currentConditions.wind.mile
    temp.innerHTML = data.currentConditions.temp.f
    mainImg.src = data.currentConditions.iconURL

    for (let i = 1; i < days.length; i++) {
        document.getElementById(days[i]).innerHTML = data.next_days[i].day;
    }

    for (let i = 1; i < condition.length; i++) {
        document.getElementById(condition[i]).innerHTML = data.next_days[i].comment;
    }

    for (let i = 1; i < maxtemp.length; i++) {
        document.getElementById(maxtemp[i]).innerHTML = data.next_days[i].max_temp.f;
    }

    for (let i = 1; i < mintemp.length; i++) {
        document.getElementById(mintemp[i]).innerHTML = data.next_days[i].min_temp.f;
    }

    for (let i = 1; i < img.length; i++) {
        document.getElementById(img[i]).src = data.next_days[i].iconURL;
    }

    cel.addEventListener("click", function () {
        

        temp.innerHTML = data.currentConditions.temp.c;
        tempunit.innerHTML = ' C';
        
        for (let i = 1; i < maxtemp.length; i++) {
            document.getElementById(maxtemp[i]).innerHTML = data.next_days[i].max_temp.c;
            document.getElementById(maxunit[i]).innerHTML = " C"
            
        }
    
        for (let i = 1; i < mintemp.length; i++) {
            document.getElementById(mintemp[i]).innerHTML = data.next_days[i].min_temp.c;
            document.getElementById(minunit[i]).innerHTML = " C"
        }
        
        
    
     })

     fer.addEventListener("click", function () {
        

        temp.innerHTML = data.currentConditions.temp.f;
        tempunit.innerHTML = ' F';
        
        for (let i = 1; i < maxtemp.length; i++) {
            document.getElementById(maxtemp[i]).innerHTML = data.next_days[i].max_temp.f;
            document.getElementById(maxunit[i]).innerHTML = " F"
            
        }
    
        for (let i = 1; i < mintemp.length; i++) {
            document.getElementById(mintemp[i]).innerHTML = data.next_days[i].min_temp.f;
            document.getElementById(minunit[i]).innerHTML = " F"
        }
        
        
    
     })

     miles.addEventListener("click", function () {
        wind.innerHTML = data.currentConditions.wind.mile
        measureUnit.innerHTML = "Miles/Hr "

     })

     km.addEventListener("click", function () {
        wind.innerHTML = data.currentConditions.wind.km
        measureUnit.innerHTML = "KM/Hr "

     })

  })
  .catch(error => {
    
    alert('There was an error!. Enter The Location, Search Box is Empty', error);
})
   

})