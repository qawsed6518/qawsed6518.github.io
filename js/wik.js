(function() {
    var hasFrame = window.parent != window,
        scripts = document.getElementsByTagName("script"),
        current = scripts[scripts.length - 1],
        config = current.getAttribute("data-config"),
        head = document.getElementsByTagName("head")[0],
        dest = location.href.replace(/wikplayer\=true/g, "wikplayer=false"),
        destHost = dest.substr(0, dest.indexOf("/", 10));


        var wik = "http://www.wikplayer.com/wik.html?16102012" + "#" + dest;
        if (window.location.protocol == "https:"){
        	wik = "https://www.wikplayer.com/wik.html?16102012" + "#" + dest;
        }
        

        var wikHost = wik.substr(0, wik.indexOf("/", 10)),
        isOutside = !hasFrame || location.href.indexOf("wikplayer=true") > 0,
        postMessage = function(msg) {
            return window.top.document.getElementById("wikframe").contentWindow.postMessage(msg, wikHost);
        },
        postFactory = function(obj, keys) {
            var keys = keys.split(","),
                post = function(key) {
                    return function(arg) {
                        var argStr = "";
                        if (typeof(arg) != "undefined") {
                            argStr = (key.match(/(play|queue)/) ? "new Song(" : "(") + JSON.stringify(arg) + ")";
                        }
                        postMessage("WIK." + key + "(" + argStr + ")");
                    };
                };
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                obj[key] = post(key);
            }
        },
        postConfig = function(config) {
            if (!isOutside) {
                postMessage("WIK.config(" + config + ")");
            }
        },
        addEvent = function(elm, evType, fn) {
            if (elm.addEventListener) {
                elm.addEventListener(evType, fn);
            } else {
                if (elm.attachEvent) {
                    elm.attachEvent("on" + evType, fn);
                } else {
                    elm["on" + evType] = fn;
                }
            }
        },
        isIE = (function() {
            var undef, v = 3,
                div = document.createElement("div"),
                all = div.getElementsByTagName("i");
            while (div.innerHTML = "<!--[if gt IE " + (++v) + "]><i></i><![endif]-->", all[0]) {}
            return v > 4 ? v : undef;
        })(),
        isMobile = navigator.userAgent.match(/iPad|iPhone|Android|Blackberry/i),
        init = function() {
            if (!document.body) {
                setTimeout(init, 10);
                return;
            }
            if (isOutside) {
                outside();
            } else {
                inside();
            }
        },
        outside = function() {
            var css = "html,body{overflow:hidden;} body{margin:0;padding:0;border:0;} img,a,embed,object,div,address,table,iframe,p,span,form,header,section,footer{ display:none;border:0;margin:0;padding:0; } #tumblr_controls{display:none;} #wikframe{display:block; background-color:transparent; position:fixed; top:0px; left:0px; width:100%; height:100%; z-index:1667;} ";
            var style = document.createElement("style");
            style.type = "text/css";
            style.id = "wikcss";
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
            head.appendChild(style);
            var wikframe = document.createElement("iframe");
            wikframe.frameBorder = 0;
            wikframe.id = "wikframe";
            wikframe.allowTransparency = true;
            wikframe.src = wik;
            document.body.insertBefore(wikframe, document.body.firstChild);
            addEvent(window, "load", function() {
                setTimeout(function() {
                    while (document.body.firstChild != wikframe) {
                        document.body.removeChild(document.body.firstChild);
                    }
                    while (document.body.lastChild != wikframe) {
                        document.body.removeChild(document.body.lastChild);
                    }
                }, 0);
            });
            addEvent(window, "resize", function() {
                wikframe.style.height = (function() {
                    if (typeof(window.innerHeight) == "number") {
                        return window.innerHeight;
                    } else {
                        if (document.documentElement && document.documentElement.clientHeight) {
                            return document.documentElement.clientHeight;
                        } else {
                            if (document.body && document.body.clientHeight) {
                                return document.body.clientHeight;
                            }
                        }
                    }
                })();
            });
            var getPath = function() {
                    return location.href.replace(/#.*/, "");
                },
                path = getPath(),
                hash = location.hash;
            setInterval(function() {
                if (getPath() != path) {
                    path = getPath();
                    window.wikinside.location.replace(path);
                }
                if (location.hash != hash) {
                    hash = location.hash;
                    window.wikinside.location.hash = hash;
                }
            }, 100);
        },
        inside = function() {
            window.top.document.title = document.title;
            var filter = function(host) {
                return host.replace(/blogspot.[a-z.]*/i, "blogspot.com");
            };
            addEvent(document.body, "click", function(e) {
                var tar = e.target;
                while (!tar.tagName.match(/^(a|area)$/i) && tar != document.body) {
                    tar = tar.parentNode;
                }
                if (tar.tagName.match(/^(a|area)$/i) && !tar.href.match(/.(jpg|png)$/i) && !tar.href.match(/^javascript:/)) {
                    if (tar.href.indexOf("#") == 0) {
                        if (tar.href != "#") {
                            window.top.wikinside = window;
                            window.top.location.hash = location.hash;
                            e.preventDefault();
                        }
                    } else {
                        if (tar.title.match(/^(WIK:|\[WIK\])/i)) {
                            var title = tar.title.replace(/^(WIK:|\[WIK\])( )?/i, "");
                            var url = tar.href;
                            WIK.play({
                                title: title,
                                url: url
                            });
                            e.preventDefault();
                        } else {
                            if (tar.href.match(/\.css$/)) {
                                window.open("https://www.wikplayer.com/#skin=" + tar.href, "_blank");
                                window.focus();
                                e.preventDefault();
                            } else {
                                if (filter(tar.href).indexOf(filter(location.host)) == -1) {
                                    if (tar.href.match(/^http(s)?/)) {
                                        window.open(tar.href, "_blank");
                                        window.focus();
                                        e.preventDefault();
                                    }
                                } else {
                                    if (history.pushState) {
                                        var url = filter(tar.href).replace(filter(destHost), "");
                                        window.top.wikinside = window;
                                        window.top.history.pushState(null, null, url);
                                        e.preventDefault();
                                    }
                                }
                            }
                        }
                    }
                }
            });
            addEvent(window, "load", function() {});
        };
    var WIK = {};
    postFactory(WIK, "queue,play,pause,next,previous,volume,skin,placement," + "loadPlaylist,repeatMode,isShuffle,showPlaylist," + "togglePlaylist,toggleShuffle,changeRepeatMode");
    if (window.WIK && window.WIKMusicPlayer) {
        return;
    }
    if (!isMobile) {
        init();
    }
    if (config) {
        postConfig(config);
    }
    WIK.init = postConfig;
    window.WIKMusicPlayer = window.WIKMusicPlayer || WIK;
    window.WIK = window.WIK || WIK;
})();