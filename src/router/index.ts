import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import Hero from "@/views/Hero.vue";
import About from "@/views/About.vue";
import Contact from "@/views/Contact.vue";
import Issue from "@/views/Issue.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Inicio',
        component: Hero
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/contact',
        name: 'Contact',
        component: Contact
    },
    {
        path: '/issue',
        name: 'Issue',
        component: Issue
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});

export default router;