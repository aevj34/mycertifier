(function() {
    var d;
    window.AmCharts ? d = window.AmCharts : (d = {}, window.AmCharts = d, d.themes = {}, d.maps = {}, d.inheriting = {}, d.charts = [], d.onReadyArray = [], d.useUTC = !1, d.updateRate = 30, d.uid = 0, d.lang = {}, d.translations = {}, d.mapTranslations = {}, d.windows = {}, d.initHandlers = []);
    d.Class = function(a) {
        var b = function() { arguments[0] !== d.inheriting && (this.events = {}, this.construct.apply(this, arguments)) };
        a.inherits ? (b.prototype = new a.inherits(d.inheriting), b.base = a.inherits.prototype, delete a.inherits) : (b.prototype.createEvents =
            function() { for (var a = 0, b = arguments.length; a < b; a++) this.events[arguments[a]] = [] }, b.prototype.listenTo = function(a, b, c) {
                this.removeListener(a, b, c);
                a.events[b].push({ handler: c, scope: this })
            }, b.prototype.addListener = function(a, b, c) {
                this.removeListener(this, a, b);
                this.events[a].push({ handler: b, scope: c })
            }, b.prototype.removeListener = function(a, b, c) {
                if (a && a.events)
                    for (a = a.events[b], b = a.length - 1; 0 <= b; b--) a[b].handler === c && a.splice(b, 1)
            }, b.prototype.fire = function(a, b) {
                for (var c = this.events[a], d = 0, k = c.length; d <
                    k; d++) {
                    var l = c[d];
                    l.handler.call(l.scope, b)
                }
            });
        for (var c in a) b.prototype[c] = a[c];
        return b
    };
    d.addChart = function(a) {
        d.updateInt || (d.updateInt = setInterval(function() { d.update() }, Math.round(1E3 / d.updateRate)));
        d.charts.push(a)
    };
    d.removeChart = function(a) {
        for (var b = d.charts, c = b.length - 1; 0 <= c; c--) b[c] == a && b.splice(c, 1);
        0 === b.length && d.updateInt && clearInterval(d.updateInt)
    };
    d.isModern = !0;
    d.getIEVersion = function() {
        var a = 0,
            b, c;
        "Microsoft Internet Explorer" == navigator.appName && (b = navigator.userAgent, c = /MSIE ([0-9]{1,}[.0-9]{0,})/,
            null !== c.exec(b) && (a = parseFloat(RegExp.$1)));
        return a
    };
    d.applyLang = function(a, b) {
        var c = d.translations;
        b.dayNames = d.extend({}, d.dayNames);
        b.shortDayNames = d.extend({}, d.shortDayNames);
        b.monthNames = d.extend({}, d.monthNames);
        b.shortMonthNames = d.extend({}, d.shortMonthNames);
        c && (c = c[a]) && (d.lang = c, c.monthNames && (b.dayNames = d.extend({}, c.dayNames), b.shortDayNames = d.extend({}, c.shortDayNames), b.monthNames = d.extend({}, c.monthNames), b.shortMonthNames = d.extend({}, c.shortMonthNames)))
    };
    d.IEversion = d.getIEVersion();
    9 > d.IEversion && 0 < d.IEversion && (d.isModern = !1, d.isIE = !0);
    d.dx = 0;
    d.dy = 0;
    if (document.addEventListener || window.opera) d.isNN = !0, d.isIE = !1, d.dx = .5, d.dy = .5;
    document.attachEvent && (d.isNN = !1, d.isIE = !0, d.isModern || (d.dx = 0, d.dy = 0));
    window.chrome && (d.chrome = !0);
    d.handleMouseUp = function(a) {
        for (var b = d.charts, c = 0; c < b.length; c++) {
            var e = b[c];
            e && e.handleReleaseOutside && e.handleReleaseOutside(a)
        }
    };
    d.handleMouseMove = function(a) {
        for (var b = d.charts, c = 0; c < b.length; c++) {
            var e = b[c];
            e && e.handleMouseMove && e.handleMouseMove(a)
        }
    };
    d.handleWheel = function(a) { for (var b = d.charts, c = 0; c < b.length; c++) { var e = b[c]; if (e && e.mouseIsOver) { e.mouseWheelScrollEnabled || e.mouseWheelZoomEnabled ? e.handleWheel && e.handleWheel(a) : a.stopPropagation && a.stopPropagation(); break } } };
    d.resetMouseOver = function() {
        for (var a = d.charts, b = 0; b < a.length; b++) {
            var c = a[b];
            c && (c.mouseIsOver = !1)
        }
    };
    d.ready = function(a) { d.onReadyArray.push(a) };
    d.handleLoad = function() {
        d.isReady = !0;
        for (var a = d.onReadyArray, b = 0; b < a.length; b++) {
            var c = a[b];
            isNaN(d.processDelay) ? c() : setTimeout(c,
                d.processDelay * b)
        }
    };
    d.addInitHandler = function(a, b) { d.initHandlers.push({ method: a, types: b }) };
    d.callInitHandler = function(a) {
        var b = d.initHandlers;
        if (d.initHandlers)
            for (var c = 0; c < b.length; c++) {
                var e = b[c];
                e.types ? d.isInArray(e.types, a.type) && e.method(a) : e.method(a)
            }
    };
    d.getUniqueId = function() { d.uid++; return "AmChartsEl-" + d.uid };
    d.isNN && (document.addEventListener("mousemove", d.handleMouseMove, !0), document.addEventListener("mouseup", d.handleMouseUp, !0), window.addEventListener("load", d.handleLoad, !0), window.addEventListener("DOMMouseScroll",
        d.handleWheel, !0), document.addEventListener("mousewheel", d.handleWheel, !0));
    d.isIE && (document.attachEvent("onmousemove", d.handleMouseMove), document.attachEvent("onmouseup", d.handleMouseUp), window.attachEvent("onload", d.handleLoad));
    d.clear = function() {
        var a = d.charts;
        if (a)
            for (var b = 0; b < a.length; b++) a[b].clear();
        d.updateInt && clearInterval(d.updateInt);
        d.charts = null;
        d.isNN && (document.removeEventListener("mousemove", d.handleMouseMove, !0), document.removeEventListener("mouseup", d.handleMouseUp, !0), window.removeEventListener("load",
            d.handleLoad, !0), window.removeEventListener("DOMMouseScroll", d.handleWheel, !0), document.removeEventListener("mousewheel", d.handleWheel, !0));
        d.isIE && (document.detachEvent("onmousemove", d.handleMouseMove), document.detachEvent("onmouseup", d.handleMouseUp), window.detachEvent("onload", d.handleLoad))
    };
    d.makeChart = function(a, b, c) {
        var e = b.type,
            h = b.theme;
        d.isString(h) && (h = d.themes[h], b.theme = h);
        var f;
        switch (e) {
            case "serial":
                f = new d.AmSerialChart(h);
                break;
            case "xy":
                f = new d.AmXYChart(h);
                break;
            case "pie":
                f = new d.AmPieChart(h);
                break;
            case "radar":
                f = new d.AmRadarChart(h);
                break;
            case "gauge":
                f = new d.AmAngularGauge(h);
                break;
            case "funnel":
                f = new d.AmFunnelChart(h);
                break;
            case "map":
                f = new d.AmMap(h);
                break;
            case "stock":
                f = new d.AmStockChart(h);
                break;
            case "gantt":
                f = new d.AmGanttChart(h)
        }
        d.extend(f, b);
        d.isReady ? isNaN(c) ? f.write(a) : setTimeout(function() { d.realWrite(f, a) }, c) : d.ready(function() { isNaN(c) ? f.write(a) : setTimeout(function() { d.realWrite(f, a) }, c) });
        return f
    };
    d.realWrite = function(a, b) { a.write(b) };
    d.updateCount = 0;
    d.validateAt =
        Math.round(d.updateRate / 5);
    d.update = function() {
        var a = d.charts;
        d.updateCount++;
        var b = !1;
        d.updateCount == d.validateAt && (b = !0, d.updateCount = 0);
        if (a)
            for (var c = 0; c < a.length; c++) a[c].update && a[c].update(), b && a[c].validateSize && a[c].validateSize()
    };
    d.bezierX = 3;
    d.bezierY = 6
})();
(function() {
    var d = window.AmCharts;
    d.toBoolean = function(a, b) {
        if (void 0 === a) return b;
        switch (String(a).toLowerCase()) {
            case "true":
            case "yes":
            case "1":
                return !0;
            case "false":
            case "no":
            case "0":
            case null:
                return !1;
            default:
                return Boolean(a)
        }
    };
    d.removeFromArray = function(a, b) {
        var c;
        if (void 0 !== b && void 0 !== a)
            for (c = a.length - 1; 0 <= c; c--) a[c] == b && a.splice(c, 1)
    };
    d.isInArray = function(a, b) {
        for (var c = 0; c < a.length; c++)
            if (a[c] == b) return !0;
        return !1
    };
    d.getDecimals = function(a) {
        var b = 0;
        isNaN(a) || (a = String(a), -1 != a.indexOf("e-") ?
            b = Number(a.split("-")[1]) : -1 != a.indexOf(".") && (b = a.split(".")[1].length));
        return b
    };
    d.wrappedText = function(a, b, c, e, h, f, g, k, l) {
        var m = d.text(a, b, c, e, h, f, g),
            n = "\n";
        d.isModern || (n = "<br>");
        if (10 < l) return m;
        if (m) {
            var q = m.getBBox();
            if (q.width > k) {
                q = Math.ceil(q.width / k);
                m.remove();
                for (var m = [], p = 0; - 1 < (p = b.indexOf(" ", p));) m.push(p), p += 1;
                for (var t, p = 0; p < m.length; p += Math.ceil(m.length / q)) t = m[p], b = b.substr(0, t) + n + b.substr(t + 1);
                if (isNaN(t)) {
                    if (0 === l)
                        for (p = 1; p < q; p++) t = Math.round(b.length / q * p), b = b.substr(0, t) + n +
                            b.substr(t);
                    return d.text(a, b, c, e, h, f, g)
                }
                return d.wrappedText(a, b, c, e, h, f, g, k, l + 1)
            }
            return m
        }
    };
    d.getStyle = function(a, b) {
        var c = "";
        document.defaultView && document.defaultView.getComputedStyle ? c = document.defaultView.getComputedStyle(a, "").getPropertyValue(b) : a.currentStyle && (b = b.replace(/\-(\w)/g, function(a, b) { return b.toUpperCase() }), c = a.currentStyle[b]);
        return c
    };
    d.removePx = function(a) { if (void 0 !== a) return Number(a.substring(0, a.length - 2)) };
    d.getURL = function(a, b) {
        if (a)
            if ("_self" != b && b)
                if ("_top" == b &&
                    window.top) window.top.location.href = a;
                else if ("_parent" == b && window.parent) window.parent.location.href = a;
        else if ("_blank" == b) window.open(a);
        else {
            var c = document.getElementsByName(b)[0];
            c ? c.src = a : (c = d.windows[b]) ? c.opener && !c.opener.closed ? c.location.href = a : d.windows[b] = window.open(a) : d.windows[b] = window.open(a)
        } else window.location.href = a
    };
    d.ifArray = function(a) { return a && 0 < a.length ? !0 : !1 };
    d.callMethod = function(a, b) {
        var c;
        for (c = 0; c < b.length; c++) {
            var e = b[c];
            if (e) {
                if (e[a]) e[a]();
                var h = e.length;
                if (0 < h) {
                    var d;
                    for (d = 0; d < h; d++) { var g = e[d]; if (g && g[a]) g[a]() }
                }
            }
        }
    };
    d.toNumber = function(a) { return "number" == typeof a ? a : Number(String(a).replace(/[^0-9\-.]+/g, "")) };
    d.toColor = function(a) {
        if ("" !== a && void 0 !== a)
            if (-1 != a.indexOf(",")) {
                a = a.split(",");
                var b;
                for (b = 0; b < a.length; b++) {
                    var c = a[b].substring(a[b].length - 6, a[b].length);
                    a[b] = "#" + c
                }
            } else a = a.substring(a.length - 6, a.length), a = "#" + a;
        return a
    };
    d.toCoordinate = function(a, b, c) {
        var e;
        void 0 !== a && (a = String(a), c && c < b && (b = c), e = Number(a), -1 != a.indexOf("!") && (e = b - Number(a.substr(1))), -1 != a.indexOf("%") && (e = b * Number(a.substr(0, a.length - 1)) / 100));
        return e
    };
    d.fitToBounds = function(a, b, c) {
        a < b && (a = b);
        a > c && (a = c);
        return a
    };
    d.isDefined = function(a) { return void 0 === a ? !1 : !0 };
    d.stripNumbers = function(a) { return a.replace(/[0-9]+/g, "") };
    d.roundTo = function(a, b) { if (0 > b) return a; var c = Math.pow(10, b); return Math.round(a * c) / c };
    d.toFixed = function(a, b) {
        var c = String(Math.round(a * Math.pow(10, b)));
        if (0 < b) {
            var e = c.length;
            if (e < b) { var h; for (h = 0; h < b - e; h++) c = "0" + c }
            e = c.substring(0, c.length - b);
            "" === e && (e = 0);
            return e + "." + c.substring(c.length - b, c.length)
        }
        return String(c)
    };
    d.formatDuration = function(a, b, c, e, h, f) {
        var g = d.intervals,
            k = f.decimalSeparator;
        if (a >= g[b].contains) {
            var l = a - Math.floor(a / g[b].contains) * g[b].contains;
            "ss" == b && (l = d.formatNumber(l, f), 1 == l.split(k)[0].length && (l = "0" + l));
            ("mm" == b || "hh" == b) && 10 > l && (l = "0" + l);
            c = l + "" + e[b] + "" + c;
            a = Math.floor(a / g[b].contains);
            b = g[b].nextInterval;
            return d.formatDuration(a, b, c, e, h, f)
        }
        "ss" == b && (a = d.formatNumber(a, f), 1 == a.split(k)[0].length && (a = "0" + a));
        ("mm" == b || "hh" ==
            b) && 10 > a && (a = "0" + a);
        c = a + "" + e[b] + "" + c;
        if (g[h].count > g[b].count)
            for (a = g[b].count; a < g[h].count; a++) b = g[b].nextInterval, "ss" == b || "mm" == b || "hh" == b ? c = "00" + e[b] + "" + c : "DD" == b && (c = "0" + e[b] + "" + c);
        ":" == c.charAt(c.length - 1) && (c = c.substring(0, c.length - 1));
        return c
    };
    d.formatNumber = function(a, b, c, e, h) {
        a = d.roundTo(a, b.precision);
        isNaN(c) && (c = b.precision);
        var f = b.decimalSeparator;
        b = b.thousandsSeparator;
        var g;
        g = 0 > a ? "-" : "";
        a = Math.abs(a);
        var k = String(a),
            l = !1; - 1 != k.indexOf("e") && (l = !0);
        0 <= c && !l && (k = d.toFixed(a, c));
        var m =
            "";
        if (l) m = k;
        else {
            var k = k.split("."),
                l = String(k[0]),
                n;
            for (n = l.length; 0 <= n; n -= 3) m = n != l.length ? 0 !== n ? l.substring(n - 3, n) + b + m : l.substring(n - 3, n) + m : l.substring(n - 3, n);
            void 0 !== k[1] && (m = m + f + k[1]);
            void 0 !== c && 0 < c && "0" != m && (m = d.addZeroes(m, f, c))
        }
        m = g + m;
        "" === g && !0 === e && 0 !== a && (m = "+" + m);
        !0 === h && (m += "%");
        return m
    };
    d.addZeroes = function(a, b, c) {
        a = a.split(b);
        void 0 === a[1] && 0 < c && (a[1] = "0");
        return a[1].length < c ? (a[1] += "0", d.addZeroes(a[0] + b + a[1], b, c)) : void 0 !== a[1] ? a[0] + b + a[1] : a[0]
    };
    d.scientificToNormal = function(a) {
        var b;
        a = String(a).split("e");
        var c;
        if ("-" == a[1].substr(0, 1)) {
            b = "0.";
            for (c = 0; c < Math.abs(Number(a[1])) - 1; c++) b += "0";
            b += a[0].split(".").join("")
        } else {
            var e = 0;
            b = a[0].split(".");
            b[1] && (e = b[1].length);
            b = a[0].split(".").join("");
            for (c = 0; c < Math.abs(Number(a[1])) - e; c++) b += "0"
        }
        return b
    };
    d.toScientific = function(a, b) {
        if (0 === a) return "0";
        var c = Math.floor(Math.log(Math.abs(a)) * Math.LOG10E),
            e = String(e).split(".").join(b);
        return String(e) + "e" + c
    };
    d.randomColor = function() { return "#" + ("00000" + (16777216 * Math.random() << 0).toString(16)).substr(-6) };
    d.hitTest = function(a, b, c) {
        var e = !1,
            h = a.x,
            f = a.x + a.width,
            g = a.y,
            k = a.y + a.height,
            l = d.isInRectangle;
        e || (e = l(h, g, b));
        e || (e = l(h, k, b));
        e || (e = l(f, g, b));
        e || (e = l(f, k, b));
        e || !0 === c || (e = d.hitTest(b, a, !0));
        return e
    };
    d.isInRectangle = function(a, b, c) { return a >= c.x - 5 && a <= c.x + c.width + 5 && b >= c.y - 5 && b <= c.y + c.height + 5 ? !0 : !1 };
    d.isPercents = function(a) { if (-1 != String(a).indexOf("%")) return !0 };
    d.findPosX = function(a) {
        var b = a,
            c = a.offsetLeft;
        if (a.offsetParent) {
            for (; a = a.offsetParent;) c += a.offsetLeft;
            for (;
                (b = b.parentNode) && b != document.body;) c -=
                b.scrollLeft || 0
        }
        return c
    };
    d.findPosY = function(a) {
        var b = a,
            c = a.offsetTop;
        if (a.offsetParent) {
            for (; a = a.offsetParent;) c += a.offsetTop;
            for (;
                (b = b.parentNode) && b != document.body;) c -= b.scrollTop || 0
        }
        return c
    };
    d.findIfFixed = function(a) {
        if (a.offsetParent)
            for (; a = a.offsetParent;)
                if ("fixed" == d.getStyle(a, "position")) return !0;
        return !1
    };
    d.findIfAuto = function(a) { return a.style && "auto" == d.getStyle(a, "overflow") ? !0 : a.parentNode ? d.findIfAuto(a.parentNode) : !1 };
    d.findScrollLeft = function(a, b) {
        a.scrollLeft && (b += a.scrollLeft);
        return a.parentNode ? d.findScrollLeft(a.parentNode, b) : b
    };
    d.findScrollTop = function(a, b) { a.scrollTop && (b += a.scrollTop); return a.parentNode ? d.findScrollTop(a.parentNode, b) : b };
    d.formatValue = function(a, b, c, e, h, f, g, k) {
        if (b) {
            void 0 === h && (h = "");
            var l;
            for (l = 0; l < c.length; l++) {
                var m = c[l],
                    n = b[m];
                void 0 !== n && (n = f ? d.addPrefix(n, k, g, e) : d.formatNumber(n, e), a = a.replace(new RegExp("\\[\\[" + h + "" + m + "\\]\\]", "g"), n))
            }
        }
        return a
    };
    d.formatDataContextValue = function(a, b) {
        if (a) {
            var c = a.match(/\[\[.*?\]\]/g),
                e;
            for (e = 0; e < c.length; e++) {
                var h =
                    c[e],
                    h = h.substr(2, h.length - 4);
                void 0 !== b[h] && (a = a.replace(new RegExp("\\[\\[" + h + "\\]\\]", "g"), b[h]))
            }
        }
        return a
    };
    d.massReplace = function(a, b) {
        for (var c in b)
            if (b.hasOwnProperty(c)) {
                var e = b[c];
                void 0 === e && (e = "");
                a = a.replace(c, e)
            }
        return a
    };
    d.cleanFromEmpty = function(a) { return a.replace(/\[\[[^\]]*\]\]/g, "") };
    d.addPrefix = function(a, b, c, e, h) {
        var f = d.formatNumber(a, e),
            g = "",
            k, l, m;
        if (0 === a) return "0";
        0 > a && (g = "-");
        a = Math.abs(a);
        if (1 < a)
            for (k = b.length - 1; - 1 < k; k--) {
                if (a >= b[k].number && (l = a / b[k].number, m = Number(e.precision),
                        1 > m && (m = 1), c = d.roundTo(l, m), m = d.formatNumber(c, { precision: -1, decimalSeparator: e.decimalSeparator, thousandsSeparator: e.thousandsSeparator }), !h || l == c)) { f = g + "" + m + "" + b[k].prefix; break }
            } else
                for (k = 0; k < c.length; k++)
                    if (a <= c[k].number) {
                        l = a / c[k].number;
                        m = Math.abs(Math.round(Math.log(l) * Math.LOG10E));
                        l = d.roundTo(l, m);
                        f = g + "" + l + "" + c[k].prefix;
                        break
                    }
        return f
    };
    d.remove = function(a) { a && a.remove() };
    d.getEffect = function(a) { ">" == a && (a = "easeOutSine"); "<" == a && (a = "easeInSine"); "elastic" == a && (a = "easeOutElastic"); return a };
    d.getObjById = function(a, b) {
        var c, e;
        for (e = 0; e < a.length; e++) {
            var h = a[e];
            h.id == b && (c = h)
        }
        return c
    };
    d.applyTheme = function(a, b, c) {
        b || (b = d.theme);
        b && b[c] && d.extend(a, b[c])
    };
    d.isString = function(a) { return "string" == typeof a ? !0 : !1 };
    d.extend = function(a, b, c) {
        var e;
        a || (a = {});
        for (e in b) c ? a.hasOwnProperty(e) || (a[e] = b[e]) : a[e] = b[e];
        return a
    };
    d.copyProperties = function(a, b) { for (var c in a) a.hasOwnProperty(c) && "events" != c && void 0 !== a[c] && "function" != typeof a[c] && "cname" != c && (b[c] = a[c]) };
    d.processObject = function(a, b,
        c, e) {!1 === a instanceof b && (a = e ? d.extend(new b(c), a) : d.extend(a, new b(c), !0)); return a };
    d.fixNewLines = function(a) {
        var b = RegExp("\\n", "g");
        a && (a = a.replace(b, "<br />"));
        return a
    };
    d.fixBrakes = function(a) {
        if (d.isModern) {
            var b = RegExp("<br>", "g");
            a && (a = a.replace(b, "\n"))
        } else a = d.fixNewLines(a);
        return a
    };
    d.deleteObject = function(a, b) {
        if (a) {
            if (void 0 === b || null === b) b = 20;
            if (0 !== b)
                if ("[object Array]" === Object.prototype.toString.call(a))
                    for (var c = 0; c < a.length; c++) d.deleteObject(a[c], b - 1), a[c] = null;
                else if (a &&
                !a.tagName) try { for (c in a) a[c] && ("object" == typeof a[c] && d.deleteObject(a[c], b - 1), "function" != typeof a[c] && (a[c] = null)) } catch (e) {}
        }
    };
    d.bounce = function(a, b, c, e, h) { return (b /= h) < 1 / 2.75 ? 7.5625 * e * b * b + c : b < 2 / 2.75 ? e * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : b < 2.5 / 2.75 ? e * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : e * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c };
    d.easeInSine = function(a, b, c, e, h) { return -e * Math.cos(b / h * (Math.PI / 2)) + e + c };
    d.easeOutSine = function(a, b, c, e, h) { return e * Math.sin(b / h * (Math.PI / 2)) + c };
    d.easeOutElastic = function(a, b, c,
        e, h) {
        a = 1.70158;
        var d = 0,
            g = e;
        if (0 === b) return c;
        if (1 == (b /= h)) return c + e;
        d || (d = .3 * h);
        g < Math.abs(e) ? (g = e, a = d / 4) : a = d / (2 * Math.PI) * Math.asin(e / g);
        return g * Math.pow(2, -10 * b) * Math.sin(2 * (b * h - a) * Math.PI / d) + e + c
    };
    d.fixStepE = function(a) {
        a = a.toExponential(0).split("e");
        var b = Number(a[1]);
        9 == Number(a[0]) && b++;
        return d.generateNumber(1, b)
    };
    d.generateNumber = function(a, b) {
        var c = "",
            e;
        e = 0 > b ? Math.abs(b) - 1 : Math.abs(b);
        var h;
        for (h = 0; h < e; h++) c += "0";
        return 0 > b ? Number("0." + c + String(a)) : Number(String(a) + c)
    };
    d.setCN = function(a,
        b, c, e) {
        if (a.addClassNames && b && (b = b.node) && c) {
            var h = b.getAttribute("class");
            a = a.classNamePrefix + "-";
            e && (a = "");
            h ? b.setAttribute("class", h + " " + a + c) : b.setAttribute("class", a + c)
        }
    };
    d.parseDefs = function(a, b) {
        for (var c in a) {
            var e = typeof a[c];
            if (0 < a[c].length && "object" == e)
                for (var h = 0; h < a[c].length; h++) e = document.createElementNS(d.SVG_NS, c), b.appendChild(e), d.parseDefs(a[c][h], e);
            else "object" == e ? (e = document.createElementNS(d.SVG_NS, c), b.appendChild(e), d.parseDefs(a[c], e)) : b.setAttribute(c, a[c])
        }
    }
})();
(function() {
    var d = window.AmCharts;
    d.AxisBase = d.Class({
        construct: function(a) {
            this.createEvents("clickItem", "rollOverItem", "rollOutItem");
            this.viY = this.viX = this.y = this.x = this.dy = this.dx = 0;
            this.axisThickness = 1;
            this.axisColor = "#000000";
            this.axisAlpha = 1;
            this.gridCount = this.tickLength = 5;
            this.gridAlpha = .15;
            this.gridThickness = 1;
            this.gridColor = "#000000";
            this.dashLength = 0;
            this.labelFrequency = 1;
            this.showLastLabel = this.showFirstLabel = !0;
            this.fillColor = "#FFFFFF";
            this.fillAlpha = 0;
            this.labelsEnabled = !0;
            this.labelRotation =
                0;
            this.autoGridCount = !0;
            this.offset = 0;
            this.guides = [];
            this.visible = !0;
            this.counter = 0;
            this.guides = [];
            this.ignoreAxisWidth = this.inside = !1;
            this.minHorizontalGap = 75;
            this.minVerticalGap = 35;
            this.titleBold = !0;
            this.minorGridEnabled = !1;
            this.minorGridAlpha = .07;
            this.autoWrap = !1;
            this.titleAlign = "middle";
            this.labelOffset = 0;
            this.bcn = "axis-";
            this.periods = [{ period: "ss", count: 1 }, { period: "ss", count: 5 }, { period: "ss", count: 10 }, { period: "ss", count: 30 }, { period: "mm", count: 1 }, { period: "mm", count: 5 }, { period: "mm", count: 10 }, {
                period: "mm",
                count: 30
            }, { period: "hh", count: 1 }, { period: "hh", count: 3 }, { period: "hh", count: 6 }, { period: "hh", count: 12 }, { period: "DD", count: 1 }, { period: "DD", count: 2 }, { period: "DD", count: 3 }, { period: "DD", count: 4 }, { period: "DD", count: 5 }, { period: "WW", count: 1 }, { period: "MM", count: 1 }, { period: "MM", count: 2 }, { period: "MM", count: 3 }, { period: "MM", count: 6 }, { period: "YYYY", count: 1 }, { period: "YYYY", count: 2 }, { period: "YYYY", count: 5 }, { period: "YYYY", count: 10 }, { period: "YYYY", count: 50 }, { period: "YYYY", count: 100 }];
            this.dateFormats = [{ period: "fff", format: "JJ:NN:SS" },
                { period: "ss", format: "JJ:NN:SS" }, { period: "mm", format: "JJ:NN" }, { period: "hh", format: "JJ:NN" }, { period: "DD", format: "MMM DD" }, { period: "WW", format: "MMM DD" }, { period: "MM", format: "MMM" }, { period: "YYYY", format: "YYYY" }
            ];
            this.nextPeriod = { fff: "ss", ss: "mm", mm: "hh", hh: "DD", DD: "MM", MM: "YYYY" };
            d.applyTheme(this, a, "AxisBase")
        },
        zoom: function(a, b) {
            this.start = a;
            this.end = b;
            this.dataChanged = !0;
            this.draw()
        },
        fixAxisPosition: function() {
            var a = this.position;
            "H" == this.orientation ? ("left" == a && (a = "bottom"), "right" == a && (a = "top")) :
                ("bottom" == a && (a = "left"), "top" == a && (a = "right"));
            this.position = a
        },
        draw: function() {
            var a = this.chart;
            this.allLabels = [];
            this.counter = 0;
            this.destroy();
            this.fixAxisPosition();
            this.labels = [];
            var b = a.container,
                c = b.set();
            a.gridSet.push(c);
            this.set = c;
            b = b.set();
            a.axesLabelsSet.push(b);
            this.labelsSet = b;
            this.axisLine = new this.axisRenderer(this);
            this.autoGridCount ? ("V" == this.orientation ? (a = this.height / this.minVerticalGap, 3 > a && (a = 3)) : a = this.width / this.minHorizontalGap, this.gridCountR = Math.max(a, 1)) : this.gridCountR =
                this.gridCount;
            this.axisWidth = this.axisLine.axisWidth;
            this.addTitle()
        },
        setOrientation: function(a) { this.orientation = a ? "H" : "V" },
        addTitle: function() {
            var a = this.title;
            this.titleLabel = null;
            if (a) {
                var b = this.chart,
                    c = this.titleColor;
                void 0 === c && (c = b.color);
                var e = this.titleFontSize;
                isNaN(e) && (e = b.fontSize + 1);
                a = d.text(b.container, a, c, b.fontFamily, e, this.titleAlign, this.titleBold);
                d.setCN(b, a, this.bcn + "title");
                this.titleLabel = a
            }
        },
        positionTitle: function() {
            var a = this.titleLabel;
            if (a) {
                var b, c, e = this.labelsSet,
                    h = {};
                0 < e.length ? h = e.getBBox() : (h.x = 0, h.y = 0, h.width = this.viW, h.height = this.viH, d.VML && (h.y += this.y, h.x += this.x));
                e.push(a);
                var e = h.x,
                    f = h.y;
                d.VML && (this.rotate ? e -= this.x : f -= this.y);
                var g = h.width,
                    h = h.height,
                    k = this.viW,
                    l = this.viH,
                    m = 0,
                    n = a.getBBox().height / 2,
                    q = this.inside,
                    p = this.titleAlign;
                switch (this.position) {
                    case "top":
                        b = "left" == p ? -1 : "right" == p ? k : k / 2;
                        c = f - 10 - n;
                        break;
                    case "bottom":
                        b = "left" == p ? -1 : "right" == p ? k : k / 2;
                        c = f + h + 10 + n;
                        break;
                    case "left":
                        b = e - 10 - n;
                        q && (b -= 5);
                        c = "left" == p ? l + 1 : "right" == p ? -1 : l / 2;
                        m = -90;
                        break;
                    case "right":
                        b = e + g + 10 + n - 3, q && (b += 7), c = "left" == p ? l + 2 : "right" == p ? -2 : l / 2, m = -90
                }
                this.marginsChanged ? (a.translate(b, c), this.tx = b, this.ty = c) : a.translate(this.tx, this.ty);
                this.marginsChanged = !1;
                0 !== m && a.rotate(m)
            }
        },
        pushAxisItem: function(a, b) {
            var c = this,
                e = a.graphics();
            0 < e.length() && (b ? c.labelsSet.push(e) : c.set.push(e));
            if (e = a.getLabel()) this.labelsSet.push(e), e.click(function(b) { c.handleMouse(b, a, "clickItem") }).mouseover(function(b) { c.handleMouse(b, a, "rollOverItem") }).mouseout(function(b) {
                c.handleMouse(b,
                    a, "rollOutItem")
            })
        },
        handleMouse: function(a, b, c) { this.fire(c, { type: c, value: b.value, serialDataItem: b.serialDataItem, axis: this, target: b.label, chart: this.chart, event: a }) },
        addGuide: function(a) {
            for (var b = this.guides, c = !1, e = b.length, h = 0; h < b.length; h++) b[h] == a && (c = !0, e = h);
            a = d.processObject(a, d.Guide, this.theme);
            a.id || (a.id = "guideAuto" + e + "_" + (new Date).getTime());
            c || b.push(a)
        },
        removeGuide: function(a) {
            var b = this.guides,
                c;
            for (c = 0; c < b.length; c++) b[c] == a && b.splice(c, 1)
        },
        handleGuideOver: function(a) {
            clearTimeout(this.chart.hoverInt);
            var b = a.graphics.getBBox(),
                c = b.x + b.width / 2,
                b = b.y + b.height / 2,
                e = a.fillColor;
            void 0 === e && (e = a.lineColor);
            this.chart.showBalloon(a.balloonText, e, !0, c, b)
        },
        handleGuideOut: function() { this.chart.hideBalloon() },
        addEventListeners: function(a, b) {
            var c = this;
            a.mouseover(function() { c.handleGuideOver(b) });
            a.touchstart(function() { c.handleGuideOver(b) });
            a.mouseout(function() { c.handleGuideOut(b) })
        },
        getBBox: function() {
            var a = this.labelsSet.getBBox();
            d.VML || (a = { x: a.x + this.x, y: a.y + this.y, width: a.width, height: a.height });
            return a
        },
        destroy: function() {
            d.remove(this.set);
            d.remove(this.labelsSet);
            var a = this.axisLine;
            a && d.remove(a.set);
            d.remove(this.grid0)
        },
        chooseMinorFrequency: function(a) {
            for (var b = 10; 0 < b; b--)
                if (a / b == Math.round(a / b)) return a / b
        },
        parseDatesDraw: function() {
            var a, b = this.chart,
                c = this.showFirstLabel,
                e = this.showLastLabel,
                h, f = "",
                g = d.extractPeriod(this.minPeriod),
                k = d.getPeriodDuration(g.period, g.count),
                l, m, n, q, p, t = this.firstDayOfWeek,
                r = this.boldPeriodBeginning;
            a = this.minorGridEnabled;
            var u, z = this.gridAlpha,
                y,
                v = this.choosePeriod(0),
                w = v.period,
                v = v.count,
                A = d.getPeriodDuration(w, v);
            A < k && (w = g.period, v = g.count, A = k);
            g = w;
            "WW" == g && (g = "DD");
            this.stepWidth = this.getStepWidth(this.timeDifference);
            var B = Math.ceil(this.timeDifference / A) + 5,
                D = l = d.resetDateToMin(new Date(this.startTime - A), w, v, t).getTime();
            g == w && 1 == v && this.centerLabelOnFullPeriod && (n = A * this.stepWidth);
            this.cellWidth = k * this.stepWidth;
            q = Math.round(l / A);
            k = -1;
            q / 2 == Math.round(q / 2) && (k = -2, l -= A);
            q = this.firstTime;
            var C = 0;
            a && 1 < v && (u = this.chooseMinorFrequency(v),
                y = d.getPeriodDuration(w, u));
            if (0 < this.gridCountR)
                for (a = k; a <= B; a++) {
                    p = q + A * (a + Math.floor((D - q) / A)) - C;
                    "DD" == w && (p += 36E5);
                    p = d.resetDateToMin(new Date(p), w, v, t).getTime();
                    "MM" == w && (h = (p - l) / A, 1.5 <= (p - l) / A && (p = p - (h - 1) * A + d.getPeriodDuration("DD", 3), p = d.resetDateToMin(new Date(p), w, 1).getTime(), C += A));
                    h = (p - this.startTime) * this.stepWidth;
                    h = this.rotate ? h + (this.x - this.viX) : "date" == this.type ? this.axisWidth - h + (this.y - this.viY) : h + (this.y - this.viY);
                    f = !1;
                    this.nextPeriod[g] && (f = this.checkPeriodChange(this.nextPeriod[g],
                        1, p, l, g));
                    l = !1;
                    f && this.markPeriodChange ? (f = this.dateFormatsObject[this.nextPeriod[g]], this.twoLineMode && (f = this.dateFormatsObject[g] + "\n" + f, f = d.fixBrakes(f)), l = !0) : f = this.dateFormatsObject[g];
                    r || (l = !1);
                    this.currentDateFormat = f;
                    f = d.formatDate(new Date(p), f, b);
                    if (a == k && !c || a == B && !e) f = " ";
                    this.labelFunction && (f = this.labelFunction(f, new Date(p), this, w, v, m).toString());
                    this.boldLabels && (l = !0);
                    m = new this.axisItemRenderer(this, h, f, !1, n, 0, !1, l);
                    this.pushAxisItem(m);
                    m = l = p;
                    if (!isNaN(u))
                        for (h = 1; h < v; h += u) this.gridAlpha =
                            this.minorGridAlpha, f = p + y * h, f = d.resetDateToMin(new Date(f), w, u, t).getTime(), f = new this.axisItemRenderer(this, (f - this.startTime) * this.stepWidth), this.pushAxisItem(f);
                    this.gridAlpha = z
                }
        },
        choosePeriod: function(a) {
            var b = d.getPeriodDuration(this.periods[a].period, this.periods[a].count),
                c = Math.ceil(this.timeDifference / b),
                e = this.periods;
            return this.timeDifference < b && 0 < a ? e[a - 1] : c <= this.gridCountR ? e[a] : a + 1 < e.length ? this.choosePeriod(a + 1) : e[a]
        },
        getStepWidth: function(a) {
            var b;
            this.startOnAxis ? (b = this.axisWidth /
                (a - 1), 1 == a && (b = this.axisWidth)) : b = this.axisWidth / a;
            return b
        },
        timeZoom: function(a, b) {
            this.startTime = a;
            this.endTime = b
        },
        minDuration: function() { var a = d.extractPeriod(this.minPeriod); return d.getPeriodDuration(a.period, a.count) },
        checkPeriodChange: function(a, b, c, e, h) {
            c = new Date(c);
            var f = new Date(e),
                g = this.firstDayOfWeek;
            e = b;
            "DD" == a && (b = 1);
            c = d.resetDateToMin(c, a, b, g).getTime();
            b = d.resetDateToMin(f, a, b, g).getTime();
            return "DD" == a && "hh" != h && c - b <= d.getPeriodDuration(a, e) ? !1 : c != b ? !0 : !1
        },
        generateDFObject: function() {
            this.dateFormatsObject = {};
            var a;
            for (a = 0; a < this.dateFormats.length; a++) {
                var b = this.dateFormats[a];
                this.dateFormatsObject[b.period] = b.format
            }
        }
    })
})();
(function() {
    var d = window.AmCharts;
    d.ValueAxis = d.Class({
        inherits: d.AxisBase,
        construct: function(a) {
            this.cname = "ValueAxis";
            this.createEvents("axisChanged", "logarithmicAxisFailed", "axisSelfZoomed", "axisZoomed");
            d.ValueAxis.base.construct.call(this, a);
            this.dataChanged = !0;
            this.stackType = "none";
            this.position = "left";
            this.unitPosition = "right";
            this.recalculateToPercents = this.includeHidden = this.includeGuidesInMinMax = this.integersOnly = !1;
            this.durationUnits = { DD: "d. ", hh: ":", mm: ":", ss: "" };
            this.scrollbar = !1;
            this.baseValue =
                0;
            this.radarCategoriesEnabled = !0;
            this.gridType = "polygons";
            this.useScientificNotation = !1;
            this.axisTitleOffset = 10;
            this.minMaxMultiplier = 1;
            this.logGridLimit = 2;
            this.totalTextOffset = this.treatZeroAs = 0;
            this.minPeriod = "ss";
            d.applyTheme(this, a, this.cname)
        },
        updateData: function() {
            0 >= this.gridCountR && (this.gridCountR = 1);
            this.totals = [];
            this.data = this.chart.chartData;
            var a = this.chart;
            "xy" != a.type && (this.stackGraphs("smoothedLine"), this.stackGraphs("line"), this.stackGraphs("column"), this.stackGraphs("step"));
            this.recalculateToPercents &&
                this.recalculate();
            this.synchronizationMultiplier && this.synchronizeWith ? (d.isString(this.synchronizeWith) && (this.synchronizeWith = a.getValueAxisById(this.synchronizeWith)), this.synchronizeWith && (this.synchronizeWithAxis(this.synchronizeWith), this.foundGraphs = !0)) : (this.foundGraphs = !1, this.getMinMax())
        },
        draw: function() {
            d.ValueAxis.base.draw.call(this);
            var a = this.chart,
                b = this.set;
            d.setCN(a, this.set, "value-axis value-axis-" + this.id);
            d.setCN(a, this.labelsSet, "value-axis value-axis-" + this.id);
            d.setCN(a,
                this.axisLine.axisSet, "value-axis value-axis-" + this.id);
            var c = this.type;
            "duration" == c && (this.duration = "ss");
            !0 === this.dataChanged && (this.updateData(), this.dataChanged = !1);
            "date" == c && (this.logarithmic = !1, this.min = this.minRR, this.max = this.maxRR, this.minimumDate && (this.min = this.minimumDate.getTime()), this.maximumDate && (this.max = this.maximumDate.getTime()));
            if (this.logarithmic) {
                var e = this.treatZeroAs,
                    h = this.getMin(0, this.data.length - 1);
                this.minReal < h && (this.minReal = h);
                isNaN(this.minReal) && (this.minReal =
                    h);
                0 < e && 0 === h && (this.minReal = h = e);
                if (0 >= h || 0 >= this.minimum) { this.fire("logarithmicAxisFailed", { type: "logarithmicAxisFailed", chart: a }); return }
            }
            this.grid0 = null;
            var f, g, k = a.dx,
                l = a.dy,
                e = !1,
                h = this.logarithmic;
            if (isNaN(this.min) || isNaN(this.max) || !this.foundGraphs || Infinity == this.min || -Infinity == this.max) e = !0;
            else {
                var m = this.labelFrequency,
                    n = this.showFirstLabel,
                    q = this.showLastLabel,
                    p = 1;
                f = 0;
                this.minCalc = this.min;
                this.maxCalc = this.max;
                this.strictMinMax && (isNaN(this.minimum) || (this.min = this.minimum), isNaN(this.maximum) ||
                    (this.max = this.maximum));
                isNaN(this.minZoom) || (this.min = this.minZoom);
                isNaN(this.maxZoom) || (this.max = this.maxZoom);
                var t = Math.round((this.maxCalc - this.minCalc) / this.step) + 1,
                    r;
                !0 === h ? (r = Math.log(this.max) * Math.LOG10E - Math.log(this.minReal) * Math.LOG10E, this.stepWidth = this.axisWidth / r, r > this.logGridLimit && (t = Math.ceil(Math.log(this.max) * Math.LOG10E) + 1, f = Math.round(Math.log(this.minReal) * Math.LOG10E), t > this.gridCountR && (p = Math.ceil(t / this.gridCountR)))) : this.stepWidth = this.axisWidth / (this.max - this.min);
                var u = 0;
                1 > this.step && -1 < this.step && (u = d.getDecimals(this.step));
                this.integersOnly && (u = 0);
                u > this.maxDecCount && (u = this.maxDecCount);
                var z = this.precision;
                isNaN(z) || (u = z);
                this.max = d.roundTo(this.max, this.maxDecCount);
                this.min = d.roundTo(this.min, this.maxDecCount);
                g = {};
                g.precision = u;
                g.decimalSeparator = a.nf.decimalSeparator;
                g.thousandsSeparator = a.nf.thousandsSeparator;
                this.numberFormatter = g;
                var y, v = this.guides,
                    w = v.length;
                if (0 < w) {
                    var A = this.fillAlpha;
                    for (g = this.fillAlpha = 0; g < w; g++) {
                        var B = v[g],
                            D = NaN,
                            C = B.above;
                        isNaN(B.toValue) || (D = this.getCoordinate(B.toValue), y = new this.axisItemRenderer(this, D, "", !0, NaN, NaN, B), this.pushAxisItem(y, C));
                        var J = NaN;
                        isNaN(B.value) || (J = this.getCoordinate(B.value), y = new this.axisItemRenderer(this, J, B.label, !0, NaN, (D - J) / 2, B), this.pushAxisItem(y, C));
                        isNaN(D - J) || (y = new this.guideFillRenderer(this, J, D, B), this.pushAxisItem(y, C), y = y.graphics(), B.graphics = y, B.balloonText && this.addEventListeners(y, B))
                    }
                    this.fillAlpha = A
                }
                this.exponential = !1;
                for (g = f; g < t; g += p) v = d.roundTo(this.step * g + this.min,
                    u), -1 != String(v).indexOf("e") && (this.exponential = !0);
                this.duration && (this.maxInterval = d.getMaxInterval(this.max, this.duration));
                var u = this.step,
                    H, v = this.minorGridAlpha;
                this.minorGridEnabled && (H = this.getMinorGridStep(u, this.stepWidth * u));
                if ("date" == c) this.generateDFObject(), this.timeDifference = this.max - this.min, this.maxTime = this.lastTime = this.max, this.startTime = this.firstTime = this.min, this.parseDatesDraw();
                else
                    for (g = f; g < t; g += p)
                        if (c = u * g + this.minCalc, h && this.max - this.min > 10 * this.min && (c -= this.min),
                            c = d.roundTo(c, this.maxDecCount + 1), !this.integersOnly || Math.round(c) == c)
                            if (isNaN(z) || Number(d.toFixed(c, z)) == c) {
                                !0 === h && (0 === c && (c = this.minReal), r > this.logGridLimit && (c = Math.pow(10, g)));
                                y = this.formatValue(c, !1, g);
                                Math.round(g / m) != g / m && (y = void 0);
                                if (0 === g && !n || g == t - 1 && !q) y = " ";
                                f = this.getCoordinate(c);
                                y = new this.axisItemRenderer(this, f, y, void 0, void 0, void 0, void 0, this.boldLabels);
                                this.pushAxisItem(y);
                                if (c == this.baseValue && "radar" != a.type) {
                                    var I, T, A = this.viW,
                                        B = this.viH;
                                    y = this.viX;
                                    w = this.viY;
                                    "H" == this.orientation ?
                                        0 <= f && f <= A + 1 && (I = [f, f, f + k], T = [B, 0, l]) : 0 <= f && f <= B + 1 && (I = [0, A, A + k], T = [f, f, f + l]);
                                    I && (f = d.fitToBounds(2 * this.gridAlpha, 0, 1), f = d.line(a.container, I, T, this.gridColor, f, 1, this.dashLength), f.translate(y, w), this.grid0 = f, a.axesSet.push(f), f.toBack(), d.setCN(a, f, this.bcn + "zero-grid-" + this.id), d.setCN(a, f, this.bcn + "zero-grid"))
                                }
                                if (!isNaN(H) && 0 < v && g < t - 1) {
                                    f = this.gridAlpha;
                                    this.gridAlpha = this.minorGridAlpha;
                                    for (y = 1; y < u / H; y++) w = this.getCoordinate(c + H * y), w = new this.axisItemRenderer(this, w, "", !1, 0, 0, !1, !1, 0, !0), this.pushAxisItem(w);
                                    this.gridAlpha = f
                                }
                            }
                r = this.baseValue;
                this.min > this.baseValue && this.max > this.baseValue && (r = this.min);
                this.min < this.baseValue && this.max < this.baseValue && (r = this.max);
                h && r < this.minReal && (r = this.minReal);
                this.baseCoord = this.getCoordinate(r);
                r = { type: "axisChanged", target: this, chart: a };
                r.min = h ? this.minReal : this.min;
                r.max = this.max;
                this.fire("axisChanged", r);
                this.axisCreated = !0
            }
            h = this.axisLine.set;
            r = this.labelsSet;
            this.positionTitle();
            "radar" != a.type ? (a = this.viX, H = this.viY, b.translate(a, H), r.translate(a, H)) :
                h.toFront();
            !this.visible || e ? (b.hide(), h.hide(), r.hide()) : (b.show(), h.show(), r.show());
            this.axisY = this.y - this.viY;
            this.axisX = this.x - this.viX
        },
        formatValue: function(a, b, c) {
            var e = this.exponential,
                h = this.logarithmic,
                f = this.numberFormatter,
                g = this.chart;
            !0 === this.logarithmic && (e = -1 != String(a).indexOf("e") ? !0 : !1);
            this.useScientificNotation && (e = !0);
            this.usePrefixes && (e = !1);
            e ? (b = -1 == String(a).indexOf("e") ? a.toExponential(15) : String(a), c = b.split("e"), b = Number(c[0]), c = Number(c[1]), b = d.roundTo(b, 14), 10 == b && (b =
                1, c += 1), b = b + "e" + c, 0 === a && (b = "0"), 1 == a && (b = "1")) : (h && (e = String(a).split("."), e[1] ? (f.precision = e[1].length, 0 > c && (f.precision = Math.abs(c)), b && 1 < a && (f.precision = 0)) : f.precision = -1), b = this.usePrefixes ? d.addPrefix(a, g.prefixesOfBigNumbers, g.prefixesOfSmallNumbers, f, !b) : d.formatNumber(a, f, f.precision));
            this.duration && (b = d.formatDuration(a, this.duration, "", this.durationUnits, this.maxInterval, f));
            "date" == this.type && (b = d.formatDate(new Date(a), this.currentDateFormat, g));
            this.recalculateToPercents ? b += "%" : (f =
                this.unit) && (b = "left" == this.unitPosition ? f + b : b + f);
            this.labelFunction && (b = this.labelFunction(a, b, this).toString());
            return b
        },
        getMinorGridStep: function(a, b) {
            var c = [5, 4, 2];
            60 > b && c.shift();
            for (var e = Math.floor(Math.log(Math.abs(a)) * Math.LOG10E), h = 0; h < c.length; h++) {
                var d = a / c[h],
                    g = Math.floor(Math.log(Math.abs(d)) * Math.LOG10E);
                if (!(0 < Math.abs(e - g)))
                    if (1 > a) { if (g = Math.pow(10, -g) * d, g == Math.round(g)) return d } else if (d == Math.round(d)) return d
            }
        },
        stackGraphs: function(a) {
            var b = this.stackType;
            "stacked" == b && (b = "regular");
            "line" == b && (b = "none");
            "100% stacked" == b && (b = "100%");
            this.stackType = b;
            var c = [],
                e = [],
                h = [],
                f = [],
                g, k = this.chart.graphs,
                l, m, n, q, p = this.baseValue,
                t = !1;
            if ("line" == a || "step" == a || "smoothedLine" == a) t = !0;
            if (t && ("regular" == b || "100%" == b))
                for (q = 0; q < k.length; q++) n = k[q], n.hidden || (m = n.type, n.chart == this.chart && n.valueAxis == this && a == m && n.stackable && (l && (n.stackGraph = l), l = n));
            for (l = this.start; l <= this.end; l++) {
                var r = 0;
                for (q = 0; q < k.length; q++)
                    if (n = k[q], n.hidden) n.newStack && (h[l] = NaN, e[l] = NaN);
                    else if (m = n.type, n.chart ==
                    this.chart && n.valueAxis == this && a == m && n.stackable)
                    if (m = this.data[l].axes[this.id].graphs[n.id], g = m.values.value, isNaN(g)) n.newStack && (h[l] = NaN, e[l] = NaN);
                    else {
                        var u = d.getDecimals(g);
                        r < u && (r = u);
                        isNaN(f[l]) ? f[l] = Math.abs(g) : f[l] += Math.abs(g);
                        f[l] = d.roundTo(f[l], r);
                        u = n.fillToGraph;
                        t && u && (u = this.data[l].axes[this.id].graphs[u.id]) && (m.values.open = u.values.value);
                        "regular" == b && (t && (isNaN(c[l]) ? (c[l] = g, m.values.close = g, m.values.open = this.baseValue) : (isNaN(g) ? m.values.close = c[l] : m.values.close = g + c[l], m.values.open =
                            c[l], c[l] = m.values.close)), "column" == a && (n.newStack && (h[l] = NaN, e[l] = NaN), m.values.close = g, 0 > g ? (m.values.close = g, isNaN(e[l]) ? m.values.open = p : (m.values.close += e[l], m.values.open = e[l]), e[l] = m.values.close) : (m.values.close = g, isNaN(h[l]) ? m.values.open = p : (m.values.close += h[l], m.values.open = h[l]), h[l] = m.values.close)))
                    }
            }
            for (l = this.start; l <= this.end; l++)
                for (q = 0; q < k.length; q++)(n = k[q], n.hidden) ? n.newStack && (h[l] = NaN, e[l] = NaN) : (m = n.type, n.chart == this.chart && n.valueAxis == this && a == m && n.stackable && (m = this.data[l].axes[this.id].graphs[n.id],
                    g = m.values.value, isNaN(g) || (c = g / f[l] * 100, m.values.percents = c, m.values.total = f[l], n.newStack && (h[l] = NaN, e[l] = NaN), "100%" == b && (isNaN(e[l]) && (e[l] = 0), isNaN(h[l]) && (h[l] = 0), 0 > c ? (m.values.close = d.fitToBounds(c + e[l], -100, 100), m.values.open = e[l], e[l] = m.values.close) : (m.values.close = d.fitToBounds(c + h[l], -100, 100), m.values.open = h[l], h[l] = m.values.close)))))
        },
        recalculate: function() {
            var a = this.chart,
                b = a.graphs,
                c;
            for (c = 0; c < b.length; c++) {
                var e = b[c];
                if (e.valueAxis == this) {
                    var h = "value";
                    if ("candlestick" == e.type ||
                        "ohlc" == e.type) h = "open";
                    var f, g, k = this.end + 2,
                        k = d.fitToBounds(this.end + 1, 0, this.data.length - 1),
                        l = this.start;
                    0 < l && l--;
                    var m;
                    g = this.start;
                    e.compareFromStart && (g = 0);
                    if (!isNaN(a.startTime) && (m = a.categoryAxis)) {
                        var n = m.minDuration(),
                            n = new Date(a.startTime + n / 2),
                            q = d.resetDateToMin(new Date(a.startTime), m.minPeriod).getTime();
                        d.resetDateToMin(new Date(n), m.minPeriod).getTime() > q && g++
                    }
                    if (m = a.recalculateFromDate) m = d.getDate(m, a.dataDateFormat, "fff"), g = a.getClosestIndex(a.chartData, "time", m.getTime(), !0, 0, a.chartData.length),
                        k = a.chartData.length - 1;
                    for (m = g; m <= k && (g = this.data[m].axes[this.id].graphs[e.id], f = g.values[h], isNaN(f)); m++);
                    this.recBaseValue = f;
                    for (h = l; h <= k; h++) {
                        g = this.data[h].axes[this.id].graphs[e.id];
                        g.percents = {};
                        var l = g.values,
                            p;
                        for (p in l) g.percents[p] = "percents" != p ? l[p] / f * 100 - 100 : l[p]
                    }
                }
            }
        },
        getMinMax: function() {
            var a = !1,
                b = this.chart,
                c = b.graphs,
                e;
            for (e = 0; e < c.length; e++) {
                var h = c[e].type;
                ("line" == h || "step" == h || "smoothedLine" == h) && this.expandMinMax && (a = !0)
            }
            a && (0 < this.start && this.start--, this.end < this.data.length -
                1 && this.end++);
            "serial" == b.type && (!0 !== b.categoryAxis.parseDates || a || this.end < this.data.length - 1 && this.end++);
            a = this.minMaxMultiplier;
            this.min = this.getMin(this.start, this.end);
            this.max = this.getMax();
            this.minRR = this.min;
            this.maxRR = this.max;
            a = (this.max - this.min) * (a - 1);
            this.min -= a;
            this.max += a;
            a = this.guides.length;
            if (this.includeGuidesInMinMax && 0 < a)
                for (b = 0; b < a; b++) c = this.guides[b], c.toValue < this.min && (this.min = c.toValue), c.value < this.min && (this.min = c.value), c.toValue > this.max && (this.max = c.toValue), c.value >
                    this.max && (this.max = c.value);
            isNaN(this.minimum) || (this.min = this.minimum);
            isNaN(this.maximum) || (this.max = this.maximum);
            this.minimumDate && (this.min = this.minimumDate.getTime());
            this.maximumDate && (this.max = this.maximumDate.getTime());
            this.min > this.max && (a = this.max, this.max = this.min, this.min = a);
            isNaN(this.minTemp) || (this.min = this.minTemp);
            isNaN(this.maxTemp) || (this.max = this.maxTemp);
            this.minReal = this.min;
            this.maxReal = this.max;
            0 === this.min && 0 === this.max && (this.max = 9);
            this.min > this.max && (this.min = this.max -
                1);
            a = this.min;
            b = this.max;
            c = this.max - this.min;
            e = 0 === c ? Math.pow(10, Math.floor(Math.log(Math.abs(this.max)) * Math.LOG10E)) / 10 : Math.pow(10, Math.floor(Math.log(Math.abs(c)) * Math.LOG10E)) / 10;
            isNaN(this.maximum) && isNaN(this.maxTemp) && (this.max = Math.ceil(this.max / e) * e + e);
            isNaN(this.minimum) && isNaN(this.minTemp) && (this.min = Math.floor(this.min / e) * e - e);
            0 > this.min && 0 <= a && (this.min = 0);
            0 < this.max && 0 >= b && (this.max = 0);
            "100%" == this.stackType && (this.min = 0 > this.min ? -100 : 0, this.max = 0 > this.max ? 0 : 100);
            c = this.max - this.min;
            e = Math.pow(10, Math.floor(Math.log(Math.abs(c)) * Math.LOG10E)) / 10;
            this.step = Math.ceil(c / this.gridCountR / e) * e;
            c = Math.pow(10, Math.floor(Math.log(Math.abs(this.step)) * Math.LOG10E));
            c = d.fixStepE(c);
            e = Math.ceil(this.step / c);
            5 < e && (e = 10);
            5 >= e && 2 < e && (e = 5);
            this.step = Math.ceil(this.step / (c * e)) * c * e;
            1 > c ? (this.maxDecCount = Math.abs(Math.log(Math.abs(c)) * Math.LOG10E), this.maxDecCount = Math.round(this.maxDecCount), this.step = d.roundTo(this.step, this.maxDecCount + 1)) : this.maxDecCount = 0;
            this.min = this.step * Math.floor(this.min /
                this.step);
            this.max = this.step * Math.ceil(this.max / this.step);
            0 > this.min && 0 <= a && (this.min = 0);
            0 < this.max && 0 >= b && (this.max = 0);
            1 < this.minReal && 1 < this.max - this.minReal && (this.minReal = Math.floor(this.minReal));
            c = Math.pow(10, Math.floor(Math.log(Math.abs(this.minReal)) * Math.LOG10E));
            0 === this.min && (this.minReal = c);
            0 === this.min && 1 < this.minReal && (this.minReal = 1);
            0 < this.min && 0 < this.minReal - this.step && (this.minReal = this.min + this.step < this.minReal ? this.min + this.step : this.min);
            this.logarithmic && (2 < Math.log(b) * Math.LOG10E -
                Math.log(a) * Math.LOG10E ? (this.minReal = this.min = Math.pow(10, Math.floor(Math.log(Math.abs(a)) * Math.LOG10E)), this.max = Math.pow(10, Math.ceil(Math.log(Math.abs(b)) * Math.LOG10E))) : (b = Math.pow(10, Math.floor(Math.log(Math.abs(this.min)) * Math.LOG10E)) / 10, a = Math.pow(10, Math.floor(Math.log(Math.abs(a)) * Math.LOG10E)) / 10, b < a && (this.minReal = this.min = 10 * a)))
        },
        getMin: function(a, b) {
            var c, e;
            for (e = a; e <= b; e++) {
                var h = this.data[e].axes[this.id].graphs,
                    d;
                for (d in h)
                    if (h.hasOwnProperty(d)) {
                        var g = this.chart.getGraphById(d);
                        if (g.includeInMinMax && (!g.hidden || this.includeHidden)) {
                            isNaN(c) && (c = Infinity);
                            this.foundGraphs = !0;
                            g = h[d].values;
                            this.recalculateToPercents && (g = h[d].percents);
                            var k;
                            if (this.minMaxField) k = g[this.minMaxField], k < c && (c = k);
                            else
                                for (var l in g) g.hasOwnProperty(l) && "percents" != l && "total" != l && (k = g[l], k < c && (c = k))
                        }
                    }
            }
            return c
        },
        getMax: function() {
            var a, b;
            for (b = this.start; b <= this.end; b++) {
                var c = this.data[b].axes[this.id].graphs,
                    e;
                for (e in c)
                    if (c.hasOwnProperty(e)) {
                        var h = this.chart.getGraphById(e);
                        if (h.includeInMinMax &&
                            (!h.hidden || this.includeHidden)) {
                            isNaN(a) && (a = -Infinity);
                            this.foundGraphs = !0;
                            h = c[e].values;
                            this.recalculateToPercents && (h = c[e].percents);
                            var d;
                            if (this.minMaxField) d = h[this.minMaxField], d > a && (a = d);
                            else
                                for (var g in h) h.hasOwnProperty(g) && "percents" != g && "total" != g && (d = h[g], d > a && (a = d))
                        }
                    }
            }
            return a
        },
        dispatchZoomEvent: function(a, b) {
            var c = { type: "axisZoomed", startValue: a, endValue: b, target: this, chart: this.chart };
            this.fire(c.type, c)
        },
        zoomOut: function() {
            var a = this.chart;
            "xy" != a.type && (this.maxZoom = this.minZoom =
                void 0, a.updateAfterValueZoom())
        },
        zoomToValues: function(a, b) {
            var c = this.chart;
            "xy" == c.type ? (b < a && (c = b, b = a, a = c), a < this.min && (a = this.min), b > this.max && (b = this.max), c = { type: "axisSelfZoomed" }, c.chart = this.chart, c.valueAxis = this, c.multiplier = this.axisWidth / Math.abs(this.getCoordinate(b) - this.getCoordinate(a)), c.startValue = a, c.endValue = b, c.position = "V" == this.orientation ? this.reversed ? this.getCoordinate(a) : this.getCoordinate(b) : this.reversed ? this.getCoordinate(b) : this.getCoordinate(a), this.fire(c.type, c)) :
                (this.minZoom = a, this.maxZoom = b, c.updateAfterValueZoom())
        },
        coordinateToValue: function(a) {
            if (isNaN(a)) return NaN;
            var b = this.axisWidth,
                c = this.stepWidth,
                e = this.reversed,
                h = this.rotate,
                d = this.min,
                g = this.minReal;
            return !0 === this.logarithmic ? Math.pow(10, (h ? !0 === e ? (b - a) / c : a / c : !0 === e ? a / c : (b - a) / c) + Math.log(g) * Math.LOG10E) : !0 === e ? h ? d - (a - b) / c : a / c + d : h ? a / c + d : d - (a - b) / c
        },
        getCoordinate: function(a) {
            if (isNaN(a)) return NaN;
            var b = this.rotate,
                c = this.reversed,
                e = this.axisWidth,
                d = this.stepWidth,
                f = this.min,
                g = this.minReal;
            !0 ===
                this.logarithmic ? (0 === a && (a = this.treatZeroAs), a = Math.log(a) * Math.LOG10E - Math.log(g) * Math.LOG10E, b = b ? !0 === c ? e - d * a : d * a : !0 === c ? d * a : e - d * a) : b = !0 === c ? b ? e - d * (a - f) : d * (a - f) : b ? d * (a - f) : e - d * (a - f);
            b = this.rotate ? b + (this.x - this.viX) : b + (this.y - this.viY);
            1E7 < Math.abs(b) && (b = 1E7 * (b / Math.abs(b)));
            return Math.round(b)
        },
        synchronizeWithAxis: function(a) {
            this.synchronizeWith = a;
            this.listenTo(this.synchronizeWith, "axisChanged", this.handleSynchronization)
        },
        handleSynchronization: function() {
            var a = this.synchronizeWith,
                b = a.min,
                c = a.max,
                a = a.step,
                e = this.synchronizationMultiplier;
            e && (this.min = b * e, this.max = c * e, this.step = a * e, b = Math.pow(10, Math.floor(Math.log(Math.abs(this.step)) * Math.LOG10E)), b = Math.abs(Math.log(Math.abs(b)) * Math.LOG10E), this.maxDecCount = b = Math.round(b), this.draw())
        }
    })
})();
(function() {
    var d = window.AmCharts;
    d.RecAxis = d.Class({
        construct: function(a) {
            var b = a.chart,
                c = a.axisThickness,
                e = a.axisColor,
                h = a.axisAlpha,
                f = a.offset,
                g = a.dx,
                k = a.dy,
                l = a.viX,
                m = a.viY,
                n = a.viH,
                q = a.viW,
                p = b.container;
            "H" == a.orientation ? (e = d.line(p, [0, q], [0, 0], e, h, c), this.axisWidth = a.width, "bottom" == a.position ? (k = c / 2 + f + n + m - 1, c = l) : (k = -c / 2 - f + m + k, c = g + l)) : (this.axisWidth = a.height, "right" == a.position ? (e = d.line(p, [0, 0, -g], [0, n, n - k], e, h, c), k = m + k, c = c / 2 + f + g + q + l - 1) : (e = d.line(p, [0, 0], [0, n], e, h, c), k = m, c = -c / 2 - f + l));
            e.translate(c,
                k);
            c = b.container.set();
            c.push(e);
            b.axesSet.push(c);
            d.setCN(b, e, a.bcn + "line");
            this.axisSet = c;
            this.set = e
        }
    })
})();
(function() {
    var d = window.AmCharts;
    d.RecItem = d.Class({
        construct: function(a, b, c, e, h, f, g, k, l, m, n, q) {
            b = Math.round(b);
            var p = a.chart;
            this.value = c;
            void 0 == c && (c = "");
            l || (l = 0);
            void 0 == e && (e = !0);
            var t = p.fontFamily,
                r = a.fontSize;
            void 0 == r && (r = p.fontSize);
            var u = a.color;
            void 0 == u && (u = p.color);
            void 0 !== n && (u = n);
            var z = a.chart.container,
                y = z.set();
            this.set = y;
            var v = a.axisThickness,
                w = a.axisColor,
                A = a.axisAlpha,
                B = a.tickLength,
                D = a.gridAlpha,
                C = a.gridThickness,
                J = a.gridColor,
                H = a.dashLength,
                I = a.fillColor,
                T = a.fillAlpha,
                da = a.labelsEnabled;
            n = a.labelRotation;
            var pa = a.counter,
                U = a.inside,
                na = a.labelOffset,
                qa = a.dx,
                ja = a.dy,
                Pa = a.orientation,
                aa = a.position,
                Z = a.previousCoord,
                V = a.viH,
                sa = a.viW,
                ba = a.offset,
                ca, ta;
            g ? (void 0 !== g.id && (q = p.classNamePrefix + "-guide-" + g.id), da = !0, isNaN(g.tickLength) || (B = g.tickLength), void 0 != g.lineColor && (J = g.lineColor), void 0 != g.color && (u = g.color), isNaN(g.lineAlpha) || (D = g.lineAlpha), isNaN(g.dashLength) || (H = g.dashLength), isNaN(g.lineThickness) || (C = g.lineThickness), !0 === g.inside && (U = !0), isNaN(g.labelRotation) || (n = g.labelRotation),
                isNaN(g.fontSize) || (r = g.fontSize), g.position && (aa = g.position), void 0 !== g.boldLabel && (k = g.boldLabel), isNaN(g.labelOffset) || (na = g.labelOffset)) : "" === c && (B = 0);
            var ia = "start";
            h && (ia = "middle");
            var P = n * Math.PI / 180,
                W, wa, G = 0,
                x = 0,
                ka = 0,
                ea = W = 0,
                Qa = 0;
            "V" == Pa && (n = 0);
            var Y;
            da && "" !== c && (Y = a.autoWrap && 0 === n ? d.wrappedText(z, c, u, t, r, ia, k, h, 0) : d.text(z, c, u, t, r, ia, k), ia = Y.getBBox(), ea = ia.width, Qa = ia.height);
            if ("H" == Pa) {
                if (0 <= b && b <= sa + 1 && (0 < B && 0 < A && b + l <= sa + 1 && (ca = d.line(z, [b + l, b + l], [0, B], w, A, C), y.push(ca)), 0 < D && (ta = d.line(z, [b, b + qa, b + qa], [V, V + ja, ja], J, D, C, H), y.push(ta))), x = 0, G = b, g && 90 == n && U && (G -= r), !1 === e ? (ia = "start", x = "bottom" == aa ? U ? x + B : x - B : U ? x - B : x + B, G += 3, h && (G += h / 2 - 3, ia = "middle"), 0 < n && (ia = "middle")) : ia = "middle", 1 == pa && 0 < T && !g && !m && Z < sa && (e = d.fitToBounds(b, 0, sa), Z = d.fitToBounds(Z, 0, sa), W = e - Z, 0 < W && (wa = d.rect(z, W, a.height, I, T), wa.translate(e - W + qa, ja), y.push(wa))), "bottom" == aa ? (x += V + r / 2 + ba, U ? (0 < n ? (x = V - ea / 2 * Math.sin(P) - B - 3, G += ea / 2 * Math.cos(P) - 4 + 2) : 0 > n ? (x = V + ea * Math.sin(P) - B - 3 + 2, G += -ea * Math.cos(P) - Qa * Math.sin(P) - 4) : x -= B +
                        r + 3 + 3, x -= na) : (0 < n ? (x = V + ea / 2 * Math.sin(P) + B + 3, G -= ea / 2 * Math.cos(P)) : 0 > n ? (x = V + B + 3 - ea / 2 * Math.sin(P) + 2, G += ea / 2 * Math.cos(P)) : x += B + v + 3 + 3, x += na)) : (x += ja + r / 2 - ba, G += qa, U ? (0 < n ? (x = ea / 2 * Math.sin(P) + B + 3, G -= ea / 2 * Math.cos(P)) : x += B + 3, x += na) : (0 < n ? (x = -(ea / 2) * Math.sin(P) - B - 6, G += ea / 2 * Math.cos(P)) : x -= B + r + 3 + v + 3, x -= na)), "bottom" == aa ? W = (U ? V - B - 1 : V + v - 1) + ba : (ka = qa, W = (U ? ja : ja - B - v + 1) - ba), f && (G += f), f = G, 0 < n && (f += ea / 2 * Math.cos(P)), Y && (r = 0, U && (r = ea / 2 * Math.cos(P)), f + r > sa + 2 || 0 > f)) Y.remove(), Y = null
            } else {
                0 <= b && b <= V + 1 && (0 < B && 0 < A && b + l <=
                    V + 1 && (ca = d.line(z, [0, B], [b + l, b + l], w, A, C), y.push(ca)), 0 < D && (ta = d.line(z, [0, qa, sa + qa], [b, b + ja, b + ja], J, D, C, H), y.push(ta)));
                ia = "end";
                if (!0 === U && "left" == aa || !1 === U && "right" == aa) ia = "start";
                x = b - r / 2;
                1 == pa && 0 < T && !g && !m && (e = d.fitToBounds(b, 0, V), Z = d.fitToBounds(Z, 0, V), P = e - Z, wa = d.polygon(z, [0, a.width, a.width, 0], [0, 0, P, P], I, T), wa.translate(qa, e - P + ja), y.push(wa));
                x += r / 2;
                "right" == aa ? (G += qa + sa + ba, x += ja, U ? (f || (x -= r / 2 + 3), G = G - (B + 4) - na) : (G += B + 4 + v, x -= 2, G += na)) : U ? (G += B + 4 - ba, f || (x -= r / 2 + 3), g && (G += qa, x += ja), G += na) : (G += -B -
                    v - 4 - 2 - ba, x -= 2, G -= na);
                ca && ("right" == aa ? (ka += qa + ba + sa, W += ja, ka = U ? ka - v : ka + v) : (ka -= ba, U || (ka -= B + v)));
                f && (x += f);
                U = -3;
                "right" == aa && (U += ja);
                Y && (x > V + 1 || x < U) && (Y.remove(), Y = null)
            }
            ca && (ca.translate(ka, W), d.setCN(p, ca, a.bcn + "tick"), d.setCN(p, ca, q, !0), g && d.setCN(p, ca, "guide"));
            !1 === a.visible && (ca && ca.remove(), Y && (Y.remove(), Y = null));
            Y && (Y.attr({ "text-anchor": ia }), Y.translate(G, x), 0 !== n && Y.rotate(-n, a.chart.backgroundColor), a.allLabels.push(Y), this.label = Y, d.setCN(p, Y, a.bcn + "label"), d.setCN(p, Y, q, !0), g && d.setCN(p,
                Y, "guide"));
            ta && (d.setCN(p, ta, a.bcn + "grid"), d.setCN(p, ta, q, !0), g && d.setCN(p, ta, "guide"));
            wa && (d.setCN(p, wa, a.bcn + "fill"), d.setCN(p, wa, q, !0));
            m ? ta && d.setCN(p, ta, a.bcn + "grid-minor") : (a.counter = 0 === pa ? 1 : 0, a.previousCoord = b);
            0 === this.set.node.childNodes.length && this.set.remove()
        },
        graphics: function() { return this.set },
        getLabel: function() { return this.label }
    })
})();
(function() {
    var d = window.AmCharts;
    d.RecFill = d.Class({
        construct: function(a, b, c, e) {
            var h = a.dx,
                f = a.dy,
                g = a.orientation,
                k = 0;
            if (c < b) {
                var l = b;
                b = c;
                c = l
            }
            var m = e.fillAlpha;
            isNaN(m) && (m = 0);
            var l = a.chart.container,
                n = e.fillColor;
            "V" == g ? (b = d.fitToBounds(b, 0, a.viH), c = d.fitToBounds(c, 0, a.viH)) : (b = d.fitToBounds(b, 0, a.viW), c = d.fitToBounds(c, 0, a.viW));
            c -= b;
            isNaN(c) && (c = 4, k = 2, m = 0);
            0 > c && "object" == typeof n && (n = n.join(",").split(",").reverse());
            "V" == g ? (g = d.rect(l, a.viW, c, n, m), g.translate(h, b - k + f)) : (g = d.rect(l, c, a.viH, n,
                m), g.translate(b - k + h, f));
            d.setCN(a.chart, g, "guide-fill");
            e.id && d.setCN(a.chart, g, "guide-fill-" + e.id);
            this.set = l.set([g])
        },
        graphics: function() { return this.set },
        getLabel: function() {}
    })
})();
(function() {
    var d = window.AmCharts;
    d.AmChart = d.Class({
        construct: function(a) {
            this.theme = a;
            this.classNamePrefix = "amcharts";
            this.addClassNames = !1;
            this.version = "3.14.1C";
            d.addChart(this);
            this.createEvents("dataUpdated", "init", "rendered", "drawn", "failed", "resized");
            this.height = this.width = "100%";
            this.dataChanged = !0;
            this.chartCreated = !1;
            this.previousWidth = this.previousHeight = 0;
            this.backgroundColor = "#FFFFFF";
            this.borderAlpha = this.backgroundAlpha = 0;
            this.color = this.borderColor = "#000000";
            this.fontFamily = "Verdana";
            this.fontSize = 11;
            this.usePrefixes = !1;
            this.precision = -1;
            this.percentPrecision = 2;
            this.decimalSeparator = ".";
            this.thousandsSeparator = ",";
            this.labels = [];
            this.allLabels = [];
            this.titles = [];
            this.marginRight = this.marginLeft = this.autoMarginOffset = 0;
            this.timeOuts = [];
            this.creditsPosition = "top-left";
            var b = document.createElement("div"),
                c = b.style;
            c.overflow = "hidden";
            c.position = "relative";
            c.textAlign = "left";
            this.chartDiv = b;
            b = document.createElement("div");
            c = b.style;
            c.overflow = "hidden";
            c.position = "relative";
            c.textAlign =
                "left";
            this.legendDiv = b;
            this.titleHeight = 0;
            this.hideBalloonTime = 150;
            this.handDrawScatter = 2;
            this.handDrawThickness = 1;
            this.prefixesOfBigNumbers = [{ number: 1E3, prefix: "k" }, { number: 1E6, prefix: "M" }, { number: 1E9, prefix: "G" }, { number: 1E12, prefix: "T" }, { number: 1E15, prefix: "P" }, { number: 1E18, prefix: "E" }, { number: 1E21, prefix: "Z" }, { number: 1E24, prefix: "Y" }];
            this.prefixesOfSmallNumbers = [{ number: 1E-24, prefix: "y" }, { number: 1E-21, prefix: "z" }, { number: 1E-18, prefix: "a" }, { number: 1E-15, prefix: "f" }, { number: 1E-12, prefix: "p" }, {
                number: 1E-9,
                prefix: "n"
            }, { number: 1E-6, prefix: "\u03bc" }, { number: .001, prefix: "m" }];
            this.panEventsEnabled = !0;
            this.product = "amcharts";
            this.animations = [];
            this.balloon = new d.AmBalloon(this.theme);
            this.balloon.chart = this;
            d.applyTheme(this, a, "AmChart")
        },
        drawChart: function() {
            this.drawBackground();
            this.redrawLabels();
            this.drawTitles();
            this.brr()
        },
        drawBackground: function() {
            d.remove(this.background);
            var a = this.container,
                b = this.backgroundColor,
                c = this.backgroundAlpha,
                e = this.set;
            d.isModern || 0 !== c || (c = .001);
            var h = this.updateWidth();
            this.realWidth = h;
            var f = this.updateHeight();
            this.realHeight = f;
            b = d.polygon(a, [0, h - 1, h - 1, 0], [0, 0, f - 1, f - 1], b, c, 1, this.borderColor, this.borderAlpha);
            d.setCN(this, b, "bg");
            this.background = b;
            e.push(b);
            if (b = this.backgroundImage) this.path && (b = this.path + b), a = a.image(b, 0, 0, h, f), d.setCN(this, b, "bg-image"), this.bgImg = a, e.push(a)
        },
        drawTitles: function() {
            var a = this.titles;
            if (d.ifArray(a)) {
                var b = 20,
                    c;
                for (c = 0; c < a.length; c++) {
                    var e = a[c],
                        e = d.processObject(e, d.Title, this.theme);
                    if (!1 !== e.enabled) {
                        var h = e.color;
                        void 0 ===
                            h && (h = this.color);
                        var f = e.size;
                        isNaN(f) && (f = this.fontSize + 2);
                        isNaN(e.alpha);
                        var g = this.marginLeft,
                            h = d.text(this.container, e.text, h, this.fontFamily, f);
                        h.translate(g + (this.realWidth - this.marginRight - g) / 2, b);
                        h.node.style.pointerEvents = "none";
                        d.setCN(this, h, "title");
                        e.id && d.setCN(this, h, "title-" + e.id);
                        g = !0;
                        void 0 !== e.bold && (g = e.bold);
                        g && h.attr({ "font-weight": "bold" });
                        h.attr({ opacity: e.alpha });
                        b += f + 6;
                        this.freeLabelsSet.push(h)
                    }
                }
            }
        },
        write: function(a) {
            if (a = "object" != typeof a ? document.getElementById(a) : a) {
                for (; a.firstChild;) a.removeChild(a.firstChild);
                this.div = a;
                a.style.overflow = "hidden";
                a.style.textAlign = "left";
                var b = this.chartDiv,
                    c = this.legendDiv,
                    e = this.legend,
                    h = c.style,
                    f = b.style;
                this.measure();
                this.previousHeight = this.divRealHeight;
                this.previousWidth = this.divRealWidth;
                var g, k = document.createElement("div");
                g = k.style;
                g.position = "relative";
                this.containerDiv = k;
                k.className = this.classNamePrefix + "-main-div";
                b.className = this.classNamePrefix + "-chart-div";
                a.appendChild(k);
                var l = this.exportConfig;
                l && d.AmExport && !this.AmExport && (this.AmExport = new d.AmExport(this,
                    l));
                this.amExport && d.AmExport && (this.AmExport = d.extend(this.amExport, new d.AmExport(this), !0));
                this.AmExport && this.AmExport.init && this.AmExport.init();
                if (e)
                    if (e = this.addLegend(e, e.divId), e.enabled) switch (e.position) {
                        case "bottom":
                            k.appendChild(b);
                            k.appendChild(c);
                            break;
                        case "top":
                            k.appendChild(c);
                            k.appendChild(b);
                            break;
                        case "absolute":
                            g.width = a.style.width;
                            g.height = a.style.height;
                            h.position = "absolute";
                            f.position = "absolute";
                            void 0 !== e.left && (h.left = e.left + "px");
                            void 0 !== e.right && (h.right = e.right + "px");
                            void 0 !== e.top && (h.top = e.top + "px");
                            void 0 !== e.bottom && (h.bottom = e.bottom + "px");
                            e.marginLeft = 0;
                            e.marginRight = 0;
                            k.appendChild(b);
                            k.appendChild(c);
                            break;
                        case "right":
                            g.width = a.style.width;
                            g.height = a.style.height;
                            h.position = "relative";
                            f.position = "absolute";
                            k.appendChild(b);
                            k.appendChild(c);
                            break;
                        case "left":
                            g.width = a.style.width;
                            g.height = a.style.height;
                            h.position = "absolute";
                            f.position = "relative";
                            k.appendChild(b);
                            k.appendChild(c);
                            break;
                        case "outside":
                            k.appendChild(b)
                    } else k.appendChild(b);
                    else k.appendChild(b);
                this.listenersAdded || (this.addListeners(), this.listenersAdded = !0);
                this.initChart()
            }
        },
        createLabelsSet: function() {
            d.remove(this.labelsSet);
            this.labelsSet = this.container.set();
            this.freeLabelsSet.push(this.labelsSet)
        },
        initChart: function() {
            this.initHC || (d.callInitHandler(this), this.initHC = !0);
            this.renderFix();
            d.applyLang(this.language, this);
            var a = this.numberFormatter;
            a && (isNaN(a.precision) || (this.precision = a.precision), void 0 !== a.thousandsSeparator && (this.thousandsSeparator = a.thousandsSeparator), void 0 !==
                a.decimalSeparator && (this.decimalSeparator = a.decimalSeparator));
            (a = this.percentFormatter) && !isNaN(a.precision) && (this.percentPrecision = a.precision);
            this.nf = { precision: this.precision, thousandsSeparator: this.thousandsSeparator, decimalSeparator: this.decimalSeparator };
            this.pf = { precision: this.percentPrecision, thousandsSeparator: this.thousandsSeparator, decimalSeparator: this.decimalSeparator };
            this.divIsFixed = d.findIfFixed(this.chartDiv);
            this.destroy();
            a = 0;
            document.attachEvent && !window.opera && (a = 1);
            this.dmouseX =
                this.dmouseY = 0;
            var b = document.getElementsByTagName("html")[0];
            b && window.getComputedStyle && (b = window.getComputedStyle(b, null)) && (this.dmouseY = d.removePx(b.getPropertyValue("margin-top")), this.dmouseX = d.removePx(b.getPropertyValue("margin-left")));
            this.mouseMode = a;
            (a = this.container) ? (a.container.innerHTML = "", a.width = this.realWidth, a.height = this.realHeight, a.addDefs(this), this.chartDiv.appendChild(a.container)) : a = new d.AmDraw(this.chartDiv, this.realWidth, this.realHeight, this);
            a.chart = this;
            d.VML || d.SVG ?
                (a.handDrawn = this.handDrawn, a.handDrawScatter = this.handDrawScatter, a.handDrawThickness = this.handDrawThickness, this.container = a, this.set && this.set.remove(), this.set = a.set(), this.gridSet && this.gridSet.remove(), this.gridSet = a.set(), this.cursorLineSet && this.cursorLineSet.remove(), this.cursorLineSet = a.set(), this.graphsBehindSet && this.graphsBehindSet.remove(), this.graphsBehindSet = a.set(), this.bulletBehindSet && this.bulletBehindSet.remove(), this.bulletBehindSet = a.set(), this.columnSet && this.columnSet.remove(),
                    this.columnSet = a.set(), this.graphsSet && this.graphsSet.remove(), this.graphsSet = a.set(), this.trendLinesSet && this.trendLinesSet.remove(), this.trendLinesSet = a.set(), this.axesSet && this.axesSet.remove(), this.axesSet = a.set(), this.cursorSet && this.cursorSet.remove(), this.cursorSet = a.set(), this.scrollbarsSet && this.scrollbarsSet.remove(), this.scrollbarsSet = a.set(), this.bulletSet && this.bulletSet.remove(), this.bulletSet = a.set(), this.freeLabelsSet && this.freeLabelsSet.remove(), this.axesLabelsSet && this.axesLabelsSet.remove(),
                    this.axesLabelsSet = a.set(), this.freeLabelsSet = a.set(), this.balloonsSet && this.balloonsSet.remove(), this.balloonsSet = a.set(), this.zoomButtonSet && this.zoomButtonSet.remove(), this.zoomButtonSet = a.set(), this.linkSet && this.linkSet.remove(), this.linkSet = a.set()) : this.fire("failed", { type: "failed", chart: this })
        },
        premeasure: function() {
            var a = this.div;
            if (a) {
                var b = a.offsetWidth,
                    c = a.offsetHeight;
                a.clientHeight && (b = a.clientWidth, c = a.clientHeight);
                if (b != this.mw || c != this.mh) this.mw = b, this.mh = c, this.measure()
            }
        },
        measure: function() {
            var a =
                this.div;
            if (a) {
                var b = this.chartDiv,
                    c = a.offsetWidth,
                    e = a.offsetHeight,
                    h = this.container;
                a.clientHeight && (c = a.clientWidth, e = a.clientHeight);
                var f = d.removePx(d.getStyle(a, "padding-left")),
                    g = d.removePx(d.getStyle(a, "padding-right")),
                    k = d.removePx(d.getStyle(a, "padding-top")),
                    l = d.removePx(d.getStyle(a, "padding-bottom"));
                isNaN(f) || (c -= f);
                isNaN(g) || (c -= g);
                isNaN(k) || (e -= k);
                isNaN(l) || (e -= l);
                f = a.style;
                a = f.width;
                f = f.height; - 1 != a.indexOf("px") && (c = d.removePx(a)); - 1 != f.indexOf("px") && (e = d.removePx(f));
                e = Math.round(e);
                c = Math.round(c);
                a = Math.round(d.toCoordinate(this.width, c));
                f = Math.round(d.toCoordinate(this.height, e));
                (c != this.previousWidth || e != this.previousHeight) && 0 < a && 0 < f && (b.style.width = a + "px", b.style.height = f + "px", h && h.setSize(a, f), this.balloon = d.processObject(this.balloon, d.AmBalloon, this.theme), this.balloon.setBounds(2, 2, a - 2, f));
                this.balloon.chart = this;
                this.realWidth = a;
                this.realHeight = f;
                this.divRealWidth = c;
                this.divRealHeight = e
            }
        },
        destroy: function() {
            this.chartDiv.innerHTML = "";
            this.clearTimeOuts();
            this.legend &&
                this.legend.destroy()
        },
        clearTimeOuts: function() {
            var a = this.timeOuts;
            if (a) { var b; for (b = 0; b < a.length; b++) clearTimeout(a[b]) }
            this.timeOuts = []
        },
        clear: function(a) {
            d.callMethod("clear", [this.chartScrollbar, this.scrollbarV, this.scrollbarH, this.chartCursor]);
            this.chartCursor = this.scrollbarH = this.scrollbarV = this.chartScrollbar = null;
            this.clearTimeOuts();
            this.container && (this.container.remove(this.chartDiv), this.container.remove(this.legendDiv));
            a || d.removeChart(this);
            if (a = this.div)
                for (; a.firstChild;) a.removeChild(a.firstChild);
            this.legend && this.legend.destroy()
        },
        setMouseCursor: function(a) {
            "auto" == a && d.isNN && (a = "default");
            this.chartDiv.style.cursor = a;
            this.legendDiv.style.cursor = a
        },
        redrawLabels: function() {
            this.labels = [];
            var a = this.allLabels;
            this.createLabelsSet();
            var b;
            for (b = 0; b < a.length; b++) this.drawLabel(a[b])
        },
        drawLabel: function(a) {
            if (this.container && !1 !== a.enabled) {
                a = d.processObject(a, d.Label, this.theme);
                var b = a.y,
                    c = a.text,
                    e = a.align,
                    h = a.size,
                    f = a.color,
                    g = a.rotation,
                    k = a.alpha,
                    l = a.bold,
                    m = d.toCoordinate(a.x, this.realWidth),
                    b = d.toCoordinate(b, this.realHeight);
                m || (m = 0);
                b || (b = 0);
                void 0 === f && (f = this.color);
                isNaN(h) && (h = this.fontSize);
                e || (e = "start");
                "left" == e && (e = "start");
                "right" == e && (e = "end");
                "center" == e && (e = "middle", g ? b = this.realHeight - b + b / 2 : m = this.realWidth / 2 - m);
                void 0 === k && (k = 1);
                void 0 === g && (g = 0);
                b += h / 2;
                c = d.text(this.container, c, f, this.fontFamily, h, e, l, k);
                c.translate(m, b);
                d.setCN(this, c, "label");
                a.id && d.setCN(this, c, "label-" + a.id);
                0 !== g && c.rotate(g);
                a.url ? (c.setAttr("cursor", "pointer"), c.click(function() { d.getURL(a.url) })) :
                    c.node.style.pointerEvents = "none";
                this.labelsSet.push(c);
                this.labels.push(c)
            }
        },
        addLabel: function(a, b, c, e, d, f, g, k, l, m) {
            a = { x: a, y: b, text: c, align: e, size: d, color: f, alpha: k, rotation: g, bold: l, url: m, enabled: !0 };
            this.container && this.drawLabel(a);
            this.allLabels.push(a)
        },
        clearLabels: function() {
            var a = this.labels,
                b;
            for (b = a.length - 1; 0 <= b; b--) a[b].remove();
            this.labels = [];
            this.allLabels = []
        },
        updateHeight: function() {
            var a = this.divRealHeight,
                b = this.legend;
            if (b) {
                var c = this.legendDiv.offsetHeight,
                    b = b.position;
                if ("top" ==
                    b || "bottom" == b) {
                    a -= c;
                    if (0 > a || isNaN(a)) a = 0;
                    this.chartDiv.style.height = a + "px"
                }
            }
            return a
        },
        updateWidth: function() {
            var a = this.divRealWidth,
                b = this.divRealHeight,
                c = this.legend;
            if (c) {
                var e = this.legendDiv,
                    d = e.offsetWidth;
                isNaN(c.width) || (d = c.width);
                c.ieW && (d = c.ieW);
                var f = e.offsetHeight,
                    e = e.style,
                    g = this.chartDiv.style,
                    c = c.position;
                if ("right" == c || "left" == c) {
                    a -= d;
                    if (0 > a || isNaN(a)) a = 0;
                    g.width = a + "px";
                    "left" == c ? (g.left = d + "px", e.left = "0px") : (g.left = "0px", e.left = a + "px");
                    b > f && (e.top = (b - f) / 2 + "px")
                }
            }
            return a
        },
        getTitleHeight: function() {
            var a =
                0,
                b = this.titles,
                c = !0;
            if (0 < b.length) {
                var a = 20,
                    e;
                for (e = 0; e < b.length; e++) { var d = b[e];!1 !== d.enabled && (c = !1, d = d.size, isNaN(d) && (d = this.fontSize + 2), a += d + 6) }
                c && (a = 0)
            }
            return a
        },
        addTitle: function(a, b, c, e, d) {
            isNaN(b) && (b = this.fontSize + 2);
            a = { text: a, size: b, color: c, alpha: e, bold: d, enabled: !0 };
            this.titles.push(a);
            return a
        },
        handleWheel: function(a) {
            var b = 0;
            a || (a = window.event);
            a.wheelDelta ? b = a.wheelDelta / 120 : a.detail && (b = -a.detail / 3);
            b && this.handleWheelReal(b, a.shiftKey);
            a.preventDefault && a.preventDefault()
        },
        handleWheelReal: function() {},
        addListeners: function() {
            var a = this,
                b = a.chartDiv;
            document.addEventListener ? (a.panEventsEnabled && (b.style.msTouchAction = "none"), "ontouchstart" in document.documentElement && (b.addEventListener("touchstart", function(b) {
                a.handleTouchMove.call(a, b);
                a.handleTouchStart.call(a, b)
            }, !0), b.addEventListener("touchmove", function(b) { a.handleTouchMove.call(a, b) }, !0), b.addEventListener("touchend", function(b) { a.handleTouchEnd.call(a, b) }, !0)), b.addEventListener("mousedown", function(b) {
                a.mouseIsOver = !0;
                a.handleMouseMove.call(a,
                    b);
                a.handleMouseDown.call(a, b)
            }, !0), b.addEventListener("mouseover", function(b) { a.handleMouseOver.call(a, b) }, !0), b.addEventListener("mouseout", function(b) { a.handleMouseOut.call(a, b) }, !0)) : (b.attachEvent("onmousedown", function(b) { a.handleMouseDown.call(a, b) }), b.attachEvent("onmouseover", function(b) { a.handleMouseOver.call(a, b) }), b.attachEvent("onmouseout", function(b) { a.handleMouseOut.call(a, b) }))
        },
        dispDUpd: function() {
            if (!this.skipEvents) {
                var a;
                this.dispatchDataUpdated && (this.dispatchDataUpdated = !1, a =
                    "dataUpdated", this.fire(a, { type: a, chart: this }));
                this.chartCreated || (a = "init", this.fire(a, { type: a, chart: this }));
                this.chartRendered || (a = "rendered", this.fire(a, { type: a, chart: this }), this.chartRendered = !0);
                a = "drawn";
                this.fire(a, { type: a, chart: this })
            }
            this.skipEvents = !1
        },
        validateSize: function() {
            var a = this;
            a.premeasure();
            if (a.divRealWidth != a.previousWidth || a.divRealHeight != a.previousHeight) {
                var b = a.legend;
                if (0 < a.realWidth && 0 < a.realHeight) {
                    a.sizeChanged = !0;
                    if (b) {
                        clearTimeout(a.legendInitTO);
                        var c = setTimeout(function() { b.invalidateSize() },
                            100);
                        a.timeOuts.push(c);
                        a.legendInitTO = c
                    }
                    "xy" != a.type ? a.marginsUpdated = !1 : (a.marginsUpdated = !0, a.selfZoom = !0);
                    clearTimeout(a.initTO);
                    c = setTimeout(function() { a.initChart() }, 10);
                    a.timeOuts.push(c);
                    a.initTO = c
                }
                a.fire("resized", { type: "resized", chart: a });
                a.renderFix();
                b && b.renderFix && b.renderFix();
                a.previousHeight = a.divRealHeight;
                a.previousWidth = a.divRealWidth
            }
        },
        invalidateSize: function() {
            this.previousHeight = this.previousWidth = NaN;
            this.invalidateSizeReal()
        },
        invalidateSizeReal: function() {
            var a = this;
            a.marginsUpdated = !1;
            clearTimeout(a.validateTO);
            var b = setTimeout(function() { a.validateSize() }, 5);
            a.timeOuts.push(b);
            a.validateTO = b
        },
        validateData: function(a) { this.chartCreated && (this.dataChanged = !0, this.marginsUpdated = "xy" != this.type ? !1 : !0, this.initChart(a)) },
        validateNow: function(a, b) {
            this.initTO && clearTimeout(this.initTO);
            a && (this.dataChanged = !0);
            this.skipEvents = b;
            this.chartRendered = !1;
            this.write(this.div)
        },
        showItem: function(a) {
            a.hidden = !1;
            this.initChart()
        },
        hideItem: function(a) {
            a.hidden = !0;
            this.initChart()
        },
        hideBalloon: function() {
            var a =
                this;
            clearTimeout(a.hoverInt);
            clearTimeout(a.balloonTO);
            a.hoverInt = setTimeout(function() { a.hideBalloonReal.call(a) }, a.hideBalloonTime)
        },
        cleanChart: function() {},
        hideBalloonReal: function() {
            var a = this.balloon;
            a && a.hide()
        },
        showBalloon: function(a, b, c, e, d) {
            var f = this;
            clearTimeout(f.balloonTO);
            clearTimeout(f.hoverInt);
            f.balloonTO = setTimeout(function() { f.showBalloonReal.call(f, a, b, c, e, d) }, 1)
        },
        showBalloonReal: function(a, b, c, e, d) {
            this.handleMouseMove();
            var f = this.balloon;
            f.enabled && (f.followCursor(!1), f.changeColor(b), !c || f.fixedPosition ? (f.setPosition(e, d), f.followCursor(!1)) : f.followCursor(!0), a && f.showBalloon(a))
        },
        handleTouchMove: function(a) {
            this.hideBalloon();
            var b = this.chartDiv;
            a.touches && (a = a.touches.item(0), this.mouseX = a.pageX - d.findPosX(b), this.mouseY = a.pageY - d.findPosY(b))
        },
        handleMouseOver: function() {
            this.outTO && clearTimeout(this.outTO);
            d.resetMouseOver();
            this.mouseIsOver = !0
        },
        handleMouseOut: function() {
            var a = this;
            a.outTO && clearTimeout(a.outTO);
            a.outTO = setTimeout(function() { a.handleMouseOutReal() }, 10)
        },
        handleMouseOutReal: function() {
            d.resetMouseOver();
            this.mouseIsOver = !1
        },
        handleMouseMove: function(a) {
            if (this.mouseIsOver) {
                var b = this.chartDiv;
                a || (a = window.event);
                var c, e;
                if (a) {
                    this.posX = d.findPosX(b);
                    this.posY = d.findPosY(b);
                    switch (this.mouseMode) {
                        case 1:
                            c = a.clientX - this.posX;
                            e = a.clientY - this.posY;
                            if (!this.divIsFixed) {
                                var b = document.body,
                                    h, f, g, k;
                                b && (h = b.scrollLeft, g = b.scrollTop);
                                if (b = document.documentElement) f = b.scrollLeft, k = b.scrollTop;
                                h = Math.max(h, f);
                                g = Math.max(g, k);
                                c += h;
                                e += g
                            }
                            break;
                        case 0:
                            this.divIsFixed ?
                                (c = a.clientX - this.posX, e = a.clientY - this.posY) : (c = a.pageX - this.posX, e = a.pageY - this.posY)
                    }
                    a.touches && (a = a.touches.item(0), c = a.pageX - this.posX, e = a.pageY - this.posY);
                    this.mouseX = c - this.dmouseX;
                    this.mouseY = e - this.dmouseY
                }
            }
        },
        handleTouchStart: function(a) { this.handleMouseDown(a) },
        handleTouchEnd: function(a) {
            d.resetMouseOver();
            this.handleReleaseOutside(a)
        },
        handleReleaseOutside: function() {},
        handleMouseDown: function(a) {
            d.resetMouseOver();
            this.mouseIsOver = !0;
            a && a.preventDefault && (this.panEventsEnabled ? a.preventDefault() :
                a.touches || a.preventDefault())
        },
        addLegend: function(a, b) {
            a = d.processObject(a, d.AmLegend, this.theme);
            a.divId = b;
            var c;
            c = "object" != typeof b && b ? document.getElementById(b) : b;
            this.legend = a;
            a.chart = this;
            c ? (a.div = c, a.position = "outside", a.autoMargins = !1) : a.div = this.legendDiv;
            c = this.handleLegendEvent;
            this.listenTo(a, "showItem", c);
            this.listenTo(a, "hideItem", c);
            this.listenTo(a, "clickMarker", c);
            this.listenTo(a, "rollOverItem", c);
            this.listenTo(a, "rollOutItem", c);
            this.listenTo(a, "rollOverMarker", c);
            this.listenTo(a,
                "rollOutMarker", c);
            this.listenTo(a, "clickLabel", c);
            return a
        },
        removeLegend: function() {
            this.legend = void 0;
            this.legendDiv.innerHTML = ""
        },
        handleResize: function() {
            (d.isPercents(this.width) || d.isPercents(this.height)) && this.invalidateSizeReal();
            this.renderFix()
        },
        renderFix: function() {
            if (!d.VML) {
                var a = this.container;
                a && a.renderFix()
            }
        },
        getSVG: function() { if (d.hasSVG) return this.container },
        animate: function(a, b, c, e, h, f, g) {
            a["an_" + b] && d.removeFromArray(this.animations, a["an_" + b]);
            c = {
                obj: a,
                frame: 0,
                attribute: b,
                from: c,
                to: e,
                time: h,
                effect: f,
                suffix: g
            };
            a["an_" + b] = c;
            this.animations.push(c);
            return c
        },
        setLegendData: function(a) {
            var b = this.legend;
            b && b.setData(a)
        },
        stopAnim: function(a) { d.removeFromArray(this.animations, a) },
        updateAnimations: function() {
            var a;
            this.container && this.container.update();
            if (this.animations)
                for (a = this.animations.length - 1; 0 <= a; a--) {
                    var b = this.animations[a],
                        c = 1E3 * b.time / d.updateRate,
                        e = b.frame + 1,
                        h = b.obj,
                        f = b.attribute;
                    if (e <= c) {
                        b.frame++;
                        var g = Number(b.from),
                            k = Number(b.to) - g,
                            c = d[b.effect](0, e, g, k, c);
                        0 ===
                            k ? (this.animations.splice(a, 1), h.node.style[f] = Number(b.to) + b.suffix) : h.node.style[f] = c + b.suffix
                    } else h.node.style[f] = Number(b.to) + b.suffix, this.animations.splice(a, 1)
                }
        },
        update: function() { this.updateAnimations() },
        inIframe: function() { try { return window.self !== window.top } catch (a) { return !0 } },
        brr: function() {
            var a = window.location.hostname.split("."),
                b;
            2 <= a.length && (b = a[a.length - 2] + "." + a[a.length - 1]);
            this.amLink && (a = this.amLink.parentNode) && a.removeChild(this.amLink);
            a = this.creditsPosition;
            if ("amcharts.com" !=
                b || !0 === this.inIframe()) {
                var c = b = 0,
                    e = this.realWidth,
                    d = this.realHeight,
                    f = this.type;
                if ("serial" == f || "xy" == f || "gantt" == f) b = this.marginLeftReal, c = this.marginTopReal, e = b + this.plotAreaWidth, d = c + this.plotAreaHeight;
                var g = "http://www.amcharts.com/javascript-charts/",
                    k = "JavaScript charts",
                    l = "JS chart by amCharts";
                "ammap" == this.product && (g = "http://www.ammap.com/javascript-maps/", k = "Interactive JavaScript maps", l = "JS map by amCharts");
                f = document.createElement("a");
                l = document.createTextNode(l);
                f.setAttribute("href",
                    g);
                f.setAttribute("title", k);
                f.appendChild(l);
                this.chartDiv.appendChild(f);
                this.amLink = f;
                g = f.style;
                g.position = "absolute";
                g.textDecoration = "none";
                g.color = this.color;
                g.fontFamily = this.fontFamily;
                g.fontSize = this.fontSize + "px";
                g.opacity = .7;
                g.display = "block";
                var k = f.offsetWidth,
                    f = f.offsetHeight,
                    l = 5 + b,
                    m = c + 5;
                "bottom-left" == a && (l = 5 + b, m = d - f - 3);
                "bottom-right" == a && (l = e - k - 5, m = d - f - 3);
                "top-right" == a && (l = e - k - 5, m = c + 5);
                g.left = l + "px";
                g.top = m + "px"
            }
        }
    });
    d.Slice = d.Class({ construct: function() {} });
    d.SerialDataItem = d.Class({ construct: function() {} });
    d.GraphDataItem = d.Class({ construct: function() {} });
    d.Guide = d.Class({
        construct: function(a) {
            this.cname = "Guide";
            d.applyTheme(this, a, this.cname)
        }
    });
    d.Title = d.Class({
        construct: function(a) {
            this.cname = "Title";
            d.applyTheme(this, a, this.cname)
        }
    });
    d.Label = d.Class({
        construct: function(a) {
            this.cname = "Label";
            d.applyTheme(this, a, this.cname)
        }
    })
})();
(function() {
    var d = window.AmCharts;
    d.AmGraph = d.Class({
        construct: function(a) {
            this.cname = "AmGraph";
            this.createEvents("rollOverGraphItem", "rollOutGraphItem", "clickGraphItem", "doubleClickGraphItem", "rightClickGraphItem", "clickGraph", "rollOverGraph", "rollOutGraph");
            this.type = "line";
            this.stackable = !0;
            this.columnCount = 1;
            this.columnIndex = 0;
            this.centerCustomBullets = this.showBalloon = !0;
            this.maxBulletSize = 50;
            this.minBulletSize = 4;
            this.balloonText = "[[value]]";
            this.hidden = this.scrollbar = this.animationPlayed = !1;
            this.pointPosition = "middle";
            this.depthCount = 1;
            this.includeInMinMax = !0;
            this.negativeBase = 0;
            this.visibleInLegend = !0;
            this.showAllValueLabels = !1;
            this.showBulletsAt = this.showBalloonAt = "close";
            this.lineThickness = 1;
            this.dashLength = 0;
            this.connect = !0;
            this.lineAlpha = 1;
            this.bullet = "none";
            this.bulletBorderThickness = 2;
            this.bulletBorderAlpha = 0;
            this.bulletAlpha = 1;
            this.bulletSize = 8;
            this.cornerRadiusTop = this.hideBulletsCount = this.bulletOffset = 0;
            this.cursorBulletAlpha = 1;
            this.gradientOrientation = "vertical";
            this.dy =
                this.dx = 0;
            this.periodValue = "";
            this.clustered = !0;
            this.periodSpan = 1;
            this.y = this.x = 0;
            this.switchable = !0;
            this.tcc = this.minDistance = 1;
            this.labelRotation = 0;
            this.labelAnchor = "auto";
            this.labelOffset = 3;
            this.bcn = "graph-";
            this.dateFormat = "MMM DD, YYYY";
            d.applyTheme(this, a, this.cname)
        },
        draw: function() {
            var a = this.chart,
                b = a.type;
            isNaN(this.precision) || (this.numberFormatter ? this.numberFormatter.precision = this.precision : this.numberFormatter = { precision: this.precision, decimalSeparator: a.decimalSeparator, thousandsSeparator: a.thousandsSeparator });
            var c = a.container;
            this.container = c;
            this.destroy();
            var e = c.set(),
                h = c.set();
            this.behindColumns ? (a.graphsBehindSet.push(e), a.bulletBehindSet.push(h)) : (a.graphsSet.push(e), a.bulletSet.push(h));
            var f = this.bulletAxis;
            d.isString(f) && (this.bulletAxis = a.getValueAxisById(f));
            this.bulletSet = h;
            if (!this.scrollbar) {
                var f = a.marginLeftReal,
                    g = a.marginTopReal;
                e.translate(f, g);
                h.translate(f, g)
            }
            c = c.set();
            d.remove(this.columnsSet);
            e.push(c);
            this.set = e;
            d.setCN(a, e, "graph-" + this.type);
            d.setCN(a, e, "graph-" + this.id);
            d.setCN(a,
                h, "graph-" + this.type);
            d.setCN(a, h, "graph-" + this.id);
            this.columnsSet = c;
            this.columnsArray = [];
            this.ownColumns = [];
            this.allBullets = [];
            this.animationArray = [];
            e = this.labelPosition;
            e || (h = this.valueAxis.stackType, e = "top", "column" == this.type && (a.rotate && (e = "right"), "100%" == h || "regular" == h) && (e = "middle"), this.labelPosition = e);
            d.ifArray(this.data) && (a = !1, "xy" == b ? this.xAxis.axisCreated && this.yAxis.axisCreated && (a = !0) : this.valueAxis.axisCreated && (a = !0), !this.hidden && a && this.createGraph())
        },
        createGraph: function() {
            var a =
                this,
                b = a.chart;
            a.startAlpha = b.startAlpha;
            a.seqAn = b.sequencedAnimation;
            a.baseCoord = a.valueAxis.baseCoord;
            void 0 === a.fillAlphas && (a.fillAlphas = 0);
            a.bulletColorR = a.bulletColor;
            void 0 === a.bulletColorR && (a.bulletColorR = a.lineColorR, a.bulletColorNegative = a.negativeLineColor);
            void 0 === a.bulletAlpha && (a.bulletAlpha = a.lineAlpha);
            b = b.type;
            "gantt" == b && (b = "serial");
            clearTimeout(a.playedTO);
            if (!isNaN(a.valueAxis.min) && !isNaN(a.valueAxis.max)) {
                switch (b) {
                    case "serial":
                        a.categoryAxis && (a.createSerialGraph(), "candlestick" ==
                            a.type && 1 > a.valueAxis.minMaxMultiplier && a.positiveClip(a.set));
                        break;
                    case "radar":
                        a.createRadarGraph();
                        break;
                    case "xy":
                        a.createXYGraph(), a.positiveClip(a.set)
                }
                a.playedTO = setTimeout(function() { a.setAnimationPlayed.call(a) }, 500 * a.chart.startDuration)
            }
        },
        setAnimationPlayed: function() { this.animationPlayed = !0 },
        createXYGraph: function() {
            var a = [],
                b = [],
                c = this.xAxis,
                e = this.yAxis;
            this.pmh = e.viH + 1;
            this.pmw = c.viW + 1;
            this.pmy = this.pmx = 0;
            var d;
            for (d = this.start; d <= this.end; d++) {
                var f = this.data[d].axes[c.id].graphs[this.id],
                    g = f.values,
                    k = g.x,
                    l = g.y,
                    g = c.getCoordinate(k),
                    m = e.getCoordinate(l);
                !isNaN(k) && !isNaN(l) && (a.push(g), b.push(m), f.x = g, f.y = m, k = this.createBullet(f, g, m, d), l = this.labelText) && (f = this.createLabel(f, g, m, l), this.positionLabel(g, m, f, k), this.allBullets.push(f))
            }
            this.drawLineGraph(a, b);
            this.launchAnimation()
        },
        createRadarGraph: function() {
            var a = this.valueAxis.stackType,
                b = [],
                c = [],
                e, d, f;
            for (f = this.start; f <= this.end; f++) {
                var g = this.data[f].axes[this.valueAxis.id].graphs[this.id],
                    k;
                k = "none" == a || "3d" == a ? g.values.value :
                    g.values.close;
                if (isNaN(k)) this.drawLineGraph(b, c), b = [], c = [];
                else {
                    var l = this.y - (this.valueAxis.getCoordinate(k) - this.height),
                        m = 180 - 360 / (this.end - this.start + 1) * f;
                    k = l * Math.sin(m / 180 * Math.PI);
                    l *= Math.cos(m / 180 * Math.PI);
                    b.push(k);
                    c.push(l);
                    var m = this.createBullet(g, k, l, f),
                        n = this.labelText;
                    n && (g = this.createLabel(g, k, l, n), this.positionLabel(k, l, g, m), this.allBullets.push(g));
                    isNaN(e) && (e = k);
                    isNaN(d) && (d = l)
                }
            }
            b.push(e);
            c.push(d);
            this.drawLineGraph(b, c);
            this.launchAnimation()
        },
        positionLabel: function(a, b, c,
            e) {
            var d = "middle",
                f = !1,
                g = this.labelPosition,
                k = c.getBBox();
            if (e) {
                var l = e.graphDataItem,
                    m = this.chart.rotate,
                    n = l.isNegative,
                    q = this.chart;
                b -= k.height / 4 / 2;
                switch (g) {
                    case "top":
                        g = m ? "top" : n ? "bottom" : "top";
                        break;
                    case "right":
                        g = m ? n ? "left" : "right" : "right";
                        break;
                    case "bottom":
                        g = m ? "bottom" : n ? "top" : "bottom";
                        break;
                    case "left":
                        g = m ? n ? "right" : "left" : "left"
                }
                var p = l.columnGraphics,
                    t = 0,
                    r = 0;
                p && (t = p.x, r = p.y);
                var u = this.labelOffset;
                switch (g) {
                    case "top":
                        b -= e.size / 2 + k.height / 2 + u;
                        break;
                    case "right":
                        d = "start";
                        a += e.size / 2 + u;
                        break;
                    case "bottom":
                        b += e.size / 2 + k.height / 2 + u;
                        break;
                    case "left":
                        d = "end";
                        a -= e.size / 2 + u;
                        break;
                    case "inside":
                        "column" == this.type && (f = !0, m ? n ? (d = "end", a = t - 3 - u) : (d = "start", a = t + 3 + u) : b = n ? r + 7 + u : r - 10 - u);
                        break;
                    case "middle":
                        "column" == this.type && (f = !0, m ? a -= (a - t) / 2 + u - 3 : b -= (b - r) / 2 + u - 3)
                }
                "auto" != this.labelAnchor && (d = this.labelAnchor);
                c.attr({ "text-anchor": d });
                this.labelRotation && c.rotate(this.labelRotation);
                c.translate(a, b);
                k = c.getBBox();
                !this.showAllValueLabels && p && f && (k.height > l.columnHeight || k.width > l.columnWidth) &&
                    (c.remove(), c = !1);
                if (c && ("serial" == q.type || "gantt" == q.type))
                    if (m) { if (0 > b || b > this.height) c.remove(), c = !1 } else if (0 > a || a > this.width) c.remove(), c = !1;
                return c
            }
        },
        getGradRotation: function() { var a = 270; "horizontal" == this.gradientOrientation && (a = 0); return this.gradientRotation = a },
        createSerialGraph: function() {
            this.dashLengthSwitched = this.fillColorsSwitched = this.lineColorSwitched = void 0;
            var a = this.chart,
                b = this.id,
                c = this.index,
                e = this.data,
                h = this.chart.container,
                f = this.valueAxis,
                g = this.type,
                k = this.columnWidthReal,
                l = this.showBulletsAt;
            isNaN(this.columnWidth) || (k = this.columnWidth);
            isNaN(k) && (k = .8);
            var m = this.useNegativeColorIfDown,
                n = this.width,
                q = this.height,
                p = this.y,
                t = this.rotate,
                r = this.columnCount,
                u = d.toCoordinate(this.cornerRadiusTop, k / 2),
                z = this.connect,
                y = [],
                v = [],
                w, A, B, D, C = this.chart.graphs.length,
                J, H = this.dx / this.tcc,
                I = this.dy / this.tcc,
                T = f.stackType,
                da = this.start,
                pa = this.end,
                U = this.scrollbar,
                na = "graph-column-";
            U && (na = "scrollbar-graph-column-");
            var qa = this.categoryAxis,
                ja = this.baseCoord,
                Pa = this.negativeBase,
                aa = this.columnIndex,
                Z = this.lineThickness,
                V = this.lineAlpha,
                sa = this.lineColorR,
                ba = this.dashLength,
                ca = this.set,
                ta, ia = this.getGradRotation(),
                P = this.chart.columnSpacing,
                W = qa.cellWidth,
                wa = (W * k - r) / r;
            P > wa && (P = wa);
            var G, x, ka, ea = q + 1,
                Qa = n + 1,
                Y = 0,
                qb = 0,
                rb, sb, eb, fb, tb = this.fillColorsR,
                Ja = this.negativeFillColors,
                Ca = this.negativeLineColor,
                Wa = this.fillAlphas,
                Xa = this.negativeFillAlphas;
            "object" == typeof Wa && (Wa = Wa[0]);
            "object" == typeof Xa && (Xa = Xa[0]);
            var gb = f.getCoordinate(f.min);
            f.logarithmic && (gb = f.getCoordinate(f.minReal));
            this.minCoord = gb;
            this.resetBullet && (this.bullet = "none");
            if (!(U || "line" != g && "smoothedLine" != g && "step" != g || (1 == e.length && "step" != g && "none" == this.bullet && (this.bullet = "round", this.resetBullet = !0), !Ja && void 0 == Ca || m))) {
                var Ra = Pa;
                Ra > f.max && (Ra = f.max);
                Ra < f.min && (Ra = f.min);
                f.logarithmic && (Ra = f.minReal);
                var Ga = f.getCoordinate(Ra),
                    Ib = f.getCoordinate(f.max);
                t ? (ea = q, Qa = Math.abs(Ib - Ga) + 1, rb = q, sb = Math.abs(gb - Ga) + 1, fb = qb = 0, f.reversed ? (Y = 0, eb = Ga) : (Y = Ga, eb = 0)) : (Qa = n, ea = Math.abs(Ib - Ga) + 1, sb = n, rb = Math.abs(gb - Ga) + 1,
                    eb = Y = 0, f.reversed ? (fb = p, qb = Ga) : fb = Ga + 1)
            }
            var Ha = Math.round;
            this.pmx = Ha(Y);
            this.pmy = Ha(qb);
            this.pmh = Ha(ea);
            this.pmw = Ha(Qa);
            this.nmx = Ha(eb);
            this.nmy = Ha(fb);
            this.nmh = Ha(rb);
            this.nmw = Ha(sb);
            d.isModern || (this.nmy = this.nmx = 0, this.nmh = this.height);
            this.clustered || (r = 1);
            k = "column" == g ? (W * k - P * (r - 1)) / r : W * k;
            1 > k && (k = 1);
            var Jb = this.fixedColumnWidth;
            isNaN(Jb) || (k = Jb);
            var K;
            if ("line" == g || "step" == g || "smoothedLine" == g) {
                if (0 < da) {
                    for (K = da - 1; - 1 < K; K--)
                        if (G = e[K], x = G.axes[f.id].graphs[b], ka = x.values.value, !isNaN(ka)) {
                            da =
                                K;
                            break
                        }
                    if (this.lineColorField)
                        for (K = da; - 1 < K; K--)
                            if (G = e[K], x = G.axes[f.id].graphs[b], x.lineColor) { this.bulletColorSwitched = this.lineColorSwitched = x.lineColor; break }
                    if (this.fillColorsField)
                        for (K = da; - 1 < K; K--)
                            if (G = e[K], x = G.axes[f.id].graphs[b], x.fillColors) { this.fillColorsSwitched = x.fillColors; break }
                    if (this.dashLengthField)
                        for (K = da; - 1 < K; K--)
                            if (G = e[K], x = G.axes[f.id].graphs[b], !isNaN(x.dashLength)) { this.dashLengthSwitched = x.dashLength; break }
                }
                if (pa < e.length - 1)
                    for (K = pa + 1; K < e.length; K++)
                        if (G = e[K], x = G.axes[f.id].graphs[b],
                            ka = x.values.value, !isNaN(ka)) { pa = K; break }
            }
            pa < e.length - 1 && pa++;
            var Q = [],
                R = [],
                Ka = !1;
            if ("line" == g || "step" == g || "smoothedLine" == g)
                if (this.stackable && "regular" == T || "100%" == T || this.fillToGraph) Ka = !0;
            var Kb = this.noStepRisers,
                hb = -1E3,
                ib = -1E3,
                jb = this.minDistance,
                La = !0,
                Ya = !1;
            for (K = da; K <= pa; K++) {
                G = e[K];
                x = G.axes[f.id].graphs[b];
                x.index = K;
                var Za, Ma = NaN;
                if (m && void 0 == this.openField)
                    for (var ub = K + 1; ub < e.length && (!e[ub] || !(Za = e[K + 1].axes[f.id].graphs[b]) || !Za.values || (Ma = Za.values.value, isNaN(Ma))); ub++);
                var S, O, M,
                    fa, la = NaN,
                    F = NaN,
                    E = NaN,
                    N = NaN,
                    L = NaN,
                    Na = NaN,
                    Da = NaN,
                    Oa = NaN,
                    Ea = NaN,
                    ya = NaN,
                    za = NaN,
                    ga = NaN,
                    ha = NaN,
                    X = NaN,
                    vb = NaN,
                    wb = NaN,
                    ma = NaN,
                    oa = void 0,
                    Ia = tb,
                    Sa = Wa,
                    Aa = sa,
                    ua, xa, xb = this.proCandlesticks,
                    kb = this.topRadius,
                    $a = this.pattern;
                void 0 != x.pattern && ($a = x.pattern);
                isNaN(x.alpha) || (Sa = x.alpha);
                isNaN(x.dashLength) || (ba = x.dashLength);
                var Ba = x.values;
                f.recalculateToPercents && (Ba = x.percents);
                if (Ba) {
                    X = this.stackable && "none" != T && "3d" != T ? Ba.close : Ba.value;
                    if ("candlestick" == g || "ohlc" == g) X = Ba.close, wb = Ba.low, Da = f.getCoordinate(wb),
                        vb = Ba.high, Ea = f.getCoordinate(vb);
                    ma = Ba.open;
                    E = f.getCoordinate(X);
                    isNaN(ma) || (L = f.getCoordinate(ma), m && (Ma = ma, ma = L = NaN));
                    m && (void 0 == this.openField ? Za && (Za.isNegative = Ma < X ? !0 : !1, isNaN(Ma) && (x.isNegative = !La)) : x.isNegative = Ma > X ? !0 : !1);
                    if (!U) switch (this.showBalloonAt) {
                        case "close":
                            x.y = E;
                            break;
                        case "open":
                            x.y = L;
                            break;
                        case "high":
                            x.y = Ea;
                            break;
                        case "low":
                            x.y = Da
                    }
                    var la = G.x[qa.id],
                        Ta = this.periodSpan - 1,
                        ra = Math.floor(W / 2) + Math.floor(Ta * W / 2),
                        Fa = ra,
                        lb = 0;
                    "left" == this.stepDirection && (lb = (2 * W + Ta * W) / 2, la -= lb);
                    "center" ==
                    this.stepDirection && (lb = W / 2, la -= lb);
                    "start" == this.pointPosition && (la -= W / 2 + Math.floor(Ta * W / 2), ra = 0, Fa = Math.floor(W) + Math.floor(Ta * W));
                    "end" == this.pointPosition && (la += W / 2 + Math.floor(Ta * W / 2), ra = Math.floor(W) + Math.floor(Ta * W), Fa = 0);
                    if (Kb) {
                        var yb = this.columnWidth;
                        isNaN(yb) || (ra *= yb, Fa *= yb)
                    }
                    U || (x.x = la); - 1E5 > la && (la = -1E5);
                    la > n + 1E5 && (la = n + 1E5);
                    t ? (F = E, N = L, L = E = la, isNaN(ma) && !this.fillToGraph && (N = ja), Na = Da, Oa = Ea) : (N = F = la, isNaN(ma) && !this.fillToGraph && (L = ja));
                    if (!xb && X < ma || xb && X < ta) x.isNegative = !0, Ja && (Ia = Ja),
                        Xa && (Sa = Xa), void 0 != Ca && (Aa = Ca);
                    Ya = !1;
                    isNaN(X) || (m ? X > Ma ? (La && (Ya = !0), La = !1) : (La || (Ya = !0), La = !0) : x.isNegative = X < Pa ? !0 : !1, ta = X);
                    void 0 != x.color && (Ia = x.color);
                    x.fillColors && (Ia = x.fillColors);
                    switch (g) {
                        case "line":
                            if (isNaN(X)) z || (this.drawLineGraph(y, v, Q, R), y = [], v = [], Q = [], R = []);
                            else {
                                if (Math.abs(F - hb) >= jb || Math.abs(E - ib) >= jb) y.push(F), v.push(E), hb = F, ib = E;
                                ya = F;
                                za = E;
                                ga = F;
                                ha = E;
                                !Ka || isNaN(L) || isNaN(N) || (Q.push(N), R.push(L));
                                if (Ya || void 0 != x.lineColor || void 0 != x.fillColors || !isNaN(x.dashLength)) this.drawLineGraph(y,
                                    v, Q, R), y = [F], v = [E], Q = [], R = [], !Ka || isNaN(L) || isNaN(N) || (Q.push(N), R.push(L)), m ? La ? (this.lineColorSwitched = sa, this.fillColorsSwitched = tb) : (this.lineColorSwitched = Ca, this.fillColorsSwitched = Ja) : (this.lineColorSwitched = x.lineColor, this.fillColorsSwitched = x.fillColors), this.dashLengthSwitched = x.dashLength;
                                x.gap && (this.drawLineGraph(y, v, Q, R), y = [], v = [], Q = [], R = [])
                            }
                            break;
                        case "smoothedLine":
                            if (isNaN(X)) z || (this.drawSmoothedGraph(y, v, Q, R), y = [], v = [], Q = [], R = []);
                            else {
                                if (Math.abs(F - hb) >= jb || Math.abs(E - ib) >= jb) y.push(F),
                                    v.push(E), hb = F, ib = E;
                                ya = F;
                                za = E;
                                ga = F;
                                ha = E;
                                !Ka || isNaN(L) || isNaN(N) || (Q.push(N), R.push(L));
                                void 0 == x.lineColor && void 0 == x.fillColors && isNaN(x.dashLength) || (this.drawSmoothedGraph(y, v, Q, R), y = [F], v = [E], Q = [], R = [], !Ka || isNaN(L) || isNaN(N) || (Q.push(N), R.push(L)), this.lineColorSwitched = x.lineColor, this.fillColorsSwitched = x.fillColors, this.dashLengthSwitched = x.dashLength);
                                x.gap && (this.drawSmoothedGraph(y, v, Q, R), y = [], v = [], Q = [], R = [])
                            }
                            break;
                        case "step":
                            if (!isNaN(X)) {
                                t ? (isNaN(w) || (y.push(w), v.push(E - ra)), v.push(E -
                                    ra), y.push(F), v.push(E + Fa), y.push(F), !Ka || isNaN(L) || isNaN(N) || (isNaN(B) || (Q.push(B), R.push(L - ra)), Q.push(N), R.push(L - ra), Q.push(N), R.push(L + Fa))) : (isNaN(A) || (v.push(A), y.push(w), v.push(A), y.push(F - ra)), y.push(F - ra), v.push(E), y.push(F + Fa), v.push(E), !Ka || isNaN(L) || isNaN(N) || (isNaN(D) || (Q.push(N - ra), R.push(D)), Q.push(N - ra), R.push(L), Q.push(N + Fa), R.push(L)));
                                w = F;
                                A = E;
                                B = N;
                                D = L;
                                ya = F;
                                za = E;
                                ga = F;
                                ha = E;
                                if (Ya || void 0 != x.lineColor || void 0 != x.fillColors || !isNaN(x.dashLength)) {
                                    var Yb = y[y.length - 2],
                                        Zb = v[v.length - 2];
                                    y.pop();
                                    v.pop();
                                    this.drawLineGraph(y, v, Q, R);
                                    y = [Yb];
                                    v = [Zb];
                                    Q = [];
                                    R = [];
                                    this.lineColorSwitched = x.lineColor;
                                    this.fillColorsSwitched = x.fillColors;
                                    this.dashLengthSwitched = x.dashLength;
                                    m && (La ? (this.lineColorSwitched = sa, this.fillColorsSwitched = tb) : (this.lineColorSwitched = Ca, this.fillColorsSwitched = Ja))
                                }
                                if (Kb || x.gap) w = A = NaN, this.drawLineGraph(y, v, Q, R), y = [], v = [], Q = [], R = []
                            } else if (!z) {
                                if (1 >= this.periodSpan || 1 < this.periodSpan && F - w > ra + Fa) w = A = NaN;
                                this.drawLineGraph(y, v, Q, R);
                                y = [];
                                v = [];
                                Q = [];
                                R = []
                            }
                            break;
                        case "column":
                            ua =
                                Aa;
                            void 0 != x.lineColor && (ua = x.lineColor);
                            if (!isNaN(X)) {
                                m || (x.isNegative = X < Pa ? !0 : !1);
                                x.isNegative && (Ja && (Ia = Ja), void 0 != Ca && (ua = Ca));
                                var Lb = f.min,
                                    Mb = f.max;
                                if (!(X < Lb && ma < Lb || X > Mb && ma > Mb)) {
                                    var va;
                                    if (t) {
                                        "3d" == T ? (O = E - (r / 2 - this.depthCount + 1) * (k + P) + P / 2 + I * aa, S = N + H * aa, va = aa) : (O = Math.floor(E - (r / 2 - aa) * (k + P) + P / 2), S = N, va = 0);
                                        M = k;
                                        ya = F;
                                        za = O + k / 2;
                                        isNaN(N) || N > F && !x.isNegative && (ya = N);
                                        ga = F;
                                        ha = O + k / 2;
                                        O + M > q + va * I && (M = q - O + va * I);
                                        O < va * I && (M += O, O = va * I);
                                        fa = F - N;
                                        var $b = S;
                                        S = d.fitToBounds(S, 0, n);
                                        fa += $b - S;
                                        fa = d.fitToBounds(fa, -S, n -
                                            S + H * aa);
                                        O < q && 0 < M && (oa = new d.Cuboid(h, fa, M, H - a.d3x, I - a.d3y, Ia, Sa, Z, ua, V, ia, u, t, ba, $a, kb, na), x.columnWidth = Math.abs(fa), x.columnHeight = Math.abs(M))
                                    } else {
                                        "3d" == T ? (S = F - (r / 2 - this.depthCount + 1) * (k + P) + P / 2 + H * aa, O = L + I * aa, va = aa) : (S = F - (r / 2 - aa) * (k + P) + P / 2, O = L, va = 0);
                                        M = k;
                                        ya = S + k / 2;
                                        za = E;
                                        isNaN(L) || L < E && !x.isNegative && (za = L);
                                        ga = S + k / 2;
                                        ha = E;
                                        S + M > n + va * H && (M = n - S + va * H);
                                        S < va * H && (M += S - va * H, S = va * H);
                                        fa = E - L;
                                        var ac = O;
                                        O = d.fitToBounds(O, this.dy, q);
                                        fa += ac - O;
                                        fa = d.fitToBounds(fa, -O + I * aa, q - O);
                                        S < n + aa * H && 0 < M && (this.showOnAxis && (O -= I / 2),
                                            oa = new d.Cuboid(h, M, fa, H - a.d3x, I - a.d3y, Ia, Sa, Z, ua, this.lineAlpha, ia, u, t, ba, $a, kb, na), x.columnHeight = Math.abs(fa), x.columnWidth = Math.abs(M))
                                    }
                                }
                                if (oa && (xa = oa.set, d.setCN(a, oa.set, "graph-" + this.type), d.setCN(a, oa.set, "graph-" + this.id), x.className && d.setCN(a, oa.set, x.className, !0), x.columnGraphics = xa, xa.translate(S, O), this.columnsSet.push(xa), (x.url || this.showHandOnHover) && xa.setAttr("cursor", "pointer"), !U)) {
                                    "none" == T && (J = t ? (this.end + 1 - K) * C - c : C * K + c);
                                    "3d" == T && (t ? (J = (this.end + 1 - K) * C - c - 1E3 * this.depthCount,
                                        ya += H * this.columnIndex, ga += H * this.columnIndex, x.y += H * this.columnIndex) : (J = (C - c) * (K + 1) + 1E3 * this.depthCount, za += I * this.columnIndex, ha += I * this.columnIndex, x.y += I * this.columnIndex));
                                    if ("regular" == T || "100%" == T) J = t ? 0 < Ba.value ? (this.end + 1 - K) * C + c : (this.end + 1 - K) * C - c : 0 < Ba.value ? C * K + c : C * K - c;
                                    this.columnsArray.push({ column: oa, depth: J });
                                    x.x = t ? O + M / 2 : S + M / 2;
                                    this.ownColumns.push(oa);
                                    this.animateColumns(oa, K, F, N, E, L);
                                    this.addListeners(xa, x)
                                }
                            }
                            break;
                        case "candlestick":
                            if (!isNaN(ma) && !isNaN(X)) {
                                var Ua, ab;
                                ua = Aa;
                                void 0 !=
                                    x.lineColor && (ua = x.lineColor);
                                if (t) {
                                    if (O = E - k / 2, S = N, M = k, O + M > q && (M = q - O), 0 > O && (M += O, O = 0), O < q && 0 < M) {
                                        var zb, Ab;
                                        X > ma ? (zb = [F, Oa], Ab = [N, Na]) : (zb = [N, Oa], Ab = [F, Na]);
                                        !isNaN(Oa) && !isNaN(Na) && E < q && 0 < E && (Ua = d.line(h, zb, [E, E], ua, V, Z), ab = d.line(h, Ab, [E, E], ua, V, Z));
                                        fa = F - N;
                                        oa = new d.Cuboid(h, fa, M, H, I, Ia, Wa, Z, ua, V, ia, u, t, ba, $a, kb, na)
                                    }
                                } else if (S = F - k / 2, O = L + Z / 2, M = k, S + M > n && (M = n - S), 0 > S && (M += S, S = 0), fa = E - L, S < n && 0 < M) {
                                    xb && X >= ma && (Sa = 0);
                                    var oa = new d.Cuboid(h, M, fa, H, I, Ia, Sa, Z, ua, V, ia, u, t, ba, $a, kb, na),
                                        Bb, Cb;
                                    X > ma ? (Bb = [E, Ea], Cb = [L,
                                        Da
                                    ]) : (Bb = [L, Ea], Cb = [E, Da]);
                                    !isNaN(Ea) && !isNaN(Da) && F < n && 0 < F && (Ua = d.line(h, [F, F], Bb, ua, V, Z), ab = d.line(h, [F, F], Cb, ua, V, Z), d.setCN(a, Ua, this.bcn + "line-high"), x.className && d.setCN(a, Ua, x.className, !0), d.setCN(a, ab, this.bcn + "line-low"), x.className && d.setCN(a, ab, x.className, !0))
                                }
                                oa && (xa = oa.set, x.columnGraphics = xa, ca.push(xa), xa.translate(S, O - Z / 2), (x.url || this.showHandOnHover) && xa.setAttr("cursor", "pointer"), Ua && (ca.push(Ua), ca.push(ab)), ya = F, za = E, t ? (ha = E, ga = F, "open" == l && (ga = N), "high" == l && (ga = Oa), "low" ==
                                    l && (ga = Na)) : (ha = E, "open" == l && (ha = L), "high" == l && (ha = Ea), "low" == l && (ha = Da), ga = F), U || (x.x = t ? O + M / 2 : S + M / 2, this.animateColumns(oa, K, F, N, E, L), this.addListeners(xa, x)))
                            }
                            break;
                        case "ohlc":
                            if (!(isNaN(ma) || isNaN(vb) || isNaN(wb) || isNaN(X))) {
                                var Nb = h.set();
                                ca.push(Nb);
                                X < ma && (x.isNegative = !0, void 0 != Ca && (Aa = Ca));
                                var mb, nb, ob;
                                if (t) {
                                    var Db = E - k / 2,
                                        Db = d.fitToBounds(Db, 0, q),
                                        Ob = d.fitToBounds(E, 0, q),
                                        Eb = E + k / 2,
                                        Eb = d.fitToBounds(Eb, 0, q);
                                    nb = d.line(h, [N, N], [Db, Ob], Aa, V, Z, ba);
                                    0 < E && E < q && (mb = d.line(h, [Na, Oa], [E, E], Aa, V, Z, ba));
                                    ob =
                                        d.line(h, [F, F], [Ob, Eb], Aa, V, Z, ba);
                                    ha = E;
                                    ga = F;
                                    "open" == l && (ga = N);
                                    "high" == l && (ga = Oa);
                                    "low" == l && (ga = Na)
                                } else {
                                    var Fb = F - k / 2,
                                        Fb = d.fitToBounds(Fb, 0, n),
                                        Pb = d.fitToBounds(F, 0, n),
                                        Gb = F + k / 2,
                                        Gb = d.fitToBounds(Gb, 0, n);
                                    nb = d.line(h, [Fb, Pb], [L, L], Aa, V, Z, ba);
                                    0 < F && F < n && (mb = d.line(h, [F, F], [Da, Ea], Aa, V, Z, ba));
                                    ob = d.line(h, [Pb, Gb], [E, E], Aa, V, Z, ba);
                                    ha = E;
                                    "open" == l && (ha = L);
                                    "high" == l && (ha = Ea);
                                    "low" == l && (ha = Da);
                                    ga = F
                                }
                                ca.push(nb);
                                ca.push(mb);
                                ca.push(ob);
                                d.setCN(a, nb, this.bcn + "stroke-open");
                                d.setCN(a, ob, this.bcn + "stroke-close");
                                d.setCN(a,
                                    mb, this.bcn + "stroke");
                                x.className && d.setCN(a, Nb, x.className, !0);
                                ya = F;
                                za = E
                            }
                    }
                    if (!U && !isNaN(X)) {
                        var Qb = this.hideBulletsCount;
                        if (this.end - this.start <= Qb || 0 === Qb) {
                            var Rb = this.createBullet(x, ga, ha, K),
                                Sb = this.labelText;
                            if (Sb && Rb) {
                                var Hb = this.createLabel(x, ga, ha, Sb);
                                (Hb = this.positionLabel(ya, za, Hb, Rb, M, fa)) && this.allBullets.push(Hb)
                            }
                            if ("regular" == T || "100%" == T) {
                                var Tb = f.totalText;
                                if (Tb) {
                                    var Va = this.createLabel(x, 0, 0, Tb, f.totalTextColor);
                                    this.allBullets.push(Va);
                                    var Ub = Va.getBBox(),
                                        Vb = Ub.width,
                                        Wb = Ub.height,
                                        bb, cb, pb = f.totalTextOffset,
                                        Xb = f.totals[K];
                                    Xb && Xb.remove();
                                    var db = 0;
                                    "column" != g && (db = this.bulletSize);
                                    t ? (cb = E, bb = 0 > X ? F - Vb / 2 - 2 - db - pb : F + Vb / 2 + 3 + db + pb) : (bb = F, cb = 0 > X ? E + Wb / 2 + db + pb : E - Wb / 2 - 3 - db - pb);
                                    Va.translate(bb, cb);
                                    f.totals[K] = Va;
                                    t ? (0 > cb || cb > q) && Va.remove() : (0 > bb || bb > n) && Va.remove()
                                }
                            }
                        }
                    }
                }
            }
            if ("line" == g || "step" == g || "smoothedLine" == g) "smoothedLine" == g ? this.drawSmoothedGraph(y, v, Q, R) : this.drawLineGraph(y, v, Q, R), U || this.launchAnimation();
            this.bulletsHidden && this.hideBullets();
            this.customBulletsHidden && this.hideCustomBullets()
        },
        animateColumns: function(a, b) {
            var c = this,
                e = c.chart.startDuration;
            0 < e && !c.animationPlayed && (c.seqAn ? (a.set.hide(), c.animationArray.push(a), e = setTimeout(function() { c.animate.call(c) }, e / (c.end - c.start + 1) * (b - c.start) * 1E3), c.timeOuts.push(e)) : c.animate(a))
        },
        createLabel: function(a, b, c, e, h) {
            var f = this.chart,
                g = a.labelColor;
            g || (g = this.color);
            g || (g = f.color);
            h && (g = h);
            h = this.fontSize;
            void 0 === h && (this.fontSize = h = f.fontSize);
            var k = this.labelFunction;
            e = f.formatString(e, a);
            e = d.cleanFromEmpty(e);
            k && (e = k(a, e));
            a = d.text(this.container,
                e, g, f.fontFamily, h);
            a.node.style.pointerEvents = "none";
            a.translate(b, c);
            this.bulletSet.push(a);
            return a
        },
        positiveClip: function(a) { a.clipRect(this.pmx, this.pmy, this.pmw, this.pmh) },
        negativeClip: function(a) { a.clipRect(this.nmx, this.nmy, this.nmw, this.nmh) },
        drawLineGraph: function(a, b, c, e) {
            var h = this;
            if (1 < a.length) {
                var f = h.set,
                    g = h.chart,
                    k = h.container,
                    l = k.set(),
                    m = k.set();
                f.push(m);
                f.push(l);
                var n = h.lineAlpha,
                    q = h.lineThickness,
                    f = h.fillAlphas,
                    p = h.lineColorR,
                    t = h.negativeLineAlpha;
                isNaN(t) && (t = n);
                var r = h.lineColorSwitched;
                r && (p = r);
                var r = h.fillColorsR,
                    u = h.fillColorsSwitched;
                u && (r = u);
                var z = h.dashLength;
                (u = h.dashLengthSwitched) && (z = u);
                var u = h.negativeLineColor,
                    y = h.negativeFillColors,
                    v = h.negativeFillAlphas,
                    w = h.baseCoord;
                0 !== h.negativeBase && (w = h.valueAxis.getCoordinate(h.negativeBase));
                n = d.line(k, a, b, p, n, q, z, !1, !0);
                d.setCN(g, n, h.bcn + "stroke");
                l.push(n);
                l.click(function(a) { h.handleGraphEvent(a, "clickGraph") }).mouseover(function(a) { h.handleGraphEvent(a, "rollOverGraph") }).mouseout(function(a) { h.handleGraphEvent(a, "rollOutGraph") });
                void 0 === u || h.useNegativeColorIfDown || (q = d.line(k, a, b, u, t, q, z, !1, !0), d.setCN(g, q, h.bcn + "stroke"), d.setCN(g, q, h.bcn + "stroke-negative"), m.push(q));
                if (0 < f || 0 < v)
                    if (q = a.join(";").split(";"), t = b.join(";").split(";"), n = g.type, "serial" == n ? 0 < c.length ? (c.reverse(), e.reverse(), q = a.concat(c), t = b.concat(e)) : h.rotate ? (t.push(t[t.length - 1]), q.push(w), t.push(t[0]), q.push(w), t.push(t[0]), q.push(q[0])) : (q.push(q[q.length - 1]), t.push(w), q.push(q[0]), t.push(w), q.push(a[0]), t.push(t[0])) : "xy" == n && (b = h.fillToAxis) && (d.isString(b) &&
                            (b = g.getValueAxisById(b)), "H" == b.orientation ? (w = "top" == b.position ? 0 : b.viH, q.push(q[q.length - 1]), t.push(w), q.push(q[0]), t.push(w), q.push(a[0]), t.push(t[0])) : (w = "left" == b.position ? 0 : b.viW, t.push(t[t.length - 1]), q.push(w), t.push(t[0]), q.push(w), t.push(t[0]), q.push(q[0]))), a = h.gradientRotation, 0 < f && (b = d.polygon(k, q, t, r, f, 1, "#000", 0, a), b.pattern(h.pattern), d.setCN(g, b, h.bcn + "fill"), l.push(b)), y || void 0 !== u) isNaN(v) && (v = f), y || (y = u), k = d.polygon(k, q, t, y, v, 1, "#000", 0, a), d.setCN(g, k, h.bcn + "fill"), d.setCN(g,
                        k, h.bcn + "fill-negative"), k.pattern(h.pattern), m.push(k), m.click(function(a) { h.handleGraphEvent(a, "clickGraph") }).mouseover(function(a) { h.handleGraphEvent(a, "rollOverGraph") }).mouseout(function(a) { h.handleGraphEvent(a, "rollOutGraph") });
                h.applyMask(m, l)
            }
        },
        applyMask: function(a, b) { var c = a.length(); "serial" != this.chart.type || this.scrollbar || (this.positiveClip(b), 0 < c && this.negativeClip(a)) },
        drawSmoothedGraph: function(a, b, c, e) {
            if (1 < a.length) {
                var h = this.set,
                    f = this.chart,
                    g = this.container,
                    k = g.set(),
                    l = g.set();
                h.push(l);
                h.push(k);
                var m = this.lineAlpha,
                    n = this.lineThickness,
                    h = this.dashLength,
                    q = this.fillAlphas,
                    p = this.lineColorR,
                    t = this.fillColorsR,
                    r = this.negativeLineColor,
                    u = this.negativeFillColors,
                    z = this.negativeFillAlphas,
                    y = this.baseCoord,
                    v = this.lineColorSwitched;
                v && (p = v);
                (v = this.fillColorsSwitched) && (t = v);
                v = this.negativeLineAlpha;
                isNaN(v) && (v = m);
                m = new d.Bezier(g, a, b, p, m, n, t, 0, h);
                d.setCN(f, m, this.bcn + "stroke");
                k.push(m.path);
                void 0 !== r && (n = new d.Bezier(g, a, b, r, v, n, t, 0, h), d.setCN(f, n, this.bcn + "stroke"), d.setCN(f,
                    n, this.bcn + "stroke-negative"), l.push(n.path));
                0 < q && (m = a.join(";").split(";"), p = b.join(";").split(";"), n = "", 0 < c.length ? (c.push("M"), e.push("M"), c.reverse(), e.reverse(), m = a.concat(c), p = b.concat(e)) : (this.rotate ? (n += " L" + y + "," + b[b.length - 1], n += " L" + y + "," + b[0]) : (n += " L" + a[a.length - 1] + "," + y, n += " L" + a[0] + "," + y), n += " L" + a[0] + "," + b[0]), c = new d.Bezier(g, m, p, NaN, 0, 0, t, q, h, n), d.setCN(f, c, this.bcn + "fill"), c.path.pattern(this.pattern), k.push(c.path), u || void 0 !== r) && (z || (z = q), u || (u = r), a = new d.Bezier(g, a, b, NaN,
                    0, 0, u, z, h, n), a.path.pattern(this.pattern), d.setCN(f, a, this.bcn + "fill"), d.setCN(f, a, this.bcn + "fill-negative"), l.push(a.path));
                this.applyMask(l, k)
            }
        },
        launchAnimation: function() {
            var a = this,
                b = a.chart.startDuration;
            if (0 < b && !a.animationPlayed) {
                var c = a.set,
                    e = a.bulletSet;
                d.VML || (c.attr({ opacity: a.startAlpha }), e.attr({ opacity: a.startAlpha }));
                c.hide();
                e.hide();
                a.seqAn ? (b = setTimeout(function() { a.animateGraphs.call(a) }, a.index * b * 1E3), a.timeOuts.push(b)) : a.animateGraphs()
            }
        },
        animateGraphs: function() {
            var a = this.chart,
                b = this.set,
                c = this.bulletSet,
                e = this.x,
                d = this.y;
            b.show();
            c.show();
            var f = a.startDuration,
                a = a.startEffect;
            b && (this.rotate ? (b.translate(-1E3, d), c.translate(-1E3, d)) : (b.translate(e, -1E3), c.translate(e, -1E3)), b.animate({ opacity: 1, translate: e + "," + d }, f, a), c.animate({ opacity: 1, translate: e + "," + d }, f, a))
        },
        animate: function(a) {
            var b = this.chart,
                c = this.animationArray;
            !a && 0 < c.length && (a = c[0], c.shift());
            c = d[d.getEffect(b.startEffect)];
            b = b.startDuration;
            a && (this.rotate ? a.animateWidth(b, c) : a.animateHeight(b, c), a.set.show())
        },
        legendKeyColor: function() {
            var a = this.legendColor,
                b = this.lineAlpha;
            void 0 === a && (a = this.lineColorR, 0 === b && (b = this.fillColorsR) && (a = "object" == typeof b ? b[0] : b));
            return a
        },
        legendKeyAlpha: function() {
            var a = this.legendAlpha;
            void 0 === a && (a = this.lineAlpha, this.fillAlphas > a && (a = this.fillAlphas), 0 === a && (a = this.bulletAlpha), 0 === a && (a = 1));
            return a
        },
        createBullet: function(a, b, c) {
            if (!isNaN(b) && !isNaN(c)) {
                var e = this.chart,
                    h = this.container,
                    f = this.bulletOffset,
                    g = this.bulletSize;
                isNaN(a.bulletSize) || (g = a.bulletSize);
                var k = a.values.value,
                    l = this.maxValue,
                    m = this.minValue,
                    n = this.maxBulletSize,
                    q = this.minBulletSize;
                isNaN(l) || (isNaN(k) || (g = (k - m) / (l - m) * (n - q) + q), m == l && (g = n));
                l = g;
                this.bulletAxis && (g = a.values.error, isNaN(g) || (k = g), g = this.bulletAxis.stepWidth * k);
                g < this.minBulletSize && (g = this.minBulletSize);
                this.rotate ? b = a.isNegative ? b - f : b + f : c = a.isNegative ? c + f : c - f;
                var p, q = this.bulletColorR;
                a.lineColor && (this.bulletColorSwitched = a.lineColor);
                this.bulletColorSwitched && (q = this.bulletColorSwitched);
                a.isNegative && void 0 !== this.bulletColorNegative &&
                    (q = this.bulletColorNegative);
                void 0 !== a.color && (q = a.color);
                var t;
                "xy" == e.type && this.valueField && (t = this.pattern, a.pattern && (t = a.pattern));
                f = this.bullet;
                a.bullet && (f = a.bullet);
                var k = this.bulletBorderThickness,
                    m = this.bulletBorderColorR,
                    n = this.bulletBorderAlpha,
                    r = this.bulletAlpha;
                m || (m = q);
                this.useLineColorForBulletBorder && (m = this.lineColorR);
                var u = a.alpha;
                isNaN(u) || (r = u);
                if ("none" != this.bullet || a.bullet) p = d.bullet(h, f, g, q, r, k, m, n, l, 0, t);
                if (this.customBullet || a.customBullet) t = this.customBullet, a.customBullet &&
                    (t = a.customBullet), t && (p && p.remove(), "function" == typeof t ? (p = new t, p.chart = e, a.bulletConfig && (p.availableSpace = c, p.graph = this, p.graphDataItem = a, p.bulletY = c, a.bulletConfig.minCoord = this.minCoord - c, p.bulletConfig = a.bulletConfig), p.write(h), p = p.set) : (e.path && (t = e.path + t), p = h.set(), h = h.image(t, 0, 0, g, g), p.push(h), this.centerCustomBullets && h.translate(-g / 2, -g / 2)));
                if (p) {
                    (a.url || this.showHandOnHover) && p.setAttr("cursor", "pointer");
                    if ("serial" == e.type || "gantt" == e.type)
                        if (-.5 > b - 0 || b - 0 > this.width || c < -g / 2 ||
                            c - 0 > this.height) p.remove(), p = null;
                    p && (this.bulletSet.push(p), p.translate(b, c), this.addListeners(p, a), this.allBullets.push(p));
                    a.bx = b;
                    a.by = c;
                    d.setCN(e, p, this.bcn + "bullet");
                    a.className && d.setCN(e, p, a.className, !0)
                }
                p ? (p.size = g || 0, a.bulletGraphics = p) : p = { size: 0 };
                p.graphDataItem = a;
                return p
            }
        },
        showBullets: function() {
            var a = this.allBullets,
                b;
            this.bulletsHidden = !1;
            for (b = 0; b < a.length; b++) a[b].show()
        },
        hideBullets: function() {
            var a = this.allBullets,
                b;
            this.bulletsHidden = !0;
            for (b = 0; b < a.length; b++) a[b].hide()
        },
        showCustomBullets: function() {
            var a =
                this.allBullets,
                b;
            this.customBulletsHidden = !1;
            for (b = 0; b < a.length; b++) a[b].graphDataItem.customBullet && a[b].show()
        },
        hideCustomBullets: function() {
            var a = this.allBullets,
                b;
            this.customBulletsHidden = !0;
            for (b = 0; b < a.length; b++) a[b].graphDataItem.customBullet && a[b].hide()
        },
        addListeners: function(a, b) {
            var c = this;
            a.mouseover(function(a) { c.handleRollOver(b, a) }).mouseout(function(a) { c.handleRollOut(b, a) }).touchend(function(a) {
                c.handleRollOver(b, a);
                c.chart.panEventsEnabled && c.handleClick(b, a)
            }).touchstart(function(a) {
                c.handleRollOver(b,
                    a)
            }).click(function(a) { c.handleClick(b, a) }).dblclick(function(a) { c.handleDoubleClick(b, a) }).contextmenu(function(a) { c.handleRightClick(b, a) })
        },
        handleRollOver: function(a, b) {
            if (a) {
                var c = this.chart,
                    e = { type: "rollOverGraphItem", item: a, index: a.index, graph: this, target: this, chart: this.chart, event: b };
                this.fire("rollOverGraphItem", e);
                c.fire("rollOverGraphItem", e);
                clearTimeout(c.hoverInt);
                e = this.showBalloon;
                !c.chartCursor || "serial" != c.type && "gantt" != c.type || (e = !1, !c.chartCursor.valueBalloonsEnabled && this.showBalloon &&
                    (e = !0));
                if (e) {
                    var e = c.formatString(this.balloonText, a, !0),
                        h = this.balloonFunction;
                    h && (e = h(a, a.graph));
                    e = d.cleanFromEmpty(e);
                    h = c.getBalloonColor(this, a);
                    c.balloon.showBullet = !1;
                    c.balloon.pointerOrientation = "V";
                    var f = a.x,
                        g = a.y;
                    c.rotate && (f = a.y, g = a.x);
                    "" !== e ? c.showBalloon(e, h, !0, f + c.marginLeftReal, g + c.marginTopReal) : this.chart.hideBalloonReal()
                } else this.chart.hideBalloonReal()
            }
            this.handleGraphEvent(b, "rollOverGraph")
        },
        handleRollOut: function(a, b) {
            this.chart.hideBalloon();
            if (a) {
                var c = {
                    type: "rollOutGraphItem",
                    item: a,
                    index: a.index,
                    graph: this,
                    target: this,
                    chart: this.chart,
                    event: b
                };
                this.fire("rollOutGraphItem", c);
                this.chart.fire("rollOutGraphItem", c)
            }
            this.handleGraphEvent(b, "rollOutGraph")
        },
        handleClick: function(a, b) {
            if (a) {
                var c = { type: "clickGraphItem", item: a, index: a.index, graph: this, target: this, chart: this.chart, event: b };
                this.fire("clickGraphItem", c);
                this.chart.fire("clickGraphItem", c);
                d.getURL(a.url, this.urlTarget)
            }
            this.handleGraphEvent(b, "clickGraph")
        },
        handleGraphEvent: function(a, b) {
            var c = {
                type: b,
                graph: this,
                target: this,
                chart: this.chart,
                event: a
            };
            this.fire(b, c);
            this.chart.fire(b, c)
        },
        handleRightClick: function(a, b) {
            if (a) {
                var c = { type: "rightClickGraphItem", item: a, index: a.index, graph: this, target: this, chart: this.chart, event: b };
                this.fire("rightClickGraphItem", c);
                this.chart.fire("rightClickGraphItem", c)
            }
        },
        handleDoubleClick: function(a, b) {
            if (a) {
                var c = { type: "doubleClickGraphItem", item: a, index: a.index, graph: this, target: this, chart: this.chart, event: b };
                this.fire("doubleClickGraphItem", c);
                this.chart.fire("doubleClickGraphItem",
                    c)
            }
        },
        zoom: function(a, b) {
            this.start = a;
            this.end = b;
            this.draw()
        },
        changeOpacity: function(a) {
            var b = this.set;
            b && b.setAttr("opacity", a);
            if (b = this.ownColumns) {
                var c;
                for (c = 0; c < b.length; c++) {
                    var e = b[c].set;
                    e && e.setAttr("opacity", a)
                }
            }(b = this.bulletSet) && b.setAttr("opacity", a)
        },
        destroy: function() {
            d.remove(this.set);
            d.remove(this.bulletSet);
            var a = this.timeOuts;
            if (a) { var b; for (b = 0; b < a.length; b++) clearTimeout(a[b]) }
            this.timeOuts = []
        }
    })
})();
(function() {
    var d = window.AmCharts;
    d.ChartCursor = d.Class({
        construct: function(a) {
            this.cname = "ChartCursor";
            this.createEvents("changed", "zoomed", "onHideCursor", "draw", "selected", "moved");
            this.enabled = !0;
            this.cursorAlpha = 1;
            this.selectionAlpha = .2;
            this.cursorColor = "#CC0000";
            this.categoryBalloonAlpha = 1;
            this.color = "#FFFFFF";
            this.type = "cursor";
            this.zoomed = !1;
            this.zoomable = !0;
            this.pan = !1;
            this.categoryBalloonDateFormat = "MMM DD, YYYY";
            this.categoryBalloonEnabled = this.valueBalloonsEnabled = !0;
            this.rolledOver = !1;
            this.cursorPosition = "middle";
            this.bulletsEnabled = this.skipZoomDispatch = !1;
            this.bulletSize = 8;
            this.selectWithoutZooming = this.oneBalloonOnly = !1;
            this.graphBulletSize = 1.7;
            this.animationDuration = .3;
            this.zooming = !1;
            this.adjustment = 0;
            this.avoidBalloonOverlapping = !0;
            this.leaveCursor = !1;
            d.applyTheme(this, a, this.cname)
        },
        draw: function() {
            this.destroy();
            var a = this.chart,
                b = a.container;
            this.rotate = a.rotate;
            this.container = b;
            b = b.set();
            b.translate(this.x, this.y);
            this.set = b;
            a.cursorSet.push(b);
            b = new d.AmBalloon;
            b.className =
                "category";
            b.chart = a;
            this.categoryBalloon = b;
            d.copyProperties(a.balloon, b);
            b.cornerRadius = 0;
            b.shadowAlpha = 0;
            b.borderThickness = 1;
            b.borderAlpha = 1;
            b.showBullet = !1;
            var c = this.categoryBalloonColor;
            void 0 === c && (c = this.cursorColor);
            b.fillColor = c;
            b.balloonColor = c;
            b.fillAlpha = this.categoryBalloonAlpha;
            b.borderColor = c;
            b.color = this.color;
            c = this.valueLineAxis;
            d.isString(c) && (c = a.getValueAxisById(c));
            c || (c = a.valueAxes[0]);
            this.valueLineAxis = c;
            this.valueLineBalloonEnabled && (this.vaBalloon = c = new d.AmBalloon, d.copyProperties(b,
                c), c.animationDuration = 0, this.rotate || (c.pointerOrientation = "H"));
            this.rotate && (b.pointerOrientation = "H");
            this.extraWidth = 0;
            this.prevX = [];
            this.prevY = [];
            this.prevTX = [];
            this.prevTY = [];
            if (this.valueBalloonsEnabled)
                for (b = 0; b < a.graphs.length; b++) c = new d.AmBalloon, c.className = a.graphs[b].id, c.chart = a, d.copyProperties(a.balloon, c), a.graphs[b].valueBalloon = c;
            "cursor" == this.type ? this.createCursor() : this.createCrosshair()
        },
        updateData: function() {
            var a = this.chart;
            this.data = a.chartData;
            this.firstTime = a.firstTime;
            this.lastTime = a.lastTime
        },
        createCursor: function() {
            var a = this.chart,
                b = this.cursorAlpha,
                c = a.categoryAxis,
                e = this.categoryBalloon,
                h, f, g, k;
            g = a.dx;
            k = a.dy;
            var l = this.width,
                m = this.height,
                n = a.rotate;
            e.pointerWidth = c.tickLength;
            n ? (h = [0, l, l + g], f = [0, 0, k], g = [g, 0, 0], k = [k, 0, m]) : (h = [g, 0, 0], f = [k, 0, m], g = [0, l, l + g], k = [0, 0, k]);
            h = d.line(this.container, h, f, this.cursorColor, b, 1);
            d.setCN(a, h, "cursor-line");
            this.line = h;
            (f = this.fullRectSet) ? (f.push(h), f.translate(this.x, this.y)) : this.set.push(h);
            this.valueLineEnabled && (h = this.valueLineAlpha,
                isNaN(h) || (b = h), b = d.line(this.container, g, k, this.cursorColor, b, 1), d.setCN(a, b, "cursor-value-line"), this.vLine = b, this.set.push(b));
            this.setBalloonBounds(e, c, n);
            (a = this.vaBalloon) && this.setBalloonBounds(a, this.valueLineAxis, !n);
            this.hideCursor()
        },
        createCrosshair: function() {
            var a = this.cursorAlpha,
                b = this.container,
                c = d.line(b, [0, 0], [0, this.height], this.cursorColor, a, 1),
                a = d.line(b, [0, this.width], [0, 0], this.cursorColor, a, 1);
            d.setCN(this.chart, c, "cursor-line");
            d.setCN(this.chart, a, "cursor-line");
            this.set.push(c);
            this.set.push(a);
            this.vLine = c;
            this.hLine = a;
            this.hideCursor()
        },
        update: function() {
            var a = this.chart;
            if (a.mouseIsOver) {
                var b = a.mouseX - this.x,
                    c = a.mouseY - this.y; - .5 < b && b < this.width + 1 && 0 < c && c < this.height ? (this.drawing ? this.rolledOver || a.setMouseCursor("crosshair") : this.pan && (this.rolledOver || a.setMouseCursor("move")), this.rolledOver = !0, (this.valueLineEnabled || this.valueLineBalloonEnabled) && this.updateVLine(b, c), this.setPosition()) : this.rolledOver && (this.handleMouseOut(), this.rolledOver = !1)
            } else this.rolledOver &&
                (this.handleMouseOut(), this.rolledOver = !1)
        },
        updateVLine: function(a, b) {
            var c = this.vLine,
                e = this.vaBalloon;
            if ((c || e) && !this.panning && !this.drawing) {
                c && c.show();
                var d = this.valueLineAxis,
                    f, g = this.rotate;
                g ? (c && c.translate(a, 0), d && (f = d.coordinateToValue(a)), c = a) : (c && c.translate(0, b), d && (f = d.coordinateToValue(b)), c = b - 1);
                if (e && !isNaN(f) && this.prevLineValue != f) {
                    var k = d.formatValue(f, !0);
                    this.setBalloonPosition(e, d, c, !g);
                    e.showBalloon(k)
                }
                this.prevLineValue = f
            }
        },
        getMousePosition: function() {
            var a, b = this.width,
                c = this.height;
            a = this.chart;
            this.rotate ? (a = a.mouseY - this.y, 0 > a && (a = 0), a > c && (a = c)) : (a = a.mouseX - this.x - 1, 0 > a && (a = 0), a > b && (a = b));
            return a
        },
        updateCrosshair: function() {
            var a = this.chart,
                b = a.mouseX - this.x,
                c = a.mouseY - this.y,
                e = this.vLine,
                h = this.hLine,
                b = d.fitToBounds(b, 0, this.width),
                c = d.fitToBounds(c, 0, this.height);
            0 < this.cursorAlpha && (e.show(), h.show(), e.translate(b, 0), h.translate(0, c));
            this.zooming && (a.hideXScrollbar && (b = NaN), a.hideYScrollbar && (c = NaN), this.updateSelectionSize(b, c));
            this.fireMoved();
            a.mouseIsOver ||
                this.zooming || this.hideCursor()
        },
        fireMoved: function() {
            var a = this.chart,
                b = { type: "moved", target: this };
            b.chart = a;
            b.zooming = this.zooming;
            b.x = a.mouseX - this.x;
            b.y = a.mouseY - this.y;
            this.fire("moved", b)
        },
        updateSelectionSize: function(a, b) {
            d.remove(this.selection);
            var c = this.selectionPosX,
                e = this.selectionPosY,
                h = 0,
                f = 0,
                g = this.width,
                k = this.height;
            isNaN(a) || (c > a && (h = a, g = c - a), c < a && (h = c, g = a - c), c == a && (h = a, g = 0), g += this.extraWidth, h -= this.extraWidth / 2);
            isNaN(b) || (e > b && (f = b, k = e - b), e < b && (f = e, k = b - e), e == b && (f = b, k = 0), k +=
                this.extraWidth, f -= this.extraWidth / 2);
            0 < g && 0 < k && (c = d.rect(this.container, g, k, this.cursorColor, this.selectionAlpha), d.setCN(this.chart, c, "cursor-selection"), c.translate(h + this.x, f + this.y), this.selection = c)
        },
        arrangeBalloons: function() {
            var a = this.valueBalloons,
                b = this.x,
                c = this.y,
                e = this.height + c;
            a.sort(this.compareY);
            var d;
            for (d = 0; d < a.length; d++) {
                var f = a[d].balloon;
                f.setBounds(b, c, b + this.width, e);
                f.prevX = this.prevX[d];
                f.prevY = this.prevY[d];
                f.prevTX = this.prevTX[d];
                f.prevTY = this.prevTY[d];
                f.draw();
                e = f.yPos -
                    3
            }
            this.arrangeBalloons2()
        },
        compareY: function(a, b) { return a.yy < b.yy ? 1 : -1 },
        arrangeBalloons2: function() {
            var a = this.valueBalloons;
            a.reverse();
            var b, c = this.x,
                e, d, f = a.length;
            for (d = 0; d < f; d++) {
                var g = a[d].balloon;
                b = g.bottom;
                var k = g.bottom - g.yPos,
                    l = f - d - 1;
                0 < d && b - k < e + 3 && (g.setBounds(c, e + 3, c + this.width, e + k + 3), g.prevX = this.prevX[l], g.prevY = this.prevY[l], g.prevTX = this.prevTX[l], g.prevTY = this.prevTY[l], g.draw());
                g.set && g.set.show();
                this.prevX[l] = g.prevX;
                this.prevY[l] = g.prevY;
                this.prevTX[l] = g.prevTX;
                this.prevTY[l] =
                    g.prevTY;
                e = g.bottom
            }
        },
        showBullets: function() {
            d.remove(this.allBullets);
            var a = this.container,
                b = a.set();
            this.set.push(b);
            this.set.show();
            this.allBullets = b;
            var b = this.chart.graphs,
                c;
            for (c = 0; c < b.length; c++) {
                var e = b[c];
                if (!e.hidden && e.balloonText) {
                    var h = this.data[this.index].axes[e.valueAxis.id].graphs[e.id],
                        f = h.y;
                    if (!isNaN(f)) {
                        var g, k;
                        g = h.x;
                        this.rotate ? (k = f, f = g) : k = g;
                        e = d.circle(a, this.bulletSize / 2, this.chart.getBalloonColor(e, h, !0), e.cursorBulletAlpha);
                        e.translate(k, f);
                        this.allBullets.push(e)
                    }
                }
            }
        },
        destroy: function() {
            this.clear();
            d.remove(this.selection);
            this.selection = null;
            var a = this.categoryBalloon;
            a && a.destroy();
            (a = this.vaBalloon) && a.destroy();
            this.destroyValueBalloons();
            d.remove(this.set)
        },
        clear: function() {},
        destroyValueBalloons: function() { var a = this.valueBalloons; if (a) { var b; for (b = 0; b < a.length; b++) a[b].balloon.hide() } },
        zoom: function(a, b, c, e) {
            var h = this.chart;
            this.destroyValueBalloons();
            this.zooming = !1;
            var f;
            this.rotate ? this.selectionPosY = f = h.mouseY : this.selectionPosX = f = h.mouseX;
            this.start = a;
            this.end = b;
            this.startTime =
                c;
            this.endTime = e;
            this.zoomed = !0;
            e = h.categoryAxis;
            f = this.rotate;
            b = this.width;
            c = this.height;
            a = e.stepWidth;
            if (this.fullWidth) {
                var g = 1;
                e.parseDates && !e.equalSpacing && (g = e.minDuration());
                f ? this.extraWidth = c = a * g : (this.extraWidth = b = a * g, this.categoryBalloon.minWidth = b);
                this.line && this.line.remove();
                this.line = d.rect(this.container, b, c, this.cursorColor, this.cursorAlpha, 0);
                d.setCN(h, this.line, "cursor-fill");
                this.fullRectSet && this.fullRectSet.push(this.line)
            }
            this.stepWidth = a;
            this.tempVal = this.valueBalloonsEnabled;
            this.valueBalloonsEnabled = !1;
            this.setPosition();
            this.valueBalloonsEnabled = this.tempVal;
            this.hideCursor()
        },
        hideObj: function(a) { a && a.hide() },
        hideCursor: function(a) {
            void 0 === a && (a = !0);
            this.leaveCursor || (this.hideObj(this.set), this.hideObj(this.categoryBalloon), this.hideObj(this.line), this.hideObj(this.vLine), this.hideObj(this.hLine), this.hideObj(this.vaBalloon), this.hideObj(this.allBullets), this.destroyValueBalloons(), this.selectWithoutZooming || d.remove(this.selection), this.previousIndex = NaN, a && this.fire("onHideCursor", { type: "onHideCursor", chart: this.chart, target: this }), this.drawing || this.chart.setMouseCursor("auto"), this.normalizeBulletSize())
        },
        setPosition: function(a, b, c) {
            void 0 === b && (b = !0);
            if ("cursor" == this.type) {
                if (this.tempPosition = NaN, d.ifArray(this.data)) isNaN(a) && (a = this.getMousePosition()), (a != this.previousMousePosition || !0 === this.zoomed || this.oneBalloonOnly) && !isNaN(a) && ("mouse" == this.cursorPosition && (this.tempPosition = a), isNaN(c) && (c = this.chart.categoryAxis.xToIndex(a)), c != this.previousIndex || this.zoomed ||
                    "mouse" == this.cursorPosition || this.oneBalloonOnly) && (this.updateCursor(c, b), this.zoomed = !1), this.previousMousePosition = a
            } else this.updateCrosshair()
        },
        normalizeBulletSize: function() {
            var a = this.resizedBullets;
            if (a)
                for (var b = 0; b < a.length; b++) {
                    var c = a[b],
                        e = c.bulletGraphics;
                    e && (e.translate(c.bx, c.by, 1), c = c.graph, isNaN(this.graphBulletAlpha) || (e.setAttr("fill-opacity", c.bulletAlpha), e.setAttr("stroke-opacity", c.bulletBorderAlpha)))
                }
        },
        updateCursor: function(a, b) {
            var c = this.chart,
                e = this.fullWidth,
                h = c.mouseX -
                this.x,
                f = c.mouseY - this.y;
            this.drawingNow && (d.remove(this.drawingLine), this.drawingLine = d.line(this.container, [this.x + this.drawStartX, this.x + h], [this.y + this.drawStartY, this.y + f], this.cursorColor, 1, 1));
            if (this.enabled) {
                void 0 === b && (b = !0);
                this.index = a += this.adjustment;
                var g = c.categoryAxis,
                    k = c.dx,
                    l = c.dy,
                    m = this.x + 1,
                    n = this.y + 1,
                    q = this.width,
                    p = this.height,
                    t = this.data[a];
                this.fireMoved();
                if (t) {
                    var r = t.x[g.id],
                        u = c.rotate,
                        z = this.stepWidth,
                        y = this.categoryBalloon,
                        v = this.firstTime,
                        w = this.lastTime,
                        A = this.cursorPosition,
                        B = this.zooming,
                        D = this.panning,
                        C = c.graphs;
                    if (c.mouseIsOver || B || D || this.forceShow)
                        if (this.forceShow = !1, D) {
                            var k = this.panClickPos,
                                c = this.panClickEndTime,
                                B = this.panClickStartTime,
                                J = this.panClickEnd,
                                m = this.panClickStart,
                                h = (u ? k - f : k - h) / z;
                            if (!g.parseDates || g.equalSpacing) h = Math.round(h);
                            0 !== h && (k = { type: "zoomed", target: this }, k.chart = this.chart, g.parseDates && !g.equalSpacing ? (c + h > w && (h = w - c), B + h < v && (h = v - B), k.start = Math.round(B + h), k.end = Math.round(c + h), this.fire(k.type, k)) : J + h >= this.data.length || 0 > m + h || (k.start =
                                m + h, k.end = J + h, this.fire(k.type, k)))
                        } else {
                            "start" == A ? r -= g.cellWidth / 2 : "mouse" == A && (c.mouseIsOver ? r = u ? f - 2 : h - 2 : isNaN(this.tempPosition) || (r = this.tempPosition - 2));
                            if (u) {
                                if (0 > r)
                                    if (B) r = 0;
                                    else { this.hideCursor(); return }
                                if (r > p + 1)
                                    if (B) r = p + 1;
                                    else { this.hideCursor(); return }
                            } else {
                                if (0 > r)
                                    if (B) r = 0;
                                    else { this.hideCursor(); return }
                                if (r > q)
                                    if (B) r = q;
                                    else { this.hideCursor(); return }
                            }
                            v = this.line;
                            0 < this.cursorAlpha && (u ? (w = 0, z = r + l, e && (z -= g.cellWidth / 2)) : (w = r, z = 0, e && (w -= g.cellWidth / 2)), A = this.animationDuration, 0 < A && !this.zooming ?
                                isNaN(this.previousX) ? v.translate(w, z) : (v.translate(this.previousX, this.previousY), v.animate({ translate: w + "," + z }, A, "easeOutSine")) : v.translate(w, z), this.previousX = w, this.previousY = z, v.show());
                            this.linePos = u ? r + l : r;
                            B && (e && v.hide(), u ? this.updateSelectionSize(NaN, r) : this.updateSelectionSize(r, NaN));
                            z = !0;
                            B && (z = !1);
                            this.categoryBalloonEnabled && z ? (this.setBalloonPosition(y, g, r, u), (v = this.categoryBalloonFunction) ? y.showBalloon(v(t.category)) : g.parseDates ? (g = d.formatDate(t.category, this.categoryBalloonDateFormat,
                                c), -1 != g.indexOf("fff") && (g = d.formatMilliseconds(g, t.category)), y.showBalloon(g)) : y.showBalloon(d.fixNewLines(t.category))) : y.hide();
                            C && this.bulletsEnabled && this.showBullets();
                            if (this.oneBalloonOnly) {
                                r = Infinity;
                                for (g = 0; g < C.length; g++) y = C[g], y.showBalloon && !y.hidden && y.balloonText && (v = t.axes[y.valueAxis.id].graphs[y.id], w = v.y, isNaN(w) || (u ? Math.abs(h - w) < r && (r = Math.abs(h - w), J = y) : Math.abs(f - w) < r && (r = Math.abs(f - w), J = y)));
                                this.mostCloseGraph && (J = this.mostCloseGraph)
                            }
                            if (a != this.previousIndex || J != this.previousMostCloseGraph)
                                if (this.normalizeBulletSize(),
                                    this.destroyValueBalloons(), this.resizedBullets = [], C && this.valueBalloonsEnabled && z && c.balloon.enabled) {
                                    this.valueBalloons = r = [];
                                    for (g = 0; g < C.length; g++)
                                        if (y = C[g], w = NaN, (!this.oneBalloonOnly || y == J) && y.showBalloon && !y.hidden && y.balloonText && ("step" == y.type && "left" == y.stepDirection && (t = this.data[a + 1]), t)) {
                                            if (v = t.axes[y.valueAxis.id].graphs[y.id]) w = v.y;
                                            if (this.showNextAvailable && isNaN(w) && a + 1 < this.data.length)
                                                for (z = a + 1; z < this.data.length; z++)
                                                    if (e = this.data[z])
                                                        if (v = e.axes[y.valueAxis.id].graphs[y.id], w =
                                                            v.y, !isNaN(w)) break;
                                            if (!isNaN(w)) {
                                                e = v.x;
                                                l = !0;
                                                if (u) { if (z = w, 0 > e || e > p) l = !1 } else if (z = e, e = w, 0 > z || z > q + k + 1) l = !1;
                                                l && (l = this.graphBulletSize, A = this.graphBulletAlpha, 1 == l && isNaN(A) || !d.isModern || !(D = v.bulletGraphics) || (D.translate(v.bx, v.by, l), this.resizedBullets.push(v), isNaN(A) || (D.setAttr("fill-opacity", A), D.setAttr("stroke-opacity", A))), l = y.valueBalloon, A = c.getBalloonColor(y, v), l.setBounds(m, n, m + q, n + p), l.pointerOrientation = "H", D = this.balloonPointerOrientation, "vertical" == D && (l.pointerOrientation = "V"),
                                                    "horizontal" == D && (l.pointerOrientation = "H"), l.changeColor(A), void 0 !== y.balloonAlpha && (l.fillAlpha = y.balloonAlpha), void 0 !== y.balloonTextColor && (l.color = y.balloonTextColor), l.setPosition(z + m, e + n), z = c.formatString(y.balloonText, v, !0), (e = y.balloonFunction) && (z = e(v, y).toString()), "" !== z && (u ? l.showBalloon(z) : (l.text = z, l.show = !0), r.push({ yy: w, balloon: l })), !u && l.set && (l.set.hide(), y = l.textDiv) && (y.style.visibility = "hidden"))
                                            }
                                        }
                                    this.avoidBalloonOverlapping && this.arrangeBalloons()
                                }
                            b ? (k = { type: "changed" }, k.index =
                                a, k.chart = this.chart, k.zooming = B, k.mostCloseGraph = J, k.position = u ? f : h, k.target = this, c.fire("changed", k), this.fire("changed", k), this.skipZoomDispatch = !1) : (this.skipZoomDispatch = !0, c.updateLegendValues(a));
                            this.previousIndex = a;
                            this.previousMostCloseGraph = J
                        }
                }
            } else this.hideCursor()
        },
        setBalloonPosition: function(a, b, c, e) {
            var d = b.position,
                f = b.inside;
            b = b.axisThickness;
            var g = this.chart,
                k = g.dx,
                g = g.dy,
                l = this.x,
                m = this.y,
                n = this.width,
                q = this.height;
            e ? (f && ("right" == d ? a.setBounds(l, m + g, l + n + k, m + c + g) : a.setBounds(l,
                m + g, l + n + k, m + c)), "right" == d ? f ? a.setPosition(l + n + k, m + c + g) : a.setPosition(l + n + k + b, m + c + g) : f ? a.setPosition(l, m + c) : a.setPosition(l - b, m + c)) : "top" == d ? f ? a.setPosition(l + c + k, m + g) : a.setPosition(l + c + k, m + g - b + 1) : f ? a.setPosition(l + c, m + q) : a.setPosition(l + c, m + q + b - 1)
        },
        setBalloonBounds: function(a, b, c) {
            var e = b.position,
                d = b.inside,
                f = b.axisThickness,
                g = b.tickLength,
                k = this.chart,
                l = k.dx,
                k = k.dy,
                m = this.x,
                n = this.y,
                q = this.width,
                p = this.height;
            c ? (d && (a.pointerWidth = 0), "right" == e ? d ? a.setBounds(m, n + k, m + q + l, n + p + k) : a.setBounds(m + q +
                l + f, n + k, m + q + 1E3, n + p + k) : d ? a.setBounds(m, n, q + m, p + n) : a.setBounds(-1E3, -1E3, m - g - f, n + p + 15)) : (a.maxWidth = q, b.parseDates && (g = 0, a.pointerWidth = 0), "top" == e ? d ? a.setBounds(m + l, n + k, q + l + m, p + n) : a.setBounds(m + l, -1E3, q + l + m, n + k - g - f) : d ? a.setBounds(m, n, q + m, p + n - g) : a.setBounds(m, n + p + g + f - 1, m + q, n + p + g + f))
        },
        enableDrawing: function(a) {
            this.enabled = !a;
            this.hideCursor();
            this.rolledOver = !1;
            this.drawing = a
        },
        isZooming: function(a) {
            a && a != this.zooming && this.handleMouseDown("fake");
            a || a == this.zooming || this.handleMouseUp()
        },
        handleMouseOut: function() {
            if (this.enabled)
                if (this.zooming) this.setPosition();
                else {
                    this.index = void 0;
                    var a = { type: "changed", index: void 0, target: this };
                    a.chart = this.chart;
                    this.fire("changed", a);
                    this.hideCursor()
                }
        },
        handleReleaseOutside: function() { this.handleMouseUp() },
        handleMouseUp: function() {
            var a = this.chart,
                b = this.data,
                c;
            if (a) {
                var e = a.mouseX - this.x,
                    h = a.mouseY - this.y;
                if (this.drawingNow) {
                    this.drawingNow = !1;
                    d.remove(this.drawingLine);
                    c = this.drawStartX;
                    var f = this.drawStartY;
                    if (2 < Math.abs(c - e) || 2 < Math.abs(f - h)) c = { type: "draw", target: this, chart: a, initialX: c, initialY: f, finalX: e, finalY: h },
                        this.fire(c.type, c)
                }
                if (this.enabled && 0 < b.length) {
                    if (this.pan) this.rolledOver = !1;
                    else if (this.zoomable && this.zooming) {
                        c = this.selectWithoutZooming ? { type: "selected" } : { type: "zoomed" };
                        c.target = this;
                        c.chart = a;
                        if ("cursor" == this.type) this.rotate ? this.selectionPosY = h : this.selectionPosX = h = e, 4 > Math.abs(h - this.initialMouse) && this.fromIndex == this.index || (this.index < this.fromIndex ? (c.end = this.fromIndex, c.start = this.index) : (c.end = this.index, c.start = this.fromIndex), h = a.categoryAxis, h.parseDates && !h.equalSpacing &&
                            (b[c.start] && (c.start = b[c.start].time), b[c.end] && (c.end = a.getEndTime(b[c.end].time))), this.skipZoomDispatch || this.fire(c.type, c));
                        else {
                            var g = this.initialMouseX,
                                k = this.initialMouseY;
                            3 > Math.abs(e - g) && 3 > Math.abs(h - k) || (b = Math.min(g, e), f = Math.min(k, h), e = Math.abs(g - e), h = Math.abs(k - h), a.hideXScrollbar && (b = 0, e = this.width), a.hideYScrollbar && (f = 0, h = this.height), c.selectionHeight = h, c.selectionWidth = e, c.selectionY = f, c.selectionX = b, this.skipZoomDispatch || this.fire(c.type, c))
                        }
                        this.selectWithoutZooming || d.remove(this.selection)
                    }
                    this.skipZoomDispatch = !1
                }
            }
            this.panning = this.zooming = !1
        },
        showCursorAt: function(a) {
            var b = this.chart.categoryAxis;
            a = b.parseDates ? b.dateToCoordinate(a) : b.categoryToCoordinate(a);
            this.previousMousePosition = NaN;
            this.forceShow = !0;
            this.setPosition(a, !1)
        },
        clearSelection: function() { d.remove(this.selection) },
        handleMouseDown: function(a) {
            if (this.zoomable || this.pan || this.drawing) {
                var b = this.rotate,
                    c = this.chart,
                    e = c.mouseX - this.x,
                    h = c.mouseY - this.y;
                if (0 < e && e < this.width && 0 < h && h < this.height || "fake" == a) this.setPosition(), this.selectWithoutZooming &&
                    d.remove(this.selection), this.drawing ? (this.drawStartY = h, this.drawStartX = e, this.drawingNow = !0) : this.pan ? (this.zoomable = !1, c.setMouseCursor("move"), this.panning = !0, this.panClickPos = b ? h : e, this.panClickStart = this.start, this.panClickEnd = this.end, this.panClickStartTime = this.startTime, this.panClickEndTime = this.endTime) : this.zoomable && ("cursor" == this.type ? (this.fromIndex = this.index, b ? (this.initialMouse = h, this.selectionPosY = this.linePos) : (this.initialMouse = e, this.selectionPosX = this.linePos)) : (this.initialMouseX =
                        e, this.initialMouseY = h, this.selectionPosX = e, this.selectionPosY = h), this.zooming = !0)
            }
        }
    })
})();
(function() {
    var d = window.AmCharts;
    d.SimpleChartScrollbar = d.Class({
        construct: function(a) {
            this.createEvents("zoomed");
            this.backgroundColor = "#D4D4D4";
            this.backgroundAlpha = 1;
            this.selectedBackgroundColor = "#EFEFEF";
            this.scrollDuration = this.selectedBackgroundAlpha = 1;
            this.resizeEnabled = !0;
            this.hideResizeGrips = !1;
            this.scrollbarHeight = 20;
            this.updateOnReleaseOnly = !1;
            9 > document.documentMode && (this.updateOnReleaseOnly = !0);
            this.dragIconHeight = this.dragIconWidth = 35;
            this.dragIcon = "dragIconRoundBig";
            d.applyTheme(this,
                a, "SimpleChartScrollbar")
        },
        draw: function() {
            var a = this;
            a.destroy();
            if (a.enabled) {
                var b = a.chart.container,
                    c = a.rotate,
                    e = a.chart,
                    h = b.set();
                a.set = h;
                e.scrollbarsSet.push(h);
                var f, g;
                c ? (f = a.scrollbarHeight, g = e.plotAreaHeight) : (g = a.scrollbarHeight, f = e.plotAreaWidth);
                a.width = f;
                if ((a.height = g) && f) {
                    var k = d.rect(b, f, g, a.backgroundColor, a.backgroundAlpha, 1, a.backgroundColor, a.backgroundAlpha);
                    d.setCN(e, k, "scrollbar-bg");
                    a.bg = k;
                    h.push(k);
                    k = d.rect(b, f, g, "#000", .005);
                    h.push(k);
                    a.invisibleBg = k;
                    k.click(function() { a.handleBgClick() }).mouseover(function() { a.handleMouseOver() }).mouseout(function() { a.handleMouseOut() }).touchend(function() { a.handleBgClick() });
                    k = d.rect(b, f, g, a.selectedBackgroundColor, a.selectedBackgroundAlpha);
                    d.setCN(e, k, "scrollbar-bg-selected");
                    a.selectedBG = k;
                    h.push(k);
                    f = d.rect(b, f, g, "#000", .005);
                    a.dragger = f;
                    h.push(f);
                    f.mousedown(function(b) { a.handleDragStart(b) }).mouseup(function() { a.handleDragStop() }).mouseover(function() { a.handleDraggerOver() }).mouseout(function() { a.handleMouseOut() }).touchstart(function(b) { a.handleDragStart(b) }).touchend(function() { a.handleDragStop() });
                    f = e.pathToImages;
                    c ? (k = f + a.dragIcon + "H.png", f = a.dragIconWidth,
                        c = a.dragIconHeight) : (k = f + a.dragIcon + ".png", c = a.dragIconWidth, f = a.dragIconHeight);
                    g = b.image(k, 0, 0, c, f);
                    d.setCN(e, g, "scrollbar-grip-left");
                    k = b.image(k, 0, 0, c, f);
                    d.setCN(e, k, "scrollbar-grip-right");
                    var l = 10,
                        m = 20;
                    e.panEventsEnabled && (l = 25, m = a.scrollbarHeight);
                    var n = d.rect(b, l, m, "#000", .005),
                        q = d.rect(b, l, m, "#000", .005);
                    q.translate(-(l - c) / 2, -(m - f) / 2);
                    n.translate(-(l - c) / 2, -(m - f) / 2);
                    c = b.set([g, q]);
                    b = b.set([k, n]);
                    a.iconLeft = c;
                    h.push(a.iconLeft);
                    a.iconRight = b;
                    h.push(b);
                    c.mousedown(function() { a.leftDragStart() }).mouseup(function() { a.leftDragStop() }).mouseover(function() { a.iconRollOver() }).mouseout(function() { a.iconRollOut() }).touchstart(function() { a.leftDragStart() }).touchend(function() { a.leftDragStop() });
                    b.mousedown(function() { a.rightDragStart() }).mouseup(function() { a.rightDragStop() }).mouseover(function() { a.iconRollOver() }).mouseout(function() { a.iconRollOut() }).touchstart(function() { a.rightDragStart() }).touchend(function() { a.rightDragStop() });
                    d.ifArray(e.chartData) ? h.show() : h.hide();
                    a.hideDragIcons();
                    a.clipDragger(!1)
                }
                h.translate(a.x, a.y);
                h.node.style.msTouchAction = "none"
            }
        },
        updateScrollbarSize: function(a, b) {
            a = Math.round(a);
            b = Math.round(b);
            var c = this.dragger,
                e, d, f, g;
            this.rotate ? (e = 0, d = a, f = this.width +
                1, g = b - a, c.setAttr("height", b - a), c.setAttr("y", d)) : (e = a, d = 0, f = b - a, g = this.height + 1, c.setAttr("width", b - a), c.setAttr("x", e));
            this.clipAndUpdate(e, d, f, g)
        },
        update: function() {
            var a, b = !1,
                c, e, d = this.x,
                f = this.y,
                g = this.dragger,
                k = this.getDBox();
            if (k) {
                c = k.x + d;
                e = k.y + f;
                var l = k.width,
                    k = k.height,
                    m = this.rotate,
                    n = this.chart,
                    q = this.width,
                    p = this.height,
                    t = n.mouseX,
                    r = n.mouseY;
                a = this.initialMouse;
                this.forceClip && this.clipDragger(!0);
                n.mouseIsOver && (this.dragging && (n = this.initialCoord, m ? (a = n + (r - a), 0 > a && (a = 0), n = p - k, a > n &&
                    (a = n), g.setAttr("y", a)) : (a = n + (t - a), 0 > a && (a = 0), n = q - l, a > n && (a = n), g.setAttr("x", a)), this.clipDragger(!0)), this.resizingRight && (m ? (a = r - e, a + e > p + f && (a = p - e + f), 0 > a ? (this.resizingRight = !1, b = this.resizingLeft = !0) : (0 === a && (a = .1), g.setAttr("height", a))) : (a = t - c, a + c > q + d && (a = q - c + d), 0 > a ? (this.resizingRight = !1, b = this.resizingLeft = !0) : (0 === a && (a = .1), g.setAttr("width", a))), this.clipDragger(!0)), this.resizingLeft && (m ? (c = e, e = r, e < f && (e = f), e > p + f && (e = p + f), a = !0 === b ? c - e : k + c - e, 0 > a ? (this.resizingRight = !0, this.resizingLeft = !1,
                    g.setAttr("y", c + k - f)) : (0 === a && (a = .1), g.setAttr("y", e - f), g.setAttr("height", a))) : (e = t, e < d && (e = d), e > q + d && (e = q + d), a = !0 === b ? c - e : l + c - e, 0 > a ? (this.resizingRight = !0, this.resizingLeft = !1, g.setAttr("x", c + l - d)) : (0 === a && (a = .1), g.setAttr("x", e - d), g.setAttr("width", a))), this.clipDragger(!0)))
            }
        },
        stopForceClip: function() { this.forceClip = !1 },
        clipDragger: function(a) {
            var b = this.getDBox();
            if (b) {
                var c = b.x,
                    e = b.y,
                    d = b.width,
                    b = b.height,
                    f = !1;
                if (this.rotate) { if (c = 0, d = this.width + 1, this.clipY != e || this.clipH != b) f = !0 } else if (e =
                    0, b = this.height + 1, this.clipX != c || this.clipW != d) f = !0;
                f && (this.clipAndUpdate(c, e, d, b), a && (this.updateOnReleaseOnly || this.dispatchScrollbarEvent()))
            }
        },
        maskGraphs: function() {},
        clipAndUpdate: function(a, b, c, e) {
            this.clipX = a;
            this.clipY = b;
            this.clipW = c;
            this.clipH = e;
            this.selectedBG.clipRect(a, b, c, e);
            this.updateDragIconPositions();
            this.maskGraphs(a, b, c, e)
        },
        dispatchScrollbarEvent: function() {
            if (this.skipEvent) this.skipEvent = !1;
            else {
                var a = this.chart;
                a.hideBalloon();
                var b = this.getDBox(),
                    c = b.x,
                    e = b.y,
                    d = b.width,
                    b = b.height;
                this.rotate ? (c = e, d = this.height / b) : d = this.width / d;
                a = { type: "zoomed", position: c, chart: a, target: this, multiplier: d };
                this.fire(a.type, a)
            }
        },
        updateDragIconPositions: function() {
            var a = this.getDBox(),
                b = a.x,
                c = a.y,
                e = this.iconLeft,
                d = this.iconRight,
                f, g, k = this.scrollbarHeight;
            this.rotate ? (f = this.dragIconWidth, g = this.dragIconHeight, e.translate((k - g) / 2, c - f / 2), d.translate((k - g) / 2, c + a.height - f / 2)) : (f = this.dragIconHeight, g = this.dragIconWidth, e.translate(b - g / 2, (k - f) / 2), d.translate(b - g / 2 + a.width, (k - f) / 2))
        },
        showDragIcons: function() {
            this.resizeEnabled &&
                (this.iconLeft.show(), this.iconRight.show())
        },
        hideDragIcons: function() {
            if (!this.resizingLeft && !this.resizingRight && !this.dragging) {
                if (this.hideResizeGrips || !this.resizeEnabled) this.iconLeft.hide(), this.iconRight.hide();
                this.removeCursors()
            }
        },
        removeCursors: function() { this.chart.setMouseCursor("auto") },
        relativeZoom: function(a, b) { this.enabled && (this.dragger.stop(), this.multiplier = a, this.position = b, this.updateScrollbarSize(b, this.rotate ? b + this.height / a : b + this.width / a), this.clipDragger()) },
        destroy: function() {
            this.clear();
            d.remove(this.set);
            d.remove(this.iconRight);
            d.remove(this.iconLeft)
        },
        clear: function() {},
        handleDragStart: function() {
            if (this.enabled) {
                var a = this.chart;
                this.dragger.stop();
                this.removeCursors();
                this.dragging = !0;
                var b = this.getDBox();
                this.rotate ? (this.initialCoord = b.y, this.initialMouse = a.mouseY) : (this.initialCoord = b.x, this.initialMouse = a.mouseX)
            }
        },
        handleDragStop: function() {
            this.updateOnReleaseOnly && (this.update(), this.skipEvent = !1, this.dispatchScrollbarEvent());
            this.dragging = !1;
            this.mouseIsOver && this.removeCursors();
            this.update()
        },
        handleDraggerOver: function() { this.handleMouseOver() },
        leftDragStart: function() {
            this.dragger.stop();
            this.resizingLeft = !0
        },
        leftDragStop: function() {
            this.resizingLeft = !1;
            this.mouseIsOver || this.removeCursors();
            this.updateOnRelease()
        },
        rightDragStart: function() {
            this.dragger.stop();
            this.resizingRight = !0
        },
        rightDragStop: function() {
            this.resizingRight = !1;
            this.mouseIsOver || this.removeCursors();
            this.updateOnRelease()
        },
        iconRollOut: function() { this.removeCursors() },
        iconRollOver: function() {
            this.rotate ?
                this.chart.setMouseCursor("n-resize") : this.chart.setMouseCursor("e-resize");
            this.handleMouseOver()
        },
        getDBox: function() { if (this.dragger) return this.dragger.getBBox() },
        handleBgClick: function() {
            var a = this;
            if (!a.resizingRight && !a.resizingLeft) {
                a.zooming = !0;
                var b, c, e = a.scrollDuration,
                    h = a.dragger;
                b = a.getDBox();
                var f = b.height,
                    g = b.width;
                c = a.chart;
                var k = a.y,
                    l = a.x,
                    m = a.rotate;
                m ? (b = "y", c = c.mouseY - f / 2 - k, c = d.fitToBounds(c, 0, a.height - f)) : (b = "x", c = c.mouseX - g / 2 - l, c = d.fitToBounds(c, 0, a.width - g));
                a.updateOnReleaseOnly ?
                    (a.skipEvent = !1, h.setAttr(b, c), a.dispatchScrollbarEvent(), a.clipDragger()) : (c = Math.round(c), m ? h.animate({ y: c }, e, ">") : h.animate({ x: c }, e, ">"), a.forceClip = !0, clearTimeout(a.forceTO), a.forceTO = setTimeout(function() { a.stopForceClip.call(a) }, 5E3 * e))
            }
        },
        updateOnRelease: function() { this.updateOnReleaseOnly && (this.update(), this.skipEvent = !1, this.dispatchScrollbarEvent()) },
        handleReleaseOutside: function() {
            if (this.set) {
                if (this.resizingLeft || this.resizingRight || this.dragging) this.updateOnRelease(), this.removeCursors();
                this.mouseIsOver = this.dragging = this.resizingRight = this.resizingLeft = !1;
                this.hideDragIcons();
                this.update()
            }
        },
        handleMouseOver: function() {
            this.mouseIsOver = !0;
            this.showDragIcons()
        },
        handleMouseOut: function() {
            this.mouseIsOver = !1;
            this.hideDragIcons()
        }
    })
})();
(function() {
    var d = window.AmCharts;
    d.ChartScrollbar = d.Class({
        inherits: d.SimpleChartScrollbar,
        construct: function(a) {
            this.cname = "ChartScrollbar";
            d.ChartScrollbar.base.construct.call(this, a);
            this.enabled = !0;
            this.graphLineColor = "#BBBBBB";
            this.graphLineAlpha = 0;
            this.graphFillColor = "#BBBBBB";
            this.graphFillAlpha = 1;
            this.selectedGraphLineColor = "#888888";
            this.selectedGraphLineAlpha = 0;
            this.selectedGraphFillColor = "#888888";
            this.selectedGraphFillAlpha = 1;
            this.gridCount = 0;
            this.gridColor = "#FFFFFF";
            this.gridAlpha = .7;
            this.skipEvent = this.autoGridCount = !1;
            this.color = "#FFFFFF";
            this.scrollbarCreated = !1;
            this.offset = 0;
            d.applyTheme(this, a, this.cname)
        },
        init: function() {
            var a = this.categoryAxis,
                b = this.chart;
            a || (this.categoryAxis = a = new d.CategoryAxis);
            a.chart = b;
            a.id = "scrollbar";
            a.dateFormats = b.categoryAxis.dateFormats;
            a.markPeriodChange = b.categoryAxis.markPeriodChange;
            a.boldPeriodBeginning = b.categoryAxis.boldPeriodBeginning;
            a.axisItemRenderer = d.RecItem;
            a.axisRenderer = d.RecAxis;
            a.guideFillRenderer = d.RecFill;
            a.inside = !0;
            a.fontSize =
                this.fontSize;
            a.tickLength = 0;
            a.axisAlpha = 0;
            d.isString(this.graph) && (this.graph = d.getObjById(b.graphs, this.graph));
            if (a = this.graph) {
                var c = this.valueAxis;
                c || (this.valueAxis = c = new d.ValueAxis, c.visible = !1, c.scrollbar = !0, c.axisItemRenderer = d.RecItem, c.axisRenderer = d.RecAxis, c.guideFillRenderer = d.RecFill, c.labelsEnabled = !1, c.chart = b);
                b = this.unselectedGraph;
                b || (b = new d.AmGraph, b.scrollbar = !0, this.unselectedGraph = b, b.negativeBase = a.negativeBase, b.noStepRisers = a.noStepRisers);
                b = this.selectedGraph;
                b || (b = new d.AmGraph,
                    b.scrollbar = !0, this.selectedGraph = b, b.negativeBase = a.negativeBase, b.noStepRisers = a.noStepRisers)
            }
            this.scrollbarCreated = !0
        },
        draw: function() {
            var a = this;
            d.ChartScrollbar.base.draw.call(a);
            if (a.enabled) {
                a.scrollbarCreated || a.init();
                var b = a.chart,
                    c = b.chartData,
                    e = a.categoryAxis,
                    h = a.rotate,
                    f = a.x,
                    g = a.y,
                    k = a.width,
                    l = a.height,
                    m = b.categoryAxis,
                    n = a.set;
                e.setOrientation(!h);
                e.parseDates = m.parseDates;
                e.rotate = h;
                e.equalSpacing = m.equalSpacing;
                e.minPeriod = m.minPeriod;
                e.startOnAxis = m.startOnAxis;
                e.viW = k;
                e.viH = l;
                e.width =
                    k;
                e.height = l;
                e.gridCount = a.gridCount;
                e.gridColor = a.gridColor;
                e.gridAlpha = a.gridAlpha;
                e.color = a.color;
                e.tickLength = 0;
                e.axisAlpha = 0;
                e.autoGridCount = a.autoGridCount;
                e.parseDates && !e.equalSpacing && e.timeZoom(b.firstTime, b.lastTime);
                e.zoom(0, c.length - 1);
                if (m = a.graph) {
                    var q = a.valueAxis,
                        p = m.valueAxis;
                    q.id = p.id;
                    q.rotate = h;
                    q.setOrientation(h);
                    q.width = k;
                    q.height = l;
                    q.viW = k;
                    q.viH = l;
                    q.dataProvider = c;
                    q.reversed = p.reversed;
                    q.logarithmic = p.logarithmic;
                    q.gridAlpha = 0;
                    q.axisAlpha = 0;
                    n.push(q.set);
                    h ? (q.y = g, q.x = 0) : (q.x =
                        f, q.y = 0);
                    var f = Infinity,
                        g = -Infinity,
                        t;
                    for (t = 0; t < c.length; t++) {
                        var r = c[t].axes[p.id].graphs[m.id].values,
                            u;
                        for (u in r)
                            if (r.hasOwnProperty(u) && "percents" != u && "total" != u) {
                                var z = r[u];
                                z < f && (f = z);
                                z > g && (g = z)
                            }
                    }
                    Infinity != f && (q.minimum = f); - Infinity != g && (q.maximum = g + .1 * (g - f));
                    f == g && (--q.minimum, q.maximum += 1);
                    void 0 !== a.minimum && (q.minimum = a.minimum);
                    void 0 !== a.maximum && (q.maximum = a.maximum);
                    q.zoom(0, c.length - 1);
                    u = a.unselectedGraph;
                    u.id = m.id;
                    u.bcn = "scrollbar-graph-";
                    u.rotate = h;
                    u.chart = b;
                    u.data = c;
                    u.valueAxis =
                        q;
                    u.chart = m.chart;
                    u.categoryAxis = a.categoryAxis;
                    u.periodSpan = m.periodSpan;
                    u.valueField = m.valueField;
                    u.openField = m.openField;
                    u.closeField = m.closeField;
                    u.highField = m.highField;
                    u.lowField = m.lowField;
                    u.lineAlpha = a.graphLineAlpha;
                    u.lineColorR = a.graphLineColor;
                    u.fillAlphas = a.graphFillAlpha;
                    u.fillColorsR = a.graphFillColor;
                    u.connect = m.connect;
                    u.hidden = m.hidden;
                    u.width = k;
                    u.height = l;
                    u.pointPosition = m.pointPosition;
                    u.stepDirection = m.stepDirection;
                    u.periodSpan = m.periodSpan;
                    p = a.selectedGraph;
                    p.id = m.id;
                    p.bcn = u.bcn +
                        "selected-";
                    p.rotate = h;
                    p.chart = b;
                    p.data = c;
                    p.valueAxis = q;
                    p.chart = m.chart;
                    p.categoryAxis = e;
                    p.periodSpan = m.periodSpan;
                    p.valueField = m.valueField;
                    p.openField = m.openField;
                    p.closeField = m.closeField;
                    p.highField = m.highField;
                    p.lowField = m.lowField;
                    p.lineAlpha = a.selectedGraphLineAlpha;
                    p.lineColorR = a.selectedGraphLineColor;
                    p.fillAlphas = a.selectedGraphFillAlpha;
                    p.fillColorsR = a.selectedGraphFillColor;
                    p.connect = m.connect;
                    p.hidden = m.hidden;
                    p.width = k;
                    p.height = l;
                    p.pointPosition = m.pointPosition;
                    p.stepDirection = m.stepDirection;
                    p.periodSpan = m.periodSpan;
                    b = a.graphType;
                    b || (b = m.type);
                    u.type = b;
                    p.type = b;
                    c = c.length - 1;
                    u.zoom(0, c);
                    p.zoom(0, c);
                    p.set.click(function() { a.handleBackgroundClick() }).mouseover(function() { a.handleMouseOver() }).mouseout(function() { a.handleMouseOut() });
                    u.set.click(function() { a.handleBackgroundClick() }).mouseover(function() { a.handleMouseOver() }).mouseout(function() { a.handleMouseOut() });
                    n.push(u.set);
                    n.push(p.set)
                }
                n.push(e.set);
                n.push(e.labelsSet);
                a.bg.toBack();
                a.invisibleBg.toFront();
                a.dragger.toFront();
                a.iconLeft.toFront();
                a.iconRight.toFront()
            }
        },
        timeZoom: function(a, b, c) {
            this.startTime = a;
            this.endTime = b;
            this.timeDifference = b - a;
            this.skipEvent = !d.toBoolean(c);
            this.zoomScrollbar();
            this.skipEvent || this.dispatchScrollbarEvent()
        },
        zoom: function(a, b) {
            this.start = a;
            this.end = b;
            this.skipEvent = !0;
            this.zoomScrollbar()
        },
        dispatchScrollbarEvent: function() {
            if (this.skipEvent) this.skipEvent = !1;
            else {
                var a = this.chart.chartData,
                    b, c, e = this.dragger.getBBox();
                b = e.x;
                var d = e.y,
                    f = e.width,
                    e = e.height,
                    g = this.chart;
                this.rotate ? (b = d, c = e) : c = f;
                f = {
                    type: "zoomed",
                    target: this
                };
                f.chart = g;
                var k = this.categoryAxis,
                    l = this.stepWidth,
                    d = g.minSelectedTime,
                    e = !1;
                if (k.parseDates && !k.equalSpacing) {
                    if (a = g.lastTime, g = g.firstTime, k = Math.round(b / l) + g, b = this.dragging ? k + this.timeDifference : Math.round((b + c) / l) + g, k > b && (k = b), 0 < d && b - k < d && (b = Math.round(k + (b - k) / 2), e = Math.round(d / 2), k = b - e, b += e, e = !0), b > a && (b = a), b - d < k && (k = b - d), k < g && (k = g), k + d > b && (b = k + d), k != this.startTime || b != this.endTime) this.startTime = k, this.endTime = b, f.start = k, f.end = b, f.startDate = new Date(k), f.endDate = new Date(b), this.fire(f.type,
                        f)
                } else if (k.startOnAxis || (b += l / 2), c -= this.stepWidth / 2, d = k.xToIndex(b), b = k.xToIndex(b + c), d != this.start || this.end != b) k.startOnAxis && (this.resizingRight && d == b && b++, this.resizingLeft && d == b && (0 < d ? d-- : b = 1)), this.start = d, this.end = this.dragging ? this.start + this.difference : b, f.start = this.start, f.end = this.end, k.parseDates && (a[this.start] && (f.startDate = new Date(a[this.start].time)), a[this.end] && (f.endDate = new Date(a[this.end].time))), this.fire(f.type, f);
                e && this.zoomScrollbar()
            }
        },
        zoomScrollbar: function() {
            var a,
                b;
            a = this.chart;
            var c = a.chartData,
                e = this.categoryAxis;
            e.parseDates && !e.equalSpacing ? (c = e.stepWidth, e = a.firstTime, a = c * (this.startTime - e), b = c * (this.endTime - e)) : (a = c[this.start].x[e.id], b = c[this.end].x[e.id], c = e.stepWidth, e.startOnAxis || (e = c / 2, a -= e, b += e));
            this.stepWidth = c;
            this.updateScrollbarSize(a, b)
        },
        maskGraphs: function(a, b, c, e) {
            var d = this.selectedGraph;
            d && d.set.clipRect(a, b, c, e)
        },
        handleDragStart: function() {
            d.ChartScrollbar.base.handleDragStart.call(this);
            this.difference = this.end - this.start;
            this.timeDifference =
                this.endTime - this.startTime;
            0 > this.timeDifference && (this.timeDifference = 0)
        },
        handleBackgroundClick: function() {
            d.ChartScrollbar.base.handleBackgroundClick.call(this);
            this.dragging || (this.difference = this.end - this.start, this.timeDifference = this.endTime - this.startTime, 0 > this.timeDifference && (this.timeDifference = 0))
        }
    })
})();
(function() {
    var d = window.AmCharts;
    d.AmBalloon = d.Class({
        construct: function(a) {
            this.cname = "AmBalloon";
            this.enabled = !0;
            this.fillColor = "#FFFFFF";
            this.fillAlpha = .8;
            this.borderThickness = 2;
            this.borderColor = "#FFFFFF";
            this.borderAlpha = 1;
            this.cornerRadius = 0;
            this.maxWidth = 220;
            this.horizontalPadding = 8;
            this.verticalPadding = 4;
            this.pointerWidth = 6;
            this.pointerOrientation = "V";
            this.color = "#000000";
            this.adjustBorderColor = !0;
            this.show = this.follow = this.showBullet = !1;
            this.bulletSize = 3;
            this.shadowAlpha = .4;
            this.shadowColor =
                "#000000";
            this.fadeOutDuration = this.animationDuration = .3;
            this.fixedPosition = !1;
            this.offsetY = 6;
            this.offsetX = 1;
            this.textAlign = "center";
            d.isModern || (this.offsetY *= 1.5);
            d.applyTheme(this, a, this.cname)
        },
        draw: function() {
            var a = this.pointToX,
                b = this.pointToY;
            this.deltaSignX = this.deltaSignY = 1;
            var c = this.chart;
            d.VML && (this.fadeOutDuration = 0);
            this.xAnim && c.stopAnim(this.xAnim);
            this.yAnim && c.stopAnim(this.yAnim);
            if (!isNaN(a)) {
                var e = this.follow,
                    h = c.container,
                    f = this.set;
                d.remove(f);
                this.removeDiv();
                f = h.set();
                f.node.style.pointerEvents =
                    "none";
                this.set = f;
                c.balloonsSet.push(f);
                if (this.show) {
                    var g = this.l,
                        k = this.t,
                        l = this.r,
                        m = this.b,
                        n = this.balloonColor,
                        q = this.fillColor,
                        p = this.borderColor,
                        t = q;
                    void 0 != n && (this.adjustBorderColor ? t = p = n : q = n);
                    var r = this.horizontalPadding,
                        u = this.verticalPadding,
                        z = this.pointerWidth,
                        y = this.pointerOrientation,
                        v = this.cornerRadius,
                        w = c.fontFamily,
                        A = this.fontSize;
                    void 0 == A && (A = c.fontSize);
                    var n = document.createElement("div"),
                        B = c.classNamePrefix;
                    n.className = B + "-balloon-div";
                    this.className && (n.className = n.className +
                        " " + B + "-balloon-div-" + this.className);
                    B = n.style;
                    B.pointerEvents = "none";
                    B.position = "absolute";
                    var D = this.minWidth,
                        C = "";
                    isNaN(D) || (C = "min-width:" + (D - 2 * r) + "px; ");
                    n.innerHTML = "<div style='text-align:" + this.textAlign + "; " + C + "max-width:" + this.maxWidth + "px; font-size:" + A + "px; color:" + this.color + "; font-family:" + w + "'>" + this.text + "</div>";
                    c.chartDiv.appendChild(n);
                    this.textDiv = n;
                    A = n.offsetWidth;
                    w = n.offsetHeight;
                    n.clientHeight && (A = n.clientWidth, w = n.clientHeight);
                    w += 2 * u;
                    C = A + 2 * r;
                    !isNaN(D) && C < D && (C = D);
                    window.opera &&
                        (w += 2);
                    var J = !1,
                        A = this.offsetY;
                    c.handDrawn && (A += c.handDrawScatter + 2);
                    "H" != y ? (D = a - C / 2, b < k + w + 10 && "down" != y ? (J = !0, e && (b += A), A = b + z, this.deltaSignY = -1) : (e && (b -= A), A = b - w - z, this.deltaSignY = 1)) : (2 * z > w && (z = w / 2), A = b - w / 2, a < g + (l - g) / 2 ? (D = a + z, this.deltaSignX = -1) : (D = a - C - z, this.deltaSignX = 1));
                    A + w >= m && (A = m - w);
                    A < k && (A = k);
                    D < g && (D = g);
                    D + C > l && (D = l - C);
                    var k = A + u,
                        m = D + r,
                        u = this.shadowAlpha,
                        H = this.shadowColor,
                        r = this.borderThickness,
                        I = this.bulletSize,
                        T;
                    0 < v || 0 === z ? (0 < u && (a = d.rect(h, C, w, q, 0, r + 1, H, u, this.cornerRadius), d.isModern ?
                        a.translate(1, 1) : a.translate(4, 4), f.push(a)), q = d.rect(h, C, w, q, this.fillAlpha, r, p, this.borderAlpha, this.cornerRadius), this.showBullet && (T = d.circle(h, I, t, this.fillAlpha), f.push(T))) : (t = [], v = [], "H" != y ? (g = a - D, g > C - z && (g = C - z), g < z && (g = z), t = [0, g - z, a - D, g + z, C, C, 0, 0], v = J ? [0, 0, b - A, 0, 0, w, w, 0] : [w, w, b - A, w, w, 0, 0, w]) : (t = b - A, t > w - z && (t = w - z), t < z && (t = z), v = [0, t - z, b - A, t + z, w, w, 0, 0], t = a < g + (l - g) / 2 ? [0, 0, D < a ? 0 : a - D, 0, 0, C, C, 0] : [C, C, D + C > a ? C : a - D, C, C, 0, 0, C]), 0 < u && (a = d.polygon(h, t, v, q, 0, r, H, u), a.translate(1, 1), f.push(a)), q = d.polygon(h,
                        t, v, q, this.fillAlpha, r, p, this.borderAlpha));
                    this.bg = q;
                    f.push(q);
                    q.toFront();
                    d.setCN(c, q, "balloon-bg");
                    this.className && d.setCN(c, q, "balloon-bg-" + this.className);
                    h = 1 * this.deltaSignX;
                    B.left = m + "px";
                    B.top = k + "px";
                    f.translate(D - h, A);
                    q = q.getBBox();
                    this.bottom = A + w + 1;
                    this.yPos = q.y + A;
                    T && T.translate(this.pointToX - D + h, b - A);
                    b = this.animationDuration;
                    0 < this.animationDuration && !e && !isNaN(this.prevX) && (f.translate(this.prevX, this.prevY), f.animate({ translate: D - h + "," + A }, b, "easeOutSine"), n && (B.left = this.prevTX + "px", B.top =
                        this.prevTY + "px", this.xAnim = c.animate({ node: n }, "left", this.prevTX, m, b, "easeOutSine", "px"), this.yAnim = c.animate({ node: n }, "top", this.prevTY, k, b, "easeOutSine", "px")));
                    this.prevX = D - h;
                    this.prevY = A;
                    this.prevTX = m;
                    this.prevTY = k
                }
            }
        },
        followMouse: function() {
            if (this.follow && this.show) {
                var a = this.chart.mouseX - this.offsetX * this.deltaSignX,
                    b = this.chart.mouseY;
                this.pointToX = a;
                this.pointToY = b;
                if (a != this.previousX || b != this.previousY)
                    if (this.previousX = a, this.previousY = b, 0 === this.cornerRadius) this.draw();
                    else {
                        var c = this.set;
                        if (c) {
                            var e = c.getBBox(),
                                a = a - e.width / 2,
                                d = b - e.height - 10;
                            a < this.l && (a = this.l);
                            a > this.r - e.width && (a = this.r - e.width);
                            d < this.t && (d = b + 10);
                            c.translate(a, d);
                            b = this.textDiv.style;
                            b.left = a + this.horizontalPadding + "px";
                            b.top = d + this.verticalPadding + "px"
                        }
                    }
            }
        },
        changeColor: function(a) { this.balloonColor = a },
        setBounds: function(a, b, c, e) {
            this.l = a;
            this.t = b;
            this.r = c;
            this.b = e;
            this.destroyTO && clearTimeout(this.destroyTO)
        },
        showBalloon: function(a) {
            this.text = a;
            this.show = !0;
            this.destroyTO && clearTimeout(this.destroyTO);
            a = this.chart;
            this.fadeAnim1 && a.stopAnim(this.fadeAnim1);
            this.fadeAnim2 && a.stopAnim(this.fadeAnim2);
            this.draw()
        },
        hide: function() {
            var a = this,
                b = a.fadeOutDuration,
                c = a.chart;
            if (0 < b) {
                a.destroyTO = setTimeout(function() { a.destroy.call(a) }, 1E3 * b);
                a.follow = !1;
                a.show = !1;
                var e = a.set;
                e && (e.setAttr("opacity", a.fillAlpha), a.fadeAnim1 = e.animate({ opacity: 0 }, b, "easeInSine"));
                a.textDiv && (a.fadeAnim2 = c.animate({ node: a.textDiv }, "opacity", 1, 0, b, "easeInSine", ""))
            } else a.show = !1, a.follow = !1, a.destroy()
        },
        setPosition: function(a, b, c) {
            this.pointToX =
                a;
            this.pointToY = b;
            c && (a == this.previousX && b == this.previousY || this.draw());
            this.previousX = a;
            this.previousY = b
        },
        followCursor: function(a) {
            var b = this;
            (b.follow = a) ? (b.pShowBullet = b.showBullet, b.showBullet = !1) : void 0 !== b.pShowBullet && (b.showBullet = b.pShowBullet);
            clearInterval(b.interval);
            var c = b.chart.mouseX,
                e = b.chart.mouseY;
            !isNaN(c) && a && (b.pointToX = c - b.offsetX * b.deltaSignX, b.pointToY = e, b.followMouse(), b.interval = setInterval(function() { b.followMouse.call(b) }, 40))
        },
        removeDiv: function() {
            if (this.textDiv) {
                var a =
                    this.textDiv.parentNode;
                a && a.removeChild(this.textDiv)
            }
        },
        destroy: function() {
            clearInterval(this.interval);
            d.remove(this.set);
            this.removeDiv();
            this.set = null
        }
    })
})();
(function() {
    var d = window.AmCharts;
    d.AmCoordinateChart = d.Class({
        inherits: d.AmChart,
        construct: function(a) {
            d.AmCoordinateChart.base.construct.call(this, a);
            this.theme = a;
            this.createEvents("rollOverGraphItem", "rollOutGraphItem", "clickGraphItem", "doubleClickGraphItem", "rightClickGraphItem", "clickGraph", "rollOverGraph", "rollOutGraph");
            this.startAlpha = 1;
            this.startDuration = 0;
            this.startEffect = "elastic";
            this.sequencedAnimation = !0;
            this.colors = "#FF6600 #FCD202 #B0DE09 #0D8ECF #2A0CD0 #CD0D74 #CC0000 #00CC00 #0000CC #DDDDDD #999999 #333333 #990000".split(" ");
            this.balloonDateFormat = "MMM DD, YYYY";
            this.valueAxes = [];
            this.graphs = [];
            this.guides = [];
            this.gridAboveGraphs = !1;
            d.applyTheme(this, a, "AmCoordinateChart")
        },
        initChart: function() {
            d.AmCoordinateChart.base.initChart.call(this);
            var a = this.categoryAxis;
            a && (this.categoryAxis = d.processObject(a, d.CategoryAxis, this.theme));
            this.processValueAxes();
            this.createValueAxes();
            this.processGraphs();
            this.processGuides();
            d.VML && (this.startAlpha = 1);
            this.setLegendData(this.graphs);
            this.gridAboveGraphs && this.gridSet.toFront()
        },
        createValueAxes: function() {
            if (0 === this.valueAxes.length) {
                var a = new d.ValueAxis;
                this.addValueAxis(a)
            }
        },
        parseData: function() {
            this.processValueAxes();
            this.processGraphs()
        },
        parseSerialData: function(a) {
            var b = this.graphs,
                c, e = {},
                h = this.seriesIdField;
            h || (h = this.categoryField);
            this.chartData = [];
            if (a) {
                var f = !1,
                    g, k = this.categoryAxis,
                    l, m, n;
                k && (f = k.parseDates, l = k.forceShowField, n = k.classNameField, m = k.labelColorField, g = k.categoryFunction);
                var q, p, t = {},
                    r;
                f && (c = d.extractPeriod(k.minPeriod), q = c.period, p = c.count, r =
                    d.getPeriodDuration(q, p));
                var u = {};
                this.lookupTable = u;
                var z, y = this.dataDateFormat,
                    v = {};
                for (z = 0; z < a.length; z++) {
                    var w = {},
                        A = a[z];
                    c = A[this.categoryField];
                    w.dataContext = A;
                    w.category = g ? g(c, A, k) : String(c);
                    l && (w.forceShow = A[l]);
                    n && (w.className = A[n]);
                    m && (w.labelColor = A[m]);
                    u[A[h]] = w;
                    if (f && (k.categoryFunction ? c = k.categoryFunction(c, A, k) : (!y || c instanceof Date || (c = c.toString()), c = d.getDate(c, y, k.minPeriod)), c = d.resetDateToMin(c, q, p, k.firstDayOfWeek), w.category = c, w.time = c.getTime(), isNaN(w.time))) continue;
                    var B =
                        this.valueAxes;
                    w.axes = {};
                    w.x = {};
                    var D;
                    for (D = 0; D < B.length; D++) {
                        var C = B[D].id;
                        w.axes[C] = {};
                        w.axes[C].graphs = {};
                        var J;
                        for (J = 0; J < b.length; J++) {
                            c = b[J];
                            var H = c.id,
                                I = 1.1;
                            isNaN(c.gapPeriod) || (I = c.gapPeriod);
                            var T = c.periodValue;
                            if (c.valueAxis.id == C) {
                                w.axes[C].graphs[H] = {};
                                var da = {};
                                da.index = z;
                                var pa = A;
                                c.dataProvider && (pa = e);
                                da.values = this.processValues(pa, c, T);
                                !c.connect && v && v[H] && w.time - t[H] >= r * I && (v[H].gap = !0);
                                this.processFields(c, da, pa);
                                da.category = w.category;
                                da.serialDataItem = w;
                                da.graph = c;
                                w.axes[C].graphs[H] =
                                    da;
                                t[H] = w.time;
                                v[H] = da
                            }
                        }
                    }
                    this.chartData[z] = w
                }
            }
            for (a = 0; a < b.length; a++) c = b[a], c.dataProvider && this.parseGraphData(c)
        },
        processValues: function(a, b, c) {
            var e = {},
                h, f = !1;
            "candlestick" != b.type && "ohlc" != b.type || "" === c || (f = !0);
            for (var g = "value error open close low high".split(" "), k = 0; k < g.length; k++) {
                var l = g[k];
                "value" != l && "error" != l && f && (c = l.charAt(0).toUpperCase() + l.slice(1));
                var m = a[b[l + "Field"] + c];
                h = Number(m);
                isNaN(h) || (e[l] = h);
                "date" == b.valueAxis.type && void 0 !== m && (h = d.getDate(m, b.chart.dataDateFormat),
                    e[l] = h.getTime())
            }
            return e
        },
        parseGraphData: function(a) {
            var b = a.dataProvider,
                c = a.seriesIdField;
            c || (c = this.seriesIdField);
            c || (c = this.categoryField);
            var e;
            for (e = 0; e < b.length; e++) {
                var d = b[e],
                    f = this.lookupTable[String(d[c])],
                    g = a.valueAxis.id;
                f && (g = f.axes[g].graphs[a.id], g.serialDataItem = f, g.values = this.processValues(d, a, a.periodValue), this.processFields(a, g, d))
            }
        },
        addValueAxis: function(a) {
            a.chart = this;
            this.valueAxes.push(a);
            this.validateData()
        },
        removeValueAxesAndGraphs: function() {
            var a = this.valueAxes,
                b;
            for (b = a.length - 1; - 1 < b; b--) this.removeValueAxis(a[b])
        },
        removeValueAxis: function(a) {
            var b = this.graphs,
                c;
            for (c = b.length - 1; 0 <= c; c--) {
                var e = b[c];
                e && e.valueAxis == a && this.removeGraph(e)
            }
            b = this.valueAxes;
            for (c = b.length - 1; 0 <= c; c--) b[c] == a && b.splice(c, 1);
            this.validateData()
        },
        addGraph: function(a) {
            this.graphs.push(a);
            this.chooseGraphColor(a, this.graphs.length - 1);
            this.validateData()
        },
        removeGraph: function(a) {
            var b = this.graphs,
                c;
            for (c = b.length - 1; 0 <= c; c--) b[c] == a && (b.splice(c, 1), a.destroy());
            this.validateData()
        },
        processValueAxes: function() {
            var a = this.valueAxes,
                b;
            for (b = 0; b < a.length; b++) {
                var c = a[b],
                    c = d.processObject(c, d.ValueAxis, this.theme);
                a[b] = c;
                c.chart = this;
                c.id || (c.id = "valueAxisAuto" + b + "_" + (new Date).getTime());
                void 0 === c.usePrefixes && (c.usePrefixes = this.usePrefixes)
            }
        },
        processGuides: function() {
            var a = this.guides,
                b = this.categoryAxis;
            if (a)
                for (var c = 0; c < a.length; c++) {
                    var e = a[c];
                    (void 0 !== e.category || void 0 !== e.date) && b && b.addGuide(e);
                    e.id || (e.id = "guideAuto" + c + "_" + (new Date).getTime());
                    var h = e.valueAxis;
                    h ?
                        (d.isString(h) && (h = this.getValueAxisById(h)), h ? h.addGuide(e) : this.valueAxes[0].addGuide(e)) : isNaN(e.value) || this.valueAxes[0].addGuide(e)
                }
        },
        processGraphs: function() {
            var a = this.graphs,
                b;
            for (b = 0; b < a.length; b++) {
                var c = a[b],
                    c = d.processObject(c, d.AmGraph, this.theme);
                a[b] = c;
                this.chooseGraphColor(c, b);
                c.chart = this;
                d.isString(c.valueAxis) && (c.valueAxis = this.getValueAxisById(c.valueAxis));
                c.valueAxis || (c.valueAxis = this.valueAxes[0]);
                c.id || (c.id = "graphAuto" + b + "_" + (new Date).getTime())
            }
        },
        formatString: function(a,
            b, c) {
            var e = b.graph,
                h = e.valueAxis;
            h.duration && b.values.value && (h = d.formatDuration(b.values.value, h.duration, "", h.durationUnits, h.maxInterval, h.numberFormatter), a = a.split("[[value]]").join(h));
            a = d.massReplace(a, { "[[title]]": e.title, "[[description]]": b.description });
            a = c ? d.fixNewLines(a) : d.fixBrakes(a);
            return a = d.cleanFromEmpty(a)
        },
        getBalloonColor: function(a, b, c) {
            var e = a.lineColor,
                d = a.balloonColor;
            c && (d = e);
            c = a.fillColorsR;
            "object" == typeof c ? e = c[0] : void 0 !== c && (e = c);
            b.isNegative && (c = a.negativeLineColor,
                a = a.negativeFillColors, "object" == typeof a ? c = a[0] : void 0 !== a && (c = a), void 0 !== c && (e = c));
            void 0 !== b.color && (e = b.color);
            void 0 === d && (d = e);
            return d
        },
        getGraphById: function(a) { return d.getObjById(this.graphs, a) },
        getValueAxisById: function(a) { return d.getObjById(this.valueAxes, a) },
        processFields: function(a, b, c) {
            if (a.itemColors) {
                var e = a.itemColors,
                    h = b.index;
                b.color = h < e.length ? e[h] : d.randomColor()
            }
            e = "lineColor color alpha fillColors description bullet customBullet bulletSize bulletConfig url labelColor dashLength pattern gap className".split(" ");
            for (h = 0; h < e.length; h++) {
                var f = e[h],
                    g = a[f + "Field"];
                g && (g = c[g], d.isDefined(g) && (b[f] = g))
            }
            b.dataContext = c
        },
        chooseGraphColor: function(a, b) {
            if (a.lineColor) a.lineColorR = a.lineColor;
            else {
                var c;
                c = this.colors.length > b ? this.colors[b] : d.randomColor();
                a.lineColorR = c
            }
            a.fillColorsR = a.fillColors ? a.fillColors : a.lineColorR;
            a.bulletBorderColorR = a.bulletBorderColor ? a.bulletBorderColor : a.useLineColorForBulletBorder ? a.lineColorR : a.bulletColor;
            a.bulletColorR = a.bulletColor ? a.bulletColor : a.lineColorR;
            if (c = this.patterns) a.pattern =
                c[b]
        },
        handleLegendEvent: function(a) {
            var b = a.type;
            a = a.dataItem;
            if (!this.legend.data && a) {
                var c = a.hidden,
                    e = a.showBalloon;
                switch (b) {
                    case "clickMarker":
                        this.textClickEnabled && (e ? this.hideGraphsBalloon(a) : this.showGraphsBalloon(a));
                        break;
                    case "clickLabel":
                        e ? this.hideGraphsBalloon(a) : this.showGraphsBalloon(a);
                        break;
                    case "rollOverItem":
                        c || this.highlightGraph(a);
                        break;
                    case "rollOutItem":
                        c || this.unhighlightGraph();
                        break;
                    case "hideItem":
                        this.hideGraph(a);
                        break;
                    case "showItem":
                        this.showGraph(a)
                }
            }
        },
        highlightGraph: function(a) {
            var b =
                this.graphs,
                c, e = .2;
            this.legend && (e = this.legend.rollOverGraphAlpha);
            if (1 != e)
                for (c = 0; c < b.length; c++) {
                    var d = b[c];
                    d != a && d.changeOpacity(e)
                }
        },
        unhighlightGraph: function() {
            var a;
            this.legend && (a = this.legend.rollOverGraphAlpha);
            if (1 != a) { a = this.graphs; var b; for (b = 0; b < a.length; b++) a[b].changeOpacity(1) }
        },
        showGraph: function(a) { a.switchable && (a.hidden = !1, this.dataChanged = !0, "xy" != this.type && (this.marginsUpdated = !1), this.chartCreated && this.initChart()) },
        hideGraph: function(a) {
            a.switchable && (this.dataChanged = !0,
                "xy" != this.type && (this.marginsUpdated = !1), a.hidden = !0, this.chartCreated && this.initChart())
        },
        hideGraphsBalloon: function(a) {
            a.showBalloon = !1;
            this.updateLegend()
        },
        showGraphsBalloon: function(a) {
            a.showBalloon = !0;
            this.updateLegend()
        },
        updateLegend: function() { this.legend && this.legend.invalidateSize() },
        resetAnimation: function() { var a = this.graphs; if (a) { var b; for (b = 0; b < a.length; b++) a[b].animationPlayed = !1 } },
        animateAgain: function() {
            this.resetAnimation();
            this.validateNow()
        }
    })
})();
(function() {
    var d = window.AmCharts;
    d.AmSlicedChart = d.Class({
        inherits: d.AmChart,
        construct: function(a) {
            this.createEvents("rollOverSlice", "rollOutSlice", "clickSlice", "pullOutSlice", "pullInSlice", "rightClickSlice");
            d.AmSlicedChart.base.construct.call(this, a);
            this.colors = "#FF0F00 #FF6600 #FF9E01 #FCD202 #F8FF01 #B0DE09 #04D215 #0D8ECF #0D52D1 #2A0CD0 #8A0CCF #CD0D74 #754DEB #DDDDDD #999999 #333333 #000000 #57032A #CA9726 #990000 #4B0C25".split(" ");
            this.alpha = 1;
            this.groupPercent = 0;
            this.groupedTitle = "Other";
            this.groupedPulled = !1;
            this.groupedAlpha = 1;
            this.marginLeft = 0;
            this.marginBottom = this.marginTop = 10;
            this.marginRight = 0;
            this.hoverAlpha = 1;
            this.outlineColor = "#FFFFFF";
            this.outlineAlpha = 0;
            this.outlineThickness = 1;
            this.startAlpha = 0;
            this.startDuration = 1;
            this.startEffect = "bounce";
            this.sequencedAnimation = !0;
            this.pullOutDuration = 1;
            this.pullOutEffect = "bounce";
            this.pullOnHover = this.pullOutOnlyOne = !1;
            this.labelsEnabled = !0;
            this.labelTickColor = "#000000";
            this.labelTickAlpha = .2;
            this.hideLabelsPercent = 0;
            this.urlTarget =
                "_self";
            this.autoMarginOffset = 10;
            this.gradientRatio = [];
            this.maxLabelWidth = 200;
            d.applyTheme(this, a, "AmSlicedChart")
        },
        initChart: function() {
            d.AmSlicedChart.base.initChart.call(this);
            this.dataChanged && (this.parseData(), this.dispatchDataUpdated = !0, this.dataChanged = !1, this.setLegendData(this.chartData));
            this.drawChart()
        },
        handleLegendEvent: function(a) {
            var b = a.type,
                c = a.dataItem,
                e = this.legend;
            if (!e.data && c) {
                var d = c.hidden;
                a = a.event;
                switch (b) {
                    case "clickMarker":
                        d || e.switchable || this.clickSlice(c, a);
                        break;
                    case "clickLabel":
                        d ||
                            this.clickSlice(c, a, !1);
                        break;
                    case "rollOverItem":
                        d || this.rollOverSlice(c, !1, a);
                        break;
                    case "rollOutItem":
                        d || this.rollOutSlice(c, a);
                        break;
                    case "hideItem":
                        this.hideSlice(c, a);
                        break;
                    case "showItem":
                        this.showSlice(c, a)
                }
            }
        },
        invalidateVisibility: function() {
            this.recalculatePercents();
            this.initChart();
            var a = this.legend;
            a && a.invalidateSize()
        },
        addEventListeners: function(a, b) {
            var c = this;
            a.mouseover(function(a) { c.rollOverSlice(b, !0, a) }).mouseout(function(a) { c.rollOutSlice(b, a) }).touchend(function(a) {
                c.rollOverSlice(b,
                    a);
                c.panEventsEnabled && c.clickSlice(b, a)
            }).touchstart(function(a) { c.rollOverSlice(b, a) }).click(function(a) { c.clickSlice(b, a) }).contextmenu(function(a) { c.handleRightClick(b, a) })
        },
        formatString: function(a, b, c) {
            a = d.formatValue(a, b, ["value"], this.nf, "", this.usePrefixes, this.prefixesOfSmallNumbers, this.prefixesOfBigNumbers);
            var e = this.pf.precision;
            isNaN(this.tempPrec) || (this.pf.precision = this.tempPrec);
            a = d.formatValue(a, b, ["percents"], this.pf);
            a = d.massReplace(a, { "[[title]]": b.title, "[[description]]": b.description });
            this.pf.precision = e; - 1 != a.indexOf("[[") && (a = d.formatDataContextValue(a, b.dataContext));
            a = c ? d.fixNewLines(a) : d.fixBrakes(a);
            return a = d.cleanFromEmpty(a)
        },
        startSlices: function() { var a; for (a = 0; a < this.chartData.length; a++) 0 < this.startDuration && this.sequencedAnimation ? this.setStartTO(a) : this.startSlice(this.chartData[a]) },
        setStartTO: function(a) {
            var b = this;
            a = setTimeout(function() { b.startSequenced.call(b) }, b.startDuration / b.chartData.length * 500 * a);
            b.timeOuts.push(a)
        },
        pullSlices: function(a) {
            var b = this.chartData,
                c;
            for (c = 0; c < b.length; c++) {
                var e = b[c];
                e.pulled && this.pullSlice(e, 1, a)
            }
        },
        startSequenced: function() {
            var a = this.chartData,
                b;
            for (b = 0; b < a.length; b++)
                if (!a[b].started) { this.startSlice(this.chartData[b]); break }
        },
        startSlice: function(a) {
            a.started = !0;
            var b = a.wedge,
                c = this.startDuration;
            b && 0 < c && (0 < a.alpha && b.show(), b.translate(a.startX, a.startY), b.animate({ opacity: 1, translate: "0,0" }, c, this.startEffect))
        },
        showLabels: function() {
            var a = this.chartData,
                b;
            for (b = 0; b < a.length; b++) {
                var c = a[b];
                if (0 < c.alpha) {
                    var e = c.label;
                    e && e.show();
                    (c = c.tick) && c.show()
                }
            }
        },
        showSlice: function(a) {
            isNaN(a) ? a.hidden = !1 : this.chartData[a].hidden = !1;
            this.invalidateVisibility()
        },
        hideSlice: function(a) {
            isNaN(a) ? a.hidden = !0 : this.chartData[a].hidden = !0;
            this.hideBalloon();
            this.invalidateVisibility()
        },
        rollOverSlice: function(a, b, c) {
            isNaN(a) || (a = this.chartData[a]);
            clearTimeout(this.hoverInt);
            if (!a.hidden) {
                this.pullOnHover && this.pullSlice(a, 1);
                1 > this.hoverAlpha && a.wedge && a.wedge.attr({ opacity: this.hoverAlpha });
                var e = a.balloonX,
                    h = a.balloonY;
                a.pulled &&
                    (e += a.pullX, h += a.pullY);
                var f = this.formatString(this.balloonText, a, !0),
                    g = this.balloonFunction;
                g && (f = g(a, f));
                g = d.adjustLuminosity(a.color, -.15);
                f ? this.showBalloon(f, g, b, e, h) : this.hideBalloon();
                0 === a.value && this.hideBalloon();
                a = { type: "rollOverSlice", dataItem: a, chart: this, event: c };
                this.fire(a.type, a)
            }
        },
        rollOutSlice: function(a, b) {
            isNaN(a) || (a = this.chartData[a]);
            a.wedge && a.wedge.attr({ opacity: 1 });
            this.hideBalloon();
            var c = { type: "rollOutSlice", dataItem: a, chart: this, event: b };
            this.fire(c.type, c)
        },
        clickSlice: function(a,
            b, c) {
            isNaN(a) || (a = this.chartData[a]);
            a.pulled ? this.pullSlice(a, 0) : this.pullSlice(a, 1);
            d.getURL(a.url, this.urlTarget);
            c || (a = { type: "clickSlice", dataItem: a, chart: this, event: b }, this.fire(a.type, a))
        },
        handleRightClick: function(a, b) {
            isNaN(a) || (a = this.chartData[a]);
            var c = { type: "rightClickSlice", dataItem: a, chart: this, event: b };
            this.fire(c.type, c)
        },
        drawTicks: function() {
            var a = this.chartData,
                b;
            for (b = 0; b < a.length; b++) {
                var c = a[b];
                if (c.label) {
                    var e = c.ty,
                        e = d.line(this.container, [c.tx0, c.tx, c.tx2], [c.ty0, e, e], this.labelTickColor,
                            this.labelTickAlpha);
                    d.setCN(this, e, this.type + "-tick");
                    d.setCN(this, e, c.className, !0);
                    c.tick = e;
                    c.wedge.push(e)
                }
            }
        },
        initialStart: function() {
            var a = this,
                b = a.startDuration,
                c = setTimeout(function() { a.showLabels.call(a) }, 1E3 * b);
            a.timeOuts.push(c);
            a.chartCreated ? a.pullSlices(!0) : (a.startSlices(), 0 < b ? (b = setTimeout(function() { a.pullSlices.call(a) }, 1200 * b), a.timeOuts.push(b)) : a.pullSlices(!0))
        },
        pullSlice: function(a, b, c) {
            var e = this.pullOutDuration;
            !0 === c && (e = 0);
            (c = a.wedge) && (0 < e ? c.animate({
                translate: b * a.pullX +
                    "," + b * a.pullY
            }, e, this.pullOutEffect) : c.translate(b * a.pullX, b * a.pullY));
            1 == b ? (a.pulled = !0, this.pullOutOnlyOne && this.pullInAll(a.index), a = { type: "pullOutSlice", dataItem: a, chart: this }) : (a.pulled = !1, a = { type: "pullInSlice", dataItem: a, chart: this });
            this.fire(a.type, a)
        },
        pullInAll: function(a) {
            var b = this.chartData,
                c;
            for (c = 0; c < this.chartData.length; c++) c != a && b[c].pulled && this.pullSlice(b[c], 0)
        },
        pullOutAll: function() {
            var a = this.chartData,
                b;
            for (b = 0; b < a.length; b++) a[b].pulled || this.pullSlice(a[b], 1)
        },
        parseData: function() {
            var a = [];
            this.chartData = a;
            var b = this.dataProvider;
            isNaN(this.pieAlpha) || (this.alpha = this.pieAlpha);
            if (void 0 !== b) {
                var c = b.length,
                    e = 0,
                    h, f, g;
                for (h = 0; h < c; h++) {
                    f = {};
                    var k = b[h];
                    f.dataContext = k;
                    f.value = Number(k[this.valueField]);
                    (g = k[this.titleField]) || (g = "");
                    f.title = g;
                    f.pulled = d.toBoolean(k[this.pulledField], !1);
                    (g = k[this.descriptionField]) || (g = "");
                    f.description = g;
                    f.labelRadius = Number(k[this.labelRadiusField]);
                    f.switchable = !0;
                    f.className = k[this.classNameField];
                    f.url = k[this.urlField];
                    g = k[this.patternField];
                    !g &&
                        this.patterns && (g = this.patterns[h]);
                    f.pattern = g;
                    f.visibleInLegend = d.toBoolean(k[this.visibleInLegendField], !0);
                    g = k[this.alphaField];
                    f.alpha = void 0 !== g ? Number(g) : this.alpha;
                    g = k[this.colorField];
                    void 0 !== g && (f.color = d.toColor(g));
                    f.labelColor = d.toColor(k[this.labelColorField]);
                    e += f.value;
                    f.hidden = !1;
                    a[h] = f
                }
                for (h = b = 0; h < c; h++) f = a[h], f.percents = f.value / e * 100, f.percents < this.groupPercent && b++;
                1 < b && (this.groupValue = 0, this.removeSmallSlices(), a.push({
                    title: this.groupedTitle,
                    value: this.groupValue,
                    percents: this.groupValue /
                        e * 100,
                    pulled: this.groupedPulled,
                    color: this.groupedColor,
                    url: this.groupedUrl,
                    description: this.groupedDescription,
                    alpha: this.groupedAlpha,
                    pattern: this.groupedPattern,
                    className: this.groupedClassName,
                    dataContext: {}
                }));
                c = this.baseColor;
                c || (c = this.pieBaseColor);
                e = this.brightnessStep;
                e || (e = this.pieBrightnessStep);
                for (h = 0; h < a.length; h++) c ? g = d.adjustLuminosity(c, h * e / 100) : (g = this.colors[h], void 0 === g && (g = d.randomColor())), void 0 === a[h].color && (a[h].color = g);
                this.recalculatePercents()
            }
        },
        recalculatePercents: function() {
            var a =
                this.chartData,
                b = 0,
                c, e;
            for (c = 0; c < a.length; c++) e = a[c], !e.hidden && 0 < e.value && (b += e.value);
            for (c = 0; c < a.length; c++) e = this.chartData[c], e.percents = !e.hidden && 0 < e.value ? 100 * e.value / b : 0
        },
        removeSmallSlices: function() {
            var a = this.chartData,
                b;
            for (b = a.length - 1; 0 <= b; b--) a[b].percents < this.groupPercent && (this.groupValue += a[b].value, a.splice(b, 1))
        },
        animateAgain: function() {
            var a = this;
            a.startSlices();
            for (var b = 0; b < a.chartData.length; b++) {
                var c = a.chartData[b];
                c.started = !1;
                var e = c.wedge;
                e && e.translate(c.startX, c.startY)
            }
            b =
                a.startDuration;
            0 < b ? (b = setTimeout(function() { a.pullSlices.call(a) }, 1200 * b), a.timeOuts.push(b)) : a.pullSlices()
        },
        measureMaxLabel: function() {
            var a = this.chartData,
                b = 0,
                c;
            for (c = 0; c < a.length; c++) {
                var e = a[c],
                    h = this.formatString(this.labelText, e),
                    f = this.labelFunction;
                f && (h = f(e, h));
                e = d.text(this.container, h, this.color, this.fontFamily, this.fontSize);
                h = e.getBBox().width;
                h > b && (b = h);
                e.remove()
            }
            return b
        }
    })
})();
(function() {
    var d = window.AmCharts;
    d.AmRectangularChart = d.Class({
        inherits: d.AmCoordinateChart,
        construct: function(a) {
            d.AmRectangularChart.base.construct.call(this, a);
            this.theme = a;
            this.createEvents("zoomed");
            this.marginRight = this.marginBottom = this.marginTop = this.marginLeft = 20;
            this.verticalPosition = this.horizontalPosition = this.depth3D = this.angle = 0;
            this.heightMultiplier = this.widthMultiplier = 1;
            this.plotAreaFillColors = "#FFFFFF";
            this.plotAreaFillAlphas = 0;
            this.plotAreaBorderColor = "#000000";
            this.plotAreaBorderAlpha =
                0;
            this.zoomOutButtonImageSize = 19;
            this.zoomOutButtonImage = "lens.png";
            this.zoomOutText = "Show all";
            this.zoomOutButtonColor = "#e5e5e5";
            this.zoomOutButtonAlpha = 0;
            this.zoomOutButtonRollOverAlpha = 1;
            this.zoomOutButtonPadding = 8;
            this.trendLines = [];
            this.autoMargins = !0;
            this.marginsUpdated = !1;
            this.autoMarginOffset = 10;
            d.applyTheme(this, a, "AmRectangularChart")
        },
        initChart: function() {
            d.AmRectangularChart.base.initChart.call(this);
            this.updateDxy();
            var a = !0;
            !this.marginsUpdated && this.autoMargins && (this.resetMargins(),
                a = !1);
            this.processScrollbars();
            this.updateMargins();
            this.updatePlotArea();
            this.updateScrollbars();
            this.updateTrendLines();
            this.updateChartCursor();
            this.updateValueAxes();
            a && (this.scrollbarOnly || this.updateGraphs())
        },
        drawChart: function() {
            d.AmRectangularChart.base.drawChart.call(this);
            this.drawPlotArea();
            if (d.ifArray(this.chartData)) {
                var a = this.chartCursor;
                a && a.draw();
                a = this.zoomOutText;
                "" !== a && a && this.drawZoomOutButton()
            }
        },
        resetMargins: function() {
            var a = {},
                b;
            if ("xy" == this.type) {
                var c = this.xAxes,
                    e = this.yAxes;
                for (b = 0; b < c.length; b++) {
                    var d = c[b];
                    d.ignoreAxisWidth || (d.setOrientation(!0), d.fixAxisPosition(), a[d.position] = !0)
                }
                for (b = 0; b < e.length; b++) c = e[b], c.ignoreAxisWidth || (c.setOrientation(!1), c.fixAxisPosition(), a[c.position] = !0)
            } else {
                e = this.valueAxes;
                for (b = 0; b < e.length; b++) c = e[b], c.ignoreAxisWidth || (c.setOrientation(this.rotate), c.fixAxisPosition(), a[c.position] = !0);
                (b = this.categoryAxis) && !b.ignoreAxisWidth && (b.setOrientation(!this.rotate), b.fixAxisPosition(), b.fixAxisPosition(), a[b.position] = !0)
            }
            a.left &&
                (this.marginLeft = 0);
            a.right && (this.marginRight = 0);
            a.top && (this.marginTop = 0);
            a.bottom && (this.marginBottom = 0);
            this.fixMargins = a
        },
        measureMargins: function() {
            var a = this.valueAxes,
                b, c = this.autoMarginOffset,
                e = this.fixMargins,
                d = this.realWidth,
                f = this.realHeight,
                g = c,
                k = c,
                l = d;
            b = f;
            var m;
            for (m = 0; m < a.length; m++) b = this.getAxisBounds(a[m], g, l, k, b), g = Math.round(b.l), l = Math.round(b.r), k = Math.round(b.t), b = Math.round(b.b);
            if (a = this.categoryAxis) b = this.getAxisBounds(a, g, l, k, b), g = Math.round(b.l), l = Math.round(b.r), k = Math.round(b.t),
                b = Math.round(b.b);
            e.left && g < c && (this.marginLeft = Math.round(-g + c));
            e.right && l >= d - c && (this.marginRight = Math.round(l - d + c));
            e.top && k < c + this.titleHeight && (this.marginTop = Math.round(this.marginTop - k + c + this.titleHeight));
            e.bottom && b > f - c && (this.marginBottom = Math.round(this.marginBottom + b - f + c));
            this.initChart()
        },
        getAxisBounds: function(a, b, c, e, d) {
            if (!a.ignoreAxisWidth) {
                var f = a.labelsSet,
                    g = a.tickLength;
                a.inside && (g = 0);
                if (f) switch (f = a.getBBox(), a.position) {
                    case "top":
                        a = f.y;
                        e > a && (e = a);
                        break;
                    case "bottom":
                        a = f.y +
                            f.height;
                        d < a && (d = a);
                        break;
                    case "right":
                        a = f.x + f.width + g + 3;
                        c < a && (c = a);
                        break;
                    case "left":
                        a = f.x - g, b > a && (b = a)
                }
            }
            return { l: b, t: e, r: c, b: d }
        },
        drawZoomOutButton: function() {
            var a = this,
                b = a.container.set();
            a.zoomButtonSet.push(b);
            var c = a.color,
                e = a.fontSize,
                h = a.zoomOutButtonImageSize,
                f = a.zoomOutButtonImage,
                g = d.lang.zoomOutText || a.zoomOutText,
                k = a.zoomOutButtonColor,
                l = a.zoomOutButtonAlpha,
                m = a.zoomOutButtonFontSize,
                n = a.zoomOutButtonPadding;
            isNaN(m) || (e = m);
            (m = a.zoomOutButtonFontColor) && (c = m);
            var m = a.zoomOutButton,
                q;
            m && (m.fontSize && (e = m.fontSize), m.color && (c = m.color), m.backgroundColor && (k = m.backgroundColor), isNaN(m.backgroundAlpha) || (a.zoomOutButtonRollOverAlpha = m.backgroundAlpha));
            var p = m = 0;
            void 0 !== a.pathToImages && f && (q = a.container.image(a.pathToImages + f, 0, 0, h, h), d.setCN(a, q, "zoom-out-image"), b.push(q), q = q.getBBox(), m = q.width + 5);
            void 0 !== g && (c = d.text(a.container, g, c, a.fontFamily, e, "start"), d.setCN(a, c, "zoom-out-label"), e = c.getBBox(), p = q ? q.height / 2 - 3 : e.height / 2, c.translate(m, p), b.push(c));
            q = b.getBBox();
            c = 1;
            d.isModern || (c = 0);
            k = d.rect(a.container, q.width + 2 * n + 5, q.height + 2 * n - 2, k, 1, 1, k, c);
            k.setAttr("opacity", l);
            k.translate(-n, -n);
            d.setCN(a, k, "zoom-out-bg");
            b.push(k);
            k.toBack();
            a.zbBG = k;
            q = k.getBBox();
            b.translate(a.marginLeftReal + a.plotAreaWidth - q.width + n, a.marginTopReal + n);
            b.hide();
            b.mouseover(function() { a.rollOverZB() }).mouseout(function() { a.rollOutZB() }).click(function() { a.clickZB() }).touchstart(function() { a.rollOverZB() }).touchend(function() {
                a.rollOutZB();
                a.clickZB()
            });
            for (l = 0; l < b.length; l++) b[l].attr({ cursor: "pointer" });
            a.zbSet = b
        },
        rollOverZB: function() { this.zbBG.setAttr("opacity", this.zoomOutButtonRollOverAlpha) },
        rollOutZB: function() { this.zbBG.setAttr("opacity", this.zoomOutButtonAlpha) },
        clickZB: function() { this.zoomOut() },
        zoomOut: function() {
            this.updateScrollbar = !0;
            this.zoom()
        },
        drawPlotArea: function() {
            var a = this.dx,
                b = this.dy,
                c = this.marginLeftReal,
                e = this.marginTopReal,
                h = this.plotAreaWidth - 1,
                f = this.plotAreaHeight - 1,
                g = this.plotAreaFillColors,
                k = this.plotAreaFillAlphas,
                l = this.plotAreaBorderColor,
                m = this.plotAreaBorderAlpha;
            this.trendLinesSet.clipRect(c, e, h, f);
            "object" == typeof k && (k = k[0]);
            g = d.polygon(this.container, [0, h, h, 0, 0], [0, 0, f, f, 0], g, k, 1, l, m, this.plotAreaGradientAngle);
            d.setCN(this, g, "plot-area");
            g.translate(c + a, e + b);
            this.set.push(g);
            0 !== a && 0 !== b && (g = this.plotAreaFillColors, "object" == typeof g && (g = g[0]), g = d.adjustLuminosity(g, -.15), h = d.polygon(this.container, [0, a, h + a, h, 0], [0, b, b, 0, 0], g, k, 1, l, m), d.setCN(this, h, "plot-area-bottom"), h.translate(c, e + f), this.set.push(h), a = d.polygon(this.container, [0, 0, a, a, 0], [0, f, f +
                b, b, 0
            ], g, k, 1, l, m), d.setCN(this, a, "plot-area-left"), a.translate(c, e), this.set.push(a));
            (c = this.bbset) && this.scrollbarOnly && c.remove()
        },
        updatePlotArea: function() {
            var a = this.updateWidth(),
                b = this.updateHeight(),
                c = this.container;
            this.realWidth = a;
            this.realWidth = b;
            c && this.container.setSize(a, b);
            a = a - this.marginLeftReal - this.marginRightReal - this.dx;
            b = b - this.marginTopReal - this.marginBottomReal;
            1 > a && (a = 1);
            1 > b && (b = 1);
            this.plotAreaWidth = Math.round(a);
            this.plotAreaHeight = Math.round(b)
        },
        updateDxy: function() {
            this.dx =
                Math.round(this.depth3D * Math.cos(this.angle * Math.PI / 180));
            this.dy = Math.round(-this.depth3D * Math.sin(this.angle * Math.PI / 180));
            this.d3x = Math.round(this.columnSpacing3D * Math.cos(this.angle * Math.PI / 180));
            this.d3y = Math.round(-this.columnSpacing3D * Math.sin(this.angle * Math.PI / 180))
        },
        updateMargins: function() {
            var a = this.getTitleHeight();
            this.titleHeight = a;
            this.marginTopReal = this.marginTop - this.dy;
            this.fixMargins && !this.fixMargins.top && (this.marginTopReal += a);
            this.marginBottomReal = this.marginBottom;
            this.marginLeftReal =
                this.marginLeft;
            this.marginRightReal = this.marginRight
        },
        updateValueAxes: function() {
            var a = this.valueAxes,
                b = this.marginLeftReal,
                c = this.marginTopReal,
                e = this.plotAreaHeight,
                h = this.plotAreaWidth,
                f;
            for (f = 0; f < a.length; f++) {
                var g = a[f];
                g.axisRenderer = d.RecAxis;
                g.guideFillRenderer = d.RecFill;
                g.axisItemRenderer = d.RecItem;
                g.dx = this.dx;
                g.dy = this.dy;
                g.viW = h - 1;
                g.viH = e - 1;
                g.marginsChanged = !0;
                g.viX = b;
                g.viY = c;
                this.updateObjectSize(g)
            }
        },
        updateObjectSize: function(a) {
            a.width = (this.plotAreaWidth - 1) * this.widthMultiplier;
            a.height =
                (this.plotAreaHeight - 1) * this.heightMultiplier;
            a.x = this.marginLeftReal + this.horizontalPosition;
            a.y = this.marginTopReal + this.verticalPosition
        },
        updateGraphs: function() {
            var a = this.graphs,
                b;
            for (b = 0; b < a.length; b++) {
                var c = a[b];
                c.x = this.marginLeftReal + this.horizontalPosition;
                c.y = this.marginTopReal + this.verticalPosition;
                c.width = this.plotAreaWidth * this.widthMultiplier;
                c.height = this.plotAreaHeight * this.heightMultiplier;
                c.index = b;
                c.dx = this.dx;
                c.dy = this.dy;
                c.rotate = this.rotate
            }
        },
        updateChartCursor: function() {
            var a =
                this.chartCursor;
            a && (a = d.processObject(a, d.ChartCursor, this.theme), this.addChartCursor(a), a.x = this.marginLeftReal, a.y = this.marginTopReal, a.width = this.plotAreaWidth - 1, a.height = this.plotAreaHeight - 1, a.chart = this)
        },
        processScrollbars: function() {
            var a = this.chartScrollbar;
            a && (a = d.processObject(a, d.ChartScrollbar, this.theme), this.addChartScrollbar(a))
        },
        updateScrollbars: function() {},
        addChartCursor: function(a) {
            d.callMethod("destroy", [this.chartCursor]);
            a && (this.listenTo(a, "changed", this.handleCursorChange),
                this.listenTo(a, "zoomed", this.handleCursorZoom));
            this.chartCursor = a
        },
        removeChartCursor: function() {
            d.callMethod("destroy", [this.chartCursor]);
            this.chartCursor = null
        },
        zoomTrendLines: function() {
            var a = this.trendLines,
                b;
            for (b = 0; b < a.length; b++) {
                var c = a[b];
                c.valueAxis.recalculateToPercents ? c.set && c.set.hide() : (c.x = this.marginLeftReal + this.horizontalPosition, c.y = this.marginTopReal + this.verticalPosition, c.draw())
            }
        },
        addTrendLine: function(a) { this.trendLines.push(a) },
        removeTrendLine: function(a) {
            var b = this.trendLines,
                c;
            for (c = b.length - 1; 0 <= c; c--) b[c] == a && b.splice(c, 1)
        },
        adjustMargins: function(a, b) {
            var c = a.position,
                e = a.scrollbarHeight + a.offset;
            a.enabled && ("top" == c ? b ? this.marginLeftReal += e : this.marginTopReal += e : b ? this.marginRightReal += e : this.marginBottomReal += e)
        },
        getScrollbarPosition: function(a, b, c) { a.position = b ? "bottom" == c || "left" == c ? "bottom" : "top" : "top" == c || "right" == c ? "bottom" : "top" },
        updateChartScrollbar: function(a, b) {
            if (a) {
                a.rotate = b;
                var c = this.marginTopReal,
                    e = this.marginLeftReal,
                    d = a.scrollbarHeight,
                    f = this.dx,
                    g = this.dy,
                    k = a.offset;
                "top" == a.position ? b ? (a.y = c, a.x = e - d - k) : (a.y = c - d + g - k, a.x = e + f) : b ? (a.y = c + g, a.x = e + this.plotAreaWidth + f + k) : (a.y = c + this.plotAreaHeight + k, a.x = this.marginLeftReal)
            }
        },
        showZB: function(a) {
            var b = this.zbSet;
            b && (a ? b.show() : b.hide(), this.rollOutZB())
        },
        handleReleaseOutside: function(a) {
            d.AmRectangularChart.base.handleReleaseOutside.call(this, a);
            (a = this.chartCursor) && a.handleReleaseOutside && a.handleReleaseOutside()
        },
        handleMouseDown: function(a) {
            d.AmRectangularChart.base.handleMouseDown.call(this,
                a);
            var b = this.chartCursor;
            b && b.handleMouseDown(a)
        },
        handleCursorChange: function() {},
        update: function() {
            d.AmRectangularChart.base.update.call(this);
            this.chartCursor && this.chartCursor.update && this.chartCursor.update()
        }
    })
})();
(function() {
    var d = window.AmCharts;
    d.TrendLine = d.Class({
        construct: function(a) {
            this.cname = "TrendLine";
            this.createEvents("click");
            this.isProtected = !1;
            this.dashLength = 0;
            this.lineColor = "#00CC00";
            this.lineThickness = this.lineAlpha = 1;
            d.applyTheme(this, a, this.cname)
        },
        draw: function() {
            var a = this;
            a.destroy();
            var b = a.chart,
                c = b.container,
                e, h, f, g, k = a.categoryAxis,
                l = a.initialDate,
                m = a.initialCategory,
                n = a.finalDate,
                q = a.finalCategory,
                p = a.valueAxis,
                t = a.valueAxisX,
                r = a.initialXValue,
                u = a.finalXValue,
                z = a.initialValue,
                y =
                a.finalValue,
                v = p.recalculateToPercents,
                w = b.dataDateFormat;
            k && (l && (l = d.getDate(l, w, "fff"), a.initialDate = l, e = k.dateToCoordinate(l)), m && (e = k.categoryToCoordinate(m)), n && (n = d.getDate(n, w, "fff"), a.finalDate = n, h = k.dateToCoordinate(n)), q && (h = k.categoryToCoordinate(q)));
            t && !v && (isNaN(r) || (e = t.getCoordinate(r)), isNaN(u) || (h = t.getCoordinate(u)));
            p && !v && (isNaN(z) || (f = p.getCoordinate(z)), isNaN(y) || (g = p.getCoordinate(y)));
            isNaN(e) || isNaN(h) || isNaN(f) || isNaN(f) || (b.rotate ? (k = [f, g], h = [e, h]) : (k = [e, h], h = [f, g]), f =
                a.lineColor, e = d.line(c, k, h, f, a.lineAlpha, a.lineThickness, a.dashLength), g = k, l = h, q = k[1] - k[0], p = h[1] - h[0], 0 === q && (q = .01), 0 === p && (p = .01), m = q / Math.abs(q), n = p / Math.abs(p), p = q * p / Math.abs(q * p) * Math.sqrt(Math.pow(q, 2) + Math.pow(p, 2)), q = Math.asin(q / p), p = 90 * Math.PI / 180 - q, q = Math.abs(5 * Math.cos(p)), p = Math.abs(5 * Math.sin(p)), g.push(k[1] - m * p, k[0] - m * p), l.push(h[1] + n * q, h[0] + n * q), k = d.polygon(c, g, l, f, .005, 0), c = c.set([k, e]), c.translate(b.marginLeftReal, b.marginTopReal), b.trendLinesSet.push(c), d.setCN(b, e, "trend-line"),
                d.setCN(b, e, "trend-line-" + a.id), a.line = e, a.set = c, k.mouseup(function() { a.handleLineClick() }).mouseover(function() { a.handleLineOver() }).mouseout(function() { a.handleLineOut() }), k.touchend && k.touchend(function() { a.handleLineClick() }))
        },
        handleLineClick: function() {
            var a = { type: "click", trendLine: this, chart: this.chart };
            this.fire(a.type, a)
        },
        handleLineOver: function() {
            var a = this.rollOverColor;
            void 0 !== a && this.line.attr({ stroke: a })
        },
        handleLineOut: function() { this.line.attr({ stroke: this.lineColor }) },
        destroy: function() { d.remove(this.set) }
    })
})();
(function() {
    var d = window.AmCharts;
    d.circle = function(a, b, c, e, h, f, g, k, l) {
        0 >= b && (b = .001);
        if (void 0 == h || 0 === h) h = .01;
        void 0 === f && (f = "#000000");
        void 0 === g && (g = 0);
        e = { fill: c, stroke: f, "fill-opacity": e, "stroke-width": h, "stroke-opacity": g };
        a = isNaN(l) ? a.circle(0, 0, b).attr(e) : a.ellipse(0, 0, b, l).attr(e);
        k && a.gradient("radialGradient", [c, d.adjustLuminosity(c, -.6)]);
        return a
    };
    d.text = function(a, b, c, e, h, f, g, k) {
        f || (f = "middle");
        "right" == f && (f = "end");
        "left" == f && (f = "start");
        isNaN(k) && (k = 1);
        void 0 !== b && (b = String(b), d.isIE &&
            !d.isModern && (b = b.replace("&amp;", "&"), b = b.replace("&", "&amp;")));
        c = { fill: c, "font-family": e, "font-size": h, opacity: k };
        !0 === g && (c["font-weight"] = "bold");
        c["text-anchor"] = f;
        return a.text(b, c)
    };
    d.polygon = function(a, b, c, e, h, f, g, k, l, m, n) {
        isNaN(f) && (f = .01);
        isNaN(k) && (k = h);
        var q = e,
            p = !1;
        "object" == typeof q && 1 < q.length && (p = !0, q = q[0]);
        void 0 === g && (g = q);
        h = { fill: q, stroke: g, "fill-opacity": h, "stroke-width": f, "stroke-opacity": k };
        void 0 !== n && 0 < n && (h["stroke-dasharray"] = n);
        n = d.dx;
        f = d.dy;
        a.handDrawn && (c = d.makeHD(b, c,
            a.handDrawScatter), b = c[0], c = c[1]);
        g = Math.round;
        m && (g = d.doNothing);
        m = "M" + (g(b[0]) + n) + "," + (g(c[0]) + f);
        for (k = 1; k < b.length; k++) m += " L" + (g(b[k]) + n) + "," + (g(c[k]) + f);
        a = a.path(m + " Z").attr(h);
        p && a.gradient("linearGradient", e, l);
        return a
    };
    d.rect = function(a, b, c, e, h, f, g, k, l, m, n) {
        if (isNaN(b) || isNaN(c)) return a.set();
        isNaN(f) && (f = 0);
        void 0 === l && (l = 0);
        void 0 === m && (m = 270);
        isNaN(h) && (h = 0);
        var q = e,
            p = !1;
        "object" == typeof q && (q = q[0], p = !0);
        void 0 === g && (g = q);
        void 0 === k && (k = h);
        b = Math.round(b);
        c = Math.round(c);
        var t = 0,
            r =
            0;
        0 > b && (b = Math.abs(b), t = -b);
        0 > c && (c = Math.abs(c), r = -c);
        t += d.dx;
        r += d.dy;
        h = { fill: q, stroke: g, "fill-opacity": h, "stroke-opacity": k };
        void 0 !== n && 0 < n && (h["stroke-dasharray"] = n);
        a = a.rect(t, r, b, c, l, f).attr(h);
        p && a.gradient("linearGradient", e, m);
        return a
    };
    d.bullet = function(a, b, c, e, h, f, g, k, l, m, n) {
        var q;
        "circle" == b && (b = "round");
        switch (b) {
            case "round":
                q = d.circle(a, c / 2, e, h, f, g, k);
                break;
            case "square":
                q = d.polygon(a, [-c / 2, c / 2, c / 2, -c / 2], [c / 2, c / 2, -c / 2, -c / 2], e, h, f, g, k, m - 180);
                break;
            case "rectangle":
                q = d.polygon(a, [-c, c,
                    c, -c
                ], [c / 2, c / 2, -c / 2, -c / 2], e, h, f, g, k, m - 180);
                break;
            case "diamond":
                q = d.polygon(a, [-c / 2, 0, c / 2, 0], [0, -c / 2, 0, c / 2], e, h, f, g, k);
                break;
            case "triangleUp":
                q = d.triangle(a, c, 0, e, h, f, g, k);
                break;
            case "triangleDown":
                q = d.triangle(a, c, 180, e, h, f, g, k);
                break;
            case "triangleLeft":
                q = d.triangle(a, c, 270, e, h, f, g, k);
                break;
            case "triangleRight":
                q = d.triangle(a, c, 90, e, h, f, g, k);
                break;
            case "bubble":
                q = d.circle(a, c / 2, e, h, f, g, k, !0);
                break;
            case "line":
                q = d.line(a, [-c / 2, c / 2], [0, 0], e, h, f, g, k);
                break;
            case "yError":
                q = a.set();
                q.push(d.line(a, [0, 0], [-c / 2, c / 2], e, h, f));
                q.push(d.line(a, [-l, l], [-c / 2, -c / 2], e, h, f));
                q.push(d.line(a, [-l, l], [c / 2, c / 2], e, h, f));
                break;
            case "xError":
                q = a.set(), q.push(d.line(a, [-c / 2, c / 2], [0, 0], e, h, f)), q.push(d.line(a, [-c / 2, -c / 2], [-l, l], e, h, f)), q.push(d.line(a, [c / 2, c / 2], [-l, l], e, h, f))
        }
        q && q.pattern(n);
        return q
    };
    d.triangle = function(a, b, c, e, d, f, g, k) {
        if (void 0 === f || 0 === f) f = 1;
        void 0 === g && (g = "#000");
        void 0 === k && (k = 0);
        e = { fill: e, stroke: g, "fill-opacity": d, "stroke-width": f, "stroke-opacity": k };
        b /= 2;
        var l;
        0 === c && (l = " M" + -b + "," + b +
            " L0," + -b + " L" + b + "," + b + " Z");
        180 == c && (l = " M" + -b + "," + -b + " L0," + b + " L" + b + "," + -b + " Z");
        90 == c && (l = " M" + -b + "," + -b + " L" + b + ",0 L" + -b + "," + b + " Z");
        270 == c && (l = " M" + -b + ",0 L" + b + "," + b + " L" + b + "," + -b + " Z");
        return a.path(l).attr(e)
    };
    d.line = function(a, b, c, e, h, f, g, k, l, m, n) {
        if (a.handDrawn && !n) return d.handDrawnLine(a, b, c, e, h, f, g, k, l, m, n);
        f = { fill: "none", "stroke-width": f };
        void 0 !== g && 0 < g && (f["stroke-dasharray"] = g);
        isNaN(h) || (f["stroke-opacity"] = h);
        e && (f.stroke = e);
        e = Math.round;
        m && (e = d.doNothing);
        m = d.dx;
        h = d.dy;
        g = "M" + (e(b[0]) +
            m) + "," + (e(c[0]) + h);
        for (k = 1; k < b.length; k++) g += " L" + (e(b[k]) + m) + "," + (e(c[k]) + h);
        if (d.VML) return a.path(g, void 0, !0).attr(f);
        l && (g += " M0,0 L0,0");
        return a.path(g).attr(f)
    };
    d.makeHD = function(a, b, c) {
        for (var e = [], d = [], f = 1; f < a.length; f++)
            for (var g = Number(a[f - 1]), k = Number(b[f - 1]), l = Number(a[f]), m = Number(b[f]), n = Math.sqrt(Math.pow(l - g, 2) + Math.pow(m - k, 2)), n = Math.round(n / 50) + 1, l = (l - g) / n, m = (m - k) / n, q = 0; q <= n; q++) {
                var p = g + q * l + Math.random() * c,
                    t = k + q * m + Math.random() * c;
                e.push(p);
                d.push(t)
            }
        return [e, d]
    };
    d.handDrawnLine =
        function(a, b, c, e, h, f, g, k, l, m) {
            var n, q = a.set();
            for (n = 1; n < b.length; n++)
                for (var p = [b[n - 1], b[n]], t = [c[n - 1], c[n]], t = d.makeHD(p, t, a.handDrawScatter), p = t[0], t = t[1], r = 1; r < p.length; r++) q.push(d.line(a, [p[r - 1], p[r]], [t[r - 1], t[r]], e, h, f + Math.random() * a.handDrawThickness - a.handDrawThickness / 2, g, k, l, m, !0));
            return q
        };
    d.doNothing = function(a) { return a };
    d.wedge = function(a, b, c, e, h, f, g, k, l, m, n, q) {
        var p = Math.round;
        f = p(f);
        g = p(g);
        k = p(k);
        var t = p(g / f * k),
            r = d.VML,
            u = 359.5 + f / 100;
        359.94 < u && (u = 359.94);
        h >= u && (h = u);
        var z = 1 / 180 *
            Math.PI,
            u = b + Math.sin(e * z) * k,
            y = c - Math.cos(e * z) * t,
            v = b + Math.sin(e * z) * f,
            w = c - Math.cos(e * z) * g,
            A = b + Math.sin((e + h) * z) * f,
            B = c - Math.cos((e + h) * z) * g,
            D = b + Math.sin((e + h) * z) * k,
            z = c - Math.cos((e + h) * z) * t,
            C = { fill: d.adjustLuminosity(m.fill, -.2), "stroke-opacity": 0, "fill-opacity": m["fill-opacity"] },
            J = 0;
        180 < Math.abs(h) && (J = 1);
        e = a.set();
        var H;
        r && (u = p(10 * u), v = p(10 * v), A = p(10 * A), D = p(10 * D), y = p(10 * y), w = p(10 * w), B = p(10 * B), z = p(10 * z), b = p(10 * b), l = p(10 * l), c = p(10 * c), f *= 10, g *= 10, k *= 10, t *= 10, 1 > Math.abs(h) && 1 >= Math.abs(A - v) && 1 >= Math.abs(B -
            w) && (H = !0));
        h = "";
        var I;
        q && (C["fill-opacity"] = 0, C["stroke-opacity"] = m["stroke-opacity"] / 2, C.stroke = m.stroke);
        0 < l && (I = " M" + u + "," + (y + l) + " L" + v + "," + (w + l), r ? (H || (I += " A" + (b - f) + "," + (l + c - g) + "," + (b + f) + "," + (l + c + g) + "," + v + "," + (w + l) + "," + A + "," + (B + l)), I += " L" + D + "," + (z + l), 0 < k && (H || (I += " B" + (b - k) + "," + (l + c - t) + "," + (b + k) + "," + (l + c + t) + "," + D + "," + (l + z) + "," + u + "," + (l + y)))) : (I += " A" + f + "," + g + ",0," + J + ",1," + A + "," + (B + l) + " L" + D + "," + (z + l), 0 < k && (I += " A" + k + "," + t + ",0," + J + ",0," + u + "," + (y + l))), I = a.path(I + " Z", void 0, void 0, "1000,1000").attr(C),
            e.push(I), I = a.path(" M" + u + "," + y + " L" + u + "," + (y + l) + " L" + v + "," + (w + l) + " L" + v + "," + w + " L" + u + "," + y + " Z", void 0, void 0, "1000,1000").attr(C), l = a.path(" M" + A + "," + B + " L" + A + "," + (B + l) + " L" + D + "," + (z + l) + " L" + D + "," + z + " L" + A + "," + B + " Z", void 0, void 0, "1000,1000").attr(C), e.push(I), e.push(l));
        r ? (H || (h = " A" + p(b - f) + "," + p(c - g) + "," + p(b + f) + "," + p(c + g) + "," + p(v) + "," + p(w) + "," + p(A) + "," + p(B)), f = " M" + p(u) + "," + p(y) + " L" + p(v) + "," + p(w) + h + " L" + p(D) + "," + p(z)) : f = " M" + u + "," + y + " L" + v + "," + w + (" A" + f + "," + g + ",0," + J + ",1," + A + "," + B) + " L" + D + "," +
            z;
        0 < k && (r ? H || (f += " B" + (b - k) + "," + (c - t) + "," + (b + k) + "," + (c + t) + "," + D + "," + z + "," + u + "," + y) : f += " A" + k + "," + t + ",0," + J + ",0," + u + "," + y);
        a.handDrawn && (b = d.line(a, [u, v], [y, w], m.stroke, m.thickness * Math.random() * a.handDrawThickness, m["stroke-opacity"]), e.push(b));
        a = a.path(f + " Z", void 0, void 0, "1000,1000").attr(m);
        if (n) {
            b = [];
            for (c = 0; c < n.length; c++) b.push(d.adjustLuminosity(m.fill, n[c]));
            0 < b.length && a.gradient("linearGradient", b)
        }
        a.pattern(q);
        e.wedge = a;
        e.push(a);
        return e
    };
    d.adjustLuminosity = function(a, b) {
        a = String(a).replace(/[^0-9a-f]/gi,
            "");
        6 > a.length && (a = String(a[0]) + String(a[0]) + String(a[1]) + String(a[1]) + String(a[2]) + String(a[2]));
        b = b || 0;
        var c = "#",
            e, d;
        for (d = 0; 3 > d; d++) e = parseInt(a.substr(2 * d, 2), 16), e = Math.round(Math.min(Math.max(0, e + e * b), 255)).toString(16), c += ("00" + e).substr(e.length);
        return c
    }
})();
(function() {
    var d = window.AmCharts;
    d.Bezier = d.Class({
        construct: function(a, b, c, e, h, f, g, k, l, m) {
            "object" == typeof g && (g = g[0]);
            "object" == typeof k && (k = k[0]);
            0 === k && (g = "none");
            f = { fill: g, "fill-opacity": k, "stroke-width": f };
            void 0 !== l && 0 < l && (f["stroke-dasharray"] = l);
            isNaN(h) || (f["stroke-opacity"] = h);
            e && (f.stroke = e);
            e = "M" + Math.round(b[0]) + "," + Math.round(c[0]);
            h = [];
            for (l = 0; l < b.length; l++) h.push({ x: Number(b[l]), y: Number(c[l]) });
            1 < h.length && (b = this.interpolate(h), e += this.drawBeziers(b));
            m ? e += m : d.VML || (e += "M0,0 L0,0");
            this.path = a.path(e).attr(f);
            this.node = this.path.node
        },
        interpolate: function(a) {
            var b = [];
            b.push({ x: a[0].x, y: a[0].y });
            var c = a[1].x - a[0].x,
                e = a[1].y - a[0].y,
                h = d.bezierX,
                f = d.bezierY;
            b.push({ x: a[0].x + c / h, y: a[0].y + e / f });
            var g;
            for (g = 1; g < a.length - 1; g++) {
                var k = a[g - 1],
                    l = a[g],
                    e = a[g + 1];
                isNaN(e.x) && (e = l);
                isNaN(l.x) && (l = k);
                isNaN(k.x) && (k = l);
                c = e.x - l.x;
                e = e.y - k.y;
                k = l.x - k.x;
                k > c && (k = c);
                b.push({ x: l.x - k / h, y: l.y - e / f });
                b.push({ x: l.x, y: l.y });
                b.push({ x: l.x + k / h, y: l.y + e / f })
            }
            e = a[a.length - 1].y - a[a.length - 2].y;
            c = a[a.length - 1].x -
                a[a.length - 2].x;
            b.push({ x: a[a.length - 1].x - c / h, y: a[a.length - 1].y - e / f });
            b.push({ x: a[a.length - 1].x, y: a[a.length - 1].y });
            return b
        },
        drawBeziers: function(a) {
            var b = "",
                c;
            for (c = 0; c < (a.length - 1) / 3; c++) b += this.drawBezierMidpoint(a[3 * c], a[3 * c + 1], a[3 * c + 2], a[3 * c + 3]);
            return b
        },
        drawBezierMidpoint: function(a, b, c, d) {
            var h = Math.round,
                f = this.getPointOnSegment(a, b, .75),
                g = this.getPointOnSegment(d, c, .75),
                k = (d.x - a.x) / 16,
                l = (d.y - a.y) / 16,
                m = this.getPointOnSegment(a, b, .375);
            a = this.getPointOnSegment(f, g, .375);
            a.x -= k;
            a.y -= l;
            b = this.getPointOnSegment(g,
                f, .375);
            b.x += k;
            b.y += l;
            c = this.getPointOnSegment(d, c, .375);
            k = this.getMiddle(m, a);
            f = this.getMiddle(f, g);
            g = this.getMiddle(b, c);
            m = " Q" + h(m.x) + "," + h(m.y) + "," + h(k.x) + "," + h(k.y);
            m += " Q" + h(a.x) + "," + h(a.y) + "," + h(f.x) + "," + h(f.y);
            m += " Q" + h(b.x) + "," + h(b.y) + "," + h(g.x) + "," + h(g.y);
            return m += " Q" + h(c.x) + "," + h(c.y) + "," + h(d.x) + "," + h(d.y)
        },
        getMiddle: function(a, b) { return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 } },
        getPointOnSegment: function(a, b, c) { return { x: a.x + (b.x - a.x) * c, y: a.y + (b.y - a.y) * c } }
    })
})();
(function() {
    var d = window.AmCharts;
    d.AmDraw = d.Class({
        construct: function(a, b, c, e) {
            d.SVG_NS = "http://www.w3.org/2000/svg";
            d.SVG_XLINK = "http://www.w3.org/1999/xlink";
            d.hasSVG = !!document.createElementNS && !!document.createElementNS(d.SVG_NS, "svg").createSVGRect;
            1 > b && (b = 10);
            1 > c && (c = 10);
            this.div = a;
            this.width = b;
            this.height = c;
            this.rBin = document.createElement("div");
            d.hasSVG ? (d.SVG = !0, b = this.createSvgElement("svg"), a.appendChild(b), this.container = b, this.addDefs(e), this.R = new d.SVGRenderer(this)) : d.isIE && d.VMLRenderer &&
                (d.VML = !0, d.vmlStyleSheet || (document.namespaces.add("amvml", "urn:schemas-microsoft-com:vml"), 31 > document.styleSheets.length ? (b = document.createStyleSheet(), b.addRule(".amvml", "behavior:url(#default#VML); display:inline-block; antialias:true"), d.vmlStyleSheet = b) : document.styleSheets[0].addRule(".amvml", "behavior:url(#default#VML); display:inline-block; antialias:true")), this.container = a, this.R = new d.VMLRenderer(this, e), this.R.disableSelection(a))
        },
        createSvgElement: function(a) {
            return document.createElementNS(d.SVG_NS,
                a)
        },
        circle: function(a, b, c, e) {
            var h = new d.AmDObject("circle", this);
            h.attr({ r: c, cx: a, cy: b });
            this.addToContainer(h.node, e);
            return h
        },
        ellipse: function(a, b, c, e, h) {
            var f = new d.AmDObject("ellipse", this);
            f.attr({ rx: c, ry: e, cx: a, cy: b });
            this.addToContainer(f.node, h);
            return f
        },
        setSize: function(a, b) { 0 < a && 0 < b && (this.container.style.width = a + "px", this.container.style.height = b + "px") },
        rect: function(a, b, c, e, h, f, g) {
            var k = new d.AmDObject("rect", this);
            d.VML && (h = Math.round(100 * h / Math.min(c, e)), c += 2 * f, e += 2 * f, k.bw = f, k.node.style.marginLeft = -f, k.node.style.marginTop = -f);
            1 > c && (c = 1);
            1 > e && (e = 1);
            k.attr({ x: a, y: b, width: c, height: e, rx: h, ry: h, "stroke-width": f });
            this.addToContainer(k.node, g);
            return k
        },
        image: function(a, b, c, e, h, f) {
            var g = new d.AmDObject("image", this);
            g.attr({ x: b, y: c, width: e, height: h });
            this.R.path(g, a);
            this.addToContainer(g.node, f);
            return g
        },
        addToContainer: function(a, b) {
            b || (b = this.container);
            b.appendChild(a)
        },
        text: function(a, b, c) { return this.R.text(a, b, c) },
        path: function(a, b, c, e) {
            var h = new d.AmDObject("path", this);
            e || (e = "100,100");
            h.attr({ cs: e });
            c ? h.attr({ dd: a }) : h.attr({ d: a });
            this.addToContainer(h.node, b);
            return h
        },
        set: function(a) { return this.R.set(a) },
        remove: function(a) {
            if (a) {
                var b = this.rBin;
                b.appendChild(a);
                b.innerHTML = ""
            }
        },
        renderFix: function() {
            var a = this.container,
                b = a.style,
                c;
            try { c = a.getScreenCTM() || a.createSVGMatrix() } catch (d) { c = a.createSVGMatrix() }
            a = 1 - c.e % 1;
            c = 1 - c.f % 1;
            .5 < a && --a;
            .5 < c && --c;
            a && (b.left = a + "px");
            c && (b.top = c + "px")
        },
        update: function() { this.R.update() },
        addDefs: function(a) {
            if (d.hasSVG) {
                var b = this.createSvgElement("desc"),
                    c = this.container;
                c.setAttribute("version", "1.1");
                c.style.position = "absolute";
                this.setSize(this.width, this.height);
                d.rtl && (c.setAttribute("direction", "rtl"), c.style.left = "auto", c.style.right = "0px");
                b.appendChild(document.createTextNode("JavaScript chart by amCharts " + a.version));
                c.appendChild(b);
                a.defs && (b = this.createSvgElement("defs"), c.appendChild(b), d.parseDefs(a.defs, b), this.defs = b)
            }
        }
    })
})();
(function() {
    var d = window.AmCharts;
    d.AmDObject = d.Class({
        construct: function(a, b) {
            this.D = b;
            this.R = b.R;
            this.node = this.R.create(this, a);
            this.y = this.x = 0;
            this.scale = 1
        },
        attr: function(a) { this.R.attr(this, a); return this },
        getAttr: function(a) { return this.node.getAttribute(a) },
        setAttr: function(a, b) { this.R.setAttr(this, a, b); return this },
        clipRect: function(a, b, c, d) { this.R.clipRect(this, a, b, c, d) },
        translate: function(a, b, c, d) {
            d || (a = Math.round(a), b = Math.round(b));
            this.R.move(this, a, b, c);
            this.x = a;
            this.y = b;
            this.scale =
                c;
            this.angle && this.rotate(this.angle)
        },
        rotate: function(a, b) {
            this.R.rotate(this, a, b);
            this.angle = a
        },
        animate: function(a, b, c) {
            for (var e in a)
                if (a.hasOwnProperty(e)) {
                    var h = e,
                        f = a[e];
                    c = d.getEffect(c);
                    this.R.animate(this, h, f, b, c)
                }
        },
        push: function(a) {
            if (a) {
                var b = this.node;
                b.appendChild(a.node);
                var c = a.clipPath;
                c && b.appendChild(c);
                (a = a.grad) && b.appendChild(a)
            }
        },
        text: function(a) { this.R.setText(this, a) },
        remove: function() { this.R.remove(this) },
        clear: function() {
            var a = this.node;
            if (a.hasChildNodes())
                for (; 1 <= a.childNodes.length;) a.removeChild(a.firstChild)
        },
        hide: function() { this.setAttr("visibility", "hidden") },
        show: function() { this.setAttr("visibility", "visible") },
        getBBox: function() { return this.R.getBBox(this) },
        toFront: function() {
            var a = this.node;
            if (a) {
                this.prevNextNode = a.nextSibling;
                var b = a.parentNode;
                b && b.appendChild(a)
            }
        },
        toPrevious: function() {
            var a = this.node;
            a && this.prevNextNode && (a = a.parentNode) && a.insertBefore(this.prevNextNode, null)
        },
        toBack: function() {
            var a = this.node;
            if (a) {
                this.prevNextNode = a.nextSibling;
                var b = a.parentNode;
                if (b) {
                    var c = b.firstChild;
                    c && b.insertBefore(a, c)
                }
            }
        },
        mouseover: function(a) { this.R.addListener(this, "mouseover", a); return this },
        mouseout: function(a) { this.R.addListener(this, "mouseout", a); return this },
        click: function(a) { this.R.addListener(this, "click", a); return this },
        dblclick: function(a) { this.R.addListener(this, "dblclick", a); return this },
        mousedown: function(a) { this.R.addListener(this, "mousedown", a); return this },
        mouseup: function(a) { this.R.addListener(this, "mouseup", a); return this },
        touchstart: function(a) {
            this.R.addListener(this,
                "touchstart", a);
            return this
        },
        touchend: function(a) { this.R.addListener(this, "touchend", a); return this },
        contextmenu: function(a) { this.node.addEventListener ? this.node.addEventListener("contextmenu", a, !0) : this.R.addListener(this, "contextmenu", a); return this },
        stop: function() {
            d.removeFromArray(this.R.animations, this.an_x);
            d.removeFromArray(this.R.animations, this.an_y)
        },
        length: function() { return this.node.childNodes.length },
        gradient: function(a, b, c) { this.R.gradient(this, a, b, c) },
        pattern: function(a, b) {
            a && this.R.pattern(this,
                a, b)
        }
    })
})();
(function() {
    var d = window.AmCharts;
    d.VMLRenderer = d.Class({
        construct: function(a, b) {
            this.chart = b;
            this.D = a;
            this.cNames = { circle: "oval", ellipse: "oval", rect: "roundrect", path: "shape" };
            this.styleMap = { x: "left", y: "top", width: "width", height: "height", "font-family": "fontFamily", "font-size": "fontSize", visibility: "visibility" }
        },
        create: function(a, b) {
            var c;
            if ("group" == b) c = document.createElement("div"), a.type = "div";
            else if ("text" == b) c = document.createElement("div"), a.type = "text";
            else if ("image" == b) c = document.createElement("img"),
                a.type = "image";
            else {
                a.type = "shape";
                a.shapeType = this.cNames[b];
                c = document.createElement("amvml:" + this.cNames[b]);
                var d = document.createElement("amvml:stroke");
                c.appendChild(d);
                a.stroke = d;
                var h = document.createElement("amvml:fill");
                c.appendChild(h);
                a.fill = h;
                h.className = "amvml";
                d.className = "amvml";
                c.className = "amvml"
            }
            c.style.position = "absolute";
            c.style.top = 0;
            c.style.left = 0;
            return c
        },
        path: function(a, b) { a.node.setAttribute("src", b) },
        setAttr: function(a, b, c) {
            if (void 0 !== c) {
                var e;
                8 === document.documentMode &&
                    (e = !0);
                var h = a.node,
                    f = a.type,
                    g = h.style;
                "r" == b && (g.width = 2 * c, g.height = 2 * c);
                "oval" == a.shapeType && ("rx" == b && (g.width = 2 * c), "ry" == b && (g.height = 2 * c));
                "roundrect" == a.shapeType && ("width" != b && "height" != b || --c);
                "cursor" == b && (g.cursor = c);
                "cx" == b && (g.left = c - d.removePx(g.width) / 2);
                "cy" == b && (g.top = c - d.removePx(g.height) / 2);
                var k = this.styleMap[b];
                void 0 !== k && (g[k] = c);
                "text" == f && ("text-anchor" == b && (a.anchor = c, k = h.clientWidth, "end" == c && (g.marginLeft = -k + "px"), "middle" == c && (g.marginLeft = -(k / 2) + "px", g.textAlign = "center"),
                    "start" == c && (g.marginLeft = "0px")), "fill" == b && (g.color = c), "font-weight" == b && (g.fontWeight = c));
                if (g = a.children)
                    for (k = 0; k < g.length; k++) g[k].setAttr(b, c);
                if ("shape" == f) {
                    "cs" == b && (h.style.width = "100px", h.style.height = "100px", h.setAttribute("coordsize", c));
                    "d" == b && h.setAttribute("path", this.svgPathToVml(c));
                    "dd" == b && h.setAttribute("path", c);
                    f = a.stroke;
                    a = a.fill;
                    "stroke" == b && (e ? f.color = c : f.setAttribute("color", c));
                    "stroke-width" == b && (e ? f.weight = c : f.setAttribute("weight", c));
                    "stroke-opacity" == b && (e ? f.opacity =
                        c : f.setAttribute("opacity", c));
                    "stroke-dasharray" == b && (g = "solid", 0 < c && 3 > c && (g = "dot"), 3 <= c && 6 >= c && (g = "dash"), 6 < c && (g = "longdash"), e ? f.dashstyle = g : f.setAttribute("dashstyle", g));
                    if ("fill-opacity" == b || "opacity" == b) 0 === c ? e ? a.on = !1 : a.setAttribute("on", !1) : e ? a.opacity = c : a.setAttribute("opacity", c);
                    "fill" == b && (e ? a.color = c : a.setAttribute("color", c));
                    "rx" == b && (e ? h.arcSize = c + "%" : h.setAttribute("arcsize", c + "%"))
                }
            }
        },
        attr: function(a, b) { for (var c in b) b.hasOwnProperty(c) && this.setAttr(a, c, b[c]) },
        text: function(a,
            b, c) {
            var e = new d.AmDObject("text", this.D),
                h = e.node;
            h.style.whiteSpace = "pre";
            h.innerHTML = a;
            this.D.addToContainer(h, c);
            this.attr(e, b);
            return e
        },
        getBBox: function(a) { return this.getBox(a.node) },
        getBox: function(a) {
            var b = a.offsetLeft,
                c = a.offsetTop,
                d = a.offsetWidth,
                h = a.offsetHeight,
                f;
            if (a.hasChildNodes()) {
                var g, k, l;
                for (l = 0; l < a.childNodes.length; l++) {
                    f = this.getBox(a.childNodes[l]);
                    var m = f.x;
                    isNaN(m) || (isNaN(g) ? g = m : m < g && (g = m));
                    var n = f.y;
                    isNaN(n) || (isNaN(k) ? k = n : n < k && (k = n));
                    m = f.width + m;
                    isNaN(m) || (d = Math.max(d,
                        m));
                    f = f.height + n;
                    isNaN(f) || (h = Math.max(h, f))
                }
                0 > g && (b += g);
                0 > k && (c += k)
            }
            return { x: b, y: c, width: d, height: h }
        },
        setText: function(a, b) {
            var c = a.node;
            c && (c.innerHTML = b);
            this.setAttr(a, "text-anchor", a.anchor)
        },
        addListener: function(a, b, c) { a.node["on" + b] = c },
        move: function(a, b, c) {
            var e = a.node,
                h = e.style;
            "text" == a.type && (c -= d.removePx(h.fontSize) / 2 - 1);
            "oval" == a.shapeType && (b -= d.removePx(h.width) / 2, c -= d.removePx(h.height) / 2);
            a = a.bw;
            isNaN(a) || (b -= a, c -= a);
            isNaN(b) || isNaN(c) || (e.style.left = b + "px", e.style.top = c + "px")
        },
        svgPathToVml: function(a) {
            var b =
                a.split(" ");
            a = "";
            var c, d = Math.round,
                h;
            for (h = 0; h < b.length; h++) {
                var f = b[h],
                    g = f.substring(0, 1),
                    f = f.substring(1),
                    k = f.split(","),
                    l = d(k[0]) + "," + d(k[1]);
                "M" == g && (a += " m " + l);
                "L" == g && (a += " l " + l);
                "Z" == g && (a += " x e");
                if ("Q" == g) {
                    var m = c.length,
                        n = c[m - 1],
                        q = k[0],
                        p = k[1],
                        l = k[2],
                        t = k[3];
                    c = d(c[m - 2] / 3 + 2 / 3 * q);
                    n = d(n / 3 + 2 / 3 * p);
                    q = d(2 / 3 * q + l / 3);
                    p = d(2 / 3 * p + t / 3);
                    a += " c " + c + "," + n + "," + q + "," + p + "," + l + "," + t
                }
                "A" == g && (a += " wa " + f);
                "B" == g && (a += " at " + f);
                c = k
            }
            return a
        },
        animate: function(a, b, c, d, h) {
            var f = a.node,
                g = this.chart;
            if ("translate" ==
                b) {
                b = c.split(",");
                c = b[1];
                var k = f.offsetTop;
                g.animate(a, "left", f.offsetLeft, b[0], d, h, "px");
                g.animate(a, "top", k, c, d, h, "px")
            }
        },
        clipRect: function(a, b, c, d, h) {
            a = a.node;
            0 === b && 0 === c ? (a.style.width = d + "px", a.style.height = h + "px", a.style.overflow = "hidden") : a.style.clip = "rect(" + c + "px " + (b + d) + "px " + (c + h) + "px " + b + "px)"
        },
        rotate: function(a, b, c) {
            if (0 !== Number(b)) {
                var e = a.node;
                a = e.style;
                c || (c = this.getBGColor(e.parentNode));
                a.backgroundColor = c;
                a.paddingLeft = 1;
                c = b * Math.PI / 180;
                var h = Math.cos(c),
                    f = Math.sin(c),
                    g = d.removePx(a.left),
                    k = d.removePx(a.top),
                    l = e.offsetWidth,
                    e = e.offsetHeight;
                b /= Math.abs(b);
                a.left = g + l / 2 - l / 2 * Math.cos(c) - b * e / 2 * Math.sin(c) + 3;
                a.top = k - b * l / 2 * Math.sin(c) + b * e / 2 * Math.sin(c);
                a.cssText = a.cssText + "; filter:progid:DXImageTransform.Microsoft.Matrix(M11='" + h + "', M12='" + -f + "', M21='" + f + "', M22='" + h + "', sizingmethod='auto expand');"
            }
        },
        getBGColor: function(a) { var b = "#FFFFFF"; if (a.style) { var c = a.style.backgroundColor; "" !== c ? b = c : a.parentNode && (b = this.getBGColor(a.parentNode)) } return b },
        set: function(a) {
            var b = new d.AmDObject("group",
                this.D);
            this.D.container.appendChild(b.node);
            if (a) { var c; for (c = 0; c < a.length; c++) b.push(a[c]) }
            return b
        },
        gradient: function(a, b, c, d) {
            var h = "";
            "radialGradient" == b && (b = "gradientradial", c.reverse());
            "linearGradient" == b && (b = "gradient");
            var f;
            for (f = 0; f < c.length; f++) {
                var g = Math.round(100 * f / (c.length - 1)),
                    h = h + (g + "% " + c[f]);
                f < c.length - 1 && (h += ",")
            }
            a = a.fill;
            90 == d ? d = 0 : 270 == d ? d = 180 : 180 == d ? d = 90 : 0 === d && (d = 270);
            8 === document.documentMode ? (a.type = b, a.angle = d) : (a.setAttribute("type", b), a.setAttribute("angle", d));
            h && (a.colors.value =
                h)
        },
        remove: function(a) {
            a.clipPath && this.D.remove(a.clipPath);
            this.D.remove(a.node)
        },
        disableSelection: function(a) {
            void 0 !== typeof a.onselectstart && (a.onselectstart = function() { return !1 });
            a.style.cursor = "default"
        },
        pattern: function(a, b) {
            var c = a.node,
                d = a.fill,
                h = "none";
            b.color && (h = b.color);
            c.fillColor = h;
            8 === document.documentMode ? (d.type = "tile", d.src = b.url) : (d.setAttribute("type", "tile"), d.setAttribute("src", b.url))
        },
        update: function() {}
    })
})();
(function() {
    var d = window.AmCharts;
    d.SVGRenderer = d.Class({
        construct: function(a) {
            this.D = a;
            this.animations = []
        },
        create: function(a, b) { return document.createElementNS(d.SVG_NS, b) },
        attr: function(a, b) { for (var c in b) b.hasOwnProperty(c) && this.setAttr(a, c, b[c]) },
        setAttr: function(a, b, c) { void 0 !== c && a.node.setAttribute(b, c) },
        animate: function(a, b, c, e, h) {
            var f = a.node;
            a["an_" + b] && d.removeFromArray(this.animations, a["an_" + b]);
            "translate" == b ? (f = (f = f.getAttribute("transform")) ? String(f).substring(10, f.length - 1) : "0,0",
                f = f.split(", ").join(" "), f = f.split(" ").join(","), 0 === f && (f = "0,0")) : f = Number(f.getAttribute(b));
            c = { obj: a, frame: 0, attribute: b, from: f, to: c, time: e, effect: h };
            this.animations.push(c);
            a["an_" + b] = c
        },
        update: function() {
            var a, b = this.animations;
            for (a = b.length - 1; 0 <= a; a--) {
                var c = b[a],
                    e = 1E3 * c.time / d.updateRate,
                    h = c.frame + 1,
                    f = c.obj,
                    g = c.attribute,
                    k, l, m;
                h <= e ? (c.frame++, "translate" == g ? (k = c.from.split(","), g = Number(k[0]), k = Number(k[1]), isNaN(k) && (k = 0), l = c.to.split(","), m = Number(l[0]), l = Number(l[1]), m = 0 === m - g ? m : Math.round(d[c.effect](0,
                    h, g, m - g, e)), c = 0 === l - k ? l : Math.round(d[c.effect](0, h, k, l - k, e)), g = "transform", c = "translate(" + m + "," + c + ")") : (l = Number(c.from), k = Number(c.to), m = k - l, c = d[c.effect](0, h, l, m, e), isNaN(c) && (c = k), 0 === m && this.animations.splice(a, 1)), this.setAttr(f, g, c)) : ("translate" == g ? (l = c.to.split(","), m = Number(l[0]), l = Number(l[1]), f.translate(m, l)) : (k = Number(c.to), this.setAttr(f, g, k)), this.animations.splice(a, 1))
            }
        },
        getBBox: function(a) {
            if (a = a.node) try { return a.getBBox() } catch (b) {}
            return { width: 0, height: 0, x: 0, y: 0 }
        },
        path: function(a,
            b) { a.node.setAttributeNS(d.SVG_XLINK, "xlink:href", b) },
        clipRect: function(a, b, c, e, h) {
            var f = a.node,
                g = a.clipPath;
            g && this.D.remove(g);
            var k = f.parentNode;
            k && (f = document.createElementNS(d.SVG_NS, "clipPath"), g = d.getUniqueId(), f.setAttribute("id", g), this.D.rect(b, c, e, h, 0, 0, f), k.appendChild(f), b = "#", d.baseHref && !d.isIE && (b = this.removeTarget(window.location.href) + b), this.setAttr(a, "clip-path", "url(" + b + g + ")"), this.clipPathC++, a.clipPath = f)
        },
        text: function(a, b, c) {
            var e = new d.AmDObject("text", this.D);
            a = String(a).split("\n");
            var h = b["font-size"],
                f;
            for (f = 0; f < a.length; f++) {
                var g = this.create(null, "tspan");
                g.appendChild(document.createTextNode(a[f]));
                g.setAttribute("y", (h + 2) * f + Math.round(h / 2));
                g.setAttribute("x", 0);
                g.style.fontSize = h + "px";
                e.node.appendChild(g)
            }
            e.node.setAttribute("y", Math.round(h / 2));
            this.attr(e, b);
            this.D.addToContainer(e.node, c);
            return e
        },
        setText: function(a, b) {
            var c = a.node;
            c && (c.removeChild(c.firstChild), c.appendChild(document.createTextNode(b)))
        },
        move: function(a, b, c, d) {
            isNaN(b) && (b = 0);
            isNaN(c) && (c = 0);
            b =
                "translate(" + b + "," + c + ")";
            d && (b = b + " scale(" + d + ")");
            this.setAttr(a, "transform", b)
        },
        rotate: function(a, b) {
            var c = a.node.getAttribute("transform"),
                d = "rotate(" + b + ")";
            c && (d = c + " " + d);
            this.setAttr(a, "transform", d)
        },
        set: function(a) {
            var b = new d.AmDObject("g", this.D);
            this.D.container.appendChild(b.node);
            if (a) { var c; for (c = 0; c < a.length; c++) b.push(a[c]) }
            return b
        },
        addListener: function(a, b, c) { a.node["on" + b] = c },
        gradient: function(a, b, c, e) {
            var h = a.node,
                f = a.grad;
            f && this.D.remove(f);
            b = document.createElementNS(d.SVG_NS,
                b);
            f = d.getUniqueId();
            b.setAttribute("id", f);
            if (!isNaN(e)) {
                var g = 0,
                    k = 0,
                    l = 0,
                    m = 0;
                90 == e ? l = 100 : 270 == e ? m = 100 : 180 == e ? g = 100 : 0 === e && (k = 100);
                b.setAttribute("x1", g + "%");
                b.setAttribute("x2", k + "%");
                b.setAttribute("y1", l + "%");
                b.setAttribute("y2", m + "%")
            }
            for (e = 0; e < c.length; e++) g = document.createElementNS(d.SVG_NS, "stop"), k = 100 * e / (c.length - 1), 0 === e && (k = 0), g.setAttribute("offset", k + "%"), g.setAttribute("stop-color", c[e]), b.appendChild(g);
            h.parentNode.appendChild(b);
            c = "#";
            d.baseHref && !d.isIE && (c = this.removeTarget(window.location.href) +
                c);
            h.setAttribute("fill", "url(" + c + f + ")");
            a.grad = b
        },
        removeTarget: function(a) { return a.split("#")[0] },
        pattern: function(a, b, c) {
            var e = a.node;
            isNaN(c) && (c = 1);
            var h = a.patternNode;
            h && this.D.remove(h);
            var h = document.createElementNS(d.SVG_NS, "pattern"),
                f = d.getUniqueId(),
                g = b;
            b.url && (g = b.url);
            var k = Number(b.width);
            isNaN(k) && (k = 4);
            var l = Number(b.height);
            isNaN(l) && (l = 4);
            k /= c;
            l /= c;
            c = b.x;
            isNaN(c) && (c = 0);
            var m = -Math.random() * Number(b.randomX);
            isNaN(m) || (c = m);
            m = b.y;
            isNaN(m) && (m = 0);
            var n = -Math.random() * Number(b.randomY);
            isNaN(n) || (m = n);
            h.setAttribute("id", f);
            h.setAttribute("width", k);
            h.setAttribute("height", l);
            h.setAttribute("patternUnits", "userSpaceOnUse");
            h.setAttribute("xlink:href", g);
            b.color && (n = document.createElementNS(d.SVG_NS, "rect"), n.setAttributeNS(null, "height", k), n.setAttributeNS(null, "width", l), n.setAttributeNS(null, "fill", b.color), h.appendChild(n));
            this.D.image(g, 0, 0, k, l, h).translate(c, m);
            g = "#";
            d.baseHref && !d.isIE && (g = this.removeTarget(window.location.href) + g);
            e.setAttribute("fill", "url(" + g + f + ")");
            a.patternNode =
                h;
            e.parentNode.appendChild(h)
        },
        remove: function(a) {
            a.clipPath && this.D.remove(a.clipPath);
            a.grad && this.D.remove(a.grad);
            a.patternNode && this.D.remove(a.patternNode);
            this.D.remove(a.node)
        }
    })
})();
AmCharts.AmDSet = AmCharts.Class({ construct: function(d) { this.create("g") }, attr: function(d) { this.R.attr(this.node, d) }, move: function(d, a) { this.R.move(this.node, d, a) } });
(function() {
    var d = window.AmCharts;
    d.AmLegend = d.Class({
        construct: function(a) {
            this.enabled = !0;
            this.cname = "AmLegend";
            this.createEvents("rollOverMarker", "rollOverItem", "rollOutMarker", "rollOutItem", "showItem", "hideItem", "clickMarker", "rollOverItem", "rollOutItem", "clickLabel");
            this.position = "bottom";
            this.borderColor = this.color = "#000000";
            this.borderAlpha = 0;
            this.markerLabelGap = 5;
            this.verticalGap = 10;
            this.align = "left";
            this.horizontalGap = 0;
            this.spacing = 10;
            this.markerDisabledColor = "#AAB3B3";
            this.markerType =
                "square";
            this.markerSize = 16;
            this.markerBorderThickness = this.markerBorderAlpha = 1;
            this.marginBottom = this.marginTop = 0;
            this.marginLeft = this.marginRight = 20;
            this.autoMargins = !0;
            this.valueWidth = 50;
            this.switchable = !0;
            this.switchType = "x";
            this.switchColor = "#FFFFFF";
            this.rollOverColor = "#CC0000";
            this.reversedOrder = !1;
            this.labelText = "[[title]]";
            this.valueText = "[[value]]";
            this.useMarkerColorForLabels = !1;
            this.rollOverGraphAlpha = 1;
            this.textClickEnabled = !1;
            this.equalWidths = !0;
            this.dateFormat = "DD-MM-YYYY";
            this.backgroundColor =
                "#FFFFFF";
            this.backgroundAlpha = 0;
            this.useGraphSettings = !1;
            this.showEntries = !0;
            d.applyTheme(this, a, this.cname)
        },
        setData: function(a) {
            this.legendData = a;
            this.invalidateSize()
        },
        invalidateSize: function() {
            this.destroy();
            this.entries = [];
            this.valueLabels = [];
            var a = this.legendData;
            this.enabled && (d.ifArray(a) || d.ifArray(this.data)) && this.drawLegend()
        },
        drawLegend: function() {
            var a = this.chart,
                b = this.position,
                c = this.width,
                e = a.divRealWidth,
                h = a.divRealHeight,
                f = this.div,
                g = this.legendData;
            this.data && (g = this.data);
            isNaN(this.fontSize) &&
                (this.fontSize = a.fontSize);
            if ("right" == b || "left" == b) this.maxColumns = 1, this.autoMargins && (this.marginLeft = this.marginRight = 10);
            else if (this.autoMargins) {
                this.marginRight = a.marginRight;
                this.marginLeft = a.marginLeft;
                var k = a.autoMarginOffset;
                "bottom" == b ? (this.marginBottom = k, this.marginTop = 0) : (this.marginTop = k, this.marginBottom = 0)
            }
            c = void 0 !== c ? d.toCoordinate(c, e) : a.realWidth;
            "outside" == b ? (c = f.offsetWidth, h = f.offsetHeight, f.clientHeight && (c = f.clientWidth, h = f.clientHeight)) : (isNaN(c) || (f.style.width = c + "px"),
                f.className = "amChartsLegend " + a.classNamePrefix + "-legend-div");
            this.divWidth = c;
            (b = this.container) ? (b.container.innerHTML = "", f.appendChild(b.container), b.width = c, b.height = h, b.addDefs(a)) : b = new d.AmDraw(f, c, h, a);
            this.container = b;
            this.lx = 0;
            this.ly = 8;
            h = this.markerSize;
            h > this.fontSize && (this.ly = h / 2 - 1);
            0 < h && (this.lx += h + this.markerLabelGap);
            this.titleWidth = 0;
            if (h = this.title) h = d.text(this.container, h, this.color, a.fontFamily, this.fontSize, "start", !0), d.setCN(a, h, "legend-title"), h.translate(this.marginLeft,
                this.marginTop + this.verticalGap + this.ly + 1), a = h.getBBox(), this.titleWidth = a.width + 15, this.titleHeight = a.height + 6;
            this.index = this.maxLabelWidth = 0;
            if (this.showEntries) { for (a = 0; a < g.length; a++) this.createEntry(g[a]); for (a = this.index = 0; a < g.length; a++) this.createValue(g[a]) }
            this.arrangeEntries();
            this.updateValues()
        },
        arrangeEntries: function() {
            var a = this.position,
                b = this.marginLeft + this.titleWidth,
                c = this.marginRight,
                e = this.marginTop,
                h = this.marginBottom,
                f = this.horizontalGap,
                g = this.div,
                k = this.divWidth,
                l = this.maxColumns,
                m = this.verticalGap,
                n = this.spacing,
                q = k - c - b,
                p = 0,
                t = 0,
                r = this.container;
            this.set && this.set.remove();
            var u = r.set();
            this.set = u;
            var z = r.set();
            u.push(z);
            var y = this.entries,
                v, w;
            for (w = 0; w < y.length; w++) {
                v = y[w].getBBox();
                var A = v.width;
                A > p && (p = A);
                v = v.height;
                v > t && (t = v)
            }
            var A = t = 0,
                B = f,
                D = 0,
                C = 0;
            for (w = 0; w < y.length; w++) {
                var J = y[w];
                this.reversedOrder && (J = y[y.length - w - 1]);
                v = J.getBBox();
                var H;
                this.equalWidths ? H = f + A * (p + n + this.markerLabelGap) : (H = B, B = B + v.width + f + n);
                v.height > C && (C = v.height);
                H + v.width > q && 0 < w && 0 !== A && (t++, A = 0,
                    H = f, B = H + v.width + f + n, D = D + C + m, C = 0);
                J.translate(H, D);
                A++;
                !isNaN(l) && A >= l && (A = 0, t++, D = D + C + m, C = 0);
                z.push(J)
            }
            v = z.getBBox();
            l = v.height + 2 * m - 1;
            "left" == a || "right" == a ? (n = v.width + 2 * f, k = n + b + c, g.style.width = k + "px", this.ieW = k) : n = k - b - c - 1;
            c = d.polygon(this.container, [0, n, n, 0], [0, 0, l, l], this.backgroundColor, this.backgroundAlpha, 1, this.borderColor, this.borderAlpha);
            d.setCN(this.chart, c, "legend-bg");
            u.push(c);
            u.translate(b, e);
            c.toBack();
            b = f;
            if ("top" == a || "bottom" == a || "absolute" == a || "outside" == a) "center" == this.align ? b =
                f + (n - v.width) / 2 : "right" == this.align && (b = f + n - v.width);
            z.translate(b, m + 1);
            this.titleHeight > l && (l = this.titleHeight);
            a = l + e + h + 1;
            0 > a && (a = 0);
            a > this.chart.divRealHeight && (g.style.top = "0px");
            g.style.height = Math.round(a) + "px";
            r.setSize(this.divWidth, a)
        },
        createEntry: function(a) {
            if (!1 !== a.visibleInLegend) {
                var b = this.chart,
                    c = a.markerType;
                a.legendEntryWidth = this.markerSize;
                c || (c = this.markerType);
                var e = a.color,
                    h = a.alpha;
                a.legendKeyColor && (e = a.legendKeyColor());
                a.legendKeyAlpha && (h = a.legendKeyAlpha());
                var f;
                !0 ===
                    a.hidden && (f = e = this.markerDisabledColor);
                var g = a.pattern,
                    k = a.customMarker;
                k || (k = this.customMarker);
                var l = this.container,
                    m = this.markerSize,
                    n = 0,
                    q = 0,
                    p = m / 2;
                if (this.useGraphSettings) {
                    c = a.type;
                    this.switchType = void 0;
                    if ("line" == c || "step" == c || "smoothedLine" == c || "ohlc" == c) g = l.set(), a.hidden || (e = a.lineColorR, f = a.bulletBorderColorR), n = d.line(l, [0, 2 * m], [m / 2, m / 2], e, a.lineAlpha, a.lineThickness, a.dashLength), d.setCN(b, n, "graph-stroke"), g.push(n), a.bullet && (a.hidden || (e = a.bulletColorR), n = d.bullet(l, a.bullet, a.bulletSize,
                        e, a.bulletAlpha, a.bulletBorderThickness, f, a.bulletBorderAlpha)) && (d.setCN(b, n, "graph-bullet"), n.translate(m + 1, m / 2), g.push(n)), p = 0, n = m, q = m / 3;
                    else {
                        var t;
                        a.getGradRotation && (t = a.getGradRotation());
                        n = a.fillColorsR;
                        !0 === a.hidden && (n = e);
                        if (g = this.createMarker("rectangle", n, a.fillAlphas, a.lineThickness, e, a.lineAlpha, t, g)) p = m, g.translate(p, m / 2);
                        n = m
                    }
                    d.setCN(b, g, "graph-" + c);
                    d.setCN(b, g, "graph-" + a.id)
                } else k ? (b.path && (k = b.path + k), g = l.image(k, 0, 0, m, m)) : (g = this.createMarker(c, e, h, void 0, void 0, void 0, void 0, g)) &&
                    g.translate(m / 2, m / 2);
                d.setCN(b, g, "legend-marker");
                this.addListeners(g, a);
                l = l.set([g]);
                this.switchable && a.switchable && l.setAttr("cursor", "pointer");
                void 0 !== a.id && d.setCN(b, l, "legend-item-" + a.id);
                d.setCN(b, l, a.className, !0);
                (f = this.switchType) && "none" != f && ("x" == f ? (c = this.createX(), c.translate(m / 2, m / 2)) : c = this.createV(), c.dItem = a, !0 !== a.hidden ? "x" == f ? c.hide() : c.show() : "x" != f && c.hide(), this.switchable || c.hide(), this.addListeners(c, a), a.legendSwitch = c, l.push(c), d.setCN(b, c, "legend-switch"));
                f = this.color;
                a.showBalloon && this.textClickEnabled && void 0 !== this.selectedColor && (f = this.selectedColor);
                this.useMarkerColorForLabels && (f = e);
                !0 === a.hidden && (f = this.markerDisabledColor);
                e = d.massReplace(this.labelText, { "[[title]]": a.title });
                c = this.fontSize;
                g && (m <= c && g.translate(p, m / 2 + this.ly - c / 2 + (c + 2 - m) / 2 - q), a.legendEntryWidth = g.getBBox().width);
                var r;
                e && (e = d.fixBrakes(e), a.legendTextReal = e, r = this.labelWidth, r = isNaN(r) ? d.text(this.container, e, f, b.fontFamily, c, "start") : d.wrappedText(this.container, e, f, b.fontFamily,
                    c, "start", !1, r, 0), d.setCN(b, r, "legend-label"), r.translate(this.lx + n, this.ly), l.push(r), b = r.getBBox().width, this.maxLabelWidth < b && (this.maxLabelWidth = b));
                this.entries[this.index] = l;
                a.legendEntry = this.entries[this.index];
                a.legendLabel = r;
                this.index++
            }
        },
        addListeners: function(a, b) {
            var c = this;
            a && a.mouseover(function(a) { c.rollOverMarker(b, a) }).mouseout(function(a) { c.rollOutMarker(b, a) }).click(function(a) { c.clickMarker(b, a) })
        },
        rollOverMarker: function(a, b) {
            this.switchable && this.dispatch("rollOverMarker", a,
                b);
            this.dispatch("rollOverItem", a, b)
        },
        rollOutMarker: function(a, b) {
            this.switchable && this.dispatch("rollOutMarker", a, b);
            this.dispatch("rollOutItem", a, b)
        },
        clickMarker: function(a, b) {
            this.switchable && (!0 === a.hidden ? this.dispatch("showItem", a, b) : this.dispatch("hideItem", a, b));
            this.dispatch("clickMarker", a, b)
        },
        rollOverLabel: function(a, b) { a.hidden || (this.textClickEnabled && a.legendLabel && a.legendLabel.attr({ fill: this.rollOverColor }), this.dispatch("rollOverItem", a, b)) },
        rollOutLabel: function(a, b) {
            if (!a.hidden) {
                if (this.textClickEnabled &&
                    a.legendLabel) {
                    var c = this.color;
                    void 0 !== this.selectedColor && a.showBalloon && (c = this.selectedColor);
                    this.useMarkerColorForLabels && (c = a.lineColor, void 0 === c && (c = a.color));
                    a.legendLabel.attr({ fill: c })
                }
                this.dispatch("rollOutItem", a, b)
            }
        },
        clickLabel: function(a, b) { this.textClickEnabled ? a.hidden || this.dispatch("clickLabel", a, b) : this.switchable && (!0 === a.hidden ? this.dispatch("showItem", a, b) : this.dispatch("hideItem", a, b)) },
        dispatch: function(a, b, c) { this.fire(a, { type: a, dataItem: b, target: this, event: c, chart: this.chart }) },
        createValue: function(a) {
            var b = this,
                c = b.fontSize,
                e = b.chart;
            if (!1 !== a.visibleInLegend) {
                var h = b.maxLabelWidth;
                b.forceWidth && (h = b.labelWidth);
                b.equalWidths || (b.valueAlign = "left");
                "left" == b.valueAlign && (h = a.legendEntry.getBBox().width);
                var f = h;
                if (b.valueText && 0 < b.valueWidth) {
                    var g = b.color;
                    b.useMarkerColorForValues && (g = a.color, a.legendKeyColor && (g = a.legendKeyColor()));
                    !0 === a.hidden && (g = b.markerDisabledColor);
                    var k = b.valueText,
                        h = h + b.lx + b.markerLabelGap + b.valueWidth,
                        l = "end";
                    "left" == b.valueAlign && (h -= b.valueWidth,
                        l = "start");
                    g = d.text(b.container, k, g, b.chart.fontFamily, c, l);
                    d.setCN(e, g, "legend-value");
                    g.translate(h, b.ly);
                    b.entries[b.index].push(g);
                    f += b.valueWidth + 2 * b.markerLabelGap;
                    g.dItem = a;
                    b.valueLabels.push(g)
                }
                b.index++;
                e = b.markerSize;
                e < c + 7 && (e = c + 7, d.VML && (e += 3));
                c = b.container.rect(a.legendEntryWidth, 0, f, e, 0, 0).attr({ stroke: "none", fill: "#fff", "fill-opacity": .005 });
                c.dItem = a;
                b.entries[b.index - 1].push(c);
                c.mouseover(function(c) { b.rollOverLabel(a, c) }).mouseout(function(c) { b.rollOutLabel(a, c) }).click(function(c) {
                    b.clickLabel(a,
                        c)
                })
            }
        },
        createV: function() { var a = this.markerSize; return d.polygon(this.container, [a / 5, a / 2, a - a / 5, a / 2], [a / 3, a - a / 5, a / 5, a / 1.7], this.switchColor) },
        createX: function() {
            var a = (this.markerSize - 4) / 2,
                b = { stroke: this.switchColor, "stroke-width": 3 },
                c = this.container,
                e = d.line(c, [-a, a], [-a, a]).attr(b),
                a = d.line(c, [-a, a], [a, -a]).attr(b);
            return this.container.set([e, a])
        },
        createMarker: function(a, b, c, e, h, f, g, k) {
            var l = this.markerSize,
                m = this.container;
            h || (h = this.markerBorderColor);
            h || (h = b);
            isNaN(e) && (e = this.markerBorderThickness);
            isNaN(f) && (f = this.markerBorderAlpha);
            return d.bullet(m, a, l, b, c, e, h, f, l, g, k)
        },
        validateNow: function() { this.invalidateSize() },
        updateValues: function() {
            var a = this.valueLabels,
                b = this.chart,
                c, d = this.data;
            for (c = 0; c < a.length; c++) {
                var h = a[c],
                    f = h.dItem,
                    g = " ";
                if (d) f.value ? h.text(f.value) : h.text("");
                else {
                    var k;
                    if (void 0 !== f.type) {
                        k = f.currentDataItem;
                        var l = this.periodValueText;
                        f.legendPeriodValueText && (l = f.legendPeriodValueText);
                        k ? (g = this.valueText, f.legendValueText && (g = f.legendValueText), g = b.formatString(g, k)) :
                            l && (g = b.formatPeriodString(l, f))
                    } else g = b.formatString(this.valueText, f);
                    if (l = this.valueFunction) k && (f = k), g = l(f, g);
                    h.text(g)
                }
            }
        },
        renderFix: function() {
            if (!d.VML) {
                var a = this.container;
                a && a.renderFix()
            }
        },
        destroy: function() {
            this.div.innerHTML = "";
            d.remove(this.set)
        }
    })
})();
(function() {
    var d = window.AmCharts;
    d.formatMilliseconds = function(a, b) {
        if (-1 != a.indexOf("fff")) {
            var c = b.getMilliseconds(),
                d = String(c);
            10 > c && (d = "00" + c);
            10 <= c && 100 > c && (d = "0" + c);
            a = a.replace(/fff/g, d)
        }
        return a
    };
    d.extractPeriod = function(a) {
        var b = d.stripNumbers(a),
            c = 1;
        b != a && (c = Number(a.slice(0, a.indexOf(b))));
        return { period: b, count: c }
    };
    d.getDate = function(a, b, c) { return a instanceof Date ? d.newDate(a, c) : b && isNaN(a) ? d.stringToDate(a, b) : new Date(a) };
    d.newDate = function(a, b) {
        return b && "fff" != b ? new Date(a) : d.useUTC ?
            new Date(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate(), a.getUTCHours(), a.getUTCMinutes(), a.getUTCSeconds(), a.getUTCMilliseconds()) : new Date(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds(), a.getMilliseconds())
    };
    d.resetDateToMin = function(a, b, c, e) {
        void 0 === e && (e = 1);
        var h, f, g, k, l, m, n;
        d.useUTC ? (h = a.getUTCFullYear(), f = a.getUTCMonth(), g = a.getUTCDate(), k = a.getUTCHours(), l = a.getUTCMinutes(), m = a.getUTCSeconds(), n = a.getUTCMilliseconds(), a = a.getUTCDay()) : (h = a.getFullYear(),
            f = a.getMonth(), g = a.getDate(), k = a.getHours(), l = a.getMinutes(), m = a.getSeconds(), n = a.getMilliseconds(), a = a.getDay());
        switch (b) {
            case "YYYY":
                h = Math.floor(h / c) * c;
                f = 0;
                g = 1;
                n = m = l = k = 0;
                break;
            case "MM":
                f = Math.floor(f / c) * c;
                g = 1;
                n = m = l = k = 0;
                break;
            case "WW":
                g = a >= e ? g - a + e : g - (7 + a) + e;
                n = m = l = k = 0;
                break;
            case "DD":
                n = m = l = k = 0;
                break;
            case "hh":
                k = Math.floor(k / c) * c;
                n = m = l = 0;
                break;
            case "mm":
                l = Math.floor(l / c) * c;
                n = m = 0;
                break;
            case "ss":
                m = Math.floor(m / c) * c;
                n = 0;
                break;
            case "fff":
                n = Math.floor(n / c) * c
        }
        d.useUTC ? (a = new Date, a.setUTCFullYear(h,
            f, g), a.setUTCHours(k, l, m, n)) : a = new Date(h, f, g, k, l, m, n);
        return a
    };
    d.getPeriodDuration = function(a, b) {
        void 0 === b && (b = 1);
        var c;
        switch (a) {
            case "YYYY":
                c = 316224E5;
                break;
            case "MM":
                c = 26784E5;
                break;
            case "WW":
                c = 6048E5;
                break;
            case "DD":
                c = 864E5;
                break;
            case "hh":
                c = 36E5;
                break;
            case "mm":
                c = 6E4;
                break;
            case "ss":
                c = 1E3;
                break;
            case "fff":
                c = 1
        }
        return c * b
    };
    d.intervals = {
        s: { nextInterval: "ss", contains: 1E3 },
        ss: { nextInterval: "mm", contains: 60, count: 0 },
        mm: { nextInterval: "hh", contains: 60, count: 1 },
        hh: { nextInterval: "DD", contains: 24, count: 2 },
        DD: { nextInterval: "", contains: Infinity, count: 3 }
    };
    d.getMaxInterval = function(a, b) { var c = d.intervals; return a >= c[b].contains ? (a = Math.round(a / c[b].contains), b = c[b].nextInterval, d.getMaxInterval(a, b)) : "ss" == b ? c[b].nextInterval : b };
    d.dayNames = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ");
    d.shortDayNames = "Sun Mon Tue Wed Thu Fri Sat".split(" ");
    d.monthNames = "January February March April May June July August September October November December".split(" ");
    d.shortMonthNames = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
    d.getWeekNumber = function(a) {
        a = new Date(a);
        a.setHours(0, 0, 0);
        a.setDate(a.getDate() + 4 - (a.getDay() || 7));
        var b = new Date(a.getFullYear(), 0, 1);
        return Math.ceil(((a - b) / 864E5 + 1) / 7)
    };
    d.stringToDate = function(a, b) {
        var c = {},
            e = [{ pattern: "YYYY", period: "year" }, { pattern: "YY", period: "year" }, { pattern: "MM", period: "month" }, { pattern: "M", period: "month" }, { pattern: "DD", period: "date" }, { pattern: "D", period: "date" }, { pattern: "JJ", period: "hours" }, { pattern: "J", period: "hours" }, { pattern: "HH", period: "hours" }, { pattern: "H", period: "hours" },
                { pattern: "KK", period: "hours" }, { pattern: "K", period: "hours" }, { pattern: "LL", period: "hours" }, { pattern: "L", period: "hours" }, { pattern: "NN", period: "minutes" }, { pattern: "N", period: "minutes" }, { pattern: "SS", period: "seconds" }, { pattern: "S", period: "seconds" }, { pattern: "QQQ", period: "milliseconds" }, { pattern: "QQ", period: "milliseconds" }, { pattern: "Q", period: "milliseconds" }
            ],
            h = !0,
            f = b.indexOf("AA"); - 1 != f && (a.substr(f, 2), "pm" == a.toLowerCase && (h = !1));
        var f = b,
            g, k, l;
        for (l = 0; l < e.length; l++) k = e[l].period, c[k] = 0, "date" == k && (c[k] =
            1);
        for (l = 0; l < e.length; l++)
            if (g = e[l].pattern, k = e[l].period, -1 != b.indexOf(g)) {
                var m = d.getFromDateString(g, a, f);
                b = b.replace(g, "");
                if ("KK" == g || "K" == g || "LL" == g || "L" == g) h || (m += 12);
                c[k] = m
            }
        d.useUTC ? (e = new Date, e.setUTCFullYear(c.year, c.month, c.date), e.setUTCHours(c.hours, c.minutes, c.seconds, c.milliseconds)) : e = new Date(c.year, c.month, c.date, c.hours, c.minutes, c.seconds, c.milliseconds);
        return e
    };
    d.getFromDateString = function(a, b, c) {
        if (void 0 !== b) return c = c.indexOf(a), b = String(b), b = b.substr(c, a.length), "0" == b.charAt(0) &&
            (b = b.substr(1, b.length - 1)), b = Number(b), isNaN(b) && (b = 0), -1 != a.indexOf("M") && b--, b
    };
    d.formatDate = function(a, b, c) {
        c || (c = d);
        var e, h, f, g, k, l, m, n = d.getWeekNumber(a);
        d.useUTC ? (e = a.getUTCFullYear(), h = a.getUTCMonth(), f = a.getUTCDate(), g = a.getUTCDay(), k = a.getUTCHours(), l = a.getUTCMinutes(), m = a.getUTCSeconds(), a = a.getUTCMilliseconds()) : (e = a.getFullYear(), h = a.getMonth(), f = a.getDate(), g = a.getDay(), k = a.getHours(), l = a.getMinutes(), m = a.getSeconds(), a = a.getMilliseconds());
        var q = String(e).substr(2, 2),
            p = h + 1;
        9 > h && (p = "0" +
            p);
        var t = "0" + g;
        b = b.replace(/W/g, n);
        n = k;
        24 == n && (n = 0);
        var r = n;
        10 > r && (r = "0" + r);
        b = b.replace(/JJ/g, r);
        b = b.replace(/J/g, n);
        r = k;
        0 === r && (r = 24, -1 != b.indexOf("H") && f--);
        n = f;
        10 > f && (n = "0" + f);
        var u = r;
        10 > u && (u = "0" + u);
        b = b.replace(/HH/g, u);
        b = b.replace(/H/g, r);
        r = k;
        11 < r && (r -= 12);
        u = r;
        10 > u && (u = "0" + u);
        b = b.replace(/KK/g, u);
        b = b.replace(/K/g, r);
        r = k;
        0 === r && (r = 12);
        12 < r && (r -= 12);
        u = r;
        10 > u && (u = "0" + u);
        b = b.replace(/LL/g, u);
        b = b.replace(/L/g, r);
        r = l;
        10 > r && (r = "0" + r);
        b = b.replace(/NN/g, r);
        b = b.replace(/N/g, l);
        l = m;
        10 > l && (l = "0" + l);
        b = b.replace(/SS/g,
            l);
        b = b.replace(/S/g, m);
        m = a;
        10 > m && (m = "00" + m);
        100 > m && (m = "0" + m);
        l = a;
        10 > l && (l = "00" + l);
        b = b.replace(/QQQ/g, m);
        b = b.replace(/QQ/g, l);
        b = b.replace(/Q/g, a);
        b = 12 > k ? b.replace(/A/g, "am") : b.replace(/A/g, "pm");
        b = b.replace(/YYYY/g, "@IIII@");
        b = b.replace(/YY/g, "@II@");
        b = b.replace(/MMMM/g, "@XXXX@");
        b = b.replace(/MMM/g, "@XXX@");
        b = b.replace(/MM/g, "@XX@");
        b = b.replace(/M/g, "@X@");
        b = b.replace(/DD/g, "@RR@");
        b = b.replace(/D/g, "@R@");
        b = b.replace(/EEEE/g, "@PPPP@");
        b = b.replace(/EEE/g, "@PPP@");
        b = b.replace(/EE/g, "@PP@");
        b = b.replace(/E/g,
            "@P@");
        b = b.replace(/@IIII@/g, e);
        b = b.replace(/@II@/g, q);
        b = b.replace(/@XXXX@/g, c.monthNames[h]);
        b = b.replace(/@XXX@/g, c.shortMonthNames[h]);
        b = b.replace(/@XX@/g, p);
        b = b.replace(/@X@/g, h + 1);
        b = b.replace(/@RR@/g, n);
        b = b.replace(/@R@/g, f);
        b = b.replace(/@PPPP@/g, c.dayNames[g]);
        b = b.replace(/@PPP@/g, c.shortDayNames[g]);
        b = b.replace(/@PP@/g, t);
        return b = b.replace(/@P@/g, g)
    };
    d.changeDate = function(a, b, c, e, h) {
        if (d.useUTC) return d.changeUTCDate(a, b, c, e, h);
        var f = -1;
        void 0 === e && (e = !0);
        void 0 === h && (h = !1);
        !0 === e && (f = 1);
        switch (b) {
            case "YYYY":
                a.setFullYear(a.getFullYear() +
                    c * f);
                e || h || a.setDate(a.getDate() + 1);
                break;
            case "MM":
                b = a.getMonth();
                a.setMonth(a.getMonth() + c * f);
                a.getMonth() > b + c * f && a.setDate(a.getDate() - 1);
                e || h || a.setDate(a.getDate() + 1);
                break;
            case "DD":
                a.setDate(a.getDate() + c * f);
                break;
            case "WW":
                a.setDate(a.getDate() + c * f * 7);
                break;
            case "hh":
                a.setHours(a.getHours() + c * f);
                break;
            case "mm":
                a.setMinutes(a.getMinutes() + c * f);
                break;
            case "ss":
                a.setSeconds(a.getSeconds() + c * f);
                break;
            case "fff":
                a.setMilliseconds(a.getMilliseconds() + c * f)
        }
        return a
    };
    d.changeUTCDate = function(a, b,
        c, d, h) {
        var f = -1;
        void 0 === d && (d = !0);
        void 0 === h && (h = !1);
        !0 === d && (f = 1);
        switch (b) {
            case "YYYY":
                a.setUTCFullYear(a.getUTCFullYear() + c * f);
                d || h || a.setUTCDate(a.getUTCDate() + 1);
                break;
            case "MM":
                b = a.getUTCMonth();
                a.setUTCMonth(a.getUTCMonth() + c * f);
                a.getUTCMonth() > b + c * f && a.setUTCDate(a.getUTCDate() - 1);
                d || h || a.setUTCDate(a.getUTCDate() + 1);
                break;
            case "DD":
                a.setUTCDate(a.getUTCDate() + c * f);
                break;
            case "WW":
                a.setUTCDate(a.getUTCDate() + c * f * 7);
                break;
            case "hh":
                a.setUTCHours(a.getUTCHours() + c * f);
                break;
            case "mm":
                a.setUTCMinutes(a.getUTCMinutes() +
                    c * f);
                break;
            case "ss":
                a.setUTCSeconds(a.getUTCSeconds() + c * f);
                break;
            case "fff":
                a.setUTCMilliseconds(a.getUTCMilliseconds() + c * f)
        }
        return a
    }
})();