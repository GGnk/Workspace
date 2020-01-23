(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/modules/Version/VerComponent.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/modules/Version/VerComponent.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************/
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
var COLORS = ['info', 'warning', 'error', 'success'];
var ICONS = {
  info: 'mdi-information',
  warning: 'mdi-alert',
  error: 'mdi-alert-circle',
  success: 'mdi-check-circle'
};
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "VerComponent",
  components: {
    'news': function news() {
      return __webpack_require__.e(/*! import() */ 1).then(__webpack_require__.bind(null, /*! ../News/news */ "./resources/js/components/modules/News/news.vue"));
    }
  },
  data: function data() {
    return {
      events: [],
      input: null,
      nonce: 0
    };
  },
  computed: {
    timeline: function timeline() {
      return this.events.slice().reverse();
    }
  },
  created: function created() {},
  mounted: function mounted() {},
  watch: {},
  methods: {
    comment: function comment() {
      var time = new Date().toTimeString();
      this.events.push({
        id: this.nonce++,
        text: this.input,
        time: time.replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, function (match, contents, offset) {
          return " ".concat(contents.split(' ').map(function (v) {
            return v.charAt(0);
          }).join(''));
        })
      });
      this.input = null;
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/modules/Version/VerComponent.vue?vue&type=template&id=4883f384&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/modules/Version/VerComponent.vue?vue&type=template&id=4883f384&scoped=true& ***!
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
    "v-row",
    { staticClass: "layout wrap", attrs: { dense: "" } },
    [
      _c(
        "v-col",
        { staticClass: "mb-2 px-2" },
        [
          _c(
            "v-timeline",
            { attrs: { "align-top": "" } },
            [
              _c(
                "v-timeline-item",
                {
                  staticClass: " mb-12",
                  attrs: { color: "green" },
                  scopedSlots: _vm._u([
                    {
                      key: "icon",
                      fn: function() {
                        return [_c("span", [_vm._v("NEW")])]
                      },
                      proxy: true
                    }
                  ])
                },
                [
                  _c(
                    "span",
                    { attrs: { slot: "opposite" }, slot: "opposite" },
                    [_vm._v("Что ты изменил на этот раз???")]
                  ),
                  _vm._v(" "),
                  _vm._v(" "),
                  _c("v-text-field", {
                    attrs: {
                      "hide-details": "",
                      flat: "",
                      label: "Добавь изменения...",
                      solo: ""
                    },
                    on: {
                      keydown: function($event) {
                        if (
                          !$event.type.indexOf("key") &&
                          _vm._k(
                            $event.keyCode,
                            "enter",
                            13,
                            $event.key,
                            "Enter"
                          )
                        ) {
                          return null
                        }
                        return _vm.comment($event)
                      }
                    },
                    scopedSlots: _vm._u([
                      {
                        key: "append",
                        fn: function() {
                          return [
                            _c(
                              "v-btn",
                              {
                                staticClass: "mx-0",
                                attrs: { depressed: "" },
                                on: { click: _vm.comment }
                              },
                              [
                                _vm._v(
                                  "\n                            Добавить\n                        "
                                )
                              ]
                            )
                          ]
                        },
                        proxy: true
                      }
                    ]),
                    model: {
                      value: _vm.input,
                      callback: function($$v) {
                        _vm.input = $$v
                      },
                      expression: "input"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-slide-x-transition",
                { attrs: { group: "" } },
                _vm._l(_vm.timeline, function(event) {
                  return _c(
                    "v-timeline-item",
                    {
                      key: event.id,
                      staticClass: "mb-4",
                      attrs: { color: "pink" },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "icon",
                            fn: function() {
                              return [
                                _c("v-avatar", [
                                  _c("img", {
                                    attrs: { src: "http://i.pravatar.cc/64" }
                                  })
                                ])
                              ]
                            },
                            proxy: true
                          }
                        ],
                        null,
                        true
                      )
                    },
                    [
                      _vm._v(" "),
                      _c(
                        "span",
                        { attrs: { slot: "opposite" }, slot: "opposite" },
                        [_vm._v("Commit on " + _vm._s(event.time))]
                      ),
                      _vm._v(" "),
                      _c(
                        "v-card",
                        { staticClass: "elevation-2" },
                        [
                          _c("v-card-title", { staticClass: "headline" }, [
                            _vm._v("Тут будет заголовок")
                          ]),
                          _vm._v(" "),
                          _c("v-card-text", {
                            domProps: { textContent: _vm._s(event.text) }
                          })
                        ],
                        1
                      )
                    ],
                    1
                  )
                }),
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
        "v-flex",
        { staticClass: "mb-2 px-2", attrs: { lg3: "", sm3: "", xs12: "" } },
        [_c("news", { attrs: { title: "Саратова" } })],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/modules/Version/VerComponent.vue":
/*!******************************************************************!*\
  !*** ./resources/js/components/modules/Version/VerComponent.vue ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VerComponent_vue_vue_type_template_id_4883f384_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VerComponent.vue?vue&type=template&id=4883f384&scoped=true& */ "./resources/js/components/modules/Version/VerComponent.vue?vue&type=template&id=4883f384&scoped=true&");
/* harmony import */ var _VerComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VerComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/modules/Version/VerComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _VerComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _VerComponent_vue_vue_type_template_id_4883f384_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _VerComponent_vue_vue_type_template_id_4883f384_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "4883f384",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/modules/Version/VerComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/modules/Version/VerComponent.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/modules/Version/VerComponent.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VerComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./VerComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/modules/Version/VerComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VerComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/modules/Version/VerComponent.vue?vue&type=template&id=4883f384&scoped=true&":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/components/modules/Version/VerComponent.vue?vue&type=template&id=4883f384&scoped=true& ***!
  \*************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VerComponent_vue_vue_type_template_id_4883f384_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./VerComponent.vue?vue&type=template&id=4883f384&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/modules/Version/VerComponent.vue?vue&type=template&id=4883f384&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VerComponent_vue_vue_type_template_id_4883f384_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VerComponent_vue_vue_type_template_id_4883f384_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);