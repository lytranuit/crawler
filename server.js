var Crawler = require("crawler");
var url = require('url');
var open = require("open");
var jsonfile = require('jsonfile')
var file = './data.json'
var data = jsonfile.readFileSync(file);
console.log("Ung dung thong bao chap moi");
var c = new Crawler({
    maxConnections: 10,
    // This will be called for each crawled page
    callback: function (error, result, $) {
        // $ is Cheerio by default
        //a lean implementation of core jQuery designed specifically for the server
        console.log("Finish : " + result.uri);
    }
});

//crawler_ChapMoi_F1();
//crawler_ChapMoi_F2();
//crawler_ChapMoi_Kingdom();
//crawler_ChapMoi_toriko();
crawler_ChapMoi_Taydu();
function crawler_ChapMoi_F2() {
    if (typeof data.NTGHF2 == "undefined" || data.NTGHF2 == null) {
        var chap = 0;
    } else {
        var chap = data.NTGHF2;
    }
    var time = setInterval(function () {
        c.queue({
            uri: "http://teamtruyen.com/nguoi-trong-giang-ho-f2/",
            callback: function (error, result, $) {
                var text = $(".content .row_chap:first-child .tenChapter").text();
                var new_chap = parseFloat(text.match(/-*[0-9]+/));
                var href = $(".content .row_chap:first-child a").attr("href");
                if (new_chap > chap) {
                    console.log(text);
                    open(href);
                    chap = new_chap;
                    data.NTGHF2 = chap;
                    save_data();
                }
            }
        });
    }, 5000)
}
function crawler_ChapMoi_F1() {
    if (typeof data.NTGHF1 == "undefined" || data.NTGHF1 == null) {
        var chap = 0;
    } else {
        var chap = data.NTGHF1;
    }
    var page = "http://comicvn.net";
    var time = setInterval(function () {
        c.queue({
            uri: page + "/truyen-tranh/nguoi-trong-giang-ho/162",
            callback: function (error, result, $) {
                var text = $(".list-chapter td a").eq(0).text()
                var new_chap = parseFloat(text.match(/-*[0-9]+/));
                var href = $(".list-chapter td a").eq(0).attr("href");
                if (href.indexOf("http://") != -1 || href.indexOf("https://") != -1) {

                } else {
                    href = page + href;
                }
                if (new_chap > chap) {
                    console.log(text);
                    open(href);
                    chap = new_chap;
                    data.NTGHF1 = chap;
                    save_data();
                }
            }
        });
    }, 5000)
}
function crawler_ChapMoi_Kingdom() {
    if (typeof data.Kingdom == "undefined" || data.Kingdom == null) {
        var chap = 0;
    } else {
        var chap = data.Kingdom;
    }
    var page = "http://truyentranhmoi.com";
    var time = setInterval(function () {
        c.queue({
            uri: page + "/kingdom-vuong-gia-thien-ha/",
            callback: function (error, result, $) {
//                console.log(result);
//                console.log($);
                console.log($(".select-chapter option:last-child"));
                var text = $(".select-chapter option:last-child").text();
                var new_chap = parseFloat(text.match(/-*[0-9]+/));
                var href = $(".select-chapter option:last-child").attr("value");
                if (href.indexOf("http://") != -1 || href.indexOf("https://") != -1) {

                } else {
                    href = page + href;
                }
                if (new_chap > chap) {
                    console.log(text);
                    open(href);
                    chap = new_chap;
                    data.Kingdom = chap;
                    save_data();
                }
            }
        });
    }, 5000)
}
function crawler_ChapMoi_toriko() {
    if (typeof data.toriko == "undefined" || data.toriko == null) {
        var chap = 0;
    } else {
        var chap = data.toriko;
    }
    var page = "http://comicvn.net";
    var time = setInterval(function () {
        c.queue({
            uri: page + "/truyen-tranh/toriko/18",
            callback: function (error, result, $) {
                var text = $(".list-chapter td a").eq(0).text()
                var new_chap = parseFloat(text.match(/-*[0-9]+/));
                var href = $(".list-chapter td a").eq(0).attr("href");
                if (href.indexOf("http://") != -1 || href.indexOf("https://") != -1) {

                } else {
                    href = page + href;
                }
                if (new_chap > chap) {
                    console.log(text);
                    open(href);
                    chap = new_chap;
                    data.toriko = chap;
                    save_data();
                }
            }
        });
    }, 5000)
}
function crawler_ChapMoi_Taydu() {
    if (typeof data.Taydu == "undefined" || data.Taydu == null) {
        var chap = 0;
    } else {
        var chap = data.Taydu;
    }
    var page = "http://comicvn.net";
    var time = setInterval(function () {
        c.queue({
            uri: page + "/truyen-tranh/tay-du/11951",
            callback: function (error, res, done) {
                var $ = res.$;
//                console.log($(".manga-info-main"));
//                return false;
                var text = $(".manga-chapter .u84ho3 a").eq(0).text();
                var new_chap = parseFloat(text.match(/-*[0-9]+/));
                var href = $(".manga-chapter .u84ho3 a").eq(0).attr("href");
                if (href.indexOf("http://") != -1 || href.indexOf("https://") != -1) {

                } else {
                    href = page + href;
                }
                if (new_chap > chap) {
                    console.log(text);
                    open(href);
                    chap = new_chap;
                    data.Taydu = chap;
                    save_data();
                }
            }
        });
    }, 5000)
}
function save_data() {
    jsonfile.writeFileSync(file, data, {spaces: 2});
}