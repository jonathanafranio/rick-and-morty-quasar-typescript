import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('pages/IndexPage.vue'),
    },

    {
        path: '/p/:p',
        component: () => import('pages/IndexPaginacao.vue'),
    },

    {
        path: '/search',
        component: () => import('pages/Search.vue'),
    },

    {
        path: '/search/p/:p',
        component: () => import('pages/SearchPaginacao.vue'),
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
];

export default routes;
