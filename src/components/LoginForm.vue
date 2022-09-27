<template>
    <q-page class="column items-center justify-center">
        <q-card class="create-account-card">
            <q-form @submit="submitForm">
                <q-card-section>
                    <div class="text-h6">Login</div>
                </q-card-section>
                <q-separator inset />
                <q-card-section class="column q-gutter-md">
                    <q-input
                        v-model="formState.email"
                        label="Email *"
                        :rules="[(val) => validateEmail(val) || INVALID_EMAIL]"
                    ></q-input>
                    <q-input
                        label="Password *"
                        v-model="formState.password"
                        type="password"
                        :rules="[
                            (val) => validatePassword(val) || INVALID_PASSWORD
                        ]"
                    ></q-input>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn flat>Cancel</q-btn>
                    <q-btn color="primary" type="submit">Create Account</q-btn>
                </q-card-actions>
            </q-form>
        </q-card>
    </q-page>
</template>

<style lang="scss">
.create-account-card {
    width: 512px;
}
</style>

<script lang="ts" setup>
import { reactive } from 'vue';
import {
    validateEmail,
    validatePassword,
    INVALID_PASSWORD,
    INVALID_EMAIL
} from '../helpers/validation';

type LoginFormState = {
    email: string;
    password: string;
};

const formState = reactive<LoginFormState>({
    email: '',
    password: ''
});

function submitForm(): void {
    console.log('formState', formState);
}
</script>
