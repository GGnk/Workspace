(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/blocks/fullScreenSetting.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/blocks/fullScreenSetting.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "fullScreenSetting",
  props: ['item'],
  computed: {
    model: {
      get: function get() {
        return this.$store.getters['config/full_screen_setting'];
      },
      set: function set() {
        return this.$store.commit('config/TF_CONFIG', 'full_screen_setting');
      }
    },
    theme: {
      get: function get() {
        return this.$vuetify.theme.dark;
      },
      set: function set() {
        return this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      }
    }
  },
  data: function data() {
    return {
      notifications: false,
      sound: true,
      widgets: false
    };
  },
  methods: {
    btn_menu: function btn_menu() {
      this.$store.commit('config/TF_CONFIG', 'full_screen_setting');
    }
  },
  mounted: function mounted() {}
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/blocks/fullScreenSetting.vue?vue&type=template&id=521988b8&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/blocks/fullScreenSetting.vue?vue&type=template&id=521988b8&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************/
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
    "v-dialog",
    {
      attrs: {
        fullscreen: "",
        "hide-overlay": "",
        transition: "dialog-bottom-transition"
      },
      scopedSlots: _vm._u([
        {
          key: "activator",
          fn: function(ref) {
            var on = ref.on
            return [
              _c(
                "div",
                _vm._g({ staticStyle: { display: "contents" } }, on),
                [
                  _c(
                    "v-list-item-action",
                    [_c("v-icon", [_vm._v(_vm._s(_vm.item.icon))])],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item-content",
                    [
                      _c("v-list-item-title", { staticClass: "grey--text" }, [
                        _vm._v(
                          "\n                        " +
                            _vm._s(_vm.item.text) +
                            "\n                    "
                        )
                      ])
                    ],
                    1
                  )
                ],
                1
              )
            ]
          }
        }
      ]),
      model: {
        value: _vm.model,
        callback: function($$v) {
          _vm.model = $$v
        },
        expression: "model"
      }
    },
    [
      _vm._v(" "),
      _c(
        "v-card",
        [
          _c(
            "v-toolbar",
            { attrs: { dark: "", color: "primary" } },
            [
              _c(
                "v-btn",
                { attrs: { icon: "" }, on: { click: _vm.btn_menu } },
                [_c("v-icon", [_vm._v("mdi-close")])],
                1
              ),
              _vm._v(" "),
              _c("v-toolbar-title", [_vm._v("Настройки")]),
              _vm._v(" "),
              _c("v-spacer")
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-list",
            { attrs: { "three-line": "", subheader: "" } },
            [
              _c(
                "v-list-item",
                [
                  _c(
                    "v-list-item-content",
                    [
                      _c("v-list-item-title", [_vm._v("Общие настройки")]),
                      _vm._v(" "),
                      _c("v-list-item-subtitle", [
                        _vm._v(
                          "Изменения в системе сохраняются в базе данных, для каждого пользователя отдельно!"
                        )
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
          _c("v-divider"),
          _vm._v(" "),
          this.$store.getters["config/auth"]
            ? _c(
                "v-list",
                { attrs: { "three-line": "", subheader: "" } },
                [
                  _c("v-subheader", [_vm._v("Общие")]),
                  _vm._v(" "),
                  _c(
                    "v-list-item",
                    [
                      _c(
                        "v-list-item-action",
                        [
                          _c("v-switch", {
                            staticClass: "mx-4",
                            model: {
                              value: _vm.theme,
                              callback: function($$v) {
                                _vm.theme = $$v
                              },
                              expression: "theme"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-list-item-content",
                        [
                          _c("v-list-item-title", [_vm._v("Темная тема")]),
                          _vm._v(" "),
                          _c("v-list-item-subtitle", [
                            _vm._v(
                              "Все возможные элементы на странице будут иметь фон - цвета 'dark', текст - 'white'."
                            )
                          ])
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            : _vm._e()
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

/***/ "./resources/js/components/views/blocks/fullScreenSetting.vue":
/*!********************************************************************!*\
  !*** ./resources/js/components/views/blocks/fullScreenSetting.vue ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fullScreenSetting_vue_vue_type_template_id_521988b8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fullScreenSetting.vue?vue&type=template&id=521988b8&scoped=true& */ "./resources/js/components/views/blocks/fullScreenSetting.vue?vue&type=template&id=521988b8&scoped=true&");
/* harmony import */ var _fullScreenSetting_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fullScreenSetting.vue?vue&type=script&lang=js& */ "./resources/js/components/views/blocks/fullScreenSetting.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _fullScreenSetting_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _fullScreenSetting_vue_vue_type_template_id_521988b8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _fullScreenSetting_vue_vue_type_template_id_521988b8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "521988b8",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/views/blocks/fullScreenSetting.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/views/blocks/fullScreenSetting.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/components/views/blocks/fullScreenSetting.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_fullScreenSetting_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./fullScreenSetting.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/blocks/fullScreenSetting.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_fullScreenSetting_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/views/blocks/fullScreenSetting.vue?vue&type=template&id=521988b8&scoped=true&":
/*!***************************************************************************************************************!*\
  !*** ./resources/js/components/views/blocks/fullScreenSetting.vue?vue&type=template&id=521988b8&scoped=true& ***!
  \***************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_fullScreenSetting_vue_vue_type_template_id_521988b8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./fullScreenSetting.vue?vue&type=template&id=521988b8&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/blocks/fullScreenSetting.vue?vue&type=template&id=521988b8&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_fullScreenSetting_vue_vue_type_template_id_521988b8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_fullScreenSetting_vue_vue_type_template_id_521988b8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);