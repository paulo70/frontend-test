(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isRequestOK = isRequestOK;
exports.parseData = parseData;
exports.getData = getData;
exports.calculatePercent = calculatePercent;
function isRequestOK(obj) {
  return obj.readyState === 4 && obj.status === 200;
}

function parseData(obj) {
  return JSON.parse(obj.responseText);
}

function getData(obj) {
  return obj.map(function (item) {
    return item;
  });
}

function calculatePercent(obj) {
  var calculation = obj.map(function (item) {
    var total = Number(item.positive) + Number(item.negative);

    if (item.positive !== null) {
      var positive = item.positive / total * 100;
      var negative = item.negative / total * 100;

      return "<span>" + positive.toFixed(0) + "%</span> <span>" + negative.toFixed(0) + "%</span>";
    }

    return "<span>" + (item.positive = 0) + "%</span> <span>" + (item.negative = 0) + "%</span>";
  });

  return calculation;
}

},{}],2:[function(require,module,exports){
'use strict';

var _components = require('./components');

var components = _interopRequireWildcard(_components);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

(function (doc) {
  var app = function () {

    var container = doc.querySelector('[data-js="container"]');
    var fragment = doc.createDocumentFragment();
    var ajx = new XMLHttpRequest();

    function requestData() {
      ajx.open('GET', 'fazenda.json');
      ajx.send();

      ajx.addEventListener('readystatechange', handleStatus, false);
    }

    function handleStatus() {
      if (components.isRequestOK(ajx)) {
        var data = components.parseData(ajx);
        template(data.data);
      }
    }

    function template(obj) {
      var properties = components.getData(obj);
      var percent = components.calculatePercent(obj);

      var markup = '\n        <div class=\'box-common\'>\n          <div class=\'box-float\'>\n            <div class=\'box-circle\'>\n              <img src=\'' + properties[4].picture + '\' class=\'img-responsive\'>\n            </div>\n            <span class=\'notification-ranking\'>1</span>\n          </div>\n          <div class=\'box-float\'>\n            <h2>' + properties[4].name + '</h2>\n            <h3>' + properties[4].description + '</h3>\n          </div>\n          <div class="tip-content">\n            <span class=\'divider\'></span>\n            <span class=\'likes\'>gostam</span>\n            <span class=\'likes\'>n\xE3o gostam</span>\n            <span class=\'results\'>' + percent[4] + '</span>\n          </div>\n        </div>\n\n        <div class=\'box-common grey\'>\n          <div class=\'box-float\'>\n            <div class=\'box-circle\'>\n              <img src=\'' + properties[2].picture + '\' class=\'img-responsive\'>\n            </div>\n            <span class=\'notification-ranking\'>2</span>\n          </div>\n          <div class=\'box-float\'>\n            <h2>' + properties[2].name + '</h2>\n            <h3>' + properties[2].description + '</h3>\n          </div>\n          <div class="tip-content">\n            <span class=\'divider\'></span>\n            <span class=\'likes\'>gostam</span>\n            <span class=\'likes\'>n\xE3o gostam</span>\n            <span class=\'results\'>' + percent[2] + '</span>\n          </div>\n        </div>\n\n        <div class=\'box-common\'>\n          <div class=\'box-float\'>\n            <div class=\'box-circle\'>\n              <img src=\'' + properties[0].picture + '\' class=\'img-responsive\'>\n            </div>\n            <span class=\'notification-ranking\'>3</span>\n          </div>\n          <div class=\'box-float\'>\n            <h2>' + properties[0].name + '</h2>\n            <h3>' + properties[0].description + '</h3>\n          </div>\n          <div class="tip-content">\n            <span class=\'divider\'></span>\n            <span class=\'likes\'>gostam</span>\n            <span class=\'likes\'>n\xE3o gostam</span>\n            <span class=\'results\'>' + percent[0] + '</span>\n          </div>\n        </div>\n\n        <div class=\'box-common grey\'>\n          <div class=\'box-float\'>\n            <div class=\'box-circle\'>\n              <img src=\'' + properties[1].picture + '\' class=\'img-responsive\'>\n            </div>\n            <span class=\'notification-ranking\'>4</span>\n          </div>\n          <div class=\'box-float\'>\n            <h2>' + properties[1].name + '</h2>\n            <h3>' + properties[1].description + '</h3>\n          </div>\n          <div class="tip-content">\n            <span class=\'divider\'></span>\n            <span class=\'likes\'>gostam</span>\n            <span class=\'likes\'>n\xE3o gostam</span>\n            <span class=\'results\'>' + percent[1] + '</span>\n          </div>\n        </div>\n\n        <div class=\'box-common\'>\n          <div class=\'box-float\'>\n            <div class=\'box-circle\'>\n              <img src=\'' + properties[3].picture + '\' class=\'img-responsive\'>\n            </div>\n            <span class=\'notification-ranking\'>5</span>\n          </div>\n          <div class=\'box-float\'>\n            <h2>' + properties[3].name + '</h2>\n            <h3>' + properties[3].description + '</h3>\n          </div>\n          <div class="tip-content">\n            <span class=\'divider\'></span>\n            <span class=\'likes\'>gostam</span>\n            <span class=\'likes\'>n\xE3o gostam</span>\n            <span class=\'results\'>' + percent[3] + '</span>\n          </div>\n        </div>\n      ';
      container.innerHTML = markup;
    }

    return {
      requestData: requestData
    };
  }();

  app.requestData();
})(document);

},{"./components":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqYXZhc2NyaXB0cy9jb21wb25lbnRzLmpzIiwiamF2YXNjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O1FDQWdCLFcsR0FBQSxXO1FBSUEsUyxHQUFBLFM7UUFJQSxPLEdBQUEsTztRQUlBLGdCLEdBQUEsZ0I7QUFaVCxTQUFTLFdBQVQsQ0FBcUIsR0FBckIsRUFBMEI7QUFDL0IsU0FBTyxJQUFJLFVBQUosS0FBbUIsQ0FBbkIsSUFBd0IsSUFBSSxNQUFKLEtBQWUsR0FBOUM7QUFDRDs7QUFFTSxTQUFTLFNBQVQsQ0FBbUIsR0FBbkIsRUFBd0I7QUFDN0IsU0FBTyxLQUFLLEtBQUwsQ0FBVyxJQUFJLFlBQWYsQ0FBUDtBQUNEOztBQUVNLFNBQVMsT0FBVCxDQUFpQixHQUFqQixFQUFzQjtBQUMzQixTQUFPLElBQUksR0FBSixDQUFRLFVBQUMsSUFBRDtBQUFBLFdBQVUsSUFBVjtBQUFBLEdBQVIsQ0FBUDtBQUNEOztBQUVNLFNBQVMsZ0JBQVQsQ0FBMEIsR0FBMUIsRUFBK0I7QUFDcEMsTUFBTSxjQUFjLElBQUksR0FBSixDQUFRLFVBQUMsSUFBRCxFQUFVO0FBQ3BDLFFBQU0sUUFBUSxPQUFPLEtBQUssUUFBWixJQUF3QixPQUFPLEtBQUssUUFBWixDQUF0Qzs7QUFFQSxRQUFJLEtBQUssUUFBTCxLQUFrQixJQUF0QixFQUE0QjtBQUMxQixVQUFNLFdBQVksS0FBSyxRQUFMLEdBQWdCLEtBQWpCLEdBQTBCLEdBQTNDO0FBQ0EsVUFBTSxXQUFZLEtBQUssUUFBTCxHQUFnQixLQUFqQixHQUEwQixHQUEzQzs7QUFFQSx3QkFBZ0IsU0FBUyxPQUFULENBQWlCLENBQWpCLENBQWhCLHVCQUFxRCxTQUFTLE9BQVQsQ0FBaUIsQ0FBakIsQ0FBckQ7QUFDRDs7QUFFRCx1QkFBZ0IsS0FBSyxRQUFMLEdBQWdCLENBQWhDLHlCQUFvRCxLQUFLLFFBQUwsR0FBZ0IsQ0FBcEU7QUFFRCxHQVptQixDQUFwQjs7QUFjQSxTQUFPLFdBQVA7QUFDRDs7Ozs7QUM1QkQ7O0lBQVksVTs7OztBQUVaLENBQUMsVUFBUyxHQUFULEVBQWM7QUFDYixNQUFNLE1BQU8sWUFBVzs7QUFFdEIsUUFBTSxZQUFZLElBQUksYUFBSixDQUFrQix1QkFBbEIsQ0FBbEI7QUFDQSxRQUFNLFdBQVcsSUFBSSxzQkFBSixFQUFqQjtBQUNBLFFBQU0sTUFBTSxJQUFJLGNBQUosRUFBWjs7QUFFQSxhQUFTLFdBQVQsR0FBdUI7QUFDckIsVUFBSSxJQUFKLENBQVMsS0FBVCxFQUFnQixjQUFoQjtBQUNBLFVBQUksSUFBSjs7QUFFQSxVQUFJLGdCQUFKLENBQXFCLGtCQUFyQixFQUF5QyxZQUF6QyxFQUF1RCxLQUF2RDtBQUNEOztBQUVELGFBQVMsWUFBVCxHQUF3QjtBQUN0QixVQUFJLFdBQVcsV0FBWCxDQUF1QixHQUF2QixDQUFKLEVBQWlDO0FBQy9CLFlBQU0sT0FBTyxXQUFXLFNBQVgsQ0FBcUIsR0FBckIsQ0FBYjtBQUNBLGlCQUFTLEtBQUssSUFBZDtBQUNEO0FBQ0Y7O0FBRUQsYUFBUyxRQUFULENBQWtCLEdBQWxCLEVBQXVCO0FBQ3JCLFVBQU0sYUFBYSxXQUFXLE9BQVgsQ0FBbUIsR0FBbkIsQ0FBbkI7QUFDQSxVQUFNLFVBQVUsV0FBVyxnQkFBWCxDQUE0QixHQUE1QixDQUFoQjs7QUFFQSxVQUFNLDBKQUljLFdBQVcsQ0FBWCxFQUFjLE9BSjVCLDRMQVNNLFdBQVcsQ0FBWCxFQUFjLElBVHBCLCtCQVVNLFdBQVcsQ0FBWCxFQUFjLFdBVnBCLGdRQWdCd0IsUUFBUSxDQUFSLENBaEJ4QixvTUF1QmMsV0FBVyxDQUFYLEVBQWMsT0F2QjVCLDRMQTRCTSxXQUFXLENBQVgsRUFBYyxJQTVCcEIsK0JBNkJNLFdBQVcsQ0FBWCxFQUFjLFdBN0JwQixnUUFtQ3dCLFFBQVEsQ0FBUixDQW5DeEIsK0xBMENjLFdBQVcsQ0FBWCxFQUFjLE9BMUM1Qiw0TEErQ00sV0FBVyxDQUFYLEVBQWMsSUEvQ3BCLCtCQWdETSxXQUFXLENBQVgsRUFBYyxXQWhEcEIsZ1FBc0R3QixRQUFRLENBQVIsQ0F0RHhCLG9NQTZEYyxXQUFXLENBQVgsRUFBYyxPQTdENUIsNExBa0VNLFdBQVcsQ0FBWCxFQUFjLElBbEVwQiwrQkFtRU0sV0FBVyxDQUFYLEVBQWMsV0FuRXBCLGdRQXlFd0IsUUFBUSxDQUFSLENBekV4QiwrTEFnRmMsV0FBVyxDQUFYLEVBQWMsT0FoRjVCLDRMQXFGTSxXQUFXLENBQVgsRUFBYyxJQXJGcEIsK0JBc0ZNLFdBQVcsQ0FBWCxFQUFjLFdBdEZwQixnUUE0RndCLFFBQVEsQ0FBUixDQTVGeEIsc0RBQU47QUFnR0EsZ0JBQVUsU0FBVixHQUFzQixNQUF0QjtBQUNEOztBQUVELFdBQU87QUFDTDtBQURLLEtBQVA7QUFHRCxHQTlIVyxFQUFaOztBQWdJQSxNQUFJLFdBQUo7QUFDRCxDQWxJRCxFQWtJRyxRQWxJSCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgZnVuY3Rpb24gaXNSZXF1ZXN0T0sob2JqKSB7XG4gIHJldHVybiBvYmoucmVhZHlTdGF0ZSA9PT0gNCAmJiBvYmouc3RhdHVzID09PSAyMDA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZURhdGEob2JqKSB7XG4gIHJldHVybiBKU09OLnBhcnNlKG9iai5yZXNwb25zZVRleHQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF0YShvYmopIHtcbiAgcmV0dXJuIG9iai5tYXAoKGl0ZW0pID0+IGl0ZW0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlUGVyY2VudChvYmopIHtcbiAgY29uc3QgY2FsY3VsYXRpb24gPSBvYmoubWFwKChpdGVtKSA9PiB7XG4gICAgY29uc3QgdG90YWwgPSBOdW1iZXIoaXRlbS5wb3NpdGl2ZSkgKyBOdW1iZXIoaXRlbS5uZWdhdGl2ZSk7XG5cbiAgICBpZiAoaXRlbS5wb3NpdGl2ZSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgcG9zaXRpdmUgPSAoaXRlbS5wb3NpdGl2ZSAvIHRvdGFsKSAqIDEwMDtcbiAgICAgIGNvbnN0IG5lZ2F0aXZlID0gKGl0ZW0ubmVnYXRpdmUgLyB0b3RhbCkgKiAxMDA7XG5cbiAgICAgIHJldHVybiBgPHNwYW4+JHtwb3NpdGl2ZS50b0ZpeGVkKDApfSU8L3NwYW4+IDxzcGFuPiR7bmVnYXRpdmUudG9GaXhlZCgwKX0lPC9zcGFuPmA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGA8c3Bhbj4ke2l0ZW0ucG9zaXRpdmUgPSAwIH0lPC9zcGFuPiA8c3Bhbj4ke2l0ZW0ubmVnYXRpdmUgPSAwfSU8L3NwYW4+YDtcblxuICB9KTtcblxuICByZXR1cm4gY2FsY3VsYXRpb247XG59IiwiaW1wb3J0ICogYXMgY29tcG9uZW50cyBmcm9tICcuL2NvbXBvbmVudHMnO1xuXG4oZnVuY3Rpb24oZG9jKSB7XG4gIGNvbnN0IGFwcCA9IChmdW5jdGlvbigpIHtcblxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvYy5xdWVyeVNlbGVjdG9yKCdbZGF0YS1qcz1cImNvbnRhaW5lclwiXScpO1xuICAgIGNvbnN0IGZyYWdtZW50ID0gZG9jLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICBjb25zdCBhanggPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgIGZ1bmN0aW9uIHJlcXVlc3REYXRhKCkge1xuICAgICAgYWp4Lm9wZW4oJ0dFVCcsICdmYXplbmRhLmpzb24nKTtcbiAgICAgIGFqeC5zZW5kKCk7XG5cbiAgICAgIGFqeC5hZGRFdmVudExpc3RlbmVyKCdyZWFkeXN0YXRlY2hhbmdlJywgaGFuZGxlU3RhdHVzLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlU3RhdHVzKCkge1xuICAgICAgaWYgKGNvbXBvbmVudHMuaXNSZXF1ZXN0T0soYWp4KSkge1xuICAgICAgICBjb25zdCBkYXRhID0gY29tcG9uZW50cy5wYXJzZURhdGEoYWp4KTtcbiAgICAgICAgdGVtcGxhdGUoZGF0YS5kYXRhKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0ZW1wbGF0ZShvYmopIHtcbiAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSBjb21wb25lbnRzLmdldERhdGEob2JqKTtcbiAgICAgIGNvbnN0IHBlcmNlbnQgPSBjb21wb25lbnRzLmNhbGN1bGF0ZVBlcmNlbnQob2JqKTtcblxuICAgICAgY29uc3QgbWFya3VwID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPSdib3gtY29tbW9uJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzPSdib3gtZmxvYXQnPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz0nYm94LWNpcmNsZSc+XG4gICAgICAgICAgICAgIDxpbWcgc3JjPScke3Byb3BlcnRpZXNbNF0ucGljdHVyZX0nIGNsYXNzPSdpbWctcmVzcG9uc2l2ZSc+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdub3RpZmljYXRpb24tcmFua2luZyc+MTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPSdib3gtZmxvYXQnPlxuICAgICAgICAgICAgPGgyPiR7cHJvcGVydGllc1s0XS5uYW1lfTwvaDI+XG4gICAgICAgICAgICA8aDM+JHtwcm9wZXJ0aWVzWzRdLmRlc2NyaXB0aW9ufTwvaDM+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRpcC1jb250ZW50XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz0nZGl2aWRlcic+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9J2xpa2VzJz5nb3N0YW08L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz0nbGlrZXMnPm7Do28gZ29zdGFtPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9J3Jlc3VsdHMnPiR7cGVyY2VudFs0XX08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9J2JveC1jb21tb24gZ3JleSc+XG4gICAgICAgICAgPGRpdiBjbGFzcz0nYm94LWZsb2F0Jz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9J2JveC1jaXJjbGUnPlxuICAgICAgICAgICAgICA8aW1nIHNyYz0nJHtwcm9wZXJ0aWVzWzJdLnBpY3R1cmV9JyBjbGFzcz0naW1nLXJlc3BvbnNpdmUnPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz0nbm90aWZpY2F0aW9uLXJhbmtpbmcnPjI8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz0nYm94LWZsb2F0Jz5cbiAgICAgICAgICAgIDxoMj4ke3Byb3BlcnRpZXNbMl0ubmFtZX08L2gyPlxuICAgICAgICAgICAgPGgzPiR7cHJvcGVydGllc1syXS5kZXNjcmlwdGlvbn08L2gzPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aXAtY29udGVudFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9J2RpdmlkZXInPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdsaWtlcyc+Z29zdGFtPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9J2xpa2VzJz5uw6NvIGdvc3RhbTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdyZXN1bHRzJz4ke3BlcmNlbnRbMl19PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPSdib3gtY29tbW9uJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzPSdib3gtZmxvYXQnPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz0nYm94LWNpcmNsZSc+XG4gICAgICAgICAgICAgIDxpbWcgc3JjPScke3Byb3BlcnRpZXNbMF0ucGljdHVyZX0nIGNsYXNzPSdpbWctcmVzcG9uc2l2ZSc+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdub3RpZmljYXRpb24tcmFua2luZyc+Mzwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPSdib3gtZmxvYXQnPlxuICAgICAgICAgICAgPGgyPiR7cHJvcGVydGllc1swXS5uYW1lfTwvaDI+XG4gICAgICAgICAgICA8aDM+JHtwcm9wZXJ0aWVzWzBdLmRlc2NyaXB0aW9ufTwvaDM+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRpcC1jb250ZW50XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz0nZGl2aWRlcic+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9J2xpa2VzJz5nb3N0YW08L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz0nbGlrZXMnPm7Do28gZ29zdGFtPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9J3Jlc3VsdHMnPiR7cGVyY2VudFswXX08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9J2JveC1jb21tb24gZ3JleSc+XG4gICAgICAgICAgPGRpdiBjbGFzcz0nYm94LWZsb2F0Jz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9J2JveC1jaXJjbGUnPlxuICAgICAgICAgICAgICA8aW1nIHNyYz0nJHtwcm9wZXJ0aWVzWzFdLnBpY3R1cmV9JyBjbGFzcz0naW1nLXJlc3BvbnNpdmUnPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz0nbm90aWZpY2F0aW9uLXJhbmtpbmcnPjQ8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz0nYm94LWZsb2F0Jz5cbiAgICAgICAgICAgIDxoMj4ke3Byb3BlcnRpZXNbMV0ubmFtZX08L2gyPlxuICAgICAgICAgICAgPGgzPiR7cHJvcGVydGllc1sxXS5kZXNjcmlwdGlvbn08L2gzPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aXAtY29udGVudFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9J2RpdmlkZXInPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdsaWtlcyc+Z29zdGFtPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9J2xpa2VzJz5uw6NvIGdvc3RhbTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdyZXN1bHRzJz4ke3BlcmNlbnRbMV19PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPSdib3gtY29tbW9uJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzPSdib3gtZmxvYXQnPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz0nYm94LWNpcmNsZSc+XG4gICAgICAgICAgICAgIDxpbWcgc3JjPScke3Byb3BlcnRpZXNbM10ucGljdHVyZX0nIGNsYXNzPSdpbWctcmVzcG9uc2l2ZSc+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdub3RpZmljYXRpb24tcmFua2luZyc+NTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPSdib3gtZmxvYXQnPlxuICAgICAgICAgICAgPGgyPiR7cHJvcGVydGllc1szXS5uYW1lfTwvaDI+XG4gICAgICAgICAgICA8aDM+JHtwcm9wZXJ0aWVzWzNdLmRlc2NyaXB0aW9ufTwvaDM+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRpcC1jb250ZW50XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz0nZGl2aWRlcic+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9J2xpa2VzJz5nb3N0YW08L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz0nbGlrZXMnPm7Do28gZ29zdGFtPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9J3Jlc3VsdHMnPiR7cGVyY2VudFszXX08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgYFxuICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IG1hcmt1cDtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgcmVxdWVzdERhdGFcbiAgICB9XG4gIH0pKCk7XG5cbiAgYXBwLnJlcXVlc3REYXRhKCk7XG59KShkb2N1bWVudCk7Il19
