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
    {
        path: '/file-manager',
        name: 'FileManager',
        component: () => import('../pages/laravel-file-manager/src/FileManager'),
        meta: {
            // requiresAuth: true
        }
    },
]
export default routes
