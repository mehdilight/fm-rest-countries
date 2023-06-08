<script setup>
const props = defineProps({
    country: {
        type: Object,
        required: true
    }
});
</script>
<template>
    <RouterLink :to="{name: 'country-details', params: {'cca3': country.cca3}}">
        <article class="overflow-hidden bg-white rounded-md shadow-lg dark:bg-darkBlue-regular">
        <img class="w-full aspect-video" :src="country.flags.png" :alt="country.flags.alt">
        <div class="p-8">
            <h2 class="mb-5 text-lg font-bold">
                {{ country.name.common }}
            </h2>
            <dl class="text-sm">
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
                        Capital: &nbsp;
                    </dt>
                    <dd>
                        {{ country.capital?.length > 0 ? country.capital[0] : 'none' }}
                    </dd>
                </div>
            </dl>
        </div>
    </article>
    </RouterLink>
</template>