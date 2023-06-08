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

    const findCountryNameByCode = async (ccn3) => {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/alpha/${ccn3}`);

            if (!response.ok) {
                // handle errors
                return null;
            }

            const data = await response.json();
            return data[0].name.common;
        } catch (error) {
            return null;
        }
    }

    const hydrateBorderCountries = async (country) => {
        const borders = country.borders;
        const promises = borders.map(async (ccn3) => {
            let name = await findCountryNameByCode(ccn3);

            return {
                name,
                ccn3
            }
        });

        const names = await Promise.all(promises);

        country.borders = names;

        return country;
    }

    const findByCode = async (ccn3) => {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/alpha/${ccn3}`);

            if (!response.ok) {
                // handle errors
                return null;
            }

            const data = await response.json();
            let country = data[0];

            return await hydrateBorderCountries(country);
        } catch (error) {
            console.log(error.response);
        }
    }

    return {
        searchTerm,
        region,
        countries,
        findByCode,
        loading,
        refresh
    }
}