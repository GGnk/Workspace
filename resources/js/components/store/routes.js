let routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: () => import('../pages/Dashboard'),
        meta: {
            // requiresAuth: true
        }
    },
    {
        path: '/ver',
        name: 'Ver',
        component: () => import('../modules/VerComponent'),
        meta: {
            // requiresAuth: true
        }
    },
]
export default routes
