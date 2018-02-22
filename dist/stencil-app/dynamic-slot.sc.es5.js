/*! Built with http://stenciljs.com */
StencilApp.loadBundle('dynamic-slot', ['exports'], function (exports) {
    var h = window.StencilApp.h;
    var DynamicSlot = /** @class */ (function () {
        function DynamicSlot() {
            var _this = this;
            this.selectedIndex = 0;
            this.items = [];
            this.updateDisplay = function (description, item, index) {
                description.removeAttribute('slot');
                if (description.getAttribute('data-name') === item.textContent) {
                    description.setAttribute('slot', 'choice');
                    item.style.backgroundColor = '#bad0e4';
                    _this.selectedIndex = index;
                }
            };
            this.handleClick = function (item, index) {
                item.addEventListener('click', function () {
                    for (var i = 0; i < _this.items.length; i = i + 1) {
                        _this.items[i].style.backgroundColor = 'white';
                    }
                    for (var j = 0; j < _this.descriptions.length; j = j + 1) {
                        _this.updateDisplay(_this.descriptions[j], item, index);
                    }
                });
            };
            this.renderItemList = function (index) {
                return h("p", null, _this.selectedIndex === index ? h("slot", { name: "choice" }) : '*');
            };
        }
        DynamicSlot.prototype.componentDidLoad = function () {
            var _this = this;
            // get all descriptions
            this.descriptions = [].slice.call(this.el.querySelectorAll('p'));
            // builds master list
            var ul = document.createElement('ul');
            this.descriptions.forEach(function (description) {
                var li = document.createElement('li');
                li.innerText = description.dataset.name;
                ul.appendChild(li);
            });
            ul.setAttribute('slot', 'master-list');
            this.el.appendChild(ul);
            this.items = [].slice.call(this.el.querySelectorAll('li'));
            this.items.forEach(function (item, index) {
                _this.handleClick(item, index);
            });
        };
        DynamicSlot.prototype.render = function () {
            var _this = this;
            // loop over items and output slot for the item selected
            // @ts-ignore
            var els = this.items.map(function (item, index) {
                if (_this.selectedIndex === index) {
                    return (h("p", null, h("slot", { name: "choice" })));
                }
                return h("p", null, "*");
            });
            return (h("article", null, h("div", null, h("slot", { name: "master-list" })), h("div", null, els)));
        };
        Object.defineProperty(DynamicSlot, "is", {
            get: function () { return "dynamic-slot"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DynamicSlot, "encapsulation", {
            get: function () { return "shadow"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DynamicSlot, "properties", {
            get: function () { return { "el": { "elementRef": true }, "items": { "state": true }, "selectedIndex": { "state": true } }; },
            enumerable: true,
            configurable: true
        });
        return DynamicSlot;
    }());
    exports.DynamicSlot = DynamicSlot;
    Object.defineProperty(exports, '__esModule', { value: true });
});
