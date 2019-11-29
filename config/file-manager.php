<?php

return [

    /**
     * list of disk names that you want to use
     * (from config/filesystems)
     */
    'diskList'  => ['obmen', 'msi'],

    /**
     * Default disk for left manager
     * null - auto select the first disk in the disk list
     */
    'leftDisk'  => 'obmen',

    /**
     * Default disk for right manager
     * null - auto select the first disk in the disk list
     */
    'rightDisk' => 'msi',

    /**
     * Кэш изображений ( кэш изображений интервенций )
     * установить null, 0 - если кэш не нужен (по умолчанию)
     * если вы хотите использовать кэш - установить количество минут, в течение которых значение должно быть кэшированы
     */
    'cache' => 30,

    /**
     * File manager modules configuration
     * 1 - only one file manager window
     * 2 - one file manager window with directories tree module
     * 3 - two file manager windows
     */
    'windowsConfig' => 2,

    /***************************************************************************
     * Middleware
     * Add your middleware name to array -> ['web', 'auth', 'admin']
     * !!!! RESTRICT ACCESS FOR NON ADMIN USERS !!!!
     *
     * !!! For using ACL - add 'fm-acl' to array !!! ['web', 'fm-acl']
     */
    'middleware' => ['web', 'fm-acl'],

    /***************************************************************************
     * ACL mechanism ON/OFF
     *
     * default - false(OFF)
     */
    'acl' => true,

    /**
     * Скрыть файлы и папки из файлового менеджера, если у пользователя нет доступа
     * Уровень доступа ACL = 0
     */
    'aclHideFromFM' => true,

    /**
     * ACL strategy
     *
     * blacklist - Allow everything(access - 2 - r/w) that is not forbidden by the ACL rules list
     *
     * whitelist - Deny anything(access - 0 - deny), that not allowed by the ACL rules list
     */
    'aclStrategy'   => 'whitelist',

    /**
     * ACL rules repository
     *
     * default - config file(ConfigACLRepository)
     */
    'aclRepository' => Alexusmai\LaravelFileManager\Services\ACLService\ConfigACLRepository::class,
    //'aclRepository' => Alexusmai\LaravelFileManager\Services\ACLService\DBACLRepository::class,

    /**
     * ACL rules list - used for default repository
     *
     * 1 it's user ID
     * null - for not authenticated user
     *
     * 'disk' => 'disk-name'
     *
     * 'path' => 'folder-name'
     * 'path' => 'folder1*' - select folder1, folder12, folder1/sub-folder, ...
     * 'path' => 'folder2/*' - select folder2/sub-folder,... but not select folder2 !!!
     * 'path' => 'folder-name/file-name.jpg'
     * 'path' => 'folder-name/*.jpg'
     *
     * * - wildcard
     *
     * access: 0 - deny, 1 - read, 2 - read/write
     */
    'aclRules'      => [
        null => [
            //['disk' => 'public', 'path' => '/', 'access' => 2],
        ],

        1 => [
            ['disk' => 'obmen', 'path' => '*', 'access' => 2],
            ['disk' => 'msi', 'path' => '*', 'access' => 2],

        ],
        2 => [
            ['disk' => 'obmen', 'path' => 'III ПОЛИКЛИНИКА', 'access' => 1],
            ['disk' => 'obmen', 'path' => 'III ПОЛИКЛИНИКА/*', 'access' => 1],
            ['disk' => 'obmen', 'path' => '911', 'access' => 1],
            ['disk' => 'obmen', 'path' => '911/Программы', 'access' => 1],
            ['disk' => 'obmen', 'path' => '911/Программы/*', 'access' => 1],
			['disk' => 'obmen', 'path' => 'АПТЕКА', 'access' => 1],
			['disk' => 'obmen', 'path' => 'АПТЕКА/*', 'access' => 1],
            ['disk' => 'msi', 'path' => '*', 'access' => 2],

        ],
        3 => [
            ['disk' => 'obmen', 'path' => 'IV ПОЛИКЛИНИКА', 'access' => 1],
            ['disk' => 'obmen', 'path' => 'IV ПОЛИКЛИНИКА/*', 'access' => 1],
            ['disk' => 'obmen', 'path' => '911', 'access' => 1],
            ['disk' => 'obmen', 'path' => '911/Программы', 'access' => 1],
            ['disk' => 'obmen', 'path' => '911/Программы/*', 'access' => 1],
            ['disk' => 'msi', 'path' => '*', 'access' => 2],

        ],
        4 => [
            ['disk' => 'obmen', 'path' => 'V ПОЛИКЛИНИКА', 'access' => 1],
            ['disk' => 'obmen', 'path' => 'V ПОЛИКЛИНИКА/*', 'access' => 1],
            ['disk' => 'obmen', 'path' => '911', 'access' => 1],
            ['disk' => 'obmen', 'path' => '911/Программы', 'access' => 1],
            ['disk' => 'obmen', 'path' => '911/Программы/*', 'access' => 1],
            ['disk' => 'msi', 'path' => '*', 'access' => 2],

        ],
        5 => [
            ['disk' => 'obmen', 'path' => "II ПОЛИКЛИНИКА", 'access' => 2],
            ['disk' => 'obmen', 'path' => 'II ПОЛИКЛИНИКА/*', 'access' => 1],
            ['disk' => 'obmen', 'path' => '911', 'access' => 1],
            ['disk' => 'obmen', 'path' => '911/Программы', 'access' => 1],
            ['disk' => 'obmen', 'path' => '911/Программы/*', 'access' => 1],
            ['disk' => 'msi', 'path' => '*', 'access' => 2],

        ],
        6 => [
            ['disk' => 'obmen', 'path' => "ЗАМЕСТИТЕЛИ  ГЛАВНОГО ВРАЧА", 'access' => 2],
            ['disk' => 'obmen', 'path' => 'ЗАМЕСТИТЕЛИ  ГЛАВНОГО ВРАЧА/*', 'access' => 2],
            ['disk' => 'obmen', 'path' => 'А Д М И Н И С Т Р А Ц И Я', 'access' => 2],
            ['disk' => 'obmen', 'path' => 'А Д М И Н И С Т Р А Ц И Я/*', 'access' => 2],
            ['disk' => 'obmen', 'path' => '_ЗАВ КАНЦЕЛЯРИИ МОКРОУСОВА Л.И', 'access' => 2],
            ['disk' => 'obmen', 'path' => '_ЗАВ КАНЦЕЛЯРИИ МОКРОУСОВА Л.И/*', 'access' => 2],

        ],
        7 => [
            ['disk' => 'obmen', 'path' => "МЕДПУНКТ ВОКЗАЛА", 'access' => 2],
            ['disk' => 'obmen', 'path' => 'МЕДПУНКТ ВОКЗАЛА/*', 'access' => 2],
        ],


    ],

    /**
     * ACL Rules cache
     *
     * null or value in minutes
     */
    'aclRulesCache' => null,
];
