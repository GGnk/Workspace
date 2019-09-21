let actions = {
    /*async LOAD_DIRECTORY({commit}, payload) {
        commit("LOADER_INFO", "NULL")
        await axios.post('/obmen', {'dir': payload.next})
            .then((info) => {
                commit('LOAD_DIRECTORY', {info, 'prev': payload.prev})
                commit("LOADER_INFO","NULL")
            })
            .catch((err) => {
                commit("LOADER_INFO", 'ERROR')
                console.log(err)
            })
    },*/
}

let mutations = {
    MOUNT_MAP (state, payload) {
        // Иницилизация карты
        state.markers.mapM = DG.map('mapRGD', {
            center: [51.519700, 45.994682],
            zoom: 18
        });
        // Создание группы маркеров
        let groupKey = DG.featureGroup()

        // Добавляем маркера в группу
        state.markers.data.forEach(function (item) {
            DG.marker(item.location).addTo(groupKey).bindPopup(item.name).openPopup();
        })

        //  Отправляем на карту
        groupKey.addTo(state.markers.mapM)

        console.log(state.markers)

        // Рисуем линии и т.д.
        DG.polyline(state.markers.polyline, {color: 'green'}).addTo(state.markers.mapM)

        DG.circle([51.519616, 45.994858], 20, {color: 'green'}).addTo(state.markers.mapM);

        // Движущий маркер
        let marker = DG.marker([51.519582, 45.993898], {
            draggable: true
        }).addTo(state.markers.mapM).bindPopup('Меня можно передвигать! Внизу пишутся координаты.');
        marker.on('drag', function(e) {
            let lat = e.target._latlng.lat.toFixed(6),
                lng = e.target._latlng.lng.toFixed(6)

            state.markers.cursor = lat + ', ' + lng
        })

    },

}

let getters = {
    map_cursor: state => {
        return state.markers.cursor
    },
    markers: state => {
        return state.markers
    }
}

let state = {
    markers: {
        mapM:'',
        cursor: '',
        polyline: [[51.519616, 45.994858],[51.519559, 45.994386],[51.519619, 45.994064],
            [51.519656, 45.993828], [51.519692, 45.993624], [51.519566, 45.993469],
            [51.519392, 45.993351], [51.519345, 45.993131], [51.519485, 45.992707]],
        data: [
            {name: 'Администарция', location: [51.519485, 45.992707]},
            {name: 'Терапия', location: [51.519048, 45.993855]},
            {name: 'Поликлиника', location: [51.520313, 45.992417]},
            {name: 'Хирургический', location: [51.519529, 45.996044]},
            {name: 'Акушерская', location: [51.519195, 45.995132]},
            {name: 'ЦВМР', location: [51.518935, 45.994982]},
            {name: 'Лекционный корпус', location: [51.519616, 45.994858]},
            {name: 'Радиологический', location: [51.520066, 45.994273]},
            {name: 'Скорая', location: [51.520594, 45.993201]},
            {name: 'Аптека', location: [51.520206, 45.993437]},
            {name: 'Стоматология', location: [51.519699, 45.992171]},
        ]

    }
}

export default {
    // namespaced: true,
    state,
    getters,
    actions,
    mutations
}
