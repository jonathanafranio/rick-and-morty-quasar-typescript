<template>
    <LayoutDefault>
        <Preload v-if="loading" />

        <div class="character">
            <h1 class="page-section__title">Personagem: {{ title }}</h1>

            <CharacterInfo
                :title="title"
                :image="image"
                :status="status"
                :species="species"
                :gender="gender"
                :origin="origin"
                :location="location_home"
            />

            <Episodes v-if="episode" :listagem="episode" />
        </div>
    </LayoutDefault>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import LayoutDefault from 'components/Layouts/LayoutDefault.vue';
import Preload from 'components/Preload.vue';
import CharacterInfo from 'components/CharacterInfo.vue';
import Episodes from 'components/Episodes.vue';
import { useRoute } from 'vue-router';

export default defineComponent({
    name: 'Personagem',
    components: {
        LayoutDefault,
        Preload,
        CharacterInfo,
        Episodes,
    },
    setup() {
        const router = useRoute();
        const loading = ref<boolean>(true);
        const title = ref<string>('');
        const image = ref<string>('');
        const status = ref<string>('');
        const species = ref<string>('');
        const gender = ref<string>('');
        const origin = ref<string>('');
        const location_home = ref<string>('');
        const episode = ref<[]>([]);

        onMounted(async () => {
            const variables = {};
            const query = `{\n
                character(id: ${router.params.personagem}) {\n
                    id\n
                    name\n
                    image\n
                    status\n
                    species\n
                    gender\n
                    origin {\n
                        name\n
                    }\n
                    location {\n
                        name\n
                    }\n
                    episode {\n
                        name\n
                        episode\n
                    }\n
                }\n
            }`;
            const option = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: query, variables: variables }),
            };
            await fetch('https://rickandmortyapi.com/graphql', option)
                .then((r) => r.json())
                .then((res) => {
                    const r = res.data.character;
                    title.value = r.name;
                    image.value = r.image;
                    status.value = r.status;
                    species.value = r.species;
                    gender.value = r.gender;
                    origin.value = r.origin.name;
                    location_home.value = r.location.name;
                    episode.value = r.episode;
                    loading.value = false;
                });
        });
        return {
            loading,
            title,
            image,
            status,
            species,
            gender,
            origin,
            location_home,
            episode,
        };
    },
});
</script>
<!--
<script>
import { isProxy, toRaw } from "vue";
import LayoutDefault from "components/Layouts/LayoutDefault.vue";
import Preload from "components/Preload.vue";
import CharacterInfo from "components/CharacterInfo.vue";
import Episodes from "components/Episodes.vue";

export default {
    name: "Personagem",
    components: {
        LayoutDefault,
        Preload,
        CharacterInfo,
        Episodes,
    },
    data() {
        return {
            loading: true,
            id: this.$route.params.personagem,
            title: "",
            image: "",
            status: "",
            species: "",
            gender: "",
            origin: "",
            location_home: "",
            episode: [],
        };
    },
    methods: {
        get_character() {
            const variables = {};
            const query = `{\n
                character(id: ${this.$route.params.personagem}) {\n
                    id\n
                    name\n
                    image\n
                    status\n
                    species\n
                    gender\n
                    origin {\n
                        name\n
                    }\n
                    location {\n
                        name\n
                    }\n
                    episode {\n
                        name\n
                        episode\n
                    }\n
                }\n
            }`;
            const option = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: query, variables: variables }),
            };
            fetch(`https://rickandmortyapi.com/graphql`, option)
                .then((r) => r.json())
                .then((res) => {
                    const r = res.data.character;
                    const { episode } = r;
                    this.title = r.name;
                    this.image = r.image;
                    this.status = r.status;
                    this.species = r.species;
                    this.gender = r.gender;
                    this.origin = r.origin.name;
                    this.location_home = r.location.name;
                    this.episode = episode;
                    this.loading = false;
                });
        },
    },
    computed: {
        epsidios_arr() {
            let episode = this.episode;
            return isProxy(episode) ? toRaw(episode) : episode;
        },
    },
    created() {
        this.get_character();
    },
};
</script>-->

<style lang="scss" scoped></style>
