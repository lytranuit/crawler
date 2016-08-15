var Crawler = require("crawler");
var url = require('url');
var open = require("open");
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
function crawler_ChapMoi_F2() {
    var chap = 0;
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
                }
            }
        });
    }, 5000)
}
function crawler_ChapMoi_F1() {
    var chap = 0;
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
                }
            }
        });
    }, 5000)
}