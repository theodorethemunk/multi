window.Fortmatic = function(e) {
    var t = {};

    function n(r) {
        if (t[r]) return t[r].exports;
        var o = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }
    return n.m = e, n.c = t, n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
        })
    }, n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function(e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var o in e) n.d(r, o, function(t) {
                return e[t]
            }.bind(null, o));
        return r
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 8)
}([function(e, t, n) {
    "use strict";

    function r(e) {
        for (var n in e) t.hasOwnProperty(n) || (t[n] = e[n])
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r(n(13)), r(n(17))
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = n(18);

    function o(e) {
        var n, i;
        return e.jsonrpc = e.jsonrpc || t.JSON_RPC_VERSION, e.id = r.getPayloadId(), e.batch || "eth_batchRequest" === e.method ? (e.method = "eth_batchRequest", e.batch = null != (i = null === (n = e.batch) || void 0 === n ? void 0 : n.map((function(e) {
            return o(e)
        }))) ? i : [], e) : (e.params = e.params || [], e)
    }
    t.JSON_RPC_VERSION = "2.0", t.createJsonRpcRequestPayload = function(e, n) {
        var o = [{}];
        return n && (o = Array.isArray(n) ? n : [{
            to: n.to,
            value: n.amount
        }]), {
            params: o,
            method: e,
            jsonrpc: t.JSON_RPC_VERSION,
            id: r.getPayloadId()
        }
    }, t.createJsonRpcBatchRequestPayload = function(e) {
        void 0 === e && (e = []);
        var n = Array.isArray(e) ? e : [e];
        return {
            method: "eth_batchRequest",
            jsonrpc: t.JSON_RPC_VERSION,
            id: r.getPayloadId(),
            batch: n.filter(Boolean).map((function(e) {
                return o(e)
            }))
        }
    }, t.standardizeRequestPayload = o
}, function(e, t, n) {
    "use strict";
    var r, o = this && this.__extends || (r = function(e, t) {
        return (r = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
            })(e, t)
    }, function(e, t) {
        function n() {
            this.constructor = e
        }
        r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = n(0),
        a = n(4),
        s = function(e) {
            function t(n, r) {
                var o = e.call(this, "Fortmatic SDK Error: [" + n + "] " + r) || this;
                return o.code = n, o.__proto__ = Error, Object.setPrototypeOf(o, t.prototype), o
            }
            return o(t, e), t
        }(Error);
    t.FortmaticError = s;
    var u = function() {
        function e(e, t) {
            this.code = e, this.message = "Fortmatic SDK Warning: [" + e + "] " + t
        }
        return e.prototype.log = function() {
            console.warn(this.message)
        }, e
    }();
    t.FortmaticWarning = u;
    var c = function(e) {
        function t(n) {
            var r, o, s = e.call(this) || this;
            s.__proto__ = Error;
            var u = Number(null === (r = n) || void 0 === r ? void 0 : r.code),
                c = (null === (o = n) || void 0 === o ? void 0 : o.message) || "Internal error";
            return s.code = a.isJsonRpcErrorCode(u) ? u : i.RPCErrorCode.InternalError, s.message = "Fortmatic RPC Error: [" + s.code + "] " + c, Object.setPrototypeOf(s, t.prototype), s
        }
        return o(t, e), t
    }(Error);
    t.RpcError = c, t.createMissingApiKeyError = function() {
        return new s(i.SDKErrorCode.MissingApiKey, "Please provide a Fortmatic API key that you acquired from the developer dashboard.")
    }, t.createModalNotReadyError = function() {
        return new s(i.SDKErrorCode.ModalNotReady, "Modal is not ready.")
    }, t.createInvalidArgumentError = function(e) {
        var t, n, r, o;
        return new s(i.SDKErrorCode.InvalidArgument, "Invalid " + (t = e.argIndex, o = (n = t + 1) % 100, 1 === (r = n % 10) && 11 !== o ? n + "st" : 2 === r && 12 !== o ? n + "nd" : 3 === r && 13 !== o ? n + "rd" : n + "th") + " argument given to `" + e.functionName + "`.\n  Expected: `" + e.expected + "`\n  Received: `" + e.received + "`")
    }, t.createSynchronousWeb3MethodWarning = function() {
        return new u(i.SDKWarningCode.SyncWeb3Method, "Non-async web3 methods will be deprecated in web3 > 1.0 and are not supported by the Fortmatic provider. An async method is to be used instead.")
    }, t.createDuplicateIframeWarning = function() {
        return new u(i.SDKWarningCode.DuplicateIframe, "Duplicate iframes found.")
    }
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = n(1);
    t.emitWeb3Payload = function(e, t, n) {
        return void 0 === n && (n = []), new Promise((function(o, i) {
            e.sendAsync(r.createJsonRpcRequestPayload(t, n), (function(e, t) {
                e ? i(e) : o(t.result)
            }))
        }))
    }, t.emitFortmaticPayload = function(e, t) {
        return new Promise((function(n, r) {
            e.sendFortmaticAsync(t, (function(e, t) {
                e ? r(e) : n(t ? t.result : {})
            }))
        }))
    }
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = n(0);

    function o(e) {
        return !!e && !(!e.jsonrpc || !e.id || !e.method || !e.batch || e.params)
    }

    function i(e) {
        return !!e && !(!e.jsonrpc || !e.id || !e.method || !e.params || e.batch)
    }
    t.isJsonRpcBatchRequestPayload = o, t.isJsonRpcRequestPayload = i, t.isJsonRpcResponsePayload = function(e) {
        return !!e && !(!e.jsonrpc || !e.id || !e.result && null !== e.result && !e.error)
    }, t.isFmRequest = function(e) {
        return !(!e || !e.payload) && i(e.payload)
    }, t.isFmBatchRequest = function(e) {
        return !(!e || !e.payload) && o(e.payload)
    }, t.isFmPayloadMethod = function(e) {
        return !!e && ("string" == typeof e && Object.values(r.FmPayloadMethod).includes(e))
    }, t.isJsonRpcErrorCode = function(e) {
        return !!e && ("number" == typeof e && Object.values(r.RPCErrorCode).includes(e))
    }
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function(e) {
        this.sdk = e
    };
    t.BaseModule = r
}, function(e, t, n) {
    "use strict";
    var r = this && this.__awaiter || function(e, t, n, r) {
            return new(n || (n = Promise))((function(o, i) {
                function a(e) {
                    try {
                        u(r.next(e))
                    } catch (e) {
                        i(e)
                    }
                }

                function s(e) {
                    try {
                        u(r.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }

                function u(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
                        e(t)
                    }))).then(a, s)
                }
                u((r = r.apply(e, t || [])).next())
            }))
        },
        o = this && this.__generator || function(e, t) {
            var n, r, o, i, a = {
                label: 0,
                sent: function() {
                    if (1 & o[0]) throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return i = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                return this
            }), i;

            function s(i) {
                return function(s) {
                    return function(i) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;
                            switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                                case 0:
                                case 1:
                                    o = i;
                                    break;
                                case 4:
                                    return a.label++, {
                                        value: i[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++, r = i[1], i = [0];
                                    continue;
                                case 7:
                                    i = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                        a.label = i[1];
                                        break
                                    }
                                    if (6 === i[0] && a.label < o[1]) {
                                        a.label = o[1], o = i;
                                        break
                                    }
                                    if (o && a.label < o[2]) {
                                        a.label = o[2], a.ops.push(i);
                                        break
                                    }
                                    o[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            i = t.call(e, a)
                        } catch (e) {
                            i = [6, e], r = 0
                        } finally {
                            n = o = 0
                        }
                        if (5 & i[0]) throw i[1];
                        return {
                            value: i[0] ? i[1] : void 0,
                            done: !0
                        }
                    }([i, s])
                }
            }
        },
        i = this && this.__values || function(e) {
            var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
            if (n) return n.call(e);
            if (e && "number" == typeof e.length) return {
                next: function() {
                    return e && r >= e.length && (e = void 0), {
                        value: e && e[r++],
                        done: !e
                    }
                }
            };
            throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
        };
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = n(0),
        s = n(4),
        u = n(7),
        c = n(2);

    function l(e, t) {
        var n, r, o, i, a, c;
        ! function(e) {
            var t, n, r, o, i, a, s = !!e.data.response.error || !!e.data.response.message || !!e.data.response.code,
                u = {
                    message: (n = null === (t = e.data.response.error) || void 0 === t ? void 0 : t.message, r = null != n ? n : e.data.response.message, null != r ? r : "Fortmatic: Modal was closed without executing action!"),
                    code: (i = null === (o = e.data.response.error) || void 0 === o ? void 0 : o.code, a = null != i ? i : e.data.response.code, null != a ? a : 1)
                };
            e.data.response.error = s ? u : null
        }(t);
        var l = null != (r = null === (n = t.data.response) || void 0 === n ? void 0 : n.id) ? r : void 0;
        return {
            response: new u.JsonRpcResponse(function(e, t) {
                return t && s.isJsonRpcBatchRequestPayload(e) && e.batch.find((function(e) {
                    return e.id === t
                })) || e
            }(e, l)).applyResult(null === (o = t.data.response) || void 0 === o ? void 0 : o.result).applyError(null === (i = t.data.response) || void 0 === i ? void 0 : i.error),
            id: (c = null === (a = t.data.response) || void 0 === a ? void 0 : a.id, null != c ? c : void 0)
        }
    }
    var d = function() {
        function e(e, t) {
            this.endpoint = e, this.encodedQueryParams = t, this.messageHandlers = new Set, this.initMessageListener()
        }
        return e.prototype.post = function(e, t, n) {
            return r(this, void 0, void 0, (function() {
                var r, i = this;
                return o(this, (function(o) {
                    switch (o.label) {
                        case 0:
                            return [4, e.iframe];
                        case 1:
                            return r = o.sent(), [2, new Promise((function(e, o) {
                                if (r.contentWindow) {
                                    var d = [],
                                        p = s.isJsonRpcBatchRequestPayload(n) ? n.batch.map((function(e) {
                                            return e.id
                                        })) : [];
                                    r.contentWindow.postMessage({
                                        msgType: t + "-" + i.encodedQueryParams,
                                        payload: n
                                    }, "*");
                                    var f = i.on(a.FmIncomingWindowMessage.FORTMATIC_HANDLE_RESPONSE, (h = function() {
                                            f(), y()
                                        }, function(t) {
                                            var r = l(n, t),
                                                o = r.id,
                                                i = r.response;
                                            o && s.isJsonRpcBatchRequestPayload(n) && p.includes(o) ? (d.push(i.payload), d.length === n.batch.length && (h(), e(d))) : o && o === n.id && (h(), e(i.payload))
                                        })),
                                        y = i.on(a.FmIncomingWindowMessage.FORTMATIC_USER_DENIED, function(t) {
                                            return function(r) {
                                                var o = l(n, r),
                                                    i = o.id,
                                                    a = o.response,
                                                    c = {
                                                        message: "Fortmatic: Modal was closed without executing action!",
                                                        code: 1
                                                    },
                                                    f = a.hasError ? a.payload : a.applyError(c).payload;
                                                if (i && s.isJsonRpcBatchRequestPayload(n) && p.includes(i)) {
                                                    d.push(f);
                                                    for (var y = d.length; y < n.batch.length; y++) d.push(new u.JsonRpcResponse(n.batch[y]).applyError(c).payload);
                                                    t(), e(d)
                                                } else i && i === n.id && (t(), e(f))
                                            }
                                        }((function() {
                                            y(), f()
                                        })))
                                } else o(c.createModalNotReadyError());
                                var h
                            }))]
                    }
                }))
            }))
        }, e.prototype.on = function(e, t) {
            var n = this,
                r = t.bind(window),
                o = function(t) {
                    t.data.msgType === e + "-" + n.encodedQueryParams && r(t)
                };
            return this.messageHandlers.add(o),
                function() {
                    return n.messageHandlers.delete(o)
                }
        }, e.prototype.initMessageListener = function() {
            var e = this;
            window.addEventListener("message", (function(t) {
                var n, r, o;
                if (t.origin === e.endpoint && t.data && t.data.msgType && e.messageHandlers.size) {
                    t.data.response = null != (o = t.data.response) ? o : {};
                    try {
                        for (var a = i(e.messageHandlers.values()), s = a.next(); !s.done; s = a.next()) {
                            (0, s.value)(t)
                        }
                    } catch (e) {
                        n = {
                            error: e
                        }
                    } finally {
                        try {
                            s && !s.done && (r = a.return) && r.call(a)
                        } finally {
                            if (n) throw n.error
                        }
                    }
                }
            }))
        }, e
    }();
    t.FmPayloadTransport = d
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = n(4),
        o = function() {
            function e(t) {
                t instanceof e ? (this._jsonrpc = t.payload.jsonrpc, this._id = t.payload.id, this._result = t.payload.result, this._error = t.payload.error) : r.isJsonRpcResponsePayload(t) ? (this._jsonrpc = t.jsonrpc, this._id = t.id, this._result = t.result, this._error = t.error) : (this._jsonrpc = t.jsonrpc, this._id = t.id, this._result = null, this._error = null)
            }
            return e.prototype.applyError = function(e) {
                return this._error = e, this
            }, e.prototype.applyResult = function(e) {
                return this._result = e, this
            }, Object.defineProperty(e.prototype, "hasError", {
                get: function() {
                    return void 0 !== this._error && null !== this._error
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "hasResult", {
                get: function() {
                    return void 0 !== this._result && null !== this._result
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "payload", {
                get: function() {
                    return {
                        jsonrpc: this._jsonrpc,
                        id: this._id,
                        result: this._result,
                        error: this._error
                    }
                },
                enumerable: !0,
                configurable: !0
            }), e
        }();
    t.JsonRpcResponse = o
}, function(e, t, n) {
    e.exports = n(9)
}, function(e, t, n) {
    "use strict";
    var r = this && this.__assign || function() {
        return (r = Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var o in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e
        }).apply(this, arguments)
    };
    var o = this && this.__importStar || function(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t.default = e, t
    };
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = n(10);
    t.default = i.Fortmatic;
    var a = n(2);
    t.FortmaticError = a.FortmaticError, t.FortmaticWarning = a.FortmaticWarning, t.RpcError = a.RpcError;
    var s = o(n(0));
    Object.assign(i.Fortmatic, r(r({}, s), {
            FortmaticError: a.FortmaticError,
            FortmaticWarning: a.FortmaticWarning,
            RpcError: a.RpcError
        })),
        function(e) {
            for (var n in e) t.hasOwnProperty(n) || (t[n] = e[n])
        }(n(0))
}, function(e, t, n) {
    "use strict";
    var r, o = this && this.__extends || (r = function(e, t) {
            return (r = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(e, t)
        }, function(e, t) {
            function n() {
                this.constructor = e
            }
            r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
        }),
        i = this && this.__awaiter || function(e, t, n, r) {
            return new(n || (n = Promise))((function(o, i) {
                function a(e) {
                    try {
                        u(r.next(e))
                    } catch (e) {
                        i(e)
                    }
                }

                function s(e) {
                    try {
                        u(r.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }

                function u(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
                        e(t)
                    }))).then(a, s)
                }
                u((r = r.apply(e, t || [])).next())
            }))
        },
        a = this && this.__generator || function(e, t) {
            var n, r, o, i, a = {
                label: 0,
                sent: function() {
                    if (1 & o[0]) throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return i = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                return this
            }), i;

            function s(i) {
                return function(s) {
                    return function(i) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;
                            switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                                case 0:
                                case 1:
                                    o = i;
                                    break;
                                case 4:
                                    return a.label++, {
                                        value: i[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++, r = i[1], i = [0];
                                    continue;
                                case 7:
                                    i = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                        a.label = i[1];
                                        break
                                    }
                                    if (6 === i[0] && a.label < o[1]) {
                                        a.label = o[1], o = i;
                                        break
                                    }
                                    if (o && a.label < o[2]) {
                                        a.label = o[2], a.ops.push(i);
                                        break
                                    }
                                    o[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            i = t.call(e, a)
                        } catch (e) {
                            i = [6, e], r = 0
                        } finally {
                            n = o = 0
                        }
                        if (5 & i[0]) throw i[1];
                        return {
                            value: i[0] ? i[1] : void 0,
                            done: !0
                        }
                    }([i, s])
                }
            }
        };
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = n(11),
        u = n(12),
        c = n(19),
        l = n(20),
        d = n(0),
        p = n(3),
        f = n(1),
        y = n(21),
        h = n(23),
        _ = n(24),
        m = n(2),
        v = function() {
            function e(e) {
                if (!e.apiKey) throw m.createMissingApiKeyError();
                this.apiKey = e.apiKey, this.gsnRelay = e.gsnRelay, this.endpoint = new URL(e.endpoint).origin, this.encodedQueryParams = h.encodeQueryParameters({
                    API_KEY: this.apiKey,
                    DOMAIN_ORIGIN: window.location ? window.location.origin : "",
                    ETH_NETWORK: e.ethNetwork,
                    host: new URL(this.endpoint).host,
                    sdk: _.name,
                    version: _.version,
                    gsnRelay: e.gsnRelay
                })
            }
            return e.prototype.getProvider = function() {
                return e.__provider__.has(this.encodedQueryParams) || e.__provider__.set(this.encodedQueryParams, new y.FmProvider(this.endpoint, this.apiKey, this.encodedQueryParams)), e.__provider__.get(this.encodedQueryParams)
            }, e.__provider__ = new Map, e
        }();
    t.SDK = v;
    var g = function(e) {
        function t(t, n) {
            var r = e.call(this, {
                apiKey: t,
                ethNetwork: n,
                endpoint: s.PHANTOM_URL
            }) || this;
            return r.user = new u.PhantomUser(r), r
        }
        return o(t, e), t.prototype.loginWithMagicLink = function(e) {
            return i(this, void 0, void 0, (function() {
                var t, n, r, o;
                return a(this, (function(i) {
                    switch (i.label) {
                        case 0:
                            return t = e.email, n = e.showUI, r = void 0 === n || n, o = f.createJsonRpcRequestPayload(d.FmPayloadMethod.fm_auth_login_with_magic_link, [{
                                email: t,
                                showUI: r
                            }]), [4, p.emitFortmaticPayload(this.getProvider(), o)];
                        case 1:
                            return i.sent(), [2, this.user]
                    }
                }))
            }))
        }, t
    }(v);
    t.PhantomMode = g;
    var b = function(e) {
        function t(t, n, r) {
            void 0 === r && (r = {
                gsnRelay: !1
            });
            var o = e.call(this, {
                apiKey: t,
                ethNetwork: n,
                endpoint: s.WIDGET_URL,
                gsnRelay: r.gsnRelay
            }) || this;
            return o.transactions = new c.TransactionsModule(o), o.user = new l.UserModule(o), o
        }
        return o(t, e), t.prototype.configure = function(e) {
            void 0 === e && (e = {});
            var t = f.createJsonRpcRequestPayload(d.FmPayloadMethod.fm_configure, [e]);
            return p.emitFortmaticPayload(this.getProvider(), t)
        }, t.Phantom = g, t
    }(v);
    t.WidgetMode = b, t.Fortmatic = b
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.WIDGET_URL = "https://x2.fortmatic.com", t.PHANTOM_URL = "https://auth.fortmatic.com"
}, function(e, t, n) {
    "use strict";
    var r, o = this && this.__extends || (r = function(e, t) {
        return (r = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
            })(e, t)
    }, function(e, t) {
        function n() {
            this.constructor = e
        }
        r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = n(0),
        a = n(3),
        s = n(1),
        u = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return o(t, e), t.prototype.getIdToken = function(e) {
                var t = s.createJsonRpcRequestPayload(i.FmPayloadMethod.fm_auth_get_access_token, [e]);
                return a.emitFortmaticPayload(this.sdk.getProvider(), t)
            }, t.prototype.getMetadata = function() {
                var e = s.createJsonRpcRequestPayload(i.FmPayloadMethod.fm_auth_get_metadata);
                return a.emitFortmaticPayload(this.sdk.getProvider(), e)
            }, t.prototype.isLoggedIn = function() {
                var e = s.createJsonRpcRequestPayload(i.FmPayloadMethod.fm_is_logged_in);
                return a.emitFortmaticPayload(this.sdk.getProvider(), e)
            }, t.prototype.logout = function() {
                var e = s.createJsonRpcRequestPayload(i.FmPayloadMethod.fm_auth_logout);
                return a.emitFortmaticPayload(this.sdk.getProvider(), e)
            }, t
        }(n(5).BaseModule);
    t.PhantomUser = u
}, function(e, t, n) {
    "use strict";

    function r(e) {
        for (var n in e) t.hasOwnProperty(n) || (t[n] = e[n])
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r(n(14)), r(n(15)), r(n(16))
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        function(e) {
            e.fm_composeSend = "fm_composeSend", e.fm_logout = "fm_logout", e.fm_get_balances = "fm_get_balances", e.fm_get_transactions = "fm_get_transactions", e.fm_is_logged_in = "fm_is_logged_in", e.fm_accountSettings = "fm_accountSettings", e.fm_deposit = "fm_deposit", e.fm_get_user = "fm_get_user", e.fm_configure = "fm_configure", e.fm_auth_login_with_magic_link = "fm_auth_login_with_magic_link", e.fm_auth_get_access_token = "fm_auth_get_access_token", e.fm_auth_get_metadata = "fm_auth_get_metadata", e.fm_auth_logout = "fm_auth_logout"
        }(t.FmPayloadMethod || (t.FmPayloadMethod = {}))
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        function(e) {
            e.FORTMATIC_HANDLE_RESPONSE = "FORTMATIC_HANDLE_RESPONSE", e.FORTMATIC_OVERLAY_READY = "FORTMATIC_OVERLAY_READY", e.FORTMATIC_SHOW_OVERLAY = "FORTMATIC_SHOW_OVERLAY", e.FORTMATIC_HIDE_OVERLAY = "FORTMATIC_HIDE_OVERLAY", e.FORTMATIC_USER_DENIED = "FORTMATIC_USER_DENIED", e.FORTMATIC_USER_LOGOUT = "FORTMATIC_USER_LOGOUT"
        }(t.FmIncomingWindowMessage || (t.FmIncomingWindowMessage = {})),
        function(e) {
            e.FORTMATIC_HANDLE_BATCH_REQUEST = "FORTMATIC_HANDLE_BATCH_REQUEST", e.FORTMATIC_HANDLE_REQUEST = "FORTMATIC_HANDLE_REQUEST", e.FORTMATIC_HANDLE_FORTMATIC_REQUEST = "FORTMATIC_HANDLE_FORTMATIC_REQUEST"
        }(t.FmOutgoingWindowMessage || (t.FmOutgoingWindowMessage = {}))
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        function(e) {
            e.MissingApiKey = "MISSING_API_KEY", e.ModalNotReady = "MODAL_NOT_READY", e.InvalidArgument = "INVALID_ARGUMENT"
        }(t.SDKErrorCode || (t.SDKErrorCode = {})),
        function(e) {
            e.SyncWeb3Method = "SYNC_WEB3_METHOD", e.DuplicateIframe = "DUPLICATE_IFRAME"
        }(t.SDKWarningCode || (t.SDKWarningCode = {})),
        function(e) {
            e[e.ParseError = -32700] = "ParseError", e[e.InvalidRequest = -32600] = "InvalidRequest", e[e.MethodNotFound = -32601] = "MethodNotFound", e[e.InvalidParams = -32602] = "InvalidParams", e[e.InternalError = -32603] = "InternalError", e[e.MagicLinkFailedVerification = -1e4] = "MagicLinkFailedVerification", e[e.MagicLinkExpired = -10001] = "MagicLinkExpired", e[e.MagicLinkRateLimited = -10002] = "MagicLinkRateLimited", e[e.UserAlreadyLoggedIn = -10003] = "UserAlreadyLoggedIn"
        }(t.RPCErrorCode || (t.RPCErrorCode = {}))
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        function(e) {
            e.LoginWithEmail = "email", e.LoginWithPhone = "phone"
        }(t.WidgetModePrimaryLoginOption || (t.WidgetModePrimaryLoginOption = {}))
}, function(e, t, n) {
    "use strict";
    var r = this && this.__generator || function(e, t) {
        var n, r, o, i, a = {
            label: 0,
            sent: function() {
                if (1 & o[0]) throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        };
        return i = {
            next: s(0),
            throw: s(1),
            return: s(2)
        }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
            return this
        }), i;

        function s(i) {
            return function(s) {
                return function(i) {
                    if (n) throw new TypeError("Generator is already executing.");
                    for (; a;) try {
                        if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;
                        switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                            case 0:
                            case 1:
                                o = i;
                                break;
                            case 4:
                                return a.label++, {
                                    value: i[1],
                                    done: !1
                                };
                            case 5:
                                a.label++, r = i[1], i = [0];
                                continue;
                            case 7:
                                i = a.ops.pop(), a.trys.pop();
                                continue;
                            default:
                                if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                    a = 0;
                                    continue
                                }
                                if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                    a.label = i[1];
                                    break
                                }
                                if (6 === i[0] && a.label < o[1]) {
                                    a.label = o[1], o = i;
                                    break
                                }
                                if (o && a.label < o[2]) {
                                    a.label = o[2], a.ops.push(i);
                                    break
                                }
                                o[2] && a.ops.pop(), a.trys.pop();
                                continue
                        }
                        i = t.call(e, a)
                    } catch (e) {
                        i = [6, e], r = 0
                    } finally {
                        n = o = 0
                    }
                    if (5 & i[0]) throw i[1];
                    return {
                        value: i[0] ? i[1] : void 0,
                        done: !0
                    }
                }([i, s])
            }
        }
    };
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = function() {
        var e;
        return r(this, (function(t) {
            switch (t.label) {
                case 0:
                    e = 0, t.label = 1;
                case 1:
                    return e < Number.MAX_SAFE_INTEGER ? [4, ++e] : [3, 3];
                case 2:
                    return t.sent(), [3, 4];
                case 3:
                    e = 0, t.label = 4;
                case 4:
                    return [3, 1];
                case 5:
                    return [2]
            }
        }))
    }();
    t.getPayloadId = function() {
        return o.next().value
    }
}, function(e, t, n) {
    "use strict";
    var r, o = this && this.__extends || (r = function(e, t) {
        return (r = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
            })(e, t)
    }, function(e, t) {
        function n() {
            this.constructor = e
        }
        r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = n(0),
        a = n(1),
        s = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return o(t, e), t.prototype.send = function(e, t) {
                var n = a.createJsonRpcRequestPayload(i.FmPayloadMethod.fm_composeSend, e);
                this.sdk.getProvider().sendFortmaticAsync(n, t)
            }, t
        }(n(5).BaseModule);
    t.TransactionsModule = s
}, function(e, t, n) {
    "use strict";
    var r, o = this && this.__extends || (r = function(e, t) {
            return (r = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(e, t)
        }, function(e, t) {
            function n() {
                this.constructor = e
            }
            r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
        }),
        i = this && this.__awaiter || function(e, t, n, r) {
            return new(n || (n = Promise))((function(o, i) {
                function a(e) {
                    try {
                        u(r.next(e))
                    } catch (e) {
                        i(e)
                    }
                }

                function s(e) {
                    try {
                        u(r.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }

                function u(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
                        e(t)
                    }))).then(a, s)
                }
                u((r = r.apply(e, t || [])).next())
            }))
        },
        a = this && this.__generator || function(e, t) {
            var n, r, o, i, a = {
                label: 0,
                sent: function() {
                    if (1 & o[0]) throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return i = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                return this
            }), i;

            function s(i) {
                return function(s) {
                    return function(i) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;
                            switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                                case 0:
                                case 1:
                                    o = i;
                                    break;
                                case 4:
                                    return a.label++, {
                                        value: i[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++, r = i[1], i = [0];
                                    continue;
                                case 7:
                                    i = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                        a.label = i[1];
                                        break
                                    }
                                    if (6 === i[0] && a.label < o[1]) {
                                        a.label = o[1], o = i;
                                        break
                                    }
                                    if (o && a.label < o[2]) {
                                        a.label = o[2], a.ops.push(i);
                                        break
                                    }
                                    o[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            i = t.call(e, a)
                        } catch (e) {
                            i = [6, e], r = 0
                        } finally {
                            n = o = 0
                        }
                        if (5 & i[0]) throw i[1];
                        return {
                            value: i[0] ? i[1] : void 0,
                            done: !0
                        }
                    }([i, s])
                }
            }
        };
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = n(0),
        u = n(3),
        c = n(1),
        l = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return o(t, e), t.prototype.login = function() {
                return i(this, void 0, void 0, (function() {
                    return a(this, (function(e) {
                        return [2, this.sdk.getProvider().enable()]
                    }))
                }))
            }, t.prototype.logout = function() {
                var e = c.createJsonRpcRequestPayload(s.FmPayloadMethod.fm_logout);
                return u.emitFortmaticPayload(this.sdk.getProvider(), e)
            }, t.prototype.getUser = function() {
                var e = c.createJsonRpcRequestPayload(s.FmPayloadMethod.fm_get_user);
                return u.emitFortmaticPayload(this.sdk.getProvider(), e)
            }, t.prototype.getBalances = function() {
                var e = c.createJsonRpcRequestPayload(s.FmPayloadMethod.fm_get_balances);
                return u.emitFortmaticPayload(this.sdk.getProvider(), e)
            }, t.prototype.getTransactions = function() {
                var e = c.createJsonRpcRequestPayload(s.FmPayloadMethod.fm_get_transactions);
                return u.emitFortmaticPayload(this.sdk.getProvider(), e)
            }, t.prototype.isLoggedIn = function() {
                var e = c.createJsonRpcRequestPayload(s.FmPayloadMethod.fm_is_logged_in);
                return u.emitFortmaticPayload(this.sdk.getProvider(), e)
            }, t.prototype.settings = function() {
                var e = c.createJsonRpcRequestPayload(s.FmPayloadMethod.fm_accountSettings);
                return u.emitFortmaticPayload(this.sdk.getProvider(), e)
            }, t.prototype.deposit = function(e) {
                var t = c.createJsonRpcRequestPayload(s.FmPayloadMethod.fm_deposit, [e || {}]);
                return u.emitFortmaticPayload(this.sdk.getProvider(), t)
            }, t
        }(n(5).BaseModule);
    t.UserModule = l
}, function(e, t, n) {
    "use strict";
    var r = this && this.__awaiter || function(e, t, n, r) {
            return new(n || (n = Promise))((function(o, i) {
                function a(e) {
                    try {
                        u(r.next(e))
                    } catch (e) {
                        i(e)
                    }
                }

                function s(e) {
                    try {
                        u(r.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }

                function u(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
                        e(t)
                    }))).then(a, s)
                }
                u((r = r.apply(e, t || [])).next())
            }))
        },
        o = this && this.__generator || function(e, t) {
            var n, r, o, i, a = {
                label: 0,
                sent: function() {
                    if (1 & o[0]) throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return i = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                return this
            }), i;

            function s(i) {
                return function(s) {
                    return function(i) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;
                            switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                                case 0:
                                case 1:
                                    o = i;
                                    break;
                                case 4:
                                    return a.label++, {
                                        value: i[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++, r = i[1], i = [0];
                                    continue;
                                case 7:
                                    i = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                        a.label = i[1];
                                        break
                                    }
                                    if (6 === i[0] && a.label < o[1]) {
                                        a.label = o[1], o = i;
                                        break
                                    }
                                    if (o && a.label < o[2]) {
                                        a.label = o[2], a.ops.push(i);
                                        break
                                    }
                                    o[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            i = t.call(e, a)
                        } catch (e) {
                            i = [6, e], r = 0
                        } finally {
                            n = o = 0
                        }
                        if (5 & i[0]) throw i[1];
                        return {
                            value: i[0] ? i[1] : void 0,
                            done: !0
                        }
                    }([i, s])
                }
            }
        };
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = n(0),
        a = n(3),
        s = n(1),
        u = n(4),
        c = n(22),
        l = n(6),
        d = n(7),
        p = n(2),
        f = function() {
            function e(e, t, n) {
                this.apiKey = t, this.isFortmatic = !0, this.queue = [], this.overlay = new c.FmIframeController(e, n), this.payloadTransport = new l.FmPayloadTransport(e, n), this.listen()
            }
            return e.prototype.sendAsync = function(e, t) {
                if (!t) throw p.createInvalidArgumentError({
                    functionName: "sendAsync",
                    argIndex: 1,
                    expected: "function",
                    received: null === t ? "null" : typeof t
                });
                if (Array.isArray(e)) return this.enqueue({
                    onRequestComplete: t,
                    payload: s.createJsonRpcBatchRequestPayload(e)
                });
                var n = s.standardizeRequestPayload(e);
                return u.isJsonRpcBatchRequestPayload(n), this.enqueue({
                    onRequestComplete: t,
                    payload: n
                })
            }, e.prototype.sendFortmaticAsync = function(e, t) {
                if (!t) throw p.createInvalidArgumentError({
                    functionName: "sendFortmaticAsync",
                    argIndex: 1,
                    expected: "function",
                    received: null === t ? "null" : typeof t
                });
                var n = s.standardizeRequestPayload(e);
                this.enqueue({
                    onRequestComplete: t,
                    payload: n,
                    isFortmaticMethod: !0
                })
            }, e.prototype.send = function(e, t) {
                return "string" == typeof e ? a.emitWeb3Payload(this, e, t) : t ? void this.sendAsync(e, t) : (p.createSynchronousWeb3MethodWarning().log(), new d.JsonRpcResponse(e).applyError({
                    code: -32603,
                    message: "Non-async web3 methods will be deprecated in web3 > 1.0 and are not supported by the Fortmatic provider. An async method is to be used instead."
                }).payload)
            }, e.prototype.enable = function() {
                return a.emitWeb3Payload(this, "eth_accounts")
            }, e.prototype.enqueue = function(e) {
                e && (this.queue.push(e), this.overlay.overlayReady && this.dequeue())
            }, e.prototype.dequeue = function() {
                return r(this, void 0, void 0, (function() {
                    var e, t, n, r;
                    return o(this, (function(o) {
                        switch (o.label) {
                            case 0:
                                return 0 === this.queue.length ? [2] : (e = this.queue.shift()) ? (t = e.payload, u.isJsonRpcBatchRequestPayload(t) ? 0 === t.batch.length ? [2, e.onRequestComplete(null, [])] : [4, this.payloadTransport.post(this.overlay, i.FmOutgoingWindowMessage.FORTMATIC_HANDLE_REQUEST, t)] : [3, 2]) : [3, 5];
                            case 1:
                                n = o.sent(), e.onRequestComplete(null, n), o.label = 2;
                            case 2:
                                return u.isJsonRpcRequestPayload(t) ? [4, this.payloadTransport.post(this.overlay, e.isFortmaticMethod ? i.FmOutgoingWindowMessage.FORTMATIC_HANDLE_FORTMATIC_REQUEST : i.FmOutgoingWindowMessage.FORTMATIC_HANDLE_REQUEST, t)] : [3, 4];
                            case 3:
                                (r = o.sent()).error ? e.onRequestComplete(new p.RpcError(r.error), r) : e.onRequestComplete(null, r), o.label = 4;
                            case 4:
                                this.dequeue(), o.label = 5;
                            case 5:
                                return [2]
                        }
                    }))
                }))
            }, e.prototype.listen = function() {
                var e = this;
                this.payloadTransport.on(i.FmIncomingWindowMessage.FORTMATIC_OVERLAY_READY, (function() {
                    e.dequeue()
                })), this.payloadTransport.on(i.FmIncomingWindowMessage.FORTMATIC_USER_DENIED, (function() {
                    e.queue.forEach((function(e) {
                        var t = new d.JsonRpcResponse(e.payload),
                            n = {
                                message: "Fortmatic: Modal was closed without executing action!",
                                code: 1
                            };
                        e.onRequestComplete(new p.RpcError(n), t.applyError(n).payload)
                    })), e.queue.slice(0)
                }))
            }, e
        }();
    t.FmProvider = f
}, function(e, t, n) {
    "use strict";
    var r = this && this.__awaiter || function(e, t, n, r) {
            return new(n || (n = Promise))((function(o, i) {
                function a(e) {
                    try {
                        u(r.next(e))
                    } catch (e) {
                        i(e)
                    }
                }

                function s(e) {
                    try {
                        u(r.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }

                function u(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
                        e(t)
                    }))).then(a, s)
                }
                u((r = r.apply(e, t || [])).next())
            }))
        },
        o = this && this.__generator || function(e, t) {
            var n, r, o, i, a = {
                label: 0,
                sent: function() {
                    if (1 & o[0]) throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return i = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                return this
            }), i;

            function s(i) {
                return function(s) {
                    return function(i) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;
                            switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                                case 0:
                                case 1:
                                    o = i;
                                    break;
                                case 4:
                                    return a.label++, {
                                        value: i[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++, r = i[1], i = [0];
                                    continue;
                                case 7:
                                    i = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                        a.label = i[1];
                                        break
                                    }
                                    if (6 === i[0] && a.label < o[1]) {
                                        a.label = o[1], o = i;
                                        break
                                    }
                                    if (o && a.label < o[2]) {
                                        a.label = o[2], a.ops.push(i);
                                        break
                                    }
                                    o[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            i = t.call(e, a)
                        } catch (e) {
                            i = [6, e], r = 0
                        } finally {
                            n = o = 0
                        }
                        if (5 & i[0]) throw i[1];
                        return {
                            value: i[0] ? i[1] : void 0,
                            done: !0
                        }
                    }([i, s])
                }
            }
        },
        i = this && this.__values || function(e) {
            var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
            if (n) return n.call(e);
            if (e && "number" == typeof e.length) return {
                next: function() {
                    return e && r >= e.length && (e = void 0), {
                        value: e && e[r++],
                        done: !e
                    }
                }
            };
            throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
        },
        a = this && this.__read || function(e, t) {
            var n = "function" == typeof Symbol && e[Symbol.iterator];
            if (!n) return e;
            var r, o, i = n.call(e),
                a = [];
            try {
                for (;
                    (void 0 === t || t-- > 0) && !(r = i.next()).done;) a.push(r.value)
            } catch (e) {
                o = {
                    error: e
                }
            } finally {
                try {
                    r && !r.done && (n = i.return) && n.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return a
        };
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = n(0),
        u = n(6),
        c = n(2),
        l = {
            display: "none",
            position: "fixed",
            top: "0",
            right: "0",
            width: "100%",
            height: "100%",
            borderRadius: "0",
            border: "none",
            zIndex: "2147483647"
        };
    var d = function() {
        function e(e, t) {
            this.endpoint = e, this.encodedQueryParams = t, this._overlayReady = !1, this.iframe = this.init(), this.payloadTransport = new u.FmPayloadTransport(e, t), this.listen()
        }
        return Object.defineProperty(e.prototype, "overlayReady", {
            get: function() {
                return this._overlayReady
            },
            enumerable: !0,
            configurable: !0
        }), e.prototype.init = function() {
            var e = this;
            return new Promise((function(t) {
                var n = function() {
                    if (o = e.encodedQueryParams, s = [].slice.call(document.querySelectorAll(".fortmatic-iframe")), Boolean(s.find((function(e) {
                            var t;
                            return null === (t = e.src) || void 0 === t ? void 0 : t.includes(o)
                        })))) c.createDuplicateIframeWarning().log();
                    else {
                        var n = document.createElement("iframe");
                        n.classList.add("fortmatic-iframe"), n.dataset.fortmaticIframeLabel = new URL(e.endpoint).host, n.src = new URL("/send?params=" + e.encodedQueryParams, e.endpoint).href,
                            function(e) {
                                var t, n;
                                try {
                                    for (var r = i(Object.entries(l)), o = r.next(); !o.done; o = r.next()) {
                                        var s = a(o.value, 2),
                                            u = s[0],
                                            c = s[1];
                                        e.style[u] = c
                                    }
                                } catch (e) {
                                    t = {
                                        error: e
                                    }
                                } finally {
                                    try {
                                        o && !o.done && (n = r.return) && n.call(r)
                                    } finally {
                                        if (t) throw t.error
                                    }
                                }
                            }(n), document.body.appendChild(n);
                        var r = document.createElement("img");
                        r.src = "https://static.fortmatic.com/assets/trans.gif", r.style.position = "fixed", document.body.appendChild(r), t(n)
                    }
                    var o, s
                };
                ["loaded", "interactive", "complete"].includes(document.readyState) ? n() : window.addEventListener("load", n, !1)
            }))
        }, e.prototype.showOverlay = function() {
            return r(this, void 0, void 0, (function() {
                return o(this, (function(e) {
                    switch (e.label) {
                        case 0:
                            return [4, this.iframe];
                        case 1:
                            return e.sent().style.display = "block", [2]
                    }
                }))
            }))
        }, e.prototype.hideOverlay = function() {
            return r(this, void 0, void 0, (function() {
                return o(this, (function(e) {
                    switch (e.label) {
                        case 0:
                            return [4, this.iframe];
                        case 1:
                            return e.sent().style.display = "none", [2]
                    }
                }))
            }))
        }, e.prototype.listen = function() {
            var e = this;
            this.payloadTransport.on(s.FmIncomingWindowMessage.FORTMATIC_OVERLAY_READY, (function() {
                e._overlayReady = !0
            })), this.payloadTransport.on(s.FmIncomingWindowMessage.FORTMATIC_HIDE_OVERLAY, (function() {
                e.hideOverlay()
            })), this.payloadTransport.on(s.FmIncomingWindowMessage.FORTMATIC_SHOW_OVERLAY, (function() {
                e.showOverlay()
            }))
        }, e
    }();
    t.FmIframeController = d
}, function(e, t, n) {
    "use strict";
    var r;
    Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        function(e) {
            e.HARMONY = "HARMONY"
        }(r || (r = {})), t.encodeQueryParameters = function(e) {
            return btoa(JSON.stringify(e))
        }, t.decodeQueryParameters = function(e) {
            return JSON.parse(atob(e))
        }
}, function(e) {
    e.exports = JSON.parse('{"name":"fortmatic","version":"2.2.1","description":"Fortmatic Javascript SDK","author":"Fortmatic <team@fortmatic.com> (https://fortmatic.com/)","license":"MIT","repository":{"type":"git","url":"https://github.com/fortmatic/fortmatic-js"},"keywords":["auth","login","web3","crypto","ethereum","metaMask","wallet","blockchain","dapp"],"homepage":"https://www.fortmatic.com","main":"dist/cjs/fortmatic.js","types":"dist/cjs/src/index.d.ts","scripts":{"start":"npm run clean:build && ./scripts/start.sh","build":"npm run clean:build && ./scripts/build.sh","test":"npm run clean:test-artifacts && ./scripts/test.sh","lint":"eslint --fix src/**/*.ts","clean":"npm-run-all -s clean:*","clean:test-artifacts":"rimraf coverage && rimraf .nyc_output","clean:build":"rimraf dist","clean_node_modules":"rimraf node_modules"},"dependencies":{},"devDependencies":{"@ikscodes/browser-env":"~0.3.1","@ikscodes/eslint-config":"~6.2.0","@ikscodes/prettier-config":"^0.1.0","@istanbuljs/nyc-config-typescript":"~0.1.3","@types/jsdom":"~12.2.4","@types/sinon":"~7.5.0","@types/webpack":"~4.41.0","@typescript-eslint/eslint-plugin":"~2.17.0","ava":"2.2.0","cross-env":"~6.0.3","eslint":"~6.8.0","eslint-import-resolver-typescript":"~2.0.0","eslint-plugin-import":"~2.20.0","eslint-plugin-jsx-a11y":"~6.2.3","eslint-plugin-prettier":"~3.1.2","eslint-plugin-react":"~7.18.0","eslint-plugin-react-hooks":"~1.7.0","lodash":"~4.17.15","npm-run-all":"~4.1.5","nyc":"13.1.0","prettier":"~1.19.1","rimraf":"~3.0.0","sinon":"7.1.1","ts-loader":"~6.2.1","ts-node":"~8.5.2","typescript":"~3.7.2","webpack":"~4.41.2","webpack-chain":"~6.2.0","webpack-cli":"~3.3.10"},"ava":{"require":["ts-node/register"],"files":["test/**/*.spec.ts"],"extensions":["ts"],"compileEnhancements":false,"verbose":true},"nyc":{"extends":"@istanbuljs/nyc-config-typescript","all":false,"check-coverage":true,"per-file":true,"lines":99,"statements":99,"functions":99,"branches":99,"reporter":["html","lcov"]}}')
}]).default;