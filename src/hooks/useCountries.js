import { ref, watch } from "vue"
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

    const findCountryByCode = async (cca3) => {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/alpha/${cca3}`);

            if (!response.ok) {
                // handle errors
                return null;
            }

            const data = await response.json();
            if (data.length === 0) return null;

            return data[0];
        } catch (error) {
            return null;
        }
    }

    const hydrateBorderCountries = async (country) => {
        const borders = country.borders;
        const promises = borders.map(async (cca3) => {
            let country = await findCountryByCode(cca3);
            if (!country) return null;

            return {
                name: country.name.common,
                cca3: country.cca3
            }
        });

        const names = await Promise.all(promises);

        country.borders = names;

        return country;
    }

    const findByCode = async (cca3) => {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/alpha/${cca3}`);

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
