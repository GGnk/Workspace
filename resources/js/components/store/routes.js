let routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: () => import('../views/Dashboard'),
        meta: {
            // requiresAuth: true
        }
    },
    {
        path: '/ver',
        name: 'Ver',
        component: () => import('../modules/Version/VerComponent'),
        meta: {
            // requiresAuth: true
        }
    },
    {
        path: '/file-manager',
        name: 'FileManager',
        component: () => import('../modules/FileManager/laravel-file-manager/src/FileManager'),
        meta: {
            // requiresAuth: true
        }
    },
]
export default routes
