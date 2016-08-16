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

crawler_ChapMoi_F1();
crawler_ChapMoi_F2();
//crawler_ChapMoi_Kingdom();
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
                    console.log("Chap mới Người trong giang hồ F2:" + new_chap);
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
                    console.log("Chap mới Người trong giang hồ Comic:" + new_chap);
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
    var chap = 0;
    var page = "http://xomtruyen.com";
    var time = setInterval(function () {
        c.queue({
            uri: page + "/kingdom-vuong-gia-thien-ha/",
            callback: function (error, result, $) {
                console.log($(".jspPane").html());
                return;
                var text = $(".jspPane a").eq(0).text()
                var new_chap = parseFloat(text.match(/-*[0-9]+/));
                var href = $(".jspPane a").eq(0).attr("href");
                if (href.indexOf("http://") != -1 || href.indexOf("https://") != -1) {

                } else {
                    href = page + href;
                }
                if (new_chap > chap) {
                    console.log("Chap mới King DOM:" + new_chap);
                    open(href);
                    chap = new_chap;
                }
            }
        });
    }, 5000)
}
function save_data() {
    jsonfile.writeFileSync(file, data, {spaces: 2});
}