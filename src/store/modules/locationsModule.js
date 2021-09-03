import axios from 'axios';

export const locationsModule = {
  state: () => ({
    fetchedLocations: [],
    isSettingsOpened: false,
    newLocation: '',
    isLoading: false,
  }),
  mutations: {
    setFetchedLocations(state, fetchedLocations) {
      state.fetchedLocations = fetchedLocations;
    },
    setSettingsPopupState(state, type) {
      state.isSettingsOpened = type;
    },
    removeFetchedLocation(state, id) {
      state.fetchedLocations = state.fetchedLocations.filter((location) => parseInt(location.id, 10) !== id);
    },
    updateNewLocation(state, value) {
      state.newLocation = value;
    },
    addNewLocation(state, location) {
      state.fetchedLocations.push(location);
    },
    setLoading(state, status) {
      state.isLoading = status;
    },
  },
  actions: {
    setLocalStorageLocations(store, locationsArr) {
      localStorage.setItem('locations', JSON.stringify(locationsArr));
    },
    async getWeatherDataByIds({ commit, dispatch }) {
      try {
        commit('setLoading', true);
        const localStorageLocations = JSON.parse(localStorage.getItem('locations'));
        const fetchWeatherByIds = await axios({
          method: 'get',
          url: 'https://api.openweathermap.org/data/2.5/group',
          params: {
            id: localStorageLocations.join(),
            appid: process.env.VUE_APP_OPENWEATHER_KEY,
            units: 'metric',
          },
        });
        if (fetchWeatherByIds.data) {
          commit('setFetchedLocations', fetchWeatherByIds.data.list);
        }
      } catch (error) {
        if (error.response.status === 404) {
          alert('Data not found');
          dispatch('getCurrentLocationsWeather');
        }
        console.error(error);
      } finally {
        commit('setLoading', false);
      }
    },
    getCurrentLocationsWeather({ commit, dispatch }) {
      commit('setLoading', true);
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          const weatherInCurrentLocation = await axios({
            method: 'get',
            url: 'https://api.openweathermap.org/data/2.5/weather',
            params: {
              lat: pos.coords.latitude,
              lon: pos.coords.longitude,
              appid: process.env.VUE_APP_OPENWEATHER_KEY,
              units: 'metric',
            },
          });

          if (weatherInCurrentLocation.data) {
            commit('setFetchedLocations', [weatherInCurrentLocation.data]);
            dispatch('setLocalStorageLocations', [weatherInCurrentLocation.data.id]);
          }
        } catch (error) {
          if (error.response.status === 404) {
            alert('Location not found');
          }
          console.error(error);
        } finally {
          commit('setLoading', false);
        }
      }, (error) => {
        commit('setLoading', false);
        console.error(error);
      });
    },
    removeLocation({ dispatch, commit }, id) {
      const localStorageLocations = JSON.parse(localStorage.getItem('locations'));
      const updatedLocalStorageLocations = localStorageLocations.filter((item) => parseInt(item, 10) !== id);
      dispatch('setLocalStorageLocations', updatedLocalStorageLocations);
      commit('removeFetchedLocation', id);
    },
    async addLocation({ state, dispatch, commit }, location) {
      try {
        commit('setLoading', true);
        const weatherInNewLocation = await axios({
          method: 'get',
          url: 'https://api.openweathermap.org/data/2.5/weather',
          params: {
            q: location,
            appid: process.env.VUE_APP_OPENWEATHER_KEY,
            units: 'metric',
          },
        });
        if (weatherInNewLocation.data) {
          if (state.fetchedLocations.find((loc) => loc.id === weatherInNewLocation.data.id)) {
            alert(`"${weatherInNewLocation.data.name}" Already exists`);
            return;
          }
          const localStorageLocations = JSON.parse(localStorage.getItem('locations'));
          localStorageLocations.push(weatherInNewLocation.data.id);
          dispatch('setLocalStorageLocations', localStorageLocations);
          commit('addNewLocation', weatherInNewLocation.data);
        }
      } catch (error) {
        if (error.response.status === 404) {
          alert(`Location "${location}" not found`);
        }
        console.error(error);
      } finally {
        commit('setLoading', false);
        commit('updateNewLocation', '');
      }
    },
    updateLocationsOrder({ commit, dispatch }, locationsArr) {
      const updatedLocalStorageLocations = locationsArr.map((loc) => loc.id);
      dispatch('setLocalStorageLocations', updatedLocalStorageLocations);
      commit('setFetchedLocations', locationsArr);
    },
  },
  namespaced: true,
};
