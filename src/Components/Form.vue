<template>
    <div class="container">
        <form>
            <div class="mb-3">
                <label for="country" class="form-label">Country</label>
                <select @change="countryChanged()" v-model="selectedCountry" ref="country" name="country" id="country" class="form-control form-select">
                    <option value=""></option>
                    <option v-for="country in countryList" v-bind:value="country.code" v-bind:key="country.code">{{ country.name }}</option>
                </select>
            </div>
            <div v-if="isCityVisible" class="mb-3">
                <label for="city" class="form-label">City</label>
                <select name="city" id="city" class="form-control form-select">
                    <option value=""></option>
                    <option v-for="city in cityList" v-bind:key="city">{{ city }}</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="text" class="form-label">Text</label>
                <textarea name="text" class="form-control" id="text" rows="3"></textarea>
            </div>
            <button @click="submit()" type="button" class="btn btn-success">Submit</button>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CountryApi, Country } from '../Models/CountryModels'

export default defineComponent({
    name: 'Form',
    data: () => {
        return {
            countryList: Array<Country>(),
            cityList: Array<string>(),
            selectedCountry: '',
            selectedCity: String,
            isCityVisible: false
        }
    },
    created () {
        this.loadCountries()
    },
    methods: {
        async loadCountries () {
            const response = await fetch('https://countriesnow.space/api/v0.1/countries')
            const json = await response.json()
            json.data.forEach((countryApi: CountryApi) => {
                const country = new Country(countryApi.iso2, countryApi.country, countryApi.cities)
                this.countryList.push(country)
            })
        },
        countryChanged () {
            const country = this.countryList.filter((country : Country) => {
                if (country.code === this.selectedCountry) {
                    return true
                }
            })
            if (country.length > 0) {
                this.cityList = country[0].cities
                this.isCityVisible = true
            } else {
                this.isCityVisible = false
            }
        },
        async submit () {
            const response = await fetch('http://localhost:3000/api/form', {
                mode: 'cors'
            })
            console.log(response)
        }
    }
})
</script>

<style scoped>

</style>
