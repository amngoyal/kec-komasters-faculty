import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import CreateQuiz from "../views/CreateQuiz";
import ResetPassword from "../views/ResetPassword";
import SentimentalAnalysis from "../views/CreateSentimentalAnalysis";
import ShowAllQuiz from "../views/ShowAllQuiz";
import ShowAllAnalysis from "../views/ShowAllAnalysis";
import QuizList from "../components/ShowQuizList/QuizList";
import ViewQuiz from "../components/ShowQuizList/ViewQuiz";

import AccountManager from '../models/AccountManager'

Vue.use(VueRouter);

const routes = [
    {
        path: "*",
        redirect: {
            name: "Login",
        }
    },
    {
        path: '/home',
        name: 'Home',
        redirect: {
            name: "CreateQuiz",
        },
        component: Home,
        children: [
            {
                path: 'quiz/create',
                name: 'CreateQuiz',
                component: CreateQuiz,
            },
            {
                path: 'quiz/all',
                name: 'ShowAllQuiz',
                redirect: {
                    name: 'QuizList'
                },
                component: ShowAllQuiz,
                children: [
                    {
                        path: 'quiz-list',
                        name: 'QuizList',
                        component: QuizList
                    },
                    {
                        path: 'view-quiz/:quiz_id',
                        name: 'ViewQuiz',
                        component: ViewQuiz
                    },
                ]
            },
            {
                path: 'sa/create',
                name: 'SentimentalAnalysis',
                component: SentimentalAnalysis,
            },
            {
                path: 'sa/all',
                name: 'ShowAllAnalysis',
                component: ShowAllAnalysis,
            },

        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/reset-password',
        name: 'ResetPassword',
        component: ResetPassword
    },


];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {

    if (AccountManager.isLoggedIn() && (to.fullPath === '/login' || to.fullPath === '/login/reset-password')) {
        next('/home');
    }


    if (!AccountManager.isLoggedIn() && to.fullPath !== '/login' && to.fullPath !== '/reset-password') {
        next('/login');
    }

    next();
});

export default router;
