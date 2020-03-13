(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/modules/Tasks/TasksComponent.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/modules/Tasks/TasksComponent.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _ckeditor_ckeditor5_build_inline__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ckeditor/ckeditor5-build-inline */ "./node_modules/@ckeditor/ckeditor5-build-inline/build/ckeditor.js");
/* harmony import */ var _ckeditor_ckeditor5_build_inline__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ckeditor_ckeditor5_build_inline__WEBPACK_IMPORTED_MODULE_1__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  name: "TasksComponent",
  components: {
    UniversalCard: function UniversalCard() {
      return __webpack_require__.e(/*! import() */ 7).then(__webpack_require__.bind(null, /*! ./blocks/universal-card */ "./resources/js/components/modules/Tasks/blocks/universal-card.vue"));
    }
  },
  props: [],
  data: function data() {
    return {
      editor: _ckeditor_ckeditor5_build_inline__WEBPACK_IMPORTED_MODULE_1___default.a,
      editorConfig: {
        toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote']
      }
    };
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])('config', ['ui_mobile']), {}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])('tasks', ['sortedArray', 'generalArray', 'options', 'cat', 'houses', 'intTask', 'tasksUsers', 'task', 'task_houses', 'get_rules', 'dialogForm', 'dialogFormValid', 'dialogFormTitle', 'dialogFormButtomTitle', 'no_cat_task']), {
    valid: {
      get: function get() {
        return this.dialogFormValid;
      },
      set: function set(value) {
        this.$store.commit('tasks/DIALOG_FORM_VALID', value);
      }
    },
    FormOpen: {
      get: function get() {
        return this.dialogForm;
      },
      set: function set() {
        this.$store.commit('tasks/DIALOG_FORM_CLOSE');
      }
    },
    FormTitle: {
      get: function get() {
        return this.dialogFormTitle;
      }
    },
    FormButtomTitle: {
      get: function get() {
        return this.dialogFormButtomTitle;
      }
    },
    user_id_list: {
      get: function get() {
        return this.intTask;
      },
      set: function set(value) {
        this.$store.commit('tasks/TASK_LIST', value);
      }
    },
    task_desc: {
      get: function get() {
        return this.task.desc;
      },
      set: function set(value) {
        this.$store.commit('tasks/ENTER_TASK_FORM', {
          vv: 'desc',
          value: value
        });
      }
    },
    task_status: {
      get: function get() {
        return this.task.status;
      },
      set: function set(value) {
        this.$store.commit('tasks/ENTER_TASK_FORM', {
          vv: 'status',
          value: value
        });
      }
    },
    task_priority: {
      get: function get() {
        return this.task.priority;
      },
      set: function set(value) {
        this.$store.commit('tasks/ENTER_TASK_FORM', {
          vv: 'priority',
          value: value
        });
      }
    },
    task_cat: {
      get: function get() {
        return this.task.cat;
      },
      set: function set(value) {
        this.$store.commit('tasks/ENTER_TASK_FORM', {
          vv: 'cat',
          value: value
        });
      }
    },
    task_general: {
      get: function get() {
        return this.task.general;
      },
      set: function set(value) {
        this.$store.commit('tasks/ENTER_TASK_FORM', {
          vv: 'general',
          value: value
        });
      }
    },
    task_house: {
      get: function get() {
        return this.task.house;
      },
      set: function set(value) {
        this.$store.commit('tasks/ENTER_TASK_FORM', {
          vv: 'house',
          value: value
        });
      }
    },
    // Update form
    task_update_desc: {
      get: function get() {
        return this.task_update.desc;
      },
      set: function set(value) {
        this.$store.commit('tasks/TASK_UPDATE_DATA', {
          vv: 'desc',
          value: value
        });
      }
    },
    task_update_status: {
      get: function get() {
        return this.task_update.status;
      },
      set: function set(value) {
        this.$store.commit('tasks/TASK_UPDATE_DATA', {
          vv: 'status',
          value: value
        });
      }
    },
    task_update_priority: {
      get: function get() {
        return this.task_update.priority;
      },
      set: function set(value) {
        this.$store.commit('tasks/TASK_UPDATE_DATA', {
          vv: 'priority',
          value: value
        });
      }
    },
    task_update_cat: {
      get: function get() {
        return this.task_update.cat;
      },
      set: function set(value) {
        this.$store.commit('tasks/TASK_UPDATE_DATA', {
          vv: 'cat',
          value: value
        });
      }
    },
    task_update_general: {
      get: function get() {
        return this.task_update.general;
      },
      set: function set(value) {
        this.$store.commit('tasks/TASK_UPDATE_DATA', {
          vv: 'general',
          value: value
        });
      }
    },
    task_update_house: {
      get: function get() {
        return this.task_update.house_ids;
      },
      set: function set(value) {
        this.$store.commit('tasks/TASK_UPDATE_DATA', {
          vv: 'house_ids',
          value: value
        });
      }
    }
  }),
  watch: {},
  created: function created() {
    this.$store.dispatch('tasks/FETCH_DATA');
  },
  mounted: function mounted() {
    /*window.Echo.channel("newTask").listen(".task-created", e => {
        this.tasks.unshift(e.task)
        console.log("Задача с id:" + e.task.id + " была добавлена, на стороне сервера")
    });
    window.Echo.channel("taskUpdated").listen(".task-updated", e => {
        let index = this.tasks.findIndex(el => el.id === e.task.id);
        this.tasks.splice(index, 1,e.task)
        console.log("Задача с id:" + e.task.id + " была обновлена")
    });
    window.Echo.channel("taskRemoved").listen(".task-removed", e => {
        // TODO: сделать обновление одного элемента в списке
        let index = this.tasks.findIndex(el => el.id === e.task.id);
        this.tasks.splice(index, 1)
        console.log("Задача с id:" + e.task.id + " была удалена")
    });*/
  },
  methods: {}
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/modules/Tasks/TasksComponent.vue?vue&type=style&index=0&id=40173d43&scoped=true&lang=scss&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/modules/Tasks/TasksComponent.vue?vue&type=style&index=0&id=40173d43&scoped=true&lang=scss& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".return-task[data-v-40173d43] {\n  align-items: center;\n  display: flex;\n  flex: 1 1 100%;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/modules/Tasks/TasksComponent.vue?vue&type=style&index=0&id=40173d43&scoped=true&lang=scss&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/modules/Tasks/TasksComponent.vue?vue&type=style&index=0&id=40173d43&scoped=true&lang=scss& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/vue-loader/lib??vue-loader-options!./TasksComponent.vue?vue&type=style&index=0&id=40173d43&scoped=true&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/modules/Tasks/TasksComponent.vue?vue&type=style&index=0&id=40173d43&scoped=true&lang=scss&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/modules/Tasks/TasksComponent.vue?vue&type=template&id=40173d43&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/modules/Tasks/TasksComponent.vue?vue&type=template&id=40173d43&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-list",
    { attrs: { "two-line": "", subheader: "" } },
    [
      _c(
        "v-row",
        { staticClass: "mx-0 text-center" },
        [
          _c(
            "v-col",
            { attrs: { cols: "12", sm: _vm.generalArray.length > 0 ? 7 : 12 } },
            [
              _c("v-divider", { staticClass: "d-none d-sm-block .d-xl-flex" }),
              _vm._v(" "),
              _c(
                "v-col",
                {
                  staticClass: "my-2 pa-0",
                  staticStyle: { height: "50px" },
                  attrs: { sm: "12" }
                },
                [
                  _c(
                    "v-subheader",
                    { staticClass: "subheading" },
                    [
                      _vm._v("Задачи:\n                        "),
                      _c(
                        "div",
                        { staticClass: "mx-2" },
                        [
                          _c("v-select", {
                            attrs: {
                              items: _vm.tasksUsers,
                              label: "Пользователя",
                              width: "120",
                              "item-text": "name",
                              "item-value": "id",
                              "hide-selected": "",
                              color: "success",
                              height: "48"
                            },
                            model: {
                              value: _vm.user_id_list,
                              callback: function($$v) {
                                _vm.user_id_list = $$v
                              },
                              expression: "user_id_list"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          attrs: { tile: "", rounded: "", color: "info" },
                          on: {
                            click: function($event) {
                              return _vm.$store.commit("tasks/EDIT_DIALOG_FORM")
                            }
                          }
                        },
                        [_c("v-icon", [_vm._v("playlist_add")])],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c("v-divider", { staticClass: "d-none d-sm-block .d-xl-flex" }),
              _vm._v(" "),
              _vm.no_cat_task
                ? _c(
                    "v-card",
                    { staticClass: "blue-grey mb-2", attrs: { dark: "" } },
                    [
                      _c("v-card-title", [
                        _vm._v(
                          "\n                        Бумажные дела:\n                    "
                        )
                      ]),
                      _vm._v(" "),
                      _c(
                        "v-card-text",
                        { staticClass: "px-0" },
                        [
                          _c(
                            "v-list",
                            { staticClass: "pa-0" },
                            _vm._l(_vm.sortedArray, function(todo, indexTask) {
                              return !todo.general && todo.cat == 1
                                ? _c("v-hover", {
                                    key: indexTask,
                                    attrs: {
                                      "open-delay": 0,
                                      "close-delay": 0
                                    },
                                    scopedSlots: _vm._u(
                                      [
                                        {
                                          key: "default",
                                          fn: function(ref) {
                                            var hover = ref.hover
                                            return [
                                              _c(
                                                "v-list-item",
                                                {
                                                  staticClass: "grey lighten-5",
                                                  staticStyle: {
                                                    "min-height":
                                                      "30px!important",
                                                    "border-top":
                                                      "1px solid #607D8B !important"
                                                  }
                                                },
                                                [
                                                  todo.completed != 1
                                                    ? _c(
                                                        "div",
                                                        {
                                                          staticClass:
                                                            "return-task"
                                                        },
                                                        [
                                                          _c(
                                                            "v-tooltip",
                                                            {
                                                              attrs: {
                                                                right: ""
                                                              },
                                                              scopedSlots: _vm._u(
                                                                [
                                                                  {
                                                                    key:
                                                                      "activator",
                                                                    fn: function(
                                                                      ref
                                                                    ) {
                                                                      var on =
                                                                        ref.on
                                                                      return [
                                                                        _c(
                                                                          "v-list-item-subtitle",
                                                                          _vm._g(
                                                                            {
                                                                              staticClass:
                                                                                "text-wrap black--text text-left"
                                                                            },
                                                                            on
                                                                          ),
                                                                          [
                                                                            _vm._v(
                                                                              "\n                                                    " +
                                                                                _vm._s(
                                                                                  todo.desc
                                                                                ) +
                                                                                "\n                                                "
                                                                            )
                                                                          ]
                                                                        )
                                                                      ]
                                                                    }
                                                                  }
                                                                ],
                                                                null,
                                                                true
                                                              )
                                                            },
                                                            [
                                                              _vm._v(" "),
                                                              _c("span", [
                                                                _vm._v(
                                                                  _vm._s(
                                                                    todo.status
                                                                      ? todo.status
                                                                      : "Задайте статус"
                                                                  )
                                                                )
                                                              ])
                                                            ]
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "v-list-item-action",
                                                            {
                                                              staticStyle: {
                                                                display:
                                                                  "inline"
                                                              }
                                                            },
                                                            [
                                                              _c(
                                                                "div",
                                                                {
                                                                  staticClass:
                                                                    "d-sm-none ma-1"
                                                                },
                                                                [
                                                                  _c(
                                                                    "v-menu",
                                                                    {
                                                                      attrs: {
                                                                        "close-on-click":
                                                                          "",
                                                                        "close-on-content-click":
                                                                          "",
                                                                        "offset-y":
                                                                          ""
                                                                      },
                                                                      scopedSlots: _vm._u(
                                                                        [
                                                                          {
                                                                            key:
                                                                              "activator",
                                                                            fn: function(
                                                                              ref
                                                                            ) {
                                                                              var on =
                                                                                ref.on
                                                                              return [
                                                                                _c(
                                                                                  "v-btn",
                                                                                  _vm._g(
                                                                                    {
                                                                                      staticClass:
                                                                                        "ml-2",
                                                                                      attrs: {
                                                                                        outlined:
                                                                                          "",
                                                                                        fab:
                                                                                          "",
                                                                                        "x-small":
                                                                                          "",
                                                                                        color:
                                                                                          "accent"
                                                                                      }
                                                                                    },
                                                                                    on
                                                                                  ),
                                                                                  [
                                                                                    _c(
                                                                                      "v-icon",
                                                                                      [
                                                                                        _vm._v(
                                                                                          "mdi-format-list-bulleted-square"
                                                                                        )
                                                                                      ]
                                                                                    )
                                                                                  ],
                                                                                  1
                                                                                )
                                                                              ]
                                                                            }
                                                                          }
                                                                        ],
                                                                        null,
                                                                        true
                                                                      ),
                                                                      model: {
                                                                        value:
                                                                          todo.menu,
                                                                        callback: function(
                                                                          $$v
                                                                        ) {
                                                                          _vm.$set(
                                                                            todo,
                                                                            "menu",
                                                                            $$v
                                                                          )
                                                                        },
                                                                        expression:
                                                                          "todo.menu"
                                                                      }
                                                                    },
                                                                    [
                                                                      _vm._v(
                                                                        " "
                                                                      ),
                                                                      _c(
                                                                        "v-list",
                                                                        [
                                                                          _c(
                                                                            "v-list-item",
                                                                            {
                                                                              on: {
                                                                                click: function(
                                                                                  $event
                                                                                ) {
                                                                                  return _vm.$store.commit(
                                                                                    "tasks/EDIT_DIALOG_FORM",
                                                                                    {
                                                                                      task: todo
                                                                                    }
                                                                                  )
                                                                                }
                                                                              }
                                                                            },
                                                                            [
                                                                              _c(
                                                                                "v-list-item-title",
                                                                                [
                                                                                  _vm._v(
                                                                                    "Редактировать"
                                                                                  )
                                                                                ]
                                                                              )
                                                                            ],
                                                                            1
                                                                          ),
                                                                          _vm._v(
                                                                            " "
                                                                          ),
                                                                          _c(
                                                                            "v-list-item",
                                                                            {
                                                                              on: {
                                                                                click: function(
                                                                                  $event
                                                                                ) {
                                                                                  return _vm.$store.dispatch(
                                                                                    "tasks/DELETE_TASK",
                                                                                    todo
                                                                                  )
                                                                                }
                                                                              }
                                                                            },
                                                                            [
                                                                              _c(
                                                                                "v-list-item-title",
                                                                                [
                                                                                  _vm._v(
                                                                                    "Удалить"
                                                                                  )
                                                                                ]
                                                                              )
                                                                            ],
                                                                            1
                                                                          )
                                                                        ],
                                                                        1
                                                                      )
                                                                    ],
                                                                    1
                                                                  ),
                                                                  _vm._v(" "),
                                                                  _c(
                                                                    "v-btn",
                                                                    {
                                                                      staticClass:
                                                                        "mr-2",
                                                                      attrs: {
                                                                        outlined:
                                                                          "",
                                                                        fab: "",
                                                                        "x-small":
                                                                          "",
                                                                        color:
                                                                          "success"
                                                                      },
                                                                      on: {
                                                                        click: function(
                                                                          $event
                                                                        ) {
                                                                          return _vm.$store.dispatch(
                                                                            "tasks/DONE_TASK",
                                                                            {
                                                                              id:
                                                                                todo.id,
                                                                              completed: 1,
                                                                              index: indexTask
                                                                            }
                                                                          )
                                                                        }
                                                                      }
                                                                    },
                                                                    [
                                                                      _c(
                                                                        "v-icon",
                                                                        [
                                                                          _vm._v(
                                                                            "done"
                                                                          )
                                                                        ]
                                                                      )
                                                                    ],
                                                                    1
                                                                  )
                                                                ],
                                                                1
                                                              ),
                                                              _vm._v(" "),
                                                              _c(
                                                                "div",
                                                                {
                                                                  staticClass:
                                                                    "d-none d-sm-block .d-xl-flex"
                                                                },
                                                                [
                                                                  _c(
                                                                    "v-speed-dial",
                                                                    {
                                                                      attrs: {
                                                                        absolute:
                                                                          "",
                                                                        bottom:
                                                                          "",
                                                                        right:
                                                                          "",
                                                                        direction:
                                                                          "left",
                                                                        transition:
                                                                          "slide-y-reverse-transition"
                                                                      },
                                                                      model: {
                                                                        value: hover,
                                                                        callback: function(
                                                                          $$v
                                                                        ) {
                                                                          hover = $$v
                                                                        },
                                                                        expression:
                                                                          "hover"
                                                                      }
                                                                    },
                                                                    [
                                                                      _c(
                                                                        "v-btn",
                                                                        {
                                                                          attrs: {
                                                                            text:
                                                                              "",
                                                                            icon:
                                                                              "",
                                                                            color:
                                                                              "green"
                                                                          },
                                                                          on: {
                                                                            click: function(
                                                                              $event
                                                                            ) {
                                                                              return _vm.$store.dispatch(
                                                                                "tasks/DONE_TASK",
                                                                                {
                                                                                  id:
                                                                                    todo.id,
                                                                                  completed: 1,
                                                                                  index:
                                                                                    _vm.id
                                                                                }
                                                                              )
                                                                            }
                                                                          }
                                                                        },
                                                                        [
                                                                          _c(
                                                                            "v-icon",
                                                                            [
                                                                              _vm._v(
                                                                                "done"
                                                                              )
                                                                            ]
                                                                          )
                                                                        ],
                                                                        1
                                                                      ),
                                                                      _vm._v(
                                                                        " "
                                                                      ),
                                                                      _c(
                                                                        "v-btn",
                                                                        {
                                                                          attrs: {
                                                                            text:
                                                                              "",
                                                                            icon:
                                                                              "",
                                                                            color:
                                                                              "black"
                                                                          },
                                                                          on: {
                                                                            click: function(
                                                                              $event
                                                                            ) {
                                                                              return _vm.$store.commit(
                                                                                "tasks/EDIT_DIALOG_FORM",
                                                                                todo
                                                                              )
                                                                            }
                                                                          }
                                                                        },
                                                                        [
                                                                          _c(
                                                                            "v-icon",
                                                                            [
                                                                              _vm._v(
                                                                                "mdi-pencil"
                                                                              )
                                                                            ]
                                                                          )
                                                                        ],
                                                                        1
                                                                      ),
                                                                      _vm._v(
                                                                        " "
                                                                      ),
                                                                      _c(
                                                                        "v-btn",
                                                                        {
                                                                          attrs: {
                                                                            text:
                                                                              "",
                                                                            icon:
                                                                              "",
                                                                            color:
                                                                              "red"
                                                                          },
                                                                          on: {
                                                                            click: function(
                                                                              $event
                                                                            ) {
                                                                              return _vm.$store.dispatch(
                                                                                "tasks/DELETE_TASK",
                                                                                todo
                                                                              )
                                                                            }
                                                                          }
                                                                        },
                                                                        [
                                                                          _c(
                                                                            "v-icon",
                                                                            [
                                                                              _vm._v(
                                                                                "mdi-delete"
                                                                              )
                                                                            ]
                                                                          )
                                                                        ],
                                                                        1
                                                                      )
                                                                    ],
                                                                    1
                                                                  )
                                                                ],
                                                                1
                                                              )
                                                            ]
                                                          )
                                                        ],
                                                        1
                                                      )
                                                    : _c(
                                                        "div",
                                                        {
                                                          staticClass:
                                                            "return-task"
                                                        },
                                                        [
                                                          _c(
                                                            "v-btn",
                                                            {
                                                              staticClass:
                                                                "mx-2",
                                                              attrs: {
                                                                outlined: "",
                                                                color: "grey"
                                                              },
                                                              on: {
                                                                click: function(
                                                                  $event
                                                                ) {
                                                                  return _vm.$store.dispatch(
                                                                    "tasks/DONE_TASK",
                                                                    {
                                                                      id:
                                                                        todo.id,
                                                                      completed: 0,
                                                                      index: indexTask
                                                                    }
                                                                  )
                                                                }
                                                              }
                                                            },
                                                            [
                                                              _vm._v(
                                                                "\n                                            Вернуть задачу\n                                        "
                                                              )
                                                            ]
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "v-list-item-subtitle",
                                                            {
                                                              staticClass:
                                                                "text-wrap black--text text-left"
                                                            },
                                                            [
                                                              _vm._v(
                                                                "\n                                            " +
                                                                  _vm._s(
                                                                    todo.desc
                                                                  ) +
                                                                  "\n                                        "
                                                              )
                                                            ]
                                                          )
                                                        ],
                                                        1
                                                      )
                                                ]
                                              )
                                            ]
                                          }
                                        }
                                      ],
                                      null,
                                      true
                                    )
                                  })
                                : _vm._e()
                            }),
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm._l(_vm.sortedArray, function(task, i) {
                return !task.general && task.cat != 1
                  ? _c(
                      "v-slide-x-transition",
                      { key: i },
                      [_c("universal-card", { attrs: { id: i, task: task } })],
                      1
                    )
                  : _vm._e()
              })
            ],
            2
          ),
          _vm._v(" "),
          _vm.generalArray.length
            ? _c(
                "v-col",
                { attrs: { cols: "12", sm: "5" } },
                [
                  _c("v-divider"),
                  _vm._v(" "),
                  _c(
                    "v-col",
                    { staticStyle: { height: "50px" }, attrs: { sm: "12" } },
                    [
                      _vm._v(
                        "\n                    Общий список\n                "
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c("v-divider"),
                  _vm._v(" "),
                  _vm._l(_vm.generalArray, function(task, i) {
                    return _c(
                      "v-slide-x-transition",
                      { key: i },
                      [_c("universal-card", { attrs: { id: i, task: task } })],
                      1
                    )
                  })
                ],
                2
              )
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-dialog",
        {
          attrs: { "max-width": "600", fullscreen: _vm.ui_mobile },
          model: {
            value: _vm.FormOpen,
            callback: function($$v) {
              _vm.FormOpen = $$v
            },
            expression: "FormOpen"
          }
        },
        [
          _c(
            "v-card",
            [
              _c("v-card-title", { staticClass: "headline" }, [
                _vm._v(_vm._s(_vm.FormTitle))
              ]),
              _vm._v(" "),
              _c(
                "v-card-text",
                [
                  _c(
                    "v-form",
                    {
                      model: {
                        value: _vm.valid,
                        callback: function($$v) {
                          _vm.valid = $$v
                        },
                        expression: "valid"
                      }
                    },
                    [
                      _c(
                        "v-row",
                        [
                          _c(
                            "v-col",
                            { attrs: { cols: "12" } },
                            [
                              _c("ckeditor", {
                                attrs: {
                                  editor: _vm.editor,
                                  label: "Описание",
                                  rules: _vm.get_rules.task_desc,
                                  config: _vm.editorConfig
                                },
                                model: {
                                  value: _vm.task_desc,
                                  callback: function($$v) {
                                    _vm.task_desc = $$v
                                  },
                                  expression: "task_desc"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-col",
                            { attrs: { cols: "12" } },
                            [
                              _c("v-text-field", {
                                attrs: { label: "Статус" },
                                model: {
                                  value: _vm.task_status,
                                  callback: function($$v) {
                                    _vm.task_status = $$v
                                  },
                                  expression: "task_status"
                                }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-row",
                        [
                          _c(
                            "v-col",
                            [
                              _c("v-select", {
                                attrs: {
                                  items: _vm.options,
                                  label: "Приоритет",
                                  rules: _vm.get_rules.task_priority
                                },
                                model: {
                                  value: _vm.task_priority,
                                  callback: function($$v) {
                                    _vm.task_priority = $$v
                                  },
                                  expression: "task_priority"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-col",
                            [
                              _c("v-select", {
                                attrs: { items: _vm.cat, label: "Категория" },
                                model: {
                                  value: _vm.task_cat,
                                  callback: function($$v) {
                                    _vm.task_cat = $$v
                                  },
                                  expression: "task_cat"
                                }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-row",
                        [
                          _c(
                            "v-col",
                            [
                              _c("v-checkbox", {
                                attrs: { label: "Общий список" },
                                model: {
                                  value: _vm.task_general,
                                  callback: function($$v) {
                                    _vm.task_general = $$v
                                  },
                                  expression: "task_general"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-col",
                            [
                              _c("v-select", {
                                attrs: {
                                  items: _vm.houses,
                                  "item-text": "name",
                                  label: "Корпус",
                                  multiple: "",
                                  filled: "",
                                  shaped: "",
                                  "return-object": ""
                                },
                                model: {
                                  value: _vm.task_house,
                                  callback: function($$v) {
                                    _vm.task_house = $$v
                                  },
                                  expression: "task_house"
                                }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-card-actions",
                [
                  _c("v-spacer"),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { color: "green darken-1", text: "" },
                      on: {
                        click: function($event) {
                          return _vm.$store.commit("tasks/DIALOG_FORM_CLOSE")
                        }
                      }
                    },
                    [
                      _vm._v(
                        "\n                        Отмена\n                    "
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { color: "green darken-1", text: "" },
                      on: {
                        click: function($event) {
                          return _vm.$store.dispatch("tasks/SAVE_TASK")
                        }
                      }
                    },
                    [
                      _vm._v(
                        "\n                        " +
                          _vm._s(_vm.FormButtomTitle) +
                          "\n                    "
                      )
                    ]
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/modules/Tasks/TasksComponent.vue":
/*!******************************************************************!*\
  !*** ./resources/js/components/modules/Tasks/TasksComponent.vue ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TasksComponent_vue_vue_type_template_id_40173d43_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TasksComponent.vue?vue&type=template&id=40173d43&scoped=true& */ "./resources/js/components/modules/Tasks/TasksComponent.vue?vue&type=template&id=40173d43&scoped=true&");
/* harmony import */ var _TasksComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TasksComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/modules/Tasks/TasksComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _TasksComponent_vue_vue_type_style_index_0_id_40173d43_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TasksComponent.vue?vue&type=style&index=0&id=40173d43&scoped=true&lang=scss& */ "./resources/js/components/modules/Tasks/TasksComponent.vue?vue&type=style&index=0&id=40173d43&scoped=true&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _TasksComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TasksComponent_vue_vue_type_template_id_40173d43_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _TasksComponent_vue_vue_type_template_id_40173d43_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "40173d43",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/modules/Tasks/TasksComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/modules/Tasks/TasksComponent.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/modules/Tasks/TasksComponent.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TasksComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./TasksComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/modules/Tasks/TasksComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TasksComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/modules/Tasks/TasksComponent.vue?vue&type=style&index=0&id=40173d43&scoped=true&lang=scss&":
/*!****************************************************************************************************************************!*\
  !*** ./resources/js/components/modules/Tasks/TasksComponent.vue?vue&type=style&index=0&id=40173d43&scoped=true&lang=scss& ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TasksComponent_vue_vue_type_style_index_0_id_40173d43_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/vue-loader/lib??vue-loader-options!./TasksComponent.vue?vue&type=style&index=0&id=40173d43&scoped=true&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/modules/Tasks/TasksComponent.vue?vue&type=style&index=0&id=40173d43&scoped=true&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TasksComponent_vue_vue_type_style_index_0_id_40173d43_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TasksComponent_vue_vue_type_style_index_0_id_40173d43_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TasksComponent_vue_vue_type_style_index_0_id_40173d43_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TasksComponent_vue_vue_type_style_index_0_id_40173d43_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TasksComponent_vue_vue_type_style_index_0_id_40173d43_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/modules/Tasks/TasksComponent.vue?vue&type=template&id=40173d43&scoped=true&":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/components/modules/Tasks/TasksComponent.vue?vue&type=template&id=40173d43&scoped=true& ***!
  \*************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TasksComponent_vue_vue_type_template_id_40173d43_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./TasksComponent.vue?vue&type=template&id=40173d43&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/modules/Tasks/TasksComponent.vue?vue&type=template&id=40173d43&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TasksComponent_vue_vue_type_template_id_40173d43_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TasksComponent_vue_vue_type_template_id_40173d43_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);