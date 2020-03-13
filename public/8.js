(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/modules/Posts/PostsComponent.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/modules/Posts/PostsComponent.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
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

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Posts",
  components: {// 'mac-header':  () => import ('./etc/mac-header')
  },
  props: [],
  data: function data() {
    return {
      overlay: false,
      editPost: false,
      edit: {
        title: false,
        desc: false
      }
    };
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])('posts', ['get_posts', 'get_post', 'dialogForm', 'dialogFormButtomTitle', 'dialogFormTitle', 'dialogFormUpdate', 'get_rules', 'dialogFormValid', 'get_alert', 'get_alert_message']), {}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])('config', ['ui_mobile']), {}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])(['get_input_search_posts', 'get_results_search', 'get_error_search', 'loading_search', 'switchModeSearch']), {
    input_posts: {
      get: function get() {
        return this.get_input_search_posts;
      },
      set: function set(value) {
        this.$store.commit('INPUT_SET_POSTS', value);
      }
    },
    dialog: {
      get: function get() {
        return this.dialogForm;
      },
      set: function set(value) {
        this.$store.commit('posts/DIALOG_FORM_CLOSE');
      }
    },
    alert: {
      get: function get() {
        return this.get_alert;
      },
      set: function set(value) {
        this.$store.commit('posts/ALERT_CLOSE');
      }
    },
    valid: {
      get: function get() {
        return this.dialogFormValid;
      },
      set: function set(value) {
        this.$store.commit('posts/DIALOG_FORM_VALID', value);
      }
    },
    post_title: {
      get: function get() {
        return this.get_post.title;
      },
      set: function set(value) {
        this.$store.commit('posts/INPUT_POST_FORM', {
          vv: 'title',
          value: value
        });
      }
    },
    post_desc: {
      get: function get() {
        return this.get_post.description;
      },
      set: function set(value) {
        this.$store.commit('posts/INPUT_POST_FORM', {
          vv: 'description',
          value: value
        });
      }
    },
    post_img: {
      get: function get() {
        return this.get_post.img;
      },
      set: function set(value) {
        this.$store.commit('posts/INPUT_POST_FORM', {
          vv: 'img',
          value: value
        });
      }
    },
    post_files: {
      get: function get() {
        return this.get_post.files;
      },
      set: function set(value) {
        this.$store.commit('posts/INPUT_POST_FORM', {
          vv: 'files',
          value: value
        });
      }
    }
  }),
  created: function created() {
    this.FETCH_DATA();
  },
  mounted: function mounted() {},
  watch: {
    input_posts: function input_posts(newInput, oldInput) {
      this.SEARCH_INFO('posts');
    }
  },
  filters: {
    moment: function (_moment) {
      function moment(_x) {
        return _moment.apply(this, arguments);
      }

      moment.toString = function () {
        return _moment.toString();
      };

      return moment;
    }(function (date) {
      moment.locale('ru');
      return moment(date).fromNow();
    })
  },
  methods: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])('posts', ['FETCH_DATA']), {}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])(['SEARCH_INFO']), {
    editP: function editP(key) {
      this.edit[key] = true;
    },
    endEditP: function endEditP(key) {
      this.edit[key] = false;
    }
  })
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/modules/Posts/PostsComponent.vue?vue&type=template&id=4fe15cb9&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/modules/Posts/PostsComponent.vue?vue&type=template&id=4fe15cb9&scoped=true& ***!
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
    "v-card",
    { staticClass: "mx-auto" },
    [
      _c(
        "v-snackbar",
        {
          attrs: {
            color: _vm.get_alert_message.type,
            right: "",
            timeout: 5000,
            top: ""
          },
          model: {
            value: _vm.alert,
            callback: function($$v) {
              _vm.alert = $$v
            },
            expression: "alert"
          }
        },
        [
          _vm._v(
            "\n        " + _vm._s(_vm.get_alert_message.text) + "\n        "
          ),
          _c(
            "v-btn",
            {
              attrs: { dark: "", text: "" },
              on: {
                click: function($event) {
                  return _vm.$store.commit("posts/ALERT_CLOSE")
                }
              }
            },
            [_vm._v("\n            Close\n        ")]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-toolbar",
        { attrs: { color: "white" } },
        [
          _c("v-text-field", {
            attrs: {
              "append-icon": "search",
              label: "Найти",
              loading: _vm.loading_search,
              "single-line": "",
              "hide-details": ""
            },
            on: {
              keydown: [
                function($event) {
                  if (
                    !$event.type.indexOf("key") &&
                    _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                  ) {
                    return null
                  }
                  return _vm.$store.dispatch("SEARCH_INFO", "posts")
                },
                function($event) {
                  if (
                    !$event.type.indexOf("key") &&
                    _vm._k($event.keyCode, "esc", 27, $event.key, [
                      "Esc",
                      "Escape"
                    ])
                  ) {
                    return null
                  }
                  return _vm.$store.commit("INPUT_SET", "")
                }
              ]
            },
            model: {
              value: _vm.input_posts,
              callback: function($$v) {
                _vm.input_posts = $$v
              },
              expression: "input_posts"
            }
          }),
          _vm._v(" "),
          _c(
            "v-btn",
            {
              staticClass: "mb-2",
              attrs: { color: "primary", icon: "", dark: "" },
              on: {
                click: function($event) {
                  return _vm.$store.commit("posts/DIALOG_FORM_OPEN")
                }
              }
            },
            [_c("v-icon", [_vm._v("add")])],
            1
          ),
          _vm._v(" "),
          _c(
            "v-dialog",
            {
              model: {
                value: _vm.dialog,
                callback: function($$v) {
                  _vm.dialog = $$v
                },
                expression: "dialog"
              }
            },
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
                    { staticClass: "ma-0" },
                    [
                      _c(
                        "v-col",
                        {
                          staticClass: "pa-0",
                          staticStyle: { display: "grid" },
                          attrs: { cols: "4" }
                        },
                        [
                          _c(
                            "v-card",
                            [
                              _c("v-card-title", { staticClass: "headline" }, [
                                _vm._v(_vm._s(_vm.dialogFormTitle))
                              ]),
                              _vm._v(" "),
                              _c(
                                "v-card-text",
                                [
                                  _c(
                                    "v-col",
                                    { staticClass: "text-center" },
                                    [
                                      _vm.dialogFormUpdate
                                        ? _c("v-file-input", {
                                            attrs: {
                                              rules: _vm.get_rules.post_img,
                                              accept:
                                                "image/png, image/jpeg, image/bmp",
                                              placeholder:
                                                "Загрузите картинку для поста",
                                              "prepend-icon": "mdi-camera",
                                              label: "IMG"
                                            },
                                            model: {
                                              value: _vm.post_img,
                                              callback: function($$v) {
                                                _vm.post_img = $$v
                                              },
                                              expression: "post_img"
                                            }
                                          })
                                        : _c("v-hover", {
                                            scopedSlots: _vm._u([
                                              {
                                                key: "default",
                                                fn: function(ref) {
                                                  var hover = ref.hover
                                                  return [
                                                    _c(
                                                      "div",
                                                      [
                                                        _c(
                                                          "v-avatar",
                                                          {
                                                            attrs: {
                                                              size: "150",
                                                              tile: ""
                                                            }
                                                          },
                                                          [
                                                            _vm.post_img
                                                              ? _c("img", {
                                                                  attrs: {
                                                                    src:
                                                                      "/storage/" +
                                                                      _vm.post_img
                                                                  }
                                                                })
                                                              : _c("v-icon", [
                                                                  _vm._v(
                                                                    "mdi-camera"
                                                                  )
                                                                ])
                                                          ],
                                                          1
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "v-fade-transition",
                                                          [
                                                            hover
                                                              ? _c(
                                                                  "v-overlay",
                                                                  {
                                                                    attrs: {
                                                                      absolute:
                                                                        "",
                                                                      color:
                                                                        "#036358"
                                                                    }
                                                                  },
                                                                  [
                                                                    _c(
                                                                      "v-btn",
                                                                      [
                                                                        _vm._v(
                                                                          _vm._s(
                                                                            _vm.post_img
                                                                              ? "Сменить картинку"
                                                                              : "Загрузить картинку"
                                                                          )
                                                                        )
                                                                      ]
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
                                                  ]
                                                }
                                              }
                                            ])
                                          })
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c("v-file-input", {
                                    attrs: {
                                      rules: _vm.get_rules.post_files,
                                      placeholder: "Загрузите документы",
                                      label: "Файлы",
                                      multiple: "",
                                      "prepend-icon": "mdi-paperclip"
                                    },
                                    model: {
                                      value: _vm.post_files,
                                      callback: function($$v) {
                                        _vm.post_files = $$v
                                      },
                                      expression: "post_files"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _vm._l(_vm.post_files, function(file, i) {
                                    return _c(
                                      "v-tooltip",
                                      {
                                        key: i,
                                        attrs: { bottom: "" },
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
                                                        attrs: {
                                                          icon: "",
                                                          href:
                                                            "/storage/" +
                                                            file.path,
                                                          title: "",
                                                          target: "_blank"
                                                        }
                                                      },
                                                      on
                                                    ),
                                                    [
                                                      _c("v-icon", [
                                                        _vm._v(
                                                          "insert_drive_file"
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
                                        )
                                      },
                                      [
                                        _vm._v(" "),
                                        _c("span", [_vm._v(_vm._s(file.name))])
                                      ]
                                    )
                                  })
                                ],
                                2
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
                                      attrs: {
                                        color: "green darken-1",
                                        text: ""
                                      },
                                      on: {
                                        click: function($event) {
                                          return _vm.$store.commit(
                                            "posts/DIALOG_FORM_CLOSE"
                                          )
                                        }
                                      }
                                    },
                                    [
                                      _vm._v(
                                        "\n                                        Отмена\n                                    "
                                      )
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-btn",
                                    {
                                      attrs: {
                                        color: "green darken-1",
                                        text: ""
                                      },
                                      on: {
                                        click: function($event) {
                                          return _vm.$store.dispatch(
                                            "posts/SAVE_POST"
                                          )
                                        }
                                      }
                                    },
                                    [
                                      _vm._v(
                                        "\n                                        " +
                                          _vm._s(_vm.dialogFormButtomTitle) +
                                          "\n                                    "
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
                        "v-col",
                        {
                          staticClass: "pa-0",
                          staticStyle: { display: "grid" },
                          attrs: { cols: "8" }
                        },
                        [
                          _c(
                            "v-card",
                            [
                              _c(
                                "v-card-title",
                                {
                                  staticClass: "headline",
                                  on: {
                                    dblclick: function($event) {
                                      return _vm.editP("title")
                                    }
                                  }
                                },
                                [
                                  _c("p", [
                                    _vm._v(
                                      _vm._s(
                                        _vm.edit.title ? "" : _vm.post_title
                                      )
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _vm.edit.title
                                    ? _c("v-text-field", {
                                        attrs: {
                                          rules: _vm.get_rules.post_title,
                                          label: "Заголовок",
                                          required: ""
                                        },
                                        on: {
                                          blur: function($event) {
                                            return _vm.endEditP("title")
                                          }
                                        },
                                        model: {
                                          value: _vm.post_title,
                                          callback: function($$v) {
                                            _vm.post_title = $$v
                                          },
                                          expression: "post_title"
                                        }
                                      })
                                    : _vm._e()
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-card-text",
                                {
                                  on: {
                                    dblclick: function($event) {
                                      return _vm.editP("desc")
                                    }
                                  }
                                },
                                [
                                  _c("div", {
                                    domProps: {
                                      innerHTML: _vm._s(
                                        _vm.edit.desc ? "" : _vm.post_desc
                                      )
                                    }
                                  }),
                                  _vm._v(" "),
                                  _vm.edit.desc
                                    ? _c("v-textarea", {
                                        attrs: {
                                          rules: _vm.get_rules.post_desc,
                                          label: "Описание",
                                          rows: "15",
                                          required: ""
                                        },
                                        on: {
                                          blur: function($event) {
                                            return _vm.endEditP("desc")
                                          }
                                        },
                                        model: {
                                          value: _vm.post_desc,
                                          callback: function($$v) {
                                            _vm.post_desc = $$v
                                          },
                                          expression: "post_desc"
                                        }
                                      })
                                    : _vm._e()
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
        "v-row",
        { staticClass: "ma-0" },
        _vm._l(
          _vm.get_results_search.posts && _vm.get_results_search.posts.length
            ? _vm.get_results_search.posts
            : _vm.get_posts,
          function(post, index) {
            return _c(
              "v-col",
              { key: index, attrs: { cols: _vm.ui_mobile ? 12 : 6 } },
              [
                _c(
                  "v-card",
                  { staticClass: "mx-auto", attrs: { outlined: "" } },
                  [
                    _c(
                      "v-list-item",
                      [
                        post.img
                          ? _c(
                              "v-list-item-avatar",
                              [
                                _c("v-img", {
                                  attrs: { src: "/storage/" + post.img }
                                })
                              ],
                              1
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _c(
                          "v-list-item-content",
                          [
                            _c("v-list-item-title", {
                              staticClass: "headline text-wrap",
                              domProps: { textContent: _vm._s(post.title) }
                            }),
                            _vm._v(" "),
                            _c("v-list-item-subtitle", [
                              _c("span", [
                                _vm._v(
                                  _vm._s(
                                    post.author.name.replace(
                                      /(\S)\S* (\S+) (\S)\S*/,
                                      "$2 $3.$1."
                                    )
                                  )
                                )
                              ]),
                              _vm._v(" "),
                              _c(
                                "span",
                                {
                                  staticClass: "position-absolute",
                                  staticStyle: { right: "10px" }
                                },
                                [
                                  _vm._v(
                                    _vm._s(_vm._f("moment")(post.created_at))
                                  )
                                ]
                              )
                            ])
                          ],
                          1
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("v-card-text", [
                      _vm._v(
                        "\n                    " +
                          _vm._s(post.description) +
                          "\n                "
                      )
                    ]),
                    _vm._v(" "),
                    _c(
                      "v-card-actions",
                      [
                        _c(
                          "v-btn",
                          {
                            attrs: { text: "", color: "deep-purple accent-4" },
                            on: {
                              click: function($event) {
                                return _vm.$store.commit(
                                  "posts/DIALOG_FORM_OPEN",
                                  { index: index, post: post }
                                )
                              }
                            }
                          },
                          [
                            _vm._v(
                              "\n                        Прочитать\n                    "
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _c("v-spacer"),
                        _vm._v(" "),
                        _c(
                          "v-badge",
                          {
                            staticClass: "mr-2",
                            attrs: {
                              content: post.files.length,
                              value: post.files.length,
                              color: "green",
                              overlap: ""
                            }
                          },
                          [
                            _c(
                              "v-btn",
                              { attrs: { icon: "" } },
                              [
                                _c("v-icon", { attrs: { large: "" } }, [
                                  _vm._v("insert_drive_file")
                                ])
                              ],
                              1
                            )
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "v-btn",
                          { attrs: { icon: "" } },
                          [_c("v-icon", [_vm._v("mdi-heart")])],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "v-btn",
                          { attrs: { icon: "" } },
                          [_c("v-icon", [_vm._v("mdi-share-variant")])],
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
        ),
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/modules/Posts/PostsComponent.vue":
/*!******************************************************************!*\
  !*** ./resources/js/components/modules/Posts/PostsComponent.vue ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PostsComponent_vue_vue_type_template_id_4fe15cb9_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PostsComponent.vue?vue&type=template&id=4fe15cb9&scoped=true& */ "./resources/js/components/modules/Posts/PostsComponent.vue?vue&type=template&id=4fe15cb9&scoped=true&");
/* harmony import */ var _PostsComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PostsComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/modules/Posts/PostsComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PostsComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PostsComponent_vue_vue_type_template_id_4fe15cb9_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PostsComponent_vue_vue_type_template_id_4fe15cb9_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "4fe15cb9",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/modules/Posts/PostsComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/modules/Posts/PostsComponent.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/modules/Posts/PostsComponent.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PostsComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./PostsComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/modules/Posts/PostsComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PostsComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/modules/Posts/PostsComponent.vue?vue&type=template&id=4fe15cb9&scoped=true&":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/components/modules/Posts/PostsComponent.vue?vue&type=template&id=4fe15cb9&scoped=true& ***!
  \*************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PostsComponent_vue_vue_type_template_id_4fe15cb9_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./PostsComponent.vue?vue&type=template&id=4fe15cb9&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/modules/Posts/PostsComponent.vue?vue&type=template&id=4fe15cb9&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PostsComponent_vue_vue_type_template_id_4fe15cb9_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PostsComponent_vue_vue_type_template_id_4fe15cb9_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);