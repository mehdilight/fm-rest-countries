<script setup>
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue';
import { computed } from '@vue/reactivity';
import { ref } from 'vue';

const emits = defineEmits([
    'update:modelValue'
])
const props = defineProps({
    modelValue: {
        type: Object,
        default: null
    }
});

const regions = ref([
    { name: 'Africa' },
    { name: 'Americas' },
    { name: 'Asia' },
    { name: 'Europe' },
    { name: 'Oceania' },
]);

const selectedRegion = computed({
    set(value) {
        emits('update:modelValue', value);
    },
    get() {
        return props.modelValue;
    }
})

</script>

<template>
    <div>
        <Listbox v-model="selectedRegion">
            <div class="relative mt-1">
                <ListboxButton
                    class="relative w-full py-2 pl-4 pr-10 text-sm text-left bg-white rounded shadow cursor-pointer dark:bg-darkBlue-regular focus:ring-2 focus:ring-blue-500/80 focus:ring-offset-2 focus:outline-none">
                    <span  v-if="!selectedRegion" class="block truncate">
                        Select a region
                    </span>
                    <span v-else class="block truncate">
                        {{ selectedRegion.name }}
                    </span>
                    <span class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-3 h-3">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </span>
                </ListboxButton>

                <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                    leave-to-class="opacity-0">
                    <ListboxOptions
                        class="absolute w-full py-4 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        <ListboxOption v-slot="{ active, selected }" v-for="region in regions" :key="region.name"
                            :value="region" as="template">
                            <li :class="[
                                active ? 'bg-blue-100 text-blue-900 cursor-pointer' : 'text-gray-900',
                                'relative cursor-default select-none py-2 pl-10 pr-4',
                            ]">
                                <span :class="[
                                    selected ? 'font-medium' : 'font-normal',
                                    'block truncate',
                                ]">{{ region.name }}</span>
                            </li>
                        </ListboxOption>
                    </ListboxOptions>
                </transition>
            </div>
        </Listbox>
    </div>
</template>
