    $(function() {

      var filterList = {

        init: function() {

          // MixItUp plugin
          // http://mixitup.io
          $('#portfoliolist').mixItUp({
            selectors: {
              target: '.portfolio',
              filter: '.filter'
            },
            load: {
              filter: '.app'
            }
          });

        }

      };

      // Run the show!
      filterList.init();

    });

    ! function(a, b) {
      "use strict";
      a.MixItUp = function() {
        var b = this;
        b._execAction("_constructor", 0), a.extend(b, {
          selectors: {
            target: ".mix",
            filter: ".filter",
            sort: ".sort"
          },
          animation: {
            enable: !0,
            effects: "fade scale",
            duration: 600,
            easing: "ease",
            perspectiveDistance: "3000",
            perspectiveOrigin: "50% 50%",
            queue: !0,
            queueLimit: 1,
            animateChangeLayout: !1,
            animateResizeContainer: !0,
            animateResizeTargets: !1,
            staggerSequence: !1,
            reverseOut: !1
          },
          callbacks: {
            onMixLoad: !1,
            onMixStart: !1,
            onMixBusy: !1,
            onMixEnd: !1,
            onMixFail: !1,
            _user: !1
          },
          controls: {
            enable: !0,
            live: !1,
            toggleFilterButtons: !1,
            toggleLogic: "or",
            activeClass: "active"
          },
          layout: {
            display: "inline-block",
            containerClass: "",
            containerClassFail: "fail"
          },
          load: {
            filter: "all",
            sort: !1
          },
          _$body: null,
          _$container: null,
          _$targets: null,
          _$parent: null,
          _$sortButtons: null,
          _$filterButtons: null,
          _suckMode: !1,
          _mixing: !1,
          _sorting: !1,
          _clicking: !1,
          _loading: !0,
          _changingLayout: !1,
          _changingClass: !1,
          _changingDisplay: !1,
          _origOrder: [],
          _startOrder: [],
          _newOrder: [],
          _activeFilter: null,
          _toggleArray: [],
          _toggleString: "",
          _activeSort: "default:asc",
          _newSort: null,
          _startHeight: null,
          _newHeight: null,
          _incPadding: !0,
          _newDisplay: null,
          _newClass: null,
          _targetsBound: 0,
          _targetsDone: 0,
          _queue: [],
          _$show: a(),
          _$hide: a()
        }), b._execAction("_constructor", 1)
      }, a.MixItUp.prototype = {
        constructor: a.MixItUp,
        _instances: {},
        _handled: {
          _filter: {},
          _sort: {}
        },
        _bound: {
          _filter: {},
          _sort: {}
        },
        _actions: {},
        _filters: {},
        extend: function(b) {
          for (var c in b) a.MixItUp.prototype[c] = b[c]
        },
        addAction: function(b, c, d, e) {
          a.MixItUp.prototype._addHook("_actions", b, c, d, e)
        },
        addFilter: function(b, c, d, e) {
          a.MixItUp.prototype._addHook("_filters", b, c, d, e)
        },
        _addHook: function(b, c, d, e, f) {
          var g = a.MixItUp.prototype[b],
            h = {};
          f = 1 === f || "post" === f ? "post" : "pre", h[c] = {}, h[c][f] = {}, h[c][f][d] = e, a.extend(!0, g, h)
        },
        _init: function(b, c) {
          var d = this;
          if (d._execAction("_init", 0, arguments), c && a.extend(!0, d, c), d._$body = a("body"), d._domNode = b, d._$container = a(b), d._$container.addClass(d.layout.containerClass), d._id = b.id, d._platformDetect(), d._brake = d._getPrefixedCSS("transition", "none"), d._refresh(!0), d._$parent = d._$targets.parent().length ? d._$targets.parent() : d._$container, d.load.sort && (d._newSort = d._parseSort(d.load.sort), d._newSortString = d.load.sort, d._activeSort = d.load.sort, d._sort(), d._printSort()), d._activeFilter = "all" === d.load.filter ? d.selectors.target : "none" === d.load.filter ? "" : d.load.filter, d.controls.enable && d._bindHandlers(), d.controls.toggleFilterButtons) {
            d._buildToggleArray();
            for (var e = 0; e < d._toggleArray.length; e++) d._updateControls({
              filter: d._toggleArray[e],
              sort: d._activeSort
            }, !0)
          } else d.controls.enable && d._updateControls({
            filter: d._activeFilter,
            sort: d._activeSort
          });
          d._filter(), d._init = !0, d._$container.data("mixItUp", d), d._execAction("_init", 1, arguments), d._buildState(), d._$targets.css(d._brake), d._goMix(d.animation.enable)
        },
        _platformDetect: function() {
          var a = this,
            c = ["Webkit", "Moz", "O", "ms"],
            d = ["webkit", "moz"],
            e = window.navigator.appVersion.match(/Chrome\/(\d+)\./) || !1,
            f = "undefined" != typeof InstallTrigger,
            g = function(a) {
              for (var b = 0; b < c.length; b++)
                if (c[b] + "Transition" in a.style) return {
                  prefix: "-" + c[b].toLowerCase() + "-",
                  vendor: c[b]
                };
              return "transition" in a.style ? "" : !1
            },
            h = g(a._domNode);
          a._execAction("_platformDetect", 0), a._chrome = e ? parseInt(e[1], 10) : !1, a._ff = f ? parseInt(window.navigator.userAgent.match(/rv:([^)]+)\)/)[1]) : !1, a._prefix = h.prefix, a._vendor = h.vendor, a._suckMode = window.atob && a._prefix ? !1 : !0, a._suckMode && (a.animation.enable = !1), a._ff && a._ff <= 4 && (a.animation.enable = !1);
          for (var i = 0; i < d.length && !window.requestAnimationFrame; i++) window.requestAnimationFrame = window[d[i] + "RequestAnimationFrame"];
          "function" != typeof Object.getPrototypeOf && ("object" == typeof "test".__proto__ ? Object.getPrototypeOf = function(a) {
            return a.__proto__
          } : Object.getPrototypeOf = function(a) {
            return a.constructor.prototype
          }), a._domNode.nextElementSibling === b && Object.defineProperty(Element.prototype, "nextElementSibling", {
            get: function() {
              for (var a = this.nextSibling; a;) {
                if (1 === a.nodeType) return a;
                a = a.nextSibling
              }
              return null
            }
          }), a._execAction("_platformDetect", 1)
        },
        _refresh: function(a, c) {
          var d = this;
          d._execAction("_refresh", 0, arguments), d._$targets = d._$container.find(d.selectors.target);
          for (var e = 0; e < d._$targets.length; e++) {
            var f = d._$targets[e];
            if (f.dataset === b || c) {
              f.dataset = {};
              for (var g = 0; g < f.attributes.length; g++) {
                var h = f.attributes[g],
                  i = h.name,
                  j = h.value;
                if (i.indexOf("data-") > -1) {
                  var k = d._helpers._camelCase(i.substring(5, i.length));
                  f.dataset[k] = j
                }
              }
            }
            f.mixParent === b && (f.mixParent = d._id)
          }
          if (d._$targets.length && a || !d._origOrder.length && d._$targets.length) {
            d._origOrder = [];
            for (var e = 0; e < d._$targets.length; e++) {
              var f = d._$targets[e];
              d._origOrder.push(f)
            }
          }
          d._execAction("_refresh", 1, arguments)
        },
        _bindHandlers: function() {
          var c = this,
            d = a.MixItUp.prototype._bound._filter,
            e = a.MixItUp.prototype._bound._sort;
          c._execAction("_bindHandlers", 0), c.controls.live ? c._$body.on("click.mixItUp." + c._id, c.selectors.sort, function() {
            c._processClick(a(this), "sort")
          }).on("click.mixItUp." + c._id, c.selectors.filter, function() {
            c._processClick(a(this), "filter")
          }) : (c._$sortButtons = a(c.selectors.sort), c._$filterButtons = a(c.selectors.filter), c._$sortButtons.on("click.mixItUp." + c._id, function() {
            c._processClick(a(this), "sort")
          }), c._$filterButtons.on("click.mixItUp." + c._id, function() {
            c._processClick(a(this), "filter")
          })), d[c.selectors.filter] = d[c.selectors.filter] === b ? 1 : d[c.selectors.filter] + 1, e[c.selectors.sort] = e[c.selectors.sort] === b ? 1 : e[c.selectors.sort] + 1, c._execAction("_bindHandlers", 1)
        },
        _processClick: function(c, d) {
          var e = this,
            f = function(c, d, f) {
              var g = a.MixItUp.prototype;
              g._handled["_" + d][e.selectors[d]] = g._handled["_" + d][e.selectors[d]] === b ? 1 : g._handled["_" + d][e.selectors[d]] + 1, g._handled["_" + d][e.selectors[d]] === g._bound["_" + d][e.selectors[d]] && (c[(f ? "remove" : "add") + "Class"](e.controls.activeClass), delete g._handled["_" + d][e.selectors[d]])
            };
          if (e._execAction("_processClick", 0, arguments), !e._mixing || e.animation.queue && e._queue.length < e.animation.queueLimit) {
            if (e._clicking = !0, "sort" === d) {
              var g = c.attr("data-sort");
              (!c.hasClass(e.controls.activeClass) || g.indexOf("random") > -1) && (a(e.selectors.sort).removeClass(e.controls.activeClass), f(c, d), e.sort(g))
            }
            if ("filter" === d) {
              var h, i = c.attr("data-filter"),
                j = "or" === e.controls.toggleLogic ? "," : "";
              e.controls.toggleFilterButtons ? (e._buildToggleArray(), c.hasClass(e.controls.activeClass) ? (f(c, d, !0), h = e._toggleArray.indexOf(i), e._toggleArray.splice(h, 1)) : (f(c, d), e._toggleArray.push(i)), e._toggleArray = a.grep(e._toggleArray, function(a) {
                return a
              }), e._toggleString = e._toggleArray.join(j), e.filter(e._toggleString)) : c.hasClass(e.controls.activeClass) || (a(e.selectors.filter).removeClass(e.controls.activeClass), f(c, d), e.filter(i))
            }
            e._execAction("_processClick", 1, arguments)
          } else "function" == typeof e.callbacks.onMixBusy && e.callbacks.onMixBusy.call(e._domNode, e._state, e), e._execAction("_processClickBusy", 1, arguments)
        },
        _buildToggleArray: function() {
          var a = this,
            b = a._activeFilter.replace(/\s/g, "");
          if (a._execAction("_buildToggleArray", 0, arguments), "or" === a.controls.toggleLogic) a._toggleArray = b.split(",");
          else {
            a._toggleArray = b.split("."), !a._toggleArray[0] && a._toggleArray.shift();
            for (var c, d = 0; c = a._toggleArray[d]; d++) a._toggleArray[d] = "." + c
          }
          a._execAction("_buildToggleArray", 1, arguments)
        },
        _updateControls: function(c, d) {
          var e = this,
            f = {
              filter: c.filter,
              sort: c.sort
            },
            g = function(a, b) {
              try {
                d && "filter" === h && "none" !== f.filter && "" !== f.filter ? a.filter(b).addClass(e.controls.activeClass) : a.removeClass(e.controls.activeClass).filter(b).addClass(e.controls.activeClass)
              } catch (c) {}
            },
            h = "filter",
            i = null;
          e._execAction("_updateControls", 0, arguments), c.filter === b && (f.filter = e._activeFilter), c.sort === b && (f.sort = e._activeSort), f.filter === e.selectors.target && (f.filter = "all");
          for (var j = 0; 2 > j; j++) i = e.controls.live ? a(e.selectors[h]) : e["_$" + h + "Buttons"], i && g(i, "[data-" + h + '="' + f[h] + '"]'), h = "sort";
          e._execAction("_updateControls", 1, arguments)
        },
        _filter: function() {
          var b = this;
          b._execAction("_filter", 0);
          for (var c = 0; c < b._$targets.length; c++) {
            var d = a(b._$targets[c]);
            d.is(b._activeFilter) ? b._$show = b._$show.add(d) : b._$hide = b._$hide.add(d)
          }
          b._execAction("_filter", 1)
        },
        _sort: function() {
          var a = this,
            b = function(a) {
              for (var b = a.slice(), c = b.length, d = c; d--;) {
                var e = parseInt(Math.random() * c),
                  f = b[d];
                b[d] = b[e], b[e] = f
              }
              return b
            };
          a._execAction("_sort", 0), a._startOrder = [];
          for (var c = 0; c < a._$targets.length; c++) {
            var d = a._$targets[c];
            a._startOrder.push(d)
          }
          switch (a._newSort[0].sortBy) {
            case "default":
              a._newOrder = a._origOrder;
              break;
            case "random":
              a._newOrder = b(a._startOrder);
              break;
            case "custom":
              a._newOrder = a._newSort[0].order;
              break;
            default:
              a._newOrder = a._startOrder.concat().sort(function(b, c) {
                return a._compare(b, c)
              })
          }
          a._execAction("_sort", 1)
        },
        _compare: function(a, b, c) {
          c = c ? c : 0;
          var d = this,
            e = d._newSort[c].order,
            f = function(a) {
              return a.dataset[d._newSort[c].sortBy] || 0
            },
            g = isNaN(1 * f(a)) ? f(a).toLowerCase() : 1 * f(a),
            h = isNaN(1 * f(b)) ? f(b).toLowerCase() : 1 * f(b);
          return h > g ? "asc" === e ? -1 : 1 : g > h ? "asc" === e ? 1 : -1 : g === h && d._newSort.length > c + 1 ? d._compare(a, b, c + 1) : 0
        },
        _printSort: function(a) {
          var b = this,
            c = a ? b._startOrder : b._newOrder,
            d = b._$parent[0].querySelectorAll(b.selectors.target),
            e = d.length ? d[d.length - 1].nextElementSibling : null,
            f = document.createDocumentFragment();
          b._execAction("_printSort", 0, arguments);
          for (var g = 0; g < d.length; g++) {
            var h = d[g],
              i = h.nextSibling;
            "absolute" !== h.style.position && (i && "#text" === i.nodeName && b._$parent[0].removeChild(i), b._$parent[0].removeChild(h))
          }
          for (var g = 0; g < c.length; g++) {
            var j = c[g];
            if ("default" !== b._newSort[0].sortBy || "desc" !== b._newSort[0].order || a) f.appendChild(j), f.appendChild(document.createTextNode(" "));
            else {
              var k = f.firstChild;
              f.insertBefore(j, k), f.insertBefore(document.createTextNode(" "), j)
            }
          }
          e ? b._$parent[0].insertBefore(f, e) : b._$parent[0].appendChild(f), b._execAction("_printSort", 1, arguments)
        },
        _parseSort: function(a) {
          for (var b = this, c = "string" == typeof a ? a.split(" ") : [a], d = [], e = 0; e < c.length; e++) {
            var f = "string" == typeof a ? c[e].split(":") : ["custom", c[e]],
              g = {
                sortBy: b._helpers._camelCase(f[0]),
                order: f[1] || "asc"
              };
            if (d.push(g), "default" === g.sortBy || "random" === g.sortBy) break
          }
          return b._execFilter("_parseSort", d, arguments)
        },
        _parseEffects: function() {
          var a = this,
            b = {
              opacity: "",
              transformIn: "",
              transformOut: "",
              filter: ""
            },
            c = function(b, c, d) {
              if (a.animation.effects.indexOf(b) > -1) {
                if (c) {
                  var e = a.animation.effects.indexOf(b + "(");
                  if (e > -1) {
                    var f = a.animation.effects.substring(e),
                      g = /\(([^)]+)\)/.exec(f),
                      h = g[1];
                    return {
                      val: h
                    }
                  }
                }
                return !0
              }
              return !1
            },
            d = function(a, b) {
              return b ? "-" === a.charAt(0) ? a.substr(1, a.length) : "-" + a : a
            },
            e = function(a, e) {
              for (var f = [
                  ["scale", ".01"],
                  ["translateX", "20px"],
                  ["translateY", "20px"],
                  ["translateZ", "20px"],
                  ["rotateX", "90deg"],
                  ["rotateY", "90deg"],
                  ["rotateZ", "180deg"]
                ], g = 0; g < f.length; g++) {
                var h = f[g][0],
                  i = f[g][1],
                  j = e && "scale" !== h;
                b[a] += c(h) ? h + "(" + d(c(h, !0).val || i, j) + ") " : ""
              }
            };
          return b.opacity = c("fade") ? c("fade", !0).val || "0" : "1", e("transformIn"), a.animation.reverseOut ? e("transformOut", !0) : b.transformOut = b.transformIn, b.transition = {}, b.transition = a._getPrefixedCSS("transition", "all " + a.animation.duration + "ms " + a.animation.easing + ", opacity " + a.animation.duration + "ms linear"), a.animation.stagger = c("stagger") ? !0 : !1, a.animation.staggerDuration = parseInt(c("stagger") && c("stagger", !0).val ? c("stagger", !0).val : 100), a._execFilter("_parseEffects", b)
        },
        _buildState: function(a) {
          var b = this,
            c = {};
          return b._execAction("_buildState", 0), c = {
            activeFilter: "" === b._activeFilter ? "none" : b._activeFilter,
            activeSort: a && b._newSortString ? b._newSortString : b._activeSort,
            fail: !b._$show.length && "" !== b._activeFilter,
            $targets: b._$targets,
            $show: b._$show,
            $hide: b._$hide,
            totalTargets: b._$targets.length,
            totalShow: b._$show.length,
            totalHide: b._$hide.length,
            display: a && b._newDisplay ? b._newDisplay : b.layout.display
          }, a ? b._execFilter("_buildState", c) : (b._state = c, void b._execAction("_buildState", 1))
        },
        _goMix: function(a) {
          var b = this,
            c = function() {
              b._chrome && 31 === b._chrome && f(b._$parent[0]), b._setInter(), d()
            },
            d = function() {
              var a = window.pageYOffset,
                c = window.pageXOffset;
              document.documentElement.scrollHeight;
              b._getInterMixData(), b._setFinal(), b._getFinalMixData(), window.pageYOffset !== a && window.scrollTo(c, a), b._prepTargets(), window.requestAnimationFrame ? requestAnimationFrame(e) : setTimeout(function() {
                e()
              }, 20)
            },
            e = function() {
              b._animateTargets(), 0 === b._targetsBound && b._cleanUp()
            },
            f = function(a) {
              var b = a.parentElement,
                c = document.createElement("div"),
                d = document.createDocumentFragment();
              b.insertBefore(c, a), d.appendChild(a), b.replaceChild(a, c)
            },
            g = b._buildState(!0);
          b._execAction("_goMix", 0, arguments), !b.animation.duration && (a = !1), b._mixing = !0, b._$container.removeClass(b.layout.containerClassFail), "function" == typeof b.callbacks.onMixStart && b.callbacks.onMixStart.call(b._domNode, b._state, g, b), b._$container.trigger("mixStart", [b._state, g, b]), b._getOrigMixData(), a && !b._suckMode ? window.requestAnimationFrame ? requestAnimationFrame(c) : c() : b._cleanUp(), b._execAction("_goMix", 1, arguments)
        },
        _getTargetData: function(a, b) {
          var c, d = this;
          a.dataset[b + "PosX"] = a.offsetLeft, a.dataset[b + "PosY"] = a.offsetTop, d.animation.animateResizeTargets && (c = d._suckMode ? {
            marginBottom: "",
            marginRight: ""
          } : window.getComputedStyle(a), a.dataset[b + "MarginBottom"] = parseInt(c.marginBottom), a.dataset[b + "MarginRight"] = parseInt(c.marginRight), a.dataset[b + "Width"] = a.offsetWidth, a.dataset[b + "Height"] = a.offsetHeight)
        },
        _getOrigMixData: function() {
          var a = this,
            b = a._suckMode ? {
              boxSizing: ""
            } : window.getComputedStyle(a._$parent[0]),
            c = b.boxSizing || b[a._vendor + "BoxSizing"];
          a._incPadding = "border-box" === c, a._execAction("_getOrigMixData", 0), !a._suckMode && (a.effects = a._parseEffects()), a._$toHide = a._$hide.filter(":visible"), a._$toShow = a._$show.filter(":hidden"), a._$pre = a._$targets.filter(":visible"), a._startHeight = a._incPadding ? a._$parent.outerHeight() : a._$parent.height();
          for (var d = 0; d < a._$pre.length; d++) {
            var e = a._$pre[d];
            a._getTargetData(e, "orig")
          }
          a._execAction("_getOrigMixData", 1)
        },
        _setInter: function() {
          var a = this;
          a._execAction("_setInter", 0), a._changingLayout && a.animation.animateChangeLayout ? (a._$toShow.css("display", a._newDisplay), a._changingClass && a._$container.removeClass(a.layout.containerClass).addClass(a._newClass)) : a._$toShow.css("display", a.layout.display), a._execAction("_setInter", 1)
        },
        _getInterMixData: function() {
          var a = this;
          a._execAction("_getInterMixData", 0);
          for (var b = 0; b < a._$toShow.length; b++) {
            var c = a._$toShow[b];
            a._getTargetData(c, "inter")
          }
          for (var b = 0; b < a._$pre.length; b++) {
            var c = a._$pre[b];
            a._getTargetData(c, "inter")
          }
          a._execAction("_getInterMixData", 1)
        },
        _setFinal: function() {
          var a = this;
          a._execAction("_setFinal", 0), a._sorting && a._printSort(), a._$toHide.removeStyle("display"), a._changingLayout && a.animation.animateChangeLayout && a._$pre.css("display", a._newDisplay), a._execAction("_setFinal", 1)
        },
        _getFinalMixData: function() {
          var a = this;
          a._execAction("_getFinalMixData", 0);
          for (var b = 0; b < a._$toShow.length; b++) {
            var c = a._$toShow[b];
            a._getTargetData(c, "final")
          }
          for (var b = 0; b < a._$pre.length; b++) {
            var c = a._$pre[b];
            a._getTargetData(c, "final")
          }
          a._newHeight = a._incPadding ? a._$parent.outerHeight() : a._$parent.height(), a._sorting && a._printSort(!0), a._$toShow.removeStyle("display"), a._$pre.css("display", a.layout.display), a._changingClass && a.animation.animateChangeLayout && a._$container.removeClass(a._newClass).addClass(a.layout.containerClass), a._execAction("_getFinalMixData", 1)
        },
        _prepTargets: function() {
          var b = this,
            c = {
              _in: b._getPrefixedCSS("transform", b.effects.transformIn),
              _out: b._getPrefixedCSS("transform", b.effects.transformOut)
            };
          b._execAction("_prepTargets", 0), b.animation.animateResizeContainer && b._$parent.css("height", b._startHeight + "px");
          for (var d = 0; d < b._$toShow.length; d++) {
            var e = b._$toShow[d],
              f = a(e);
            e.style.opacity = b.effects.opacity, e.style.display = b._changingLayout && b.animation.animateChangeLayout ? b._newDisplay : b.layout.display, f.css(c._in), b.animation.animateResizeTargets && (e.style.width = e.dataset.finalWidth + "px", e.style.height = e.dataset.finalHeight + "px", e.style.marginRight = -(e.dataset.finalWidth - e.dataset.interWidth) + 1 * e.dataset.finalMarginRight + "px", e.style.marginBottom = -(e.dataset.finalHeight - e.dataset.interHeight) + 1 * e.dataset.finalMarginBottom + "px")
          }
          for (var d = 0; d < b._$pre.length; d++) {
            var e = b._$pre[d],
              f = a(e),
              g = {
                x: e.dataset.origPosX - e.dataset.interPosX,
                y: e.dataset.origPosY - e.dataset.interPosY
              },
              c = b._getPrefixedCSS("transform", "translate(" + g.x + "px," + g.y + "px)");
            f.css(c), b.animation.animateResizeTargets && (e.style.width = e.dataset.origWidth + "px", e.style.height = e.dataset.origHeight + "px", e.dataset.origWidth - e.dataset.finalWidth && (e.style.marginRight = -(e.dataset.origWidth - e.dataset.interWidth) + 1 * e.dataset.origMarginRight + "px"), e.dataset.origHeight - e.dataset.finalHeight && (e.style.marginBottom = -(e.dataset.origHeight - e.dataset.interHeight) + 1 * e.dataset.origMarginBottom + "px"))
          }
          b._execAction("_prepTargets", 1)
        },
        _animateTargets: function() {
          var b = this;
          b._execAction("_animateTargets", 0), b._targetsDone = 0, b._targetsBound = 0, b._$parent.css(b._getPrefixedCSS("perspective", b.animation.perspectiveDistance + "px")).css(b._getPrefixedCSS("perspective-origin", b.animation.perspectiveOrigin)), b.animation.animateResizeContainer && b._$parent.css(b._getPrefixedCSS("transition", "height " + b.animation.duration + "ms ease")).css("height", b._newHeight + "px");
          for (var c = 0; c < b._$toShow.length; c++) {
            var d = b._$toShow[c],
              e = a(d),
              f = {
                x: d.dataset.finalPosX - d.dataset.interPosX,
                y: d.dataset.finalPosY - d.dataset.interPosY
              },
              g = b._getDelay(c),
              h = {};
            d.style.opacity = "";
            for (var i = 0; 2 > i; i++) {
              var j = 0 === i ? j = b._prefix : "";
              b._ff && b._ff <= 20 && (h[j + "transition-property"] = "all", h[j + "transition-timing-function"] = b.animation.easing + "ms", h[j + "transition-duration"] = b.animation.duration + "ms"), h[j + "transition-delay"] = g + "ms", h[j + "transform"] = "translate(" + f.x + "px," + f.y + "px)"
            }(b.effects.transform || b.effects.opacity) && b._bindTargetDone(e), b._ff && b._ff <= 20 ? e.css(h) : e.css(b.effects.transition).css(h)
          }
          for (var c = 0; c < b._$pre.length; c++) {
            var d = b._$pre[c],
              e = a(d),
              f = {
                x: d.dataset.finalPosX - d.dataset.interPosX,
                y: d.dataset.finalPosY - d.dataset.interPosY
              },
              g = b._getDelay(c);
            (d.dataset.finalPosX !== d.dataset.origPosX || d.dataset.finalPosY !== d.dataset.origPosY) && b._bindTargetDone(e), e.css(b._getPrefixedCSS("transition", "all " + b.animation.duration + "ms " + b.animation.easing + " " + g + "ms")), e.css(b._getPrefixedCSS("transform", "translate(" + f.x + "px," + f.y + "px)")), b.animation.animateResizeTargets && (d.dataset.origWidth - d.dataset.finalWidth && 1 * d.dataset.finalWidth && (d.style.width = d.dataset.finalWidth + "px", d.style.marginRight = -(d.dataset.finalWidth - d.dataset.interWidth) + 1 * d.dataset.finalMarginRight + "px"), d.dataset.origHeight - d.dataset.finalHeight && 1 * d.dataset.finalHeight && (d.style.height = d.dataset.finalHeight + "px", d.style.marginBottom = -(d.dataset.finalHeight - d.dataset.interHeight) + 1 * d.dataset.finalMarginBottom + "px"))
          }
          b._changingClass && b._$container.removeClass(b.layout.containerClass).addClass(b._newClass);
          for (var c = 0; c < b._$toHide.length; c++) {
            for (var d = b._$toHide[c], e = a(d), g = b._getDelay(c), k = {}, i = 0; 2 > i; i++) {
              var j = 0 === i ? j = b._prefix : "";
              k[j + "transition-delay"] = g + "ms", k[j + "transform"] = b.effects.transformOut, k.opacity = b.effects.opacity
            }
            e.css(b.effects.transition).css(k), (b.effects.transform || b.effects.opacity) && b._bindTargetDone(e)
          }
          b._execAction("_animateTargets", 1)
        },
        _bindTargetDone: function(b) {
          var c = this,
            d = b[0];
          c._execAction("_bindTargetDone", 0, arguments), d.dataset.bound || (d.dataset.bound = !0, c._targetsBound++, b.on("webkitTransitionEnd.mixItUp transitionend.mixItUp", function(e) {
            (e.originalEvent.propertyName.indexOf("transform") > -1 || e.originalEvent.propertyName.indexOf("opacity") > -1) && a(e.originalEvent.target).is(c.selectors.target) && (b.off(".mixItUp"), d.dataset.bound = "", c._targetDone())
          })), c._execAction("_bindTargetDone", 1, arguments)
        },
        _targetDone: function() {
          var a = this;
          a._execAction("_targetDone", 0), a._targetsDone++, a._targetsDone === a._targetsBound && a._cleanUp(), a._execAction("_targetDone", 1)
        },
        _cleanUp: function() {
          var b = this,
            c = b.animation.animateResizeTargets ? "transform opacity width height margin-bottom margin-right" : "transform opacity",
            d = function() {
              b._$targets.removeStyle("transition", b._prefix)
            };
          b._execAction("_cleanUp", 0), b._changingLayout ? b._$show.css("display", b._newDisplay) : b._$show.css("display", b.layout.display), b._$targets.css(b._brake), b._$targets.removeStyle(c, b._prefix).removeAttr("data-inter-pos-x data-inter-pos-y data-final-pos-x data-final-pos-y data-orig-pos-x data-orig-pos-y data-orig-height data-orig-width data-final-height data-final-width data-inter-width data-inter-height data-orig-margin-right data-orig-margin-bottom data-inter-margin-right data-inter-margin-bottom data-final-margin-right data-final-margin-bottom"), b._$hide.removeStyle("display"), b._$parent.removeStyle("height transition perspective-distance perspective perspective-origin-x perspective-origin-y perspective-origin perspectiveOrigin", b._prefix), b._sorting && (b._printSort(), b._activeSort = b._newSortString, b._sorting = !1), b._changingLayout && (b._changingDisplay && (b.layout.display = b._newDisplay, b._changingDisplay = !1), b._changingClass && (b._$parent.removeClass(b.layout.containerClass).addClass(b._newClass), b.layout.containerClass = b._newClass, b._changingClass = !1), b._changingLayout = !1), b._refresh(), b._buildState(), b._state.fail && b._$container.addClass(b.layout.containerClassFail), b._$show = a(), b._$hide = a(), window.requestAnimationFrame && requestAnimationFrame(d), b._mixing = !1, "function" == typeof b.callbacks._user && b.callbacks._user.call(b._domNode, b._state, b), "function" == typeof b.callbacks.onMixEnd && b.callbacks.onMixEnd.call(b._domNode, b._state, b), b._$container.trigger("mixEnd", [b._state, b]), b._state.fail && ("function" == typeof b.callbacks.onMixFail && b.callbacks.onMixFail.call(b._domNode, b._state, b), b._$container.trigger("mixFail", [b._state, b])), b._loading && ("function" == typeof b.callbacks.onMixLoad && b.callbacks.onMixLoad.call(b._domNode, b._state, b), b._$container.trigger("mixLoad", [b._state, b])), b._queue.length && (b._execAction("_queue", 0), b.multiMix(b._queue[0][0], b._queue[0][1], b._queue[0][2]), b._queue.splice(0, 1)), b._execAction("_cleanUp", 1), b._loading = !1
        },
        _getPrefixedCSS: function(a, b, c) {
          var d = this,
            e = {},
            f = "",
            g = -1;
          for (g = 0; 2 > g; g++) f = 0 === g ? d._prefix : "", c ? e[f + a] = f + b : e[f + a] = b;
          return d._execFilter("_getPrefixedCSS", e, arguments)
        },
        _getDelay: function(a) {
          var b = this,
            c = "function" == typeof b.animation.staggerSequence ? b.animation.staggerSequence.call(b._domNode, a, b._state) : a,
            d = b.animation.stagger ? c * b.animation.staggerDuration : 0;
          return b._execFilter("_getDelay", d, arguments)
        },
        _parseMultiMixArgs: function(a) {
          for (var b = this, c = {
              command: null,
              animate: b.animation.enable,
              callback: null
            }, d = 0; d < a.length; d++) {
            var e = a[d];
            null !== e && ("object" == typeof e || "string" == typeof e ? c.command = e : "boolean" == typeof e ? c.animate = e : "function" == typeof e && (c.callback = e))
          }
          return b._execFilter("_parseMultiMixArgs", c, arguments)
        },
        _parseInsertArgs: function(b) {
          for (var c = this, d = {
              index: 0,
              $object: a(),
              multiMix: {
                filter: c._state.activeFilter
              },
              callback: null
            }, e = 0; e < b.length; e++) {
            var f = b[e];
            "number" == typeof f ? d.index = f : "object" == typeof f && f instanceof a ? d.$object = f : "object" == typeof f && c._helpers._isElement(f) ? d.$object = a(f) : "object" == typeof f && null !== f ? d.multiMix = f : "boolean" != typeof f || f ? "function" == typeof f && (d.callback = f) : d.multiMix = !1
          }
          return c._execFilter("_parseInsertArgs", d, arguments)
        },
        _execAction: function(a, b, c) {
          var d = this,
            e = b ? "post" : "pre";
          if (!d._actions.isEmptyObject && d._actions.hasOwnProperty(a))
            for (var f in d._actions[a][e]) d._actions[a][e][f].call(d, c)
        },
        _execFilter: function(a, b, c) {
          var d = this;
          if (d._filters.isEmptyObject || !d._filters.hasOwnProperty(a)) return b;
          for (var e in d._filters[a]) return d._filters[a][e].call(d, c)
        },
        _helpers: {
          _camelCase: function(a) {
            return a.replace(/-([a-z])/g, function(a) {
              return a[1].toUpperCase()
            })
          },
          _isElement: function(a) {
            return window.HTMLElement ? a instanceof HTMLElement : null !== a && 1 === a.nodeType && "string" === a.nodeName
          }
        },
        isMixing: function() {
          var a = this;
          return a._execFilter("isMixing", a._mixing)
        },
        filter: function() {
          var a = this,
            b = a._parseMultiMixArgs(arguments);
          a._clicking && (a._toggleString = ""), a.multiMix({
            filter: b.command
          }, b.animate, b.callback)
        },
        sort: function() {
          var a = this,
            b = a._parseMultiMixArgs(arguments);
          a.multiMix({
            sort: b.command
          }, b.animate, b.callback)
        },
        changeLayout: function() {
          var a = this,
            b = a._parseMultiMixArgs(arguments);
          a.multiMix({
            changeLayout: b.command
          }, b.animate, b.callback)
        },
        multiMix: function() {
          var a = this,
            c = a._parseMultiMixArgs(arguments);
          if (a._execAction("multiMix", 0, arguments), a._mixing) a.animation.queue && a._queue.length < a.animation.queueLimit ? (a._queue.push(arguments), a.controls.enable && !a._clicking && a._updateControls(c.command), a._execAction("multiMixQueue", 1, arguments)) : ("function" == typeof a.callbacks.onMixBusy && a.callbacks.onMixBusy.call(a._domNode, a._state, a), a._$container.trigger("mixBusy", [a._state, a]), a._execAction("multiMixBusy", 1, arguments));
          else {
            a.controls.enable && !a._clicking && (a.controls.toggleFilterButtons && a._buildToggleArray(), a._updateControls(c.command, a.controls.toggleFilterButtons)), a._queue.length < 2 && (a._clicking = !1), delete a.callbacks._user, c.callback && (a.callbacks._user = c.callback);
            var d = c.command.sort,
              e = c.command.filter,
              f = c.command.changeLayout;
            a._refresh(), d && (a._newSort = a._parseSort(d), a._newSortString = d, a._sorting = !0, a._sort()), e !== b && (e = "all" === e ? a.selectors.target : e, a._activeFilter = e), a._filter(), f && (a._newDisplay = "string" == typeof f ? f : f.display || a.layout.display, a._newClass = f.containerClass || "", (a._newDisplay !== a.layout.display || a._newClass !== a.layout.containerClass) && (a._changingLayout = !0, a._changingClass = a._newClass !== a.layout.containerClass, a._changingDisplay = a._newDisplay !== a.layout.display)), a._$targets.css(a._brake), a._goMix(c.animate ^ a.animation.enable ? c.animate : a.animation.enable), a._execAction("multiMix", 1, arguments)
          }
        },
        insert: function() {
          var a = this,
            b = a._parseInsertArgs(arguments),
            c = "function" == typeof b.callback ? b.callback : null,
            d = document.createDocumentFragment(),
            e = function() {
              return a._refresh(), a._$targets.length ? b.index < a._$targets.length || !a._$targets.length ? a._$targets[b.index] : a._$targets[a._$targets.length - 1].nextElementSibling : a._$parent[0].children[0]
            }();
          if (a._execAction("insert", 0, arguments), b.$object) {
            for (var f = 0; f < b.$object.length; f++) {
              var g = b.$object[f];
              d.appendChild(g), d.appendChild(document.createTextNode(" "))
            }
            a._$parent[0].insertBefore(d, e)
          }
          a._execAction("insert", 1, arguments), "object" == typeof b.multiMix && a.multiMix(b.multiMix, c)
        },
        prepend: function() {
          var a = this,
            b = a._parseInsertArgs(arguments);
          a.insert(0, b.$object, b.multiMix, b.callback)
        },
        append: function() {
          var a = this,
            b = a._parseInsertArgs(arguments);
          a.insert(a._state.totalTargets, b.$object, b.multiMix, b.callback)
        },
        getOption: function(a) {
          var c = this,
            d = function(a, c) {
              for (var d = c.split("."), e = d.pop(), f = d.length, g = 1, h = d[0] || c;
                (a = a[h]) && f > g;) h = d[g], g++;
              return a !== b ? a[e] !== b ? a[e] : a : void 0
            };
          return a ? c._execFilter("getOption", d(c, a), arguments) : c
        },
        setOptions: function(b) {
          var c = this;
          c._execAction("setOptions", 0, arguments), "object" == typeof b && a.extend(!0, c, b), c._execAction("setOptions", 1, arguments)
        },
        getState: function() {
          var a = this;
          return a._execFilter("getState", a._state, a)
        },
        forceRefresh: function() {
          var a = this;
          a._refresh(!1, !0)
        },
        destroy: function(b) {
          var c = this,
            d = a.MixItUp.prototype._bound._filter,
            e = a.MixItUp.prototype._bound._sort;
          c._execAction("destroy", 0, arguments), c._$body.add(a(c.selectors.sort)).add(a(c.selectors.filter)).off(".mixItUp");
          for (var f = 0; f < c._$targets.length; f++) {
            var g = c._$targets[f];
            b && (g.style.display = ""), delete g.mixParent
          }
          c._execAction("destroy", 1, arguments), d[c.selectors.filter] && d[c.selectors.filter] > 1 ? d[c.selectors.filter]-- : 1 === d[c.selectors.filter] && delete d[c.selectors.filter], e[c.selectors.sort] && e[c.selectors.sort] > 1 ? e[c.selectors.sort]-- : 1 === e[c.selectors.sort] && delete e[c.selectors.sort], delete a.MixItUp.prototype._instances[c._id]
        }
      }, a.fn.mixItUp = function() {
        var c, d = arguments,
          e = [],
          f = function(b, c) {
            var d = new a.MixItUp,
              e = function() {
                return ("00000" + (16777216 * Math.random() << 0).toString(16)).substr(-6).toUpperCase()
              };
            d._execAction("_instantiate", 0, arguments), b.id = b.id ? b.id : "MixItUp" + e(), d._instances[b.id] || (d._instances[b.id] = d, d._init(b, c)), d._execAction("_instantiate", 1, arguments)
          };
        return c = this.each(function() {
          if (d && "string" == typeof d[0]) {
            var c = a.MixItUp.prototype._instances[this.id];
            if ("isLoaded" === d[0]) e.push(c ? !0 : !1);
            else {
              var g = c[d[0]](d[1], d[2], d[3]);
              g !== b && e.push(g)
            }
          } else f(this, d[0])
        }), e.length ? e.length > 1 ? e : e[0] : c
      }, a.fn.removeStyle = function(c, d) {
        return d = d ? d : "", this.each(function() {
          for (var e = this, f = c.split(" "), g = 0; g < f.length; g++)
            for (var h = 0; 4 > h; h++) {
              switch (h) {
                case 0:
                  var i = f[g];
                  break;
                case 1:
                  var i = a.MixItUp.prototype._helpers._camelCase(i);
                  break;
                case 2:
                  var i = d + f[g];
                  break;
                case 3:
                  var i = a.MixItUp.prototype._helpers._camelCase(d + f[g])
              }
              if (e.style[i] !== b && "unknown" != typeof e.style[i] && e.style[i].length > 0 && (e.style[i] = ""), !d && 1 === h) break
            }
          e.attributes && e.attributes.style && e.attributes.style !== b && "" === e.attributes.style.value && e.attributes.removeNamedItem("style")
        })
      }
    }(jQuery);