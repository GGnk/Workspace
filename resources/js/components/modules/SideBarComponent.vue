<template>
    <aside class="main-sidebar col-12 col-sm-2" id="sidebar">
        <div id="dismiss">
            <i class="fa fa-arrow-left"></i>
        </div>
        <section class="sidebar" style="height: auto;">
            <ul class="sidebar-menu" style="text-align: center; color: white;">
                <li>

                    <div class="team-thumb " v-if="auth_u.img">
                        <img :src="auth_u.img" :alt="auth_u.name" width="60%">
                    </div>
                    <span id="idname" class="team-name badge btn-warning">{{auth_u.name}}</span>

                    <span class="title">
                        <div class="team-social-bar">
                            <a class="social-btn sb-style-1 sb-twitter" href="#">
                                <i class="fa fa-twitter"></i>
                            </a>
                            <a class="social-btn sb-style-1 sb-github" href="#">
                                <i class="fa fa-github"></i>
                            </a>
                            <a class="social-btn sb-style-1 sb-stackoverflow" href="#">
                                <i class="fa fa-linkedin"></i>
                            </a>
                            <a class="social-btn sb-style-1 sb-skype" href="#">
                                <i class="fa fa-skype"></i>
                            </a>
                        </div>
                    </span>

                </li>
            </ul>
            <ul class="sidebar-menu">
                <li class="active">
                    <a href="http://192.168.2.59/admin/home">
                        <i class="fa fa-wrench"></i>
                        <span class="title">Панель управления</span>
                    </a>
                </li>
                <li class="treeview">
                    <a href="#">
                        <i class="fa fa-sitemap"></i>
                        <span>Доп функционал</span>
                        <span class="pull-right-container">
                                    <i class="fa fa-angle-left pull-right"></i>
                                </span>
                    </a>
                    <ul class="treeview-menu">
                        <li>
                            <a href="http://192.168.2.59/admin/tasks">
                                <i class="fa fa-tasks"></i>
                                <span class="title">Задачи</span>
                            </a>
                        </li>
                        <li>
                            <a href="http://192.168.2.59/admin/faqs">
                                <i class="fa fa-question"></i>
                                <span class="title">Список вопросов</span>
                            </a>
                        </li>
                        <li>
                            <a href="http://192.168.2.59/admin/files">
                                <i class="fa fa-tasks"></i>
                                <span class="title">Файлообменник</span>
                            </a>
                        </li>
                        <li>
                            <a href="http://192.168.2.59/admin/edo">
                                <i class="fa fa-cloud"></i>
                                <span>Список ЭДО</span>
                            </a>
                            <ul>
                                <li style="padding: 0 0 10px 0">
                                    <a href="http://192.168.2.59/admin/cat_edo">
                                        <i class="fa fa-list-ol"></i>
                                        <span class="title">Категории ЭДО</span>
                                    </a>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </li>

                <li class="treeview">
                    <a href="#">
                        <i class="fa fa-sitemap"></i>
                        <span>Структура</span>
                        <span class="pull-right-container">
                                    <i class="fa fa-angle-left pull-right"></i>
                                </span>
                    </a>
                    <ul class="treeview-menu">
                        <li>
                            <a href="http://192.168.2.59/admin/macs">
                                <i class="fa fa-tv"></i>
                                <span>Список Mac</span>
                            </a>
                        </li>
                        <li>
                            <a href="http://192.168.2.59/admin/deps">
                                <i class="fa fa-home"></i>
                                <span>Список корпусов</span>
                            </a>
                        </li>
                        <li>
                            <a href="http://192.168.2.59/admin/offices">
                                <i class="fa fa-coffee"></i>
                                <span>Список офисов</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="treeview">
                    <a href="#">
                        <i class="fa fa-users"></i>
                        <span>Управление сотрудниками</span>
                        <span class="pull-right-container">
                                    <i class="fa fa-angle-left pull-right"></i>
                                </span>
                    </a>
                    <ul class="treeview-menu">
                        <li>
                            <a href="http://192.168.2.59/admin/users">
                                <i class="fa fa-user"></i>
                                <span>Сотрудники</span>
                            </a>
                        </li>
                        <li>
                            <a href="http://192.168.2.59/admin/roles">
                                <i class="fa fa-briefcase"></i>
                                <span>Привилегия</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="">
                    <a href="http://192.168.2.59/change_password">
                        <i class="fa fa-key"></i>
                        <span class="title">Сменить пароль</span>
                    </a>
                </li>

                <li>
                    <a href="#logout" onclick="$('#logout').submit();">
                        <i class="fa fa-arrow-left"></i>
                        <span class="title">Выйти</span>
                    </a>
                </li>
            </ul>
        </section>
        
    </aside>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "SideBarComponent",

        computed: {
            ...mapGetters(['auth_u']),
        }
    }
</script>

<style scoped>

</style>
