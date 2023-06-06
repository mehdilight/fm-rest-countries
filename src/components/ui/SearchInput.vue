<script setup>
import { computed } from '@vue/reactivity';

const emits = defineEmits([
    'update:modelValue'
]);
const props = defineProps({
    modelValue: {
        type: String,
        required: true
    }
});

const value = computed({
    set(value) {
        emits('update:modelValue', value);
    },
    get() {
        return props.modelValue;
    }
});
</script>
<template>
    <div class="relative z-20 mt-4">
        <div class="absolute top-0 bottom-0 left-0 flex items-center px-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
        </div>
        <input v-model="value"
            class="w-full px-4 py-3 pl-12 text-sm bg-white rounded shadow focus:ring-2 focus:ring-blue-500/80 focus:ring-offset-2 focus:outline-none dark:bg-darkBlue-regular"
            type="text" placeholder="Search for a country...">
    </div>
</template>
