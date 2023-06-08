<script setup>
import { useColorMode, useDark, useToggle } from '@vueuse/core';

let colorMode = useColorMode();
const isDark = useDark();
const toggle = () => {
    colorMode.value = isDark.value ? 'light': 'dark';
}
</script>
<template>
    <header class="sticky top-0 z-50 px-6 py-8 bg-white shadow-md dark:bg-darkBlue-regular">
        <div class="container flex items-center justify-between mx-auto lg:px-4">
            <a href="/" class="font-bold">
                Where in the world?
            </a>

            <button @click="toggle" class="flex items-center space-x-2 text-sm font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
                <span>
                    Dark Mode
                </span>
            </button>
        </div>
    </header>
</template>
