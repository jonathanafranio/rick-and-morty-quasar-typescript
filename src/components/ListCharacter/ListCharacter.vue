<template>
    <div class="character-list">
        <h1 class="page-section__title">{{ title }}</h1>

        <p class="character-list__not-found" v-if="error">
            Nenhum resultado encontrado. :(
        </p>

        <div class="character-list__page">
            <CardCharacter
                v-for="character in characters"
                v-bind:key="character.id"
                :id_character="character.id"
                :title="character.name"
                :species="character.species"
                :thumb="character.image"
            />
        </div>

        <Pagination
            v-if="!loading && pagination.last > 1"
            :next="pagination.next"
            :prev="pagination.prev"
            :active="page"
            :last="pagination.last"
            :prefix_url="page_url"
            :search="search"
        />

        <Preload v-if="loading" />
    </div>
</template>

<script lang="ts">
import { PaginationType } from 'components/models';
import { defineComponent, onMounted, ref } from 'vue';
import Preload from 'components/Preload.vue';
import CardCharacter from './CardCharacter.vue';
import Pagination from '../Pagination.vue';

export default defineComponent({
    name: 'ListCharacter',
    components: {
        CardCharacter,
        Pagination,
        Preload,
    },
    props: {
        title: String,
        filtro_status: {
            type: String,
            default() {
                return '';
            },
        },
        filtro_gender: {
            type: String,
            default() {
                return '';
            },
        },
        filtro_name: {
            type: String,
            default() {
                return '';
            },
        },
        page: {
            type: Number,
            default() {
                return 1;
            },
        },
        search: {
            type: String,
            default() {
                return '';
            },
        },
        page_url: String,
    },
    setup(props) {
        console.log({ props });
        const teste123 = ref<string>('testestestes');
        const request_url = ref<string>('https://rickandmortyapi.com/graphql');
        const characters = ref<[]>([]);
        const pagination = ref<PaginationType>({
            next: '',
            prev: '',
            last: '',
        });
        const loading = ref<boolean>(true);
        const error = ref<boolean>(false);

        onMounted(async () => {
            const query = `{\n
                characters(page: ${props.page}, filter: {status: \"${props.filtro_status}\" gender: \"${props.filtro_gender}\" name: \"${props.filtro_name}\"}) {\n
                    info {\n
                        pages\n
                        count\n
                        next\n
                        prev\n
                    }\n
                    results {\n
                        id\n
                        name\n
                        species\n
                        image\n
                    }\n
                }\n
            }`;
            const variables = {};
            const option = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query, variables }),
            };

            await fetch('https://rickandmortyapi.com/graphql', option)
                .then((r) => r.json())
                .then((res) => {
                    const { results, info } = res.data.characters;
                    pagination.value.next = info.next;
                    pagination.value.prev = info.prev;
                    pagination.value.last = info.pages;
                    characters.value = results;
                    loading.value = false;
                })
                .catch((e) => {
                    loading.value = false;
                    error.value = true;
                    console.log('erro ao carregar: ', e);
                });
        });

        return {
            request_url,
            characters,
            pagination,
            loading,
            error,
            teste123,
        };
    },
});
</script>
