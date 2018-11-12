var Decimal = require('decimal.js');

module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(item, id, quantity) {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = {item: item, qty: 0, price: 0};
        }
        for(var i=0; i < quantity; i++){ 
            storedItem.qty++;
            this.totalQty++;
        }
        storedItem.price = Decimal(storedItem.item.price).mul(storedItem.qty).toFixed(2);
        var storedItem_totalPrice = Decimal(storedItem.item.price).mul(quantity);
        this.totalPrice = Decimal(this.totalPrice).plus(storedItem_totalPrice).toFixed(2);
    };

    this.reduce = function(id) {
        if (this.items[id] == null) {
            return null;
        }
        this.items[id].qty--;
        this.items[id].price = Decimal(this.items[id].price).minus(this.items[id].item.price).toFixed(2);
        this.totalQty--;
        this.totalPrice = Decimal(this.totalPrice).minus(this.items[id].item.price).toFixed(2);
        
        if (this.items[id].qty <= 0) {
            delete this.items[id];
        }
    };

    this.removeItem = function(id) {
        if (this.items[id] == null) {
            return null;
        }
        this.totalQty -= this.items[id].qty;
        this.totalPrice = Decimal(this.totalPrice).minus(this.items[id].price).toFixed(2);
        delete this.items[id];
    };

    this.generateArray = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};