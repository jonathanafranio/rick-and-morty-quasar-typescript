<template>
    <LayoutDefault>
        <ListCharacter
            :title="title"
            :filtro_status="filtro_status"
            :filtro_gender="filtro_gender"
            :filtro_name="filtro_name"
            :page_url="prefix_url"
            :page="page"
            :search="search_url"
        />
    </LayoutDefault>
</template>

<script lang="ts">

interface ReplaceItem {
  text: string;
  replace: string;
}

interface QueryParam {
    key: string;
    value: string;
}

import { defineComponent } from 'vue';

import LayoutDefault from 'components/Layouts/LayoutDefault.vue';
import ListCharacter from 'components/ListCharacter/ListCharacter.vue';

export default defineComponent({
    name: 'SearchPage',
    components: {
        LayoutDefault,
        ListCharacter,
    },
    data() {
        return {
            title: '',
            filtro_status: '',
            filtro_gender: '',
            filtro_name: '',
            page: this.$route.params.p,
        };
    },
    methods: {
        sem_param() {
            return this.$router.push('/');
        },
        title_search(str: string) {
            const string_replaces: object[] = [
                {
                    text: 'gender',
                    replace: 'Gênero',
                },
                {
                    text: 'status',
                    replace: 'Status',
                },
                {
                    text: 'name',
                    replace: 'Nome',
                },
                {
                    text: 'alive',
                    replace: 'Vivo(a)',
                },
                {
                    text: 'dead',
                    replace: 'Morto(a)',
                },
                {
                    text: 'unknown',
                    replace: 'Desconhecido',
                },
                {
                    text: 'female',
                    replace: 'Feminino',
                },
                {
                    text: 'male',
                    replace: 'Masculino',
                },
                {
                    text: 'genderless',
                    replace: 'Sem Gênero',
                },
            ];
            let newStr: string = str.replace('?', '');
            newStr = newStr.replaceAll('=', ': ').replaceAll('&', ' e ');

            string_replaces.forEach((item) => {
                const replaceItem = item as ReplaceItem; 
                newStr = newStr.replaceAll(replaceItem.text, replaceItem.replace);
            });

            this.title = `Resultado da busca: ${newStr} - página: ${this.page}`;
        },
        filtro_search(str: string) {
            const newStr: string = str.replace('?', '');
            const newStr2: string[] = newStr.split('&');
            const newStr3: QueryParam[] = newStr2.map((item) => {
                const split: string[] = item.split('=');
                const [key, value] = [split[0], split[1]];
                return { key, value };
            });
            const status_search: QueryParam[] = newStr3.filter(
                (item) => item.key === 'status'
            );
            const gender_search: QueryParam[] = newStr3.filter(
                (item) => item.key === 'gender'
            );
            const name_search: QueryParam[] = newStr3.filter(
                (item) => item.key === 'name'
            );

            this.filtro_status =
                status_search.length > 0 ? status_search[0].value : '';
            this.filtro_gender =
                gender_search.length > 0 ? gender_search[0].value : '';
            this.filtro_name =
                name_search.length > 0 ? name_search[0].value : '';
        },
    },
    computed: {
        prefix_url() {
            return `${location.origin}/search`;
        },
        search_url() {
            return location.search;
        },
    },
    created() {
        const search_query = location.search;
        if (search_query.trim() === '') {
            this.sem_param();
        } else {
            this.title_search(search_query);
            this.filtro_search(search_query);
        }
    },
});
</script>

<style lang="scss" scoped></style>
