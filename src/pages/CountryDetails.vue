<script setup>
import { useRouter, useRoute } from 'vue-router'
import useCountries from '../hooks/useCountries';
import { onMounted, ref, watch } from 'vue';

const { findByCode } = useCountries();
const country = ref({});
const loading = ref(true);
const router = useRouter()
const route = useRoute()

watch(() => JSON.stringify(route.params), async () => {
    // react to param changes
    let country = await findByCode(route.params.cca3);
    setCountryOrRedirect(country)
})

const setCountryOrRedirect = (theCountry) => {
    if (!theCountry) return router.push('/');

    country.value = theCountry;
    loading.value = false;
}

onMounted(async () => {
    let country = await findByCode(route.params.cca3);
    setCountryOrRedirect(country)
});


</script>
<template>
    <main class="container px-4 mx-auto mt-8">
        <RouterLink class="inline-block px-6 py-2 bg-white rounded shadow-md mb-14 dark:bg-darkBlue-regular" to="/">
            Back
        </RouterLink>
        <section v-if="!loading" class="lg:grid lg:grid-cols-2 lg:gap-16">
            <img class="w-full aspect-video" :src="country.flags.png" :alt="country.flags.alt || 'flag image'">
            <div class="mt-10 space-y-10 lg:mt-0">
                <h2 class="text-xl font-bold">
                    {{ country.name.common }}
                </h2>
                <dl class="text-sm">
                    <div class="flex">
                        <dt class="font-semibold">
                            Native name: &nbsp;
                        </dt>
                        <dd>
                            {{ country.name.nativeName[Object.keys(country.languages).at(-1)]?.common }}
                        </dd>
                    </div>
                    <div class="flex">
                        <dt class="font-semibold">
                            Population: &nbsp;
                        </dt>
                        <dd>
                            {{ country.population }}
                        </dd>
                    </div>
                    <div class="flex">
                        <dt class="font-semibold">
                            Region: &nbsp;
                        </dt>
                        <dd>
                            {{ country.region }}
                        </dd>
                    </div>
                    <div class="flex">
                        <dt class="font-semibold">
                            Sub region: &nbsp;
                        </dt>
                        <dd>
                            {{ country.subregion }}
                        </dd>
                    </div>
                    <div class="flex">
                        <dt class="font-semibold">
                            Capital: &nbsp;
                        </dt>
                        <dd>
                            {{ country.capital?.length > 0 ? country.capital[0] : 'none' }}
                        </dd>
                    </div>
                </dl>

                <dl class="text-sm">
                    <div class="flex">
                        <dt class="font-semibold">
                            Top level domain: &nbsp;
                        </dt>
                        <dd>
                            {{ country.tld.join(' ') }}
                        </dd>
                    </div>
                    <div class="flex">
                        <dt class="font-semibold">
                            Currencies: &nbsp;
                        </dt>
                        <dd>
                            {{ Object.keys(country.currencies).map((currectyKey) => {
                                return country.currencies[currectyKey].name
                            }).join(', ') }}
                        </dd>
                    </div>
                    <div class="flex">
                        <dt class="font-semibold">
                            Languages: &nbsp;
                        </dt>
                        <dd>
                            {{ Object.keys(country.languages).map((langKey) => {
                                return country.languages[langKey];
                            }).join(', ') }}
                        </dd>
                    </div>
                </dl>
                <section v-if="country.borders.length !== 0">
                    <h3 class="mb-6 font-bold text-md">
                        Border countries:
                    </h3>
                    <ul class="flex flex-wrap gap-4">
                        <li v-for="borderCountry in country.borders" :key="borderCountry.cca3">
                            <RouterLink 
                                class="inline-block px-6 py-2 bg-white rounded shadow-md dark:bg-darkBlue-regular"
                                :to="{name: 'country-details', params:{cca3: borderCountry.cca3}}">
                                {{ borderCountry.name }}
                            </RouterLink>
                        </li>
                    </ul>
                </section>
            </div>
        </section>
        <section v-else>
            <div class="flex items-center justify-center py-10">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-20 h-20" viewBox="0 0 44 44" stroke="currentColor">
                    <g fill="none" fill-rule="evenodd" stroke-width="2">
                        <circle cx="22" cy="22" r="1">
                            <animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline"
                                keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" />
                            <animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline"
                                keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" />
                        </circle>
                        <circle cx="22" cy="22" r="1">
                            <animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline"
                                keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" />
                            <animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline"
                                keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" />
                        </circle>
                    </g>
                </svg>
            </div>
        </section>
    </main>
</template>
