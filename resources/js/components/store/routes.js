let routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: () => import('../pages/Dashboard'),
        meta: {
            // requiresAuth: true
        }
    },
]
export default routes
