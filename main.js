// const data = new Promise((resolve, reject) => {
//     fetch('./vn.json')
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.log(error));
//     })
//     console.log(data[6]);
var admin_name = [];
    var lat = [];
    var lng = [];
$.getJSON('vn.json', function(data){
    for (let i=0;i < data.length; i++ ){
        admin_name.push(data[i].admin_name);
        lat.push(data[i].lat);
        lng.push(data[i].lng);
    }
    // console.log(admin_name, lat, lng);
})
var toado;
// $.ajax({
//     url: './vn.json',
//     dataType: 'json',
//     type: 'get',
//     cache: false,
//     success: function(data){
//         $(data.articles).each(function(index,value){
//             console.log("value");
//         });
//     }
// });

mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhZGFya2RvdyIsImEiOiJja3h3cWM1djI0aHZ3MnBxd2hnZ29oOXk4In0.wP_8QVce7otYO34cXSch9g';
const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/satellite-streets-v12',
    zoom: 4.5,
    center: [105.8, 15.9],
    projection: 'mercator',
});

map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.ScaleControl());

map.on('load', () => {
    // Set the default atmosphere style
    // map.setFog({});
    map.fitBounds([
        [102.14, 8.56], // southwestern corner of the bounds
        [109.47, 23.39] // northeastern corner of the bounds
    ]);

    map.addSource('vnm1', {
        type: 'vector',
        // promoteId: 'ID_1',
        url: 'mapbox://shadarkdow.0che3usa',
    })
    map.addSource('giaothong', {
        type: 'vector',
        // promoteId: 'ID_1',
        url: 'mapbox://shadarkdow.aykcue9n',
    })
  

    map.addLayer({
        id: 'vnm1-polygon',
        type: 'fill',
        source: 'vnm1',
        "source-layer": "VNM_adm1-4nujj6",

        'layout': {
            // Make the layer visible by default.
            'visibility': 'visible'
        },
        paint: {
            'fill-color': 'green',
            'fill-opacity': 0.7
        }


    });

    map.addLayer({

        id: 'vnm1-line',
        type: 'line',
        source: 'vnm1',
        "source-layer": "VNM_adm1-4nujj6",
        'layout': {
            // Make the layer visible by default.
            'visibility': 'visible'
        },
        paint: {
            'line-color': 'black',
            'line-opacity': 1,
            'line-width': 1
        }
    });

    map.addLayer({
        id: 'giaothong_line',
        type: 'line',
        source: 'giaothong',
        "source-layer": "giaothong-49u31v",
        'layout': {
            // Make the layer visible by default.
            'visibility': 'visible',
        },
        paint: {
            'line-color': 'red',
            'line-opacity': 1,
            'line-width': 1
        }
    });

    const popup = new mapboxgl.Popup();
    map.on('click', (ev1) => {
        
        const [feature] = map.queryRenderedFeatures(ev1.point, 
            {
            layers: ['vnm1-polygon']//['vnm1-polygon']
        });
        // const arr_feature = feature._vectorTileFeature._values;
        // tao_mang(stt,64);
        // console.log(stt)
        popup.setLngLat(ev1.lngLat).setHTML(`Tỉnh: ${feature.properties.NAME_1}`).addTo(map)
        // var n = 8; 
        // var j;
        // if (marker==0){
        //     ds_tinh.push(arr_feature[8]);
        //     while (n < arr_feature.length) {
        //         for (j = 1; j < stt.length; j++) {
        //             if (stt[j]==arr_feature[n]){
        //                 ds_tinh.push(arr_feature[n+1]);
        //             }
        //           }
        //         n++;
        //       }                       
            
        //     };
        // marker=1;
        
            // console.log(ds_tinh);
        // if (feature) {
        //     alert (`Tỉnh: ${feature.properties.NAME_1}`)
        // }


    });

    map.on('mousemove','vnm1-polygon',(ev) => {
        
        const [feature] = map.queryRenderedFeatures(ev.point, 
            {
            layers: ['vnm1-polygon']//['vnm1-polygon']
        });
        const arr_feature = feature._vectorTileFeature._values;
       
        // console.log(ev.point)
        // popup.setLngLat(ev.lngLat).setHTML(`Tỉnh: ${feature.properties.NAME_1}`).addTo(map)
        var n = 8; 
        var j;
        if (marker==0){
            ds_tinh.push(arr_feature[8]);
            while (n < arr_feature.length) {
                for (j = 1; j < stt.length; j++) {
                    if (stt[j]==arr_feature[n]){
                        ds_tinh.push(arr_feature[n+1]);
                    }
                  }
                n++;
              }                       
              marker=marker+1;
            };
        // marker=1;
        
            // console.log(ds_tinh);
        // if (feature) {
        //     alert (`Tỉnh: ${feature.properties.NAME_1}`)
        // }
    });


});

var marker = 0;
const ds_tinh =[];
const stt = [];
function tao_mang (stt, so_phan_tu){
       for (let i = 0; i < so_phan_tu; i++) {
        stt.push(i);
      }
}
tao_mang(stt,64);


function toggleLayer(even) {
    var lyrname = even.target.value;
    var lyrlist = [];
    lyrlist.push(map.getLayer('vnm1-polygon').id, map.getLayer('giaothong_line').id);
    lyrlist.forEach(function (element) {
        if (lyrname == element) {
            const visibility = map.getLayoutProperty(
                element,
                'visibility'
            );
            if (visibility == 'visible') {
                map.setLayoutProperty(lyrname, 'visibility', 'none');
            } else {
                map.setLayoutProperty(lyrname, 'visibility', 'visible');
            }
        }
    });
}

// create searchbox
const rlbox = document.querySelector(".resultbox");
const input_box = document.getElementById("input-box");
input_box.onkeyup = function() {
    let result = [];
    let input = input_box.value;
    if (input.length) {
        result = ds_tinh.filter((keyword) => {
          return keyword.toLowerCase().includes(input.toLowerCase());
        });
        // console.log(result);
    };
    display(result);
};
function display(result){
    const content = result.map((list) => {
        return "<li onclick = selectInput(this)>"+ list + "</li>";
    });
    rlbox.innerHTML = "<ul>"+ content.join('') + "<ul>";
}

function selectInput(list) {
    input_box.value = list.innerHTML;
    for (let i = 0; i < admin_name.length; i++){
        if (input_box.value == admin_name[i]) {
            toado = [lng[i],lat[i]];
        };
    }
    console.log(toado);
    map.flyTo({center: toado, zoom: 9});
    // rlbox.innerHTML = '';
}



function resetview() {
    map.flyTo({center: [105.8, 15.9], zoom: 4.7});
}
// let hoveredPolygonId = null
// map.on('mousemove', 'vnm1-polygon', (e) => {
//     if (e.features.length > 0) {
//         if (hoveredPolygonId !== null) {
//             map.setFeatureState(
//                 {source: 'vmn1', id: hoveredPolygonId },
//                 { hover: false }
//             );
//         }
//         hoveredPolygonId = e.features[0].id;
//         map.setFeatureState(
//             { source: 'vmn1', id: hoveredPolygonId },
//             { hover: true }
//         );
//     }
// });

// map.on('mouseleave', 'vnm1-polygon', () => {
//     if (hoveredPolygonId !== null) {
//         map.setFeatureState(
//             {source: 'vmn1', id: hoveredPolygonId },
//             { hover: false }
//         );
//     }
//     hoveredPolygonId = null;
// });


map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })
);



// tileset iD shadarkdow.0che3usa shadarkdow.aykcue9n

