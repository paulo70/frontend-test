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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqYXZhc2NyaXB0cy9jb21wb25lbnRzLmpzIiwiamF2YXNjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O1FDQWdCLFcsR0FBQSxXO1FBSUEsUyxHQUFBLFM7UUFJQSxPLEdBQUEsTztRQUlBLGdCLEdBQUEsZ0I7QUFaVCxTQUFTLFdBQVQsQ0FBcUIsR0FBckIsRUFBMEI7QUFDL0IsU0FBTyxJQUFJLFVBQUosS0FBbUIsQ0FBbkIsSUFBd0IsSUFBSSxNQUFKLEtBQWUsR0FBOUM7QUFDRDs7QUFFTSxTQUFTLFNBQVQsQ0FBbUIsR0FBbkIsRUFBd0I7QUFDN0IsU0FBTyxLQUFLLEtBQUwsQ0FBVyxJQUFJLFlBQWYsQ0FBUDtBQUNEOztBQUVNLFNBQVMsT0FBVCxDQUFpQixHQUFqQixFQUFzQjtBQUMzQixTQUFPLElBQUksR0FBSixDQUFRLFVBQUMsSUFBRDtBQUFBLFdBQVUsSUFBVjtBQUFBLEdBQVIsQ0FBUDtBQUNEOztBQUVNLFNBQVMsZ0JBQVQsQ0FBMEIsR0FBMUIsRUFBK0I7QUFDcEMsTUFBTSxjQUFjLElBQUksR0FBSixDQUFRLFVBQUMsSUFBRCxFQUFVO0FBQ3BDLFFBQU0sUUFBUSxPQUFPLEtBQUssUUFBWixJQUF3QixPQUFPLEtBQUssUUFBWixDQUF0Qzs7QUFFQSxRQUFJLEtBQUssUUFBTCxLQUFrQixJQUF0QixFQUE0QjtBQUMxQixVQUFNLFdBQVksS0FBSyxRQUFMLEdBQWdCLEtBQWpCLEdBQTBCLEdBQTNDO0FBQ0EsVUFBTSxXQUFZLEtBQUssUUFBTCxHQUFnQixLQUFqQixHQUEwQixHQUEzQzs7QUFFQSx3QkFBZ0IsU0FBUyxPQUFULENBQWlCLENBQWpCLENBQWhCLHVCQUFxRCxTQUFTLE9BQVQsQ0FBaUIsQ0FBakIsQ0FBckQ7QUFDRDs7QUFFRCx1QkFBZ0IsS0FBSyxRQUFMLEdBQWdCLENBQWhDLHlCQUFvRCxLQUFLLFFBQUwsR0FBZ0IsQ0FBcEU7QUFFRCxHQVptQixDQUFwQjs7QUFjQSxTQUFPLFdBQVA7QUFDRDs7Ozs7QUM1QkQ7O0lBQVksVTs7OztBQUVaLENBQUMsVUFBUyxHQUFULEVBQWM7QUFDYixNQUFNLE1BQU8sWUFBVzs7QUFFdEIsUUFBTSxZQUFZLElBQUksYUFBSixDQUFrQix1QkFBbEIsQ0FBbEI7QUFDQSxRQUFNLFdBQVcsSUFBSSxzQkFBSixFQUFqQjtBQUNBLFFBQU0sTUFBTSxJQUFJLGNBQUosRUFBWjs7QUFFQSxhQUFTLFdBQVQsR0FBdUI7QUFDckIsVUFBSSxJQUFKLENBQVMsS0FBVCxFQUFnQixjQUFoQjtBQUNBLFVBQUksSUFBSjs7QUFFQSxVQUFJLGdCQUFKLENBQXFCLGtCQUFyQixFQUF5QyxZQUF6QyxFQUF1RCxLQUF2RDtBQUNEOztBQUVELGFBQVMsWUFBVCxHQUF3QjtBQUN0QixVQUFJLFdBQVcsV0FBWCxDQUF1QixHQUF2QixDQUFKLEVBQWlDO0FBQy9CLFlBQU0sT0FBTyxXQUFXLFNBQVgsQ0FBcUIsR0FBckIsQ0FBYjtBQUNBLGlCQUFTLEtBQUssSUFBZDtBQUNEO0FBQ0Y7O0FBRUQsYUFBUyxRQUFULENBQWtCLEdBQWxCLEVBQXVCO0FBQ3JCLFVBQU0sYUFBYSxXQUFXLE9BQVgsQ0FBbUIsR0FBbkIsQ0FBbkI7QUFDQSxVQUFNLFVBQVUsV0FBVyxnQkFBWCxDQUE0QixHQUE1QixDQUFoQjs7QUFFQSxVQUFNLDBKQUljLFdBQVcsQ0FBWCxFQUFjLE9BSjVCLDRMQVNNLFdBQVcsQ0FBWCxFQUFjLElBVHBCLCtCQVVNLFdBQVcsQ0FBWCxFQUFjLFdBVnBCLGdRQWdCd0IsUUFBUSxDQUFSLENBaEJ4QixvTUF1QmMsV0FBVyxDQUFYLEVBQWMsT0F2QjVCLDRMQTRCTSxXQUFXLENBQVgsRUFBYyxJQTVCcEIsK0JBNkJNLFdBQVcsQ0FBWCxFQUFjLFdBN0JwQixnUUFtQ3dCLFFBQVEsQ0FBUixDQW5DeEIsK0xBMENjLFdBQVcsQ0FBWCxFQUFjLE9BMUM1Qiw0TEErQ00sV0FBVyxDQUFYLEVBQWMsSUEvQ3BCLCtCQWdETSxXQUFXLENBQVgsRUFBYyxXQWhEcEIsZ1FBc0R3QixRQUFRLENBQVIsQ0F0RHhCLG9NQTZEYyxXQUFXLENBQVgsRUFBYyxPQTdENUIsNExBa0VNLFdBQVcsQ0FBWCxFQUFjLElBbEVwQiwrQkFtRU0sV0FBVyxDQUFYLEVBQWMsV0FuRXBCLGdRQXlFd0IsUUFBUSxDQUFSLENBekV4QiwrTEFnRmMsV0FBVyxDQUFYLEVBQWMsT0FoRjVCLDRMQXFGTSxXQUFXLENBQVgsRUFBYyxJQXJGcEIsK0JBc0ZNLFdBQVcsQ0FBWCxFQUFjLFdBdEZwQiwrQkF1Rk0sUUFBUSxDQUFSLENBdkZOLGdRQTZGd0IsUUFBUSxDQUFSLENBN0Z4QixzREFBTjtBQWlHQSxnQkFBVSxTQUFWLEdBQXNCLE1BQXRCO0FBQ0Q7O0FBRUQsV0FBTztBQUNMO0FBREssS0FBUDtBQUdELEdBL0hXLEVBQVo7O0FBaUlBLE1BQUksV0FBSjtBQUNELENBbklELEVBbUlHLFFBbklIIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBmdW5jdGlvbiBpc1JlcXVlc3RPSyhvYmopIHtcbiAgcmV0dXJuIG9iai5yZWFkeVN0YXRlID09PSA0ICYmIG9iai5zdGF0dXMgPT09IDIwMDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRGF0YShvYmopIHtcbiAgcmV0dXJuIEpTT04ucGFyc2Uob2JqLnJlc3BvbnNlVGV4dCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXRhKG9iaikge1xuICByZXR1cm4gb2JqLm1hcCgoaXRlbSkgPT4gaXRlbSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVQZXJjZW50KG9iaikge1xuICBjb25zdCBjYWxjdWxhdGlvbiA9IG9iai5tYXAoKGl0ZW0pID0+IHtcbiAgICBjb25zdCB0b3RhbCA9IE51bWJlcihpdGVtLnBvc2l0aXZlKSArIE51bWJlcihpdGVtLm5lZ2F0aXZlKTtcblxuICAgIGlmIChpdGVtLnBvc2l0aXZlICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBwb3NpdGl2ZSA9IChpdGVtLnBvc2l0aXZlIC8gdG90YWwpICogMTAwO1xuICAgICAgY29uc3QgbmVnYXRpdmUgPSAoaXRlbS5uZWdhdGl2ZSAvIHRvdGFsKSAqIDEwMDtcblxuICAgICAgcmV0dXJuIGA8c3Bhbj4ke3Bvc2l0aXZlLnRvRml4ZWQoMCl9JTwvc3Bhbj4gPHNwYW4+JHtuZWdhdGl2ZS50b0ZpeGVkKDApfSU8L3NwYW4+YDtcbiAgICB9XG5cbiAgICByZXR1cm4gYDxzcGFuPiR7aXRlbS5wb3NpdGl2ZSA9IDAgfSU8L3NwYW4+IDxzcGFuPiR7aXRlbS5uZWdhdGl2ZSA9IDB9JTwvc3Bhbj5gO1xuXG4gIH0pO1xuXG4gIHJldHVybiBjYWxjdWxhdGlvbjtcbn0iLCJpbXBvcnQgKiBhcyBjb21wb25lbnRzIGZyb20gJy4vY29tcG9uZW50cyc7XG5cbihmdW5jdGlvbihkb2MpIHtcbiAgY29uc3QgYXBwID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWpzPVwiY29udGFpbmVyXCJdJyk7XG4gICAgY29uc3QgZnJhZ21lbnQgPSBkb2MuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIGNvbnN0IGFqeCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgZnVuY3Rpb24gcmVxdWVzdERhdGEoKSB7XG4gICAgICBhangub3BlbignR0VUJywgJ2ZhemVuZGEuanNvbicpO1xuICAgICAgYWp4LnNlbmQoKTtcblxuICAgICAgYWp4LmFkZEV2ZW50TGlzdGVuZXIoJ3JlYWR5c3RhdGVjaGFuZ2UnLCBoYW5kbGVTdGF0dXMsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVTdGF0dXMoKSB7XG4gICAgICBpZiAoY29tcG9uZW50cy5pc1JlcXVlc3RPSyhhangpKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBjb21wb25lbnRzLnBhcnNlRGF0YShhangpO1xuICAgICAgICB0ZW1wbGF0ZShkYXRhLmRhdGEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRlbXBsYXRlKG9iaikge1xuICAgICAgY29uc3QgcHJvcGVydGllcyA9IGNvbXBvbmVudHMuZ2V0RGF0YShvYmopO1xuICAgICAgY29uc3QgcGVyY2VudCA9IGNvbXBvbmVudHMuY2FsY3VsYXRlUGVyY2VudChvYmopO1xuXG4gICAgICBjb25zdCBtYXJrdXAgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9J2JveC1jb21tb24nPlxuICAgICAgICAgIDxkaXYgY2xhc3M9J2JveC1mbG9hdCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPSdib3gtY2lyY2xlJz5cbiAgICAgICAgICAgICAgPGltZyBzcmM9JyR7cHJvcGVydGllc1s0XS5waWN0dXJlfScgY2xhc3M9J2ltZy1yZXNwb25zaXZlJz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9J25vdGlmaWNhdGlvbi1yYW5raW5nJz4xPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9J2JveC1mbG9hdCc+XG4gICAgICAgICAgICA8aDI+JHtwcm9wZXJ0aWVzWzRdLm5hbWV9PC9oMj5cbiAgICAgICAgICAgIDxoMz4ke3Byb3BlcnRpZXNbNF0uZGVzY3JpcHRpb259PC9oMz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGlwLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdkaXZpZGVyJz48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz0nbGlrZXMnPmdvc3RhbTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdsaWtlcyc+bsOjbyBnb3N0YW08L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz0ncmVzdWx0cyc+JHtwZXJjZW50WzRdfTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz0nYm94LWNvbW1vbiBncmV5Jz5cbiAgICAgICAgICA8ZGl2IGNsYXNzPSdib3gtZmxvYXQnPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz0nYm94LWNpcmNsZSc+XG4gICAgICAgICAgICAgIDxpbWcgc3JjPScke3Byb3BlcnRpZXNbMl0ucGljdHVyZX0nIGNsYXNzPSdpbWctcmVzcG9uc2l2ZSc+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdub3RpZmljYXRpb24tcmFua2luZyc+Mjwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPSdib3gtZmxvYXQnPlxuICAgICAgICAgICAgPGgyPiR7cHJvcGVydGllc1syXS5uYW1lfTwvaDI+XG4gICAgICAgICAgICA8aDM+JHtwcm9wZXJ0aWVzWzJdLmRlc2NyaXB0aW9ufTwvaDM+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRpcC1jb250ZW50XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz0nZGl2aWRlcic+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9J2xpa2VzJz5nb3N0YW08L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz0nbGlrZXMnPm7Do28gZ29zdGFtPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9J3Jlc3VsdHMnPiR7cGVyY2VudFsyXX08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9J2JveC1jb21tb24nPlxuICAgICAgICAgIDxkaXYgY2xhc3M9J2JveC1mbG9hdCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPSdib3gtY2lyY2xlJz5cbiAgICAgICAgICAgICAgPGltZyBzcmM9JyR7cHJvcGVydGllc1swXS5waWN0dXJlfScgY2xhc3M9J2ltZy1yZXNwb25zaXZlJz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9J25vdGlmaWNhdGlvbi1yYW5raW5nJz4zPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9J2JveC1mbG9hdCc+XG4gICAgICAgICAgICA8aDI+JHtwcm9wZXJ0aWVzWzBdLm5hbWV9PC9oMj5cbiAgICAgICAgICAgIDxoMz4ke3Byb3BlcnRpZXNbMF0uZGVzY3JpcHRpb259PC9oMz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGlwLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdkaXZpZGVyJz48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz0nbGlrZXMnPmdvc3RhbTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdsaWtlcyc+bsOjbyBnb3N0YW08L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz0ncmVzdWx0cyc+JHtwZXJjZW50WzBdfTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz0nYm94LWNvbW1vbiBncmV5Jz5cbiAgICAgICAgICA8ZGl2IGNsYXNzPSdib3gtZmxvYXQnPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz0nYm94LWNpcmNsZSc+XG4gICAgICAgICAgICAgIDxpbWcgc3JjPScke3Byb3BlcnRpZXNbMV0ucGljdHVyZX0nIGNsYXNzPSdpbWctcmVzcG9uc2l2ZSc+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdub3RpZmljYXRpb24tcmFua2luZyc+NDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPSdib3gtZmxvYXQnPlxuICAgICAgICAgICAgPGgyPiR7cHJvcGVydGllc1sxXS5uYW1lfTwvaDI+XG4gICAgICAgICAgICA8aDM+JHtwcm9wZXJ0aWVzWzFdLmRlc2NyaXB0aW9ufTwvaDM+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRpcC1jb250ZW50XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz0nZGl2aWRlcic+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9J2xpa2VzJz5nb3N0YW08L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz0nbGlrZXMnPm7Do28gZ29zdGFtPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9J3Jlc3VsdHMnPiR7cGVyY2VudFsxXX08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9J2JveC1jb21tb24nPlxuICAgICAgICAgIDxkaXYgY2xhc3M9J2JveC1mbG9hdCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPSdib3gtY2lyY2xlJz5cbiAgICAgICAgICAgICAgPGltZyBzcmM9JyR7cHJvcGVydGllc1szXS5waWN0dXJlfScgY2xhc3M9J2ltZy1yZXNwb25zaXZlJz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9J25vdGlmaWNhdGlvbi1yYW5raW5nJz41PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9J2JveC1mbG9hdCc+XG4gICAgICAgICAgICA8aDI+JHtwcm9wZXJ0aWVzWzNdLm5hbWV9PC9oMj5cbiAgICAgICAgICAgIDxoMz4ke3Byb3BlcnRpZXNbM10uZGVzY3JpcHRpb259PC9oMz5cbiAgICAgICAgICAgIDxoND4ke3BlcmNlbnRbM119PC9oND5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGlwLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdkaXZpZGVyJz48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz0nbGlrZXMnPmdvc3RhbTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdsaWtlcyc+bsOjbyBnb3N0YW08L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz0ncmVzdWx0cyc+JHtwZXJjZW50WzNdfTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICBgXG4gICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gbWFya3VwO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICByZXF1ZXN0RGF0YVxuICAgIH1cbiAgfSkoKTtcblxuICBhcHAucmVxdWVzdERhdGEoKTtcbn0pKGRvY3VtZW50KTsiXX0=
