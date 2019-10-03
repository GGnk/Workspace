let routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: () => import('../modules/pages/Dashboard'),
        meta: {
            // requiresAuth: true
        }
    },
]
export default routes
