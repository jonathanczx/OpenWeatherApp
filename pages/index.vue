<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-6">
        <h2>Singapore GMT +8:00</h2>
        <div class="row">
          <div class="col-12 d-flex flex-column">
            <button class="btn btn-success my-2" @click="getSingaporeWeather()">Get Weather</button>
          </div>
          <div v-if="singapore.weather" class="col-12 d-flex flex-column align-items-center">
            <span><img :src="`http://openweathermap.org/img/wn/${singapore.weather[0].icon}@2x.png`" /></span>
            <span class="text-capitalize">{{ singapore.weather[0].description }}</span>
            <span>High: {{ singapore.main.temp_max }}</span>
            <span>Low: {{ singapore.main.temp_min }}</span>
            <span>Feels Like: {{ singapore.main.feels_like }}</span>
          </div>

          <h3 v-if="dailySingapore.daily" class="mt-3">Daily Forecast</h3>
          <div v-if="dailySingapore.daily" class="col-12 d-flex flex-row overflow-auto">
            <div v-for="(day, index) in dailySingapore.daily" class="d-flex flex-column align-items-center">
              <img :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`" />
              <span>{{ index }}</span>
              <div>{{ day.temp.min }} - {{ day.temp.max }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <h2>Brisbane GMT +10:00</h2>
        <div class="row">
          <div class="col-12 d-flex flex-column">
            <button class="btn btn-success my-2" @click="getBrisbaneWeather()">Get Weather</button>
          </div>
          <div v-if="brisbane.weather" class="col-12 d-flex flex-column align-items-center">
            <span><img :src="`http://openweathermap.org/img/wn/${brisbane.weather[0].icon}@2x.png`" /></span>
            <span class="text-capitalize">{{ brisbane.weather[0].description }}</span>
            <span>High: {{ brisbane.main.temp_max }}</span>
            <span>Low: {{ brisbane.main.temp_min }}</span>
            <span>Feels Like: {{ brisbane.main.feels_like }}</span>
          </div>

          <h3 v-if="dailyBrisbane.daily" class="mt-3">Daily Forecast</h3>
          <div v-if="dailyBrisbane.daily" class="col-12 d-flex flex-row overflow-auto">
            <div v-for="(day, index) in dailyBrisbane.daily" class="d-flex flex-column align-items-center">
              <img :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`" />
              <span>{{ index }}</span>
              <div>{{ day.temp.min }} - {{ day.temp.max }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <hr class="mt-5">

    <div class="row mt-5">
      <div class="col-12 d-flex flex-column">
        <label for="location-input">Search Locations:</label>
        <input class="form-control" v-model="location"/>
        <button class="btn btn-success my-2" @click="search">Search</button>
      </div>
    </div>

    <div v-if="locations" class="row mt-5">
      <div class="col-12">
        <h2>Results</h2>
      </div>
      <div clsas="col-12 d-flex flex-column">
        <div class="btn btn-info w-100 mb-3" v-for="place in locations" @click="selectedPlace = place">
          <span class="mx-2"  v-if="place.name">{{ place.name }}</span>
          <span class="mx-2" v-if="place.state">{{ place.state }}</span>
          <span class="mx-2" v-if="place.country">{{ place.country }}</span>
        </div>
      </div>
      <div v-if="selectedPlace" class="col-12 d-flex flex-column">
        <span>Country: {{ selectedPlace.country }}</span>
        <span>Lat: {{ selectedPlace.lat }}</span>
        <span>Lon: {{ selectedPlace.lon }}</span>
        <span>Name: {{ selectedPlace.name }}</span>
        <span>State: {{ selectedPlace.state }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      location: '',
      locations: [],
      brisbane: {},
      dailyBrisbane: {},
      singapore: {},
      dailySingapore: {},
      selectedPlace: null
    }
  },
  methods: {
    search: async function (){
      if(this.location) {
        const { data } = await useFetch(`/api/search?query=${this.location}`);
        this.locations = data.value;
      }
    },
    getWeather: async function (lat, lon) {
      return await useFetch(`/api/weather?lat=${lat}&lon=${lon}`);
    },
    getDaily: async function (lat, lon) {
      return await useFetch(`/api/daily?lat=${lat}&lon=${lon}`);
    },
    getSingaporeWeather: function () {
      this.getWeather(1.2904753, 103.8520359)
        .then(res => {
          this.singapore = res.data.value;
        });
      this.getDaily(1.2904753, 103.8520359)
        .then(res => {
          this.dailySingapore = res.data.value;
        })
    },
    getBrisbaneWeather: function () {
      this.getWeather(-27.470125, 153.021072)
        .then(res => {
          this.brisbane = res.data.value;
        });
      this.getDaily(-27.470125, 153.021072)
        .then(res => {
          this.dailyBrisbane = res.data.value;
        })
    },
  }
}


</script>

