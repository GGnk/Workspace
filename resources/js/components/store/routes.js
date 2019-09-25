import Dashboard from "../modules/pages/Dashboard";

let routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            // requiresAuth: true
        }
    },
]
export default routes
