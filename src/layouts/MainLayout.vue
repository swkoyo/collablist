<template>
    <q-layout view="hhh lpr fff">
        <q-header elevated>
            <q-toolbar>
                <q-toolbar-title><q-icon name="fact_check" /></q-toolbar-title>
                <div>
                    <q-btn class="q-mr-sm" flat color="white" label="Login" />
                    <q-btn outline color="white" label="Signup" />
                </div>
            </q-toolbar>
        </q-header>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script setup lang="ts"></script>
