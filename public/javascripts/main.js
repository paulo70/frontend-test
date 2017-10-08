import * as components from './components';

(function(doc) {
  const app = (function() {

    const container = doc.querySelector('[data-js="container"]');
    const fragment = doc.createDocumentFragment();
    const ajx = new XMLHttpRequest();

    function requestData() {
      ajx.open('GET', 'fazenda.json');
      ajx.send();

      ajx.addEventListener('readystatechange', handleStatus, false);
    }

    function handleStatus() {
      if (components.isRequestOK(ajx)) {
        const data = components.parseData(ajx);
        template(data.data);
      }
    }

    function template(obj) {
      const properties = components.getData(obj);
      const percent = components.calculatePercent(obj);

      const markup = `
        <div class='box-common'>
          <div class='box-float'>
            <div class='box-circle'>
              <img src='${properties[4].picture}' class='img-responsive'>
            </div>
            <span class='notification-ranking'>1</span>
          </div>
          <div class='box-float'>
            <h2>${properties[4].name}</h2>
            <h3>${properties[4].description}</h3>
          </div>
          <div class="tip-content">
            <span class='divider'></span>
            <span class='likes'>gostam</span>
            <span class='likes'>não gostam</span>
            <span class='results'>${percent[4]}</span>
          </div>
        </div>

        <div class='box-common grey'>
          <div class='box-float'>
            <div class='box-circle'>
              <img src='${properties[2].picture}' class='img-responsive'>
            </div>
            <span class='notification-ranking'>2</span>
          </div>
          <div class='box-float'>
            <h2>${properties[2].name}</h2>
            <h3>${properties[2].description}</h3>
          </div>
          <div class="tip-content">
            <span class='divider'></span>
            <span class='likes'>gostam</span>
            <span class='likes'>não gostam</span>
            <span class='results'>${percent[2]}</span>
          </div>
        </div>

        <div class='box-common'>
          <div class='box-float'>
            <div class='box-circle'>
              <img src='${properties[0].picture}' class='img-responsive'>
            </div>
            <span class='notification-ranking'>3</span>
          </div>
          <div class='box-float'>
            <h2>${properties[0].name}</h2>
            <h3>${properties[0].description}</h3>
          </div>
          <div class="tip-content">
            <span class='divider'></span>
            <span class='likes'>gostam</span>
            <span class='likes'>não gostam</span>
            <span class='results'>${percent[0]}</span>
          </div>
        </div>

        <div class='box-common grey'>
          <div class='box-float'>
            <div class='box-circle'>
              <img src='${properties[1].picture}' class='img-responsive'>
            </div>
            <span class='notification-ranking'>4</span>
          </div>
          <div class='box-float'>
            <h2>${properties[1].name}</h2>
            <h3>${properties[1].description}</h3>
          </div>
          <div class="tip-content">
            <span class='divider'></span>
            <span class='likes'>gostam</span>
            <span class='likes'>não gostam</span>
            <span class='results'>${percent[1]}</span>
          </div>
        </div>

        <div class='box-common'>
          <div class='box-float'>
            <div class='box-circle'>
              <img src='${properties[3].picture}' class='img-responsive'>
            </div>
            <span class='notification-ranking'>5</span>
          </div>
          <div class='box-float'>
            <h2>${properties[3].name}</h2>
            <h3>${properties[3].description}</h3>
            <h4>${percent[3]}</h4>
          </div>
          <div class="tip-content">
            <span class='divider'></span>
            <span class='likes'>gostam</span>
            <span class='likes'>não gostam</span>
            <span class='results'>${percent[3]}</span>
          </div>
        </div>
      `
      container.innerHTML = markup;
    }

    return {
      requestData
    }
  })();

  app.requestData();
})(document);