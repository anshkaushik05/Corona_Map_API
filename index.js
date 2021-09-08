// console.log('hello there');
window.Data;
window.countryData;
fetch('https://api.covid19api.com/summary')
.then((res)=>res.json())
.then((data)=>{
                  Data=data;
                  fetch('country_alpha3_Code.json').then((res)=>{
                      return res.json()
                  }).then((Cdata)=>{
                     countryData =Cdata ;
                  })
  }
  );



// const data = [
//   { 'code': 'USA', 'hdi': 0.811 },
//   { 'code': 'IND', 'hdi': 0.811 }
//   ];


map.on('load', () => {
  map.addSource('countries', {
    type: 'vector',
    url: 'mapbox://mapbox.country-boundaries-v1'
  });
  
  const matchExpression = ['match', ['get', 'iso_3166_1_alpha_3']];
  //  console.log(Data.Countries);
  for (const row of Data.Countries) {
  // // Convert the range of data values to a suitable color
  const number = row['NewConfirmed'];
  // console.log(row['TotalConfirmed']);
  var red =0;
  var blue =0;
  var yellow=0;
  if(number>10000)
    red=80;
  else if(number>100&&number<10000){
    red=170;
    yellow=100;
  }
  else if(number<100&&number>0){
    red=200;
    blue=50;
    yellow=150;
  }
  else if(number==0){
    blue =255;
  }
  // else
  //   // red=10;
  //   blue=10;
    // console.log( row.Country+":  "+row.NewConfirmed);
    // console.log(red);
  var color = `rgb(${red}, ${yellow}, ${blue})`;
  // console.log(color);
  
  for(let y of countryData){
    if(y.name===row.Country){

      // console.log(y.name);
      // console.log(row.Country);
      
      // color = `rgb(250, 0, 0)`;
      // console.log(y["alpha-3"]);
      matchExpression.push(y["alpha-3"], color);
    }
      
    }

  }


     
    matchExpression.push('rgba(0, 0, 0, 0)');
     
    map.addLayer(
    {
    'id': 'countries-join',
    'type': 'fill',
    'source': 'countries',
    'source-layer': 'country_boundaries',
    'paint': {
    'fill-color': matchExpression
    }
    },
    'admin-1-boundary-bg'
    );
    });