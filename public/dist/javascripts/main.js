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

      return positive.toFixed(0) + "% " + negative.toFixed(0) + "%";
    }

    return (item.positive = 0) + "% " + (item.negative = 0) + "%";
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

      var markup = '\n        <div class=\'box-common\'>\n          <div class=\'box-float\'>\n            <div class=\'box-circle\'>\n              <img src=\'' + properties[4].picture + '\' class=\'img-responsive\'>\n            </div>\n            <span class=\'notification-ranking\'>1</span>\n          </div>\n          <div class=\'box-float\'>\n            <h2>' + properties[4].name + '</h2>\n            <h3>' + properties[4].description + '</h3>\n          </div>\n          <div class="tip-content">\n            <span class=\'divider\'></span>\n            <span class=\'likes\'>gostam</span>\n            <span class=\'likes\'>n\xE3o gostam</span>\n            <span class=\'results\'>' + percent[4] + '</span>\n          </div>\n        </div>\n\n        <div class=\'box-common grey\'>\n          <div class=\'box-float\'>\n            <div class=\'box-circle\'>\n              <img src=\'' + properties[2].picture + '\' class=\'img-responsive\'>\n            </div>\n            <span class=\'notification-ranking\'>2</span>\n          </div>\n          <div class=\'box-float\'>\n            <h2>' + properties[2].name + '</h2>\n            <h3>' + properties[2].description + '</h3>\n          </div>\n          <div class="tip-content">\n            <span class=\'divider\'></span>\n            <span class=\'likes\'>gostam</span>\n            <span class=\'likes\'>n\xE3o gostam</span>\n            <span class=\'results\'>' + percent[2] + '</span>\n          </div>\n        </div>\n\n        <div class=\'box-common\'>\n          <div class=\'box-float\'>\n            <div class=\'box-circle\'>\n              <img src=\'' + properties[0].picture + '\' class=\'img-responsive\'>\n            </div>\n            <span class=\'notification-ranking\'>3</span>\n          </div>\n          <div class=\'box-float\'>\n            <h2>' + properties[0].name + '</h2>\n            <h3>' + properties[0].description + '</h3>\n          </div>\n          <div class="tip-content">\n            <span class=\'divider\'></span>\n            <span class=\'likes\'>gostam</span>\n            <span class=\'likes\'>n\xE3o gostam</span>\n            <span class=\'results\'>' + percent[0] + '</span>\n          </div>\n        </div>\n\n        <div class=\'box-common grey\'>\n          <div class=\'box-float\'>\n            <div class=\'box-circle\'>\n              <img src=\'' + properties[1].picture + '\' class=\'img-responsive\'>\n            </div>\n            <span class=\'notification-ranking\'>4</span>\n          </div>\n          <div class=\'box-float\'>\n            <h2>' + properties[1].name + '</h2>\n            <h3>' + properties[1].description + '</h3>\n          </div>\n          <div class="tip-content">\n            <span class=\'divider\'></span>\n            <span class=\'likes\'>gostam</span>\n            <span class=\'likes\'>n\xE3o gostam</span>\n            <span class=\'results\'>' + percent[1] + '</span>\n          </div>\n        </div>\n\n        <div class=\'box-common\'>\n          <div class=\'box-float\'>\n            <div class=\'box-circle\'>\n              <img src=\'' + properties[3].picture + '\' class=\'img-responsive\'>\n            </div>\n            <span class=\'notification-ranking\'>5</span>\n          </div>\n          <div class=\'box-float\'>\n            <h2>' + properties[3].name + '</h2>\n            <h3>' + properties[3].description + '</h3>\n            <h4>' + percent[3] + '</h4>\n          </div>\n          <div class="tip-content">\n            <span class=\'divider\'></span>\n            <span class=\'likes\'>gostam</span>\n            <span class=\'likes\'>n\xE3o gostam</span>\n            <span class=\'results\'>' + percent[3] + '</span>\n          </div>\n        </div>\n      ';
      container.innerHTML = markup;
    }

    return {
      requestData: requestData
    };
  }();

  app.requestData();
})(document);

},{"./components":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqYXZhc2NyaXB0cy9jb21wb25lbnRzLmpzIiwiamF2YXNjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O1FDQWdCLFcsR0FBQSxXO1FBSUEsUyxHQUFBLFM7UUFJQSxPLEdBQUEsTztRQUlBLGdCLEdBQUEsZ0I7QUFaVCxTQUFTLFdBQVQsQ0FBcUIsR0FBckIsRUFBMEI7QUFDL0IsU0FBTyxJQUFJLFVBQUosS0FBbUIsQ0FBbkIsSUFBd0IsSUFBSSxNQUFKLEtBQWUsR0FBOUM7QUFDRDs7QUFFTSxTQUFTLFNBQVQsQ0FBbUIsR0FBbkIsRUFBd0I7QUFDN0IsU0FBTyxLQUFLLEtBQUwsQ0FBVyxJQUFJLFlBQWYsQ0FBUDtBQUNEOztBQUVNLFNBQVMsT0FBVCxDQUFpQixHQUFqQixFQUFzQjtBQUMzQixTQUFPLElBQUksR0FBSixDQUFRLFVBQUMsSUFBRDtBQUFBLFdBQVUsSUFBVjtBQUFBLEdBQVIsQ0FBUDtBQUNEOztBQUVNLFNBQVMsZ0JBQVQsQ0FBMEIsR0FBMUIsRUFBK0I7QUFDcEMsTUFBTSxjQUFjLElBQUksR0FBSixDQUFRLFVBQUMsSUFBRCxFQUFVO0FBQ3BDLFFBQU0sUUFBUSxPQUFPLEtBQUssUUFBWixJQUF3QixPQUFPLEtBQUssUUFBWixDQUF0Qzs7QUFFQSxRQUFJLEtBQUssUUFBTCxLQUFrQixJQUF0QixFQUE0QjtBQUMxQixVQUFNLFdBQVksS0FBSyxRQUFMLEdBQWdCLEtBQWpCLEdBQTBCLEdBQTNDO0FBQ0EsVUFBTSxXQUFZLEtBQUssUUFBTCxHQUFnQixLQUFqQixHQUEwQixHQUEzQzs7QUFFQSxhQUFVLFNBQVMsT0FBVCxDQUFpQixDQUFqQixDQUFWLFVBQWtDLFNBQVMsT0FBVCxDQUFpQixDQUFqQixDQUFsQztBQUNEOztBQUVELFlBQVUsS0FBSyxRQUFMLEdBQWdCLENBQTFCLFlBQWlDLEtBQUssUUFBTCxHQUFnQixDQUFqRDtBQUVELEdBWm1CLENBQXBCOztBQWNBLFNBQU8sV0FBUDtBQUNEOzs7OztBQzVCRDs7SUFBWSxVOzs7O0FBRVosQ0FBQyxVQUFTLEdBQVQsRUFBYztBQUNiLE1BQU0sTUFBTyxZQUFXOztBQUV0QixRQUFNLFlBQVksSUFBSSxhQUFKLENBQWtCLHVCQUFsQixDQUFsQjtBQUNBLFFBQU0sV0FBVyxJQUFJLHNCQUFKLEVBQWpCO0FBQ0EsUUFBTSxNQUFNLElBQUksY0FBSixFQUFaOztBQUVBLGFBQVMsV0FBVCxHQUF1QjtBQUNyQixVQUFJLElBQUosQ0FBUyxLQUFULEVBQWdCLGNBQWhCO0FBQ0EsVUFBSSxJQUFKOztBQUVBLFVBQUksZ0JBQUosQ0FBcUIsa0JBQXJCLEVBQXlDLFlBQXpDLEVBQXVELEtBQXZEO0FBQ0Q7O0FBRUQsYUFBUyxZQUFULEdBQXdCO0FBQ3RCLFVBQUksV0FBVyxXQUFYLENBQXVCLEdBQXZCLENBQUosRUFBaUM7QUFDL0IsWUFBTSxPQUFPLFdBQVcsU0FBWCxDQUFxQixHQUFyQixDQUFiO0FBQ0EsaUJBQVMsS0FBSyxJQUFkO0FBQ0Q7QUFDRjs7QUFFRCxhQUFTLFFBQVQsQ0FBa0IsR0FBbEIsRUFBdUI7QUFDckIsVUFBTSxhQUFhLFdBQVcsT0FBWCxDQUFtQixHQUFuQixDQUFuQjtBQUNBLFVBQU0sVUFBVSxXQUFXLGdCQUFYLENBQTRCLEdBQTVCLENBQWhCOztBQUVBLFVBQU0sMEpBSWMsV0FBVyxDQUFYLEVBQWMsT0FKNUIsNExBU00sV0FBVyxDQUFYLEVBQWMsSUFUcEIsK0JBVU0sV0FBVyxDQUFYLEVBQWMsV0FWcEIsZ1FBZ0J3QixRQUFRLENBQVIsQ0FoQnhCLG9NQXVCYyxXQUFXLENBQVgsRUFBYyxPQXZCNUIsNExBNEJNLFdBQVcsQ0FBWCxFQUFjLElBNUJwQiwrQkE2Qk0sV0FBVyxDQUFYLEVBQWMsV0E3QnBCLGdRQW1Dd0IsUUFBUSxDQUFSLENBbkN4QiwrTEEwQ2MsV0FBVyxDQUFYLEVBQWMsT0ExQzVCLDRMQStDTSxXQUFXLENBQVgsRUFBYyxJQS9DcEIsK0JBZ0RNLFdBQVcsQ0FBWCxFQUFjLFdBaERwQixnUUFzRHdCLFFBQVEsQ0FBUixDQXREeEIsb01BNkRjLFdBQVcsQ0FBWCxFQUFjLE9BN0Q1Qiw0TEFrRU0sV0FBVyxDQUFYLEVBQWMsSUFsRXBCLCtCQW1FTSxXQUFXLENBQVgsRUFBYyxXQW5FcEIsZ1FBeUV3QixRQUFRLENBQVIsQ0F6RXhCLCtMQWdGYyxXQUFXLENBQVgsRUFBYyxPQWhGNUIsNExBcUZNLFdBQVcsQ0FBWCxFQUFjLElBckZwQiwrQkFzRk0sV0FBVyxDQUFYLEVBQWMsV0F0RnBCLCtCQXVGTSxRQUFRLENBQVIsQ0F2Rk4sZ1FBNkZ3QixRQUFRLENBQVIsQ0E3RnhCLHNEQUFOO0FBaUdBLGdCQUFVLFNBQVYsR0FBc0IsTUFBdEI7QUFDRDs7QUFFRCxXQUFPO0FBQ0w7QUFESyxLQUFQO0FBR0QsR0EvSFcsRUFBWjs7QUFpSUEsTUFBSSxXQUFKO0FBQ0QsQ0FuSUQsRUFtSUcsUUFuSUgiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGZ1bmN0aW9uIGlzUmVxdWVzdE9LKG9iaikge1xuICByZXR1cm4gb2JqLnJlYWR5U3RhdGUgPT09IDQgJiYgb2JqLnN0YXR1cyA9PT0gMjAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VEYXRhKG9iaikge1xuICByZXR1cm4gSlNPTi5wYXJzZShvYmoucmVzcG9uc2VUZXh0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERhdGEob2JqKSB7XG4gIHJldHVybiBvYmoubWFwKChpdGVtKSA9PiBpdGVtKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZVBlcmNlbnQob2JqKSB7XG4gIGNvbnN0IGNhbGN1bGF0aW9uID0gb2JqLm1hcCgoaXRlbSkgPT4ge1xuICAgIGNvbnN0IHRvdGFsID0gTnVtYmVyKGl0ZW0ucG9zaXRpdmUpICsgTnVtYmVyKGl0ZW0ubmVnYXRpdmUpO1xuXG4gICAgaWYgKGl0ZW0ucG9zaXRpdmUgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHBvc2l0aXZlID0gKGl0ZW0ucG9zaXRpdmUgLyB0b3RhbCkgKiAxMDA7XG4gICAgICBjb25zdCBuZWdhdGl2ZSA9IChpdGVtLm5lZ2F0aXZlIC8gdG90YWwpICogMTAwO1xuXG4gICAgICByZXR1cm4gYCR7cG9zaXRpdmUudG9GaXhlZCgwKX0lICR7bmVnYXRpdmUudG9GaXhlZCgwKX0lYFxuICAgIH1cblxuICAgIHJldHVybiBgJHtpdGVtLnBvc2l0aXZlID0gMCB9JSAke2l0ZW0ubmVnYXRpdmUgPSAwfSVgXG5cbiAgfSk7XG5cbiAgcmV0dXJuIGNhbGN1bGF0aW9uO1xufSIsImltcG9ydCAqIGFzIGNvbXBvbmVudHMgZnJvbSAnLi9jb21wb25lbnRzJztcblxuKGZ1bmN0aW9uKGRvYykge1xuICBjb25zdCBhcHAgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICBjb25zdCBjb250YWluZXIgPSBkb2MucXVlcnlTZWxlY3RvcignW2RhdGEtanM9XCJjb250YWluZXJcIl0nKTtcbiAgICBjb25zdCBmcmFnbWVudCA9IGRvYy5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgY29uc3QgYWp4ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICBmdW5jdGlvbiByZXF1ZXN0RGF0YSgpIHtcbiAgICAgIGFqeC5vcGVuKCdHRVQnLCAnZmF6ZW5kYS5qc29uJyk7XG4gICAgICBhanguc2VuZCgpO1xuXG4gICAgICBhanguYWRkRXZlbnRMaXN0ZW5lcigncmVhZHlzdGF0ZWNoYW5nZScsIGhhbmRsZVN0YXR1cywgZmFsc2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZVN0YXR1cygpIHtcbiAgICAgIGlmIChjb21wb25lbnRzLmlzUmVxdWVzdE9LKGFqeCkpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IGNvbXBvbmVudHMucGFyc2VEYXRhKGFqeCk7XG4gICAgICAgIHRlbXBsYXRlKGRhdGEuZGF0YSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdGVtcGxhdGUob2JqKSB7XG4gICAgICBjb25zdCBwcm9wZXJ0aWVzID0gY29tcG9uZW50cy5nZXREYXRhKG9iaik7XG4gICAgICBjb25zdCBwZXJjZW50ID0gY29tcG9uZW50cy5jYWxjdWxhdGVQZXJjZW50KG9iaik7XG5cbiAgICAgIGNvbnN0IG1hcmt1cCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz0nYm94LWNvbW1vbic+XG4gICAgICAgICAgPGRpdiBjbGFzcz0nYm94LWZsb2F0Jz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9J2JveC1jaXJjbGUnPlxuICAgICAgICAgICAgICA8aW1nIHNyYz0nJHtwcm9wZXJ0aWVzWzRdLnBpY3R1cmV9JyBjbGFzcz0naW1nLXJlc3BvbnNpdmUnPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz0nbm90aWZpY2F0aW9uLXJhbmtpbmcnPjE8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz0nYm94LWZsb2F0Jz5cbiAgICAgICAgICAgIDxoMj4ke3Byb3BlcnRpZXNbNF0ubmFtZX08L2gyPlxuICAgICAgICAgICAgPGgzPiR7cHJvcGVydGllc1s0XS5kZXNjcmlwdGlvbn08L2gzPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aXAtY29udGVudFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9J2RpdmlkZXInPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdsaWtlcyc+Z29zdGFtPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9J2xpa2VzJz5uw6NvIGdvc3RhbTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdyZXN1bHRzJz4ke3BlcmNlbnRbNF19PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPSdib3gtY29tbW9uIGdyZXknPlxuICAgICAgICAgIDxkaXYgY2xhc3M9J2JveC1mbG9hdCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPSdib3gtY2lyY2xlJz5cbiAgICAgICAgICAgICAgPGltZyBzcmM9JyR7cHJvcGVydGllc1syXS5waWN0dXJlfScgY2xhc3M9J2ltZy1yZXNwb25zaXZlJz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9J25vdGlmaWNhdGlvbi1yYW5raW5nJz4yPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9J2JveC1mbG9hdCc+XG4gICAgICAgICAgICA8aDI+JHtwcm9wZXJ0aWVzWzJdLm5hbWV9PC9oMj5cbiAgICAgICAgICAgIDxoMz4ke3Byb3BlcnRpZXNbMl0uZGVzY3JpcHRpb259PC9oMz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGlwLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdkaXZpZGVyJz48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz0nbGlrZXMnPmdvc3RhbTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdsaWtlcyc+bsOjbyBnb3N0YW08L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz0ncmVzdWx0cyc+JHtwZXJjZW50WzJdfTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz0nYm94LWNvbW1vbic+XG4gICAgICAgICAgPGRpdiBjbGFzcz0nYm94LWZsb2F0Jz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9J2JveC1jaXJjbGUnPlxuICAgICAgICAgICAgICA8aW1nIHNyYz0nJHtwcm9wZXJ0aWVzWzBdLnBpY3R1cmV9JyBjbGFzcz0naW1nLXJlc3BvbnNpdmUnPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz0nbm90aWZpY2F0aW9uLXJhbmtpbmcnPjM8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz0nYm94LWZsb2F0Jz5cbiAgICAgICAgICAgIDxoMj4ke3Byb3BlcnRpZXNbMF0ubmFtZX08L2gyPlxuICAgICAgICAgICAgPGgzPiR7cHJvcGVydGllc1swXS5kZXNjcmlwdGlvbn08L2gzPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aXAtY29udGVudFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9J2RpdmlkZXInPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdsaWtlcyc+Z29zdGFtPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9J2xpa2VzJz5uw6NvIGdvc3RhbTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdyZXN1bHRzJz4ke3BlcmNlbnRbMF19PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPSdib3gtY29tbW9uIGdyZXknPlxuICAgICAgICAgIDxkaXYgY2xhc3M9J2JveC1mbG9hdCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPSdib3gtY2lyY2xlJz5cbiAgICAgICAgICAgICAgPGltZyBzcmM9JyR7cHJvcGVydGllc1sxXS5waWN0dXJlfScgY2xhc3M9J2ltZy1yZXNwb25zaXZlJz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9J25vdGlmaWNhdGlvbi1yYW5raW5nJz40PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9J2JveC1mbG9hdCc+XG4gICAgICAgICAgICA8aDI+JHtwcm9wZXJ0aWVzWzFdLm5hbWV9PC9oMj5cbiAgICAgICAgICAgIDxoMz4ke3Byb3BlcnRpZXNbMV0uZGVzY3JpcHRpb259PC9oMz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGlwLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdkaXZpZGVyJz48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz0nbGlrZXMnPmdvc3RhbTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdsaWtlcyc+bsOjbyBnb3N0YW08L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz0ncmVzdWx0cyc+JHtwZXJjZW50WzFdfTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz0nYm94LWNvbW1vbic+XG4gICAgICAgICAgPGRpdiBjbGFzcz0nYm94LWZsb2F0Jz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9J2JveC1jaXJjbGUnPlxuICAgICAgICAgICAgICA8aW1nIHNyYz0nJHtwcm9wZXJ0aWVzWzNdLnBpY3R1cmV9JyBjbGFzcz0naW1nLXJlc3BvbnNpdmUnPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz0nbm90aWZpY2F0aW9uLXJhbmtpbmcnPjU8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz0nYm94LWZsb2F0Jz5cbiAgICAgICAgICAgIDxoMj4ke3Byb3BlcnRpZXNbM10ubmFtZX08L2gyPlxuICAgICAgICAgICAgPGgzPiR7cHJvcGVydGllc1szXS5kZXNjcmlwdGlvbn08L2gzPlxuICAgICAgICAgICAgPGg0PiR7cGVyY2VudFszXX08L2g0PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aXAtY29udGVudFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9J2RpdmlkZXInPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdsaWtlcyc+Z29zdGFtPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9J2xpa2VzJz5uw6NvIGdvc3RhbTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdyZXN1bHRzJz4ke3BlcmNlbnRbM119PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIGBcbiAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBtYXJrdXA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlcXVlc3REYXRhXG4gICAgfVxuICB9KSgpO1xuXG4gIGFwcC5yZXF1ZXN0RGF0YSgpO1xufSkoZG9jdW1lbnQpOyJdfQ==
