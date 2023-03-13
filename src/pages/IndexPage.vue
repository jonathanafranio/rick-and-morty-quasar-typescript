<template>
    <LayoutDefault>
        <p>teste</p>
        CARALHO
        <ListCharacter teste="propriedade teste" />
    </LayoutDefault>
</template>

<script lang="ts">
import { Todo, Meta } from 'components/models';
import LayoutDefault from 'components/Layouts/LayoutDefault.vue';
import ListCharacter from 'components/ListCharacter/ListCharacter.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'IndexPage',
    components: { LayoutDefault, ListCharacter },
    setup() {
        const todos = ref<Todo[]>([
            {
                id: 1,
                content: 'ct1',
            },
            {
                id: 2,
                content: 'ct2',
            },
            {
                id: 3,
                content: 'ct3',
            },
            {
                id: 4,
                content: 'ct4',
            },
            {
                id: 5,
                content: 'ct5',
            },
        ]);
        const meta = ref<Meta>({
            totalCount: 1200,
        });
        return { todos, meta };
    },
});
</script>
