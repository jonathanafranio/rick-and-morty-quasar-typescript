<template>
    <div>
        {{ teste123 }}

        <ul>
            <li v-for="(character, index) in characters" :key="index">
                {{ character.name }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Pagination } from 'components/models';
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
    name: 'ListCharacter',
    props: {
        teste: {
            type: String,
            default: '',
        },

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
        const teste123 = ref<string>('testestestes');
        const request_url = ref<string>('https://rickandmortyapi.com/graphql');
        const characters = ref<[]>([]);
        const pagination = ref<Pagination>({
            next: '',
            prev: '',
            last: '',
        });
        const loading = ref<boolean>(true);
        const error = ref<boolean>(false);

        console.log('props.teste', props.teste);

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
