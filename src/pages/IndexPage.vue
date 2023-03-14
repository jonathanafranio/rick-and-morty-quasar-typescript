<template>
    <LayoutDefault>
        <SearchForm />
        <ListCharacter title="Lista de personagens" :page_url="prefix_url" />
    </LayoutDefault>
</template>

<script lang="ts">
import LayoutDefault from 'components/Layouts/LayoutDefault.vue';
import ListCharacter from 'components/ListCharacter/ListCharacter.vue';
import SearchForm from 'src/components/SearchForm.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'IndexPage',
    components: { LayoutDefault, ListCharacter, SearchForm },
    setup() {
        return {};
    },
    computed: {
        prefix_url() {
            return location.origin;
        },
    },
});
</script>
