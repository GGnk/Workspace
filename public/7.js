(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/modules/Tasks/blocks/universal-card.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/modules/Tasks/blocks/universal-card.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "universal-card",
  props: {
    task: {
      type: Object,
      required: false,
      "default": null
    },
    id: {
      type: Number,
      required: false,
      "default": null
    }
  },
  components: {},
  data: function data() {
    return {
      items: [{
        title: 'Home',
        icon: 'dashboard'
      }, {
        title: 'About',
        icon: 'question_answer'
      }],
      mouseEvent: null,
      visible: false,
      mouseOption: {}
    };
  },
  computed: {},
  methods: {
    popMenu: function popMenu(e) {
      var self = this;
      console.log(e);

      if (e.button === 0) {
        self.mouseEvent = e.clientX;
        self.visible = true;
      } else if (e.movementX > 0) {
        self.visible = false;
      }
    },
    clickLi: function clickLi(item) {
      alert(JSON.stringify(item));
      this.visible = false;
    },
    log: function log(item) {
      return console.log(item);
    },
    color_status: function color_status(status) {
      switch (status) {
        case 1:
          return 'accent';

        case 2:
          return 'warning lighten-2';

        case 3:
          return 'error lighten-2';
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/modules/Tasks/blocks/universal-card.vue?vue&type=style&index=0&id=1a746997&scoped=true&lang=scss&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/modules/Tasks/blocks/universal-card.vue?vue&type=style&index=0&id=1a746997&scoped=true&lang=scss& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".return-task[data-v-1a746997] {\n  align-items: center;\n  display: flex;\n  flex: 1 1 100%;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/modules/Tasks/blocks/universal-card.vue?vue&type=style&index=0&id=1a746997&scoped=true&lang=scss&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/modules/Tasks/blocks/universal-card.vue?vue&type=style&index=0&id=1a746997&scoped=true&lang=scss& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./universal-card.vue?vue&type=style&index=0&id=1a746997&scoped=true&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/modules/Tasks/blocks/universal-card.vue?vue&type=style&index=0&id=1a746997&scoped=true&lang=scss&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/modules/Tasks/blocks/universal-card.vue?vue&type=template&id=1a746997&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/modules/Tasks/blocks/universal-card.vue?vue&type=template&id=1a746997&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************/
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
  return _c("v-hover", {
    attrs: { "open-delay": 0, "close-delay": 0 },
    scopedSlots: _vm._u([
      {
        key: "default",
        fn: function(ref) {
          var hover = ref.hover
          return [
            _c(
              "v-card",
              {
                staticClass: "mb-2",
                style:
                  "border:1px solid " +
                  (_vm.task.priority > 2 ? "#ff8c84" : "#82b1ff") +
                  ";" +
                  "border-left:" +
                  _vm.task.priority * 3 +
                  "px solid " +
                  (_vm.task.priority > 2 ? "#ff8c84" : "#82b1ff") +
                  "!important;",
                attrs: { elevation: hover ? 16 : 2, id: _vm.id }
              },
              [
                !_vm.task.completed
                  ? _c(
                      "v-card-text",
                      { staticClass: "pb-2 font-weight-bold text-break" },
                      [
                        _c(
                          "span",
                          {
                            staticClass:
                              "position-absolute font-italic font-weight-medium caption",
                            class: _vm.color_status(_vm.task.priority),
                            staticStyle: { bottom: "0", left: "0" }
                          },
                          [_vm._v(_vm._s(_vm.task.status))]
                        ),
                        _vm._v(" "),
                        _c(
                          "v-row",
                          [
                            _c(
                              "v-col",
                              {
                                staticClass: "pa-0",
                                attrs: { md: "", cols: "12" }
                              },
                              [
                                _c("div", {
                                  domProps: { innerHTML: _vm._s(_vm.task.desc) }
                                })
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "v-col",
                              {
                                staticClass: "d-sm-none pa-0 text-right",
                                attrs: { md: "3" }
                              },
                              [
                                _c(
                                  "v-menu",
                                  {
                                    attrs: {
                                      "close-on-click": "",
                                      "close-on-content-click": "",
                                      "offset-y": ""
                                    },
                                    scopedSlots: _vm._u(
                                      [
                                        {
                                          key: "activator",
                                          fn: function(ref) {
                                            var on = ref.on
                                            return [
                                              _c(
                                                "v-btn",
                                                _vm._g(
                                                  {
                                                    staticClass: "ml-2",
                                                    attrs: {
                                                      outlined: "",
                                                      fab: "",
                                                      "x-small": "",
                                                      color: "accent"
                                                    }
                                                  },
                                                  on
                                                ),
                                                [
                                                  _c("v-icon", [
                                                    _vm._v(
                                                      "mdi-format-list-bulleted-square"
                                                    )
                                                  ])
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
                                      value: _vm.task.menu,
                                      callback: function($$v) {
                                        _vm.$set(_vm.task, "menu", $$v)
                                      },
                                      expression: "task.menu"
                                    }
                                  },
                                  [
                                    _vm._v(" "),
                                    _c(
                                      "v-list",
                                      [
                                        _c(
                                          "v-list-item",
                                          {
                                            on: {
                                              click: function($event) {
                                                return _vm.$store.commit(
                                                  "tasks/EDIT_DIALOG_FORM",
                                                  _vm.task
                                                )
                                              }
                                            }
                                          },
                                          [
                                            _c("v-list-item-title", [
                                              _vm._v("Редактировать")
                                            ])
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "v-list-item",
                                          {
                                            on: {
                                              click: function($event) {
                                                return _vm.$store.dispatch(
                                                  "tasks/DELETE_TASK",
                                                  _vm.task
                                                )
                                              }
                                            }
                                          },
                                          [
                                            _c("v-list-item-title", [
                                              _vm._v("Удалить")
                                            ])
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
                                    staticClass: "ml-2",
                                    attrs: {
                                      outlined: "",
                                      fab: "",
                                      "x-small": "",
                                      color: "success"
                                    },
                                    on: {
                                      click: function($event) {
                                        return _vm.$store.dispatch(
                                          "tasks/DONE_TASK",
                                          {
                                            id: _vm.task.id,
                                            completed: 1,
                                            index: _vm.id
                                          }
                                        )
                                      }
                                    }
                                  },
                                  [_c("v-icon", [_vm._v("done")])],
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
                          "v-speed-dial",
                          {
                            staticClass: "d-none d-sm-block .d-xl-flex",
                            attrs: {
                              absolute: "",
                              bottom: "",
                              right: "",
                              direction: "left",
                              transition: "slide-y-reverse-transition"
                            },
                            model: {
                              value: hover,
                              callback: function($$v) {
                                hover = $$v
                              },
                              expression: "hover"
                            }
                          },
                          [
                            _c(
                              "v-btn",
                              {
                                attrs: { text: "", icon: "", color: "green" },
                                on: {
                                  click: function($event) {
                                    return _vm.$store.dispatch(
                                      "tasks/DONE_TASK",
                                      { id: _vm.task.id, completed: 1 }
                                    )
                                  }
                                }
                              },
                              [_c("v-icon", [_vm._v("done")])],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-btn",
                              {
                                attrs: { text: "", icon: "", color: "dark" },
                                on: {
                                  click: function($event) {
                                    return _vm.$store.commit(
                                      "tasks/EDIT_DIALOG_FORM",
                                      _vm.task
                                    )
                                  }
                                }
                              },
                              [_c("v-icon", [_vm._v("mdi-pencil")])],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-btn",
                              {
                                attrs: { text: "", icon: "", color: "red" },
                                on: {
                                  click: function($event) {
                                    return _vm.$store.dispatch(
                                      "tasks/DELETE_TASK",
                                      _vm.task
                                    )
                                  }
                                }
                              },
                              [_c("v-icon", [_vm._v("mdi-delete")])],
                              1
                            )
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _vm.task.house
                          ? _c(
                              "v-row",
                              {
                                staticClass: "py-3 chip-my",
                                attrs: { cols: "12" }
                              },
                              _vm._l(_vm.task.house, function(house, i) {
                                return _c(
                                  "v-chip",
                                  {
                                    key: i,
                                    staticStyle: {
                                      "min-width": "30%",
                                      "max-width": "50%"
                                    },
                                    attrs: {
                                      value: house.id,
                                      title: house.name,
                                      close: ""
                                    },
                                    on: {
                                      "click:close": function($event) {
                                        return _vm.$store.dispatch(
                                          "tasks/DELETE_RELATION",
                                          {
                                            task_id: _vm.task.id,
                                            task_index: _vm.id,
                                            relation_id: house.id
                                          }
                                        )
                                      }
                                    }
                                  },
                                  [
                                    _c(
                                      "v-col",
                                      {
                                        staticClass:
                                          "caption d-inline-block text-truncate"
                                      },
                                      [_vm._v(_vm._s(house.name))]
                                    )
                                  ],
                                  1
                                )
                              }),
                              1
                            )
                          : _vm._e()
                      ],
                      1
                    )
                  : _c(
                      "v-card-text",
                      [
                        _c(
                          "v-btn",
                          {
                            staticClass: "mx-2",
                            attrs: { outlined: "", color: "grey" },
                            on: {
                              click: function($event) {
                                return _vm.$store.dispatch("tasks/DONE_TASK", {
                                  id: _vm.task.id,
                                  completed: 0,
                                  index: _vm.id
                                })
                              }
                            }
                          },
                          [
                            _vm._v(
                              "\n                Вернуть задачу\n            "
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _c("v-list-item-subtitle", {
                          staticClass: "text-wrap black--text text-left",
                          domProps: { innerHTML: _vm._s(_vm.task.desc) }
                        })
                      ],
                      1
                    )
              ],
              1
            )
          ]
        }
      }
    ])
  })
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/modules/Tasks/blocks/universal-card.vue":
/*!*************************************************************************!*\
  !*** ./resources/js/components/modules/Tasks/blocks/universal-card.vue ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _universal_card_vue_vue_type_template_id_1a746997_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./universal-card.vue?vue&type=template&id=1a746997&scoped=true& */ "./resources/js/components/modules/Tasks/blocks/universal-card.vue?vue&type=template&id=1a746997&scoped=true&");
/* harmony import */ var _universal_card_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./universal-card.vue?vue&type=script&lang=js& */ "./resources/js/components/modules/Tasks/blocks/universal-card.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _universal_card_vue_vue_type_style_index_0_id_1a746997_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./universal-card.vue?vue&type=style&index=0&id=1a746997&scoped=true&lang=scss& */ "./resources/js/components/modules/Tasks/blocks/universal-card.vue?vue&type=style&index=0&id=1a746997&scoped=true&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _universal_card_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _universal_card_vue_vue_type_template_id_1a746997_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _universal_card_vue_vue_type_template_id_1a746997_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "1a746997",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/modules/Tasks/blocks/universal-card.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/modules/Tasks/blocks/universal-card.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/components/modules/Tasks/blocks/universal-card.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_universal_card_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./universal-card.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/modules/Tasks/blocks/universal-card.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_universal_card_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/modules/Tasks/blocks/universal-card.vue?vue&type=style&index=0&id=1a746997&scoped=true&lang=scss&":
/*!***********************************************************************************************************************************!*\
  !*** ./resources/js/components/modules/Tasks/blocks/universal-card.vue?vue&type=style&index=0&id=1a746997&scoped=true&lang=scss& ***!
  \***********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_universal_card_vue_vue_type_style_index_0_id_1a746997_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader!../../../../../../node_modules/css-loader!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./universal-card.vue?vue&type=style&index=0&id=1a746997&scoped=true&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/modules/Tasks/blocks/universal-card.vue?vue&type=style&index=0&id=1a746997&scoped=true&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_universal_card_vue_vue_type_style_index_0_id_1a746997_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_universal_card_vue_vue_type_style_index_0_id_1a746997_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_universal_card_vue_vue_type_style_index_0_id_1a746997_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_universal_card_vue_vue_type_style_index_0_id_1a746997_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_universal_card_vue_vue_type_style_index_0_id_1a746997_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/modules/Tasks/blocks/universal-card.vue?vue&type=template&id=1a746997&scoped=true&":
/*!********************************************************************************************************************!*\
  !*** ./resources/js/components/modules/Tasks/blocks/universal-card.vue?vue&type=template&id=1a746997&scoped=true& ***!
  \********************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_universal_card_vue_vue_type_template_id_1a746997_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./universal-card.vue?vue&type=template&id=1a746997&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/modules/Tasks/blocks/universal-card.vue?vue&type=template&id=1a746997&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_universal_card_vue_vue_type_template_id_1a746997_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_universal_card_vue_vue_type_template_id_1a746997_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);