"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("../dist");
var bitcoinSymbol = 'BTCUSD';
var tv = new __1.TradingViewAPI();
tv.setup().then(function () {
    return tv.getTicker(bitcoinSymbol).then(function (ticker) {
        return ticker
            .fetch()
            .then(console.log)
            .then(function () {
            tv.cleanup();
        });
    });
});
