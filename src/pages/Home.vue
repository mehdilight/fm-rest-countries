<script setup>
import SearchInput from '../components/ui/SearchInput.vue';
import CountryCard from '../modules/Home/CountryCard.vue';

// hooks
import useCountries from '../hooks/useCountries';
import CustomSelect from '../components/ui/CustomSelect.vue';
import { onMounted } from 'vue';

const { countries, region, searchTerm, loading, refresh } = useCountries();

onMounted(() => {
    refresh()
});
</script>
<template>
    <main class="container p-4 mx-auto">
        <header class="space-y-10 lg:space-y-0 lg:flex lg:justify-between lg:items-center">
            <SearchInput v-model="searchTerm" />
            <CustomSelect v-model="region" class="w-[250px]" />
        </header>

        <div class="grid gap-4 mt-4 lg:mt-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-16" v-if="!loading">
            <CountryCard v-for="country in countries" :key="country.name.common" :country="country" />
        </div>
        <div v-else>
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
        </div>
    </main>
</template>
