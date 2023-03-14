<template>
    <LayoutDefault>
        <SearchForm />
        <ListCharacter
            v-if="page > 1"
            :title="title"
            :page="page"
            :page_url="prefix_url"
            search=""
        />
    </LayoutDefault>
</template>

<script lang="ts">
import LayoutDefault from 'components/Layouts/LayoutDefault.vue';
import ListCharacter from 'components/ListCharacter/ListCharacter.vue';
import SearchForm from 'src/components/SearchForm.vue';
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
    name: 'IndexPage',
    components: { LayoutDefault, ListCharacter, SearchForm },
    setup() {
        const router = useRoute();
        const title = ref<string>('');
        const page = ref<number>(0);
        console.log('router', router.params.p);
        onMounted(() => {
            const id = router.params.p;
            title.value = `Lista de personagens - página: ${id}`;
            page.value = +id;
        });

        return {
            title,
            page,
        };
    },
    computed: {
        prefix_url() {
            return location.origin;
        },
    },
});
</script>
