import { computed, onMounted, ref, watch } from "vue"
import { debounce } from "../utils";


export default function useCountries() {
    const searchTerm = ref('');
    const region = ref(null);
    const loading = ref(false);
    const countries = ref([]);

    const refresh = async () => {
        let result = [];
        loading.value = true;

        if (searchTerm.value) {
            result = await fetchCountriesBySearchTerm(searchTerm.value);
        }

        if (!searchTerm.value) {
            result = await fetchAllCountries();
        }

        if (region.value) {
            result = filterByRegion(result);
        }

        countries.value = result;
        loading.value = false;
    }

    watch(() => JSON.stringify(
        [
            searchTerm.value,
            region.value
        ]),
        debounce(async () => {
            await refresh();
        }, .5)
    );

    const filterByRegion = (countries) => {
        if (!region.value) {
            return;
        }

        let filteredCities = countries.filter((country) => country.region === region.value.name);

        return filteredCities;
    }

    const fetchCountriesBySearchTerm = async (searchTerm) => {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${searchTerm}`);
            if (!response.ok) {
                // handle errors
                return [];
            }

            const data = await response.json();

            return data;
        } catch (error) {
            console.log(error.response);
        }
    }

    const fetchAllCountries = async () => {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all');

            if (!response.ok) {
                // handle errors
                return [];
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error.response);
        }
    }

    onMounted(async () => {
        await refresh();
    })

    return {
        searchTerm,
        region,
        countries,
        loading
    }
}