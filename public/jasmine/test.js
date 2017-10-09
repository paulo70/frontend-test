export function isRequestOK(obj) {
  return obj.readyState === 4 && obj.status === 200;
}

export function parseData(obj) {
  return JSON.parse(obj.responseText);
}

export function getData(obj) {
  return obj.map((item) => item);
}

export function calculatePercent(obj) {
  const calculation = obj.map((item) => {
    const total = Number(item.positive) + Number(item.negative);

    if (item.positive !== null) {
      const positive = (item.positive / total) * 100;
      const negative = (item.negative / total) * 100;

      return `<span>${positive.toFixed(0)}%</span> <span>${negative.toFixed(0)}%</span>`;
    }

    return `<span>${item.positive = 0 }%</span> <span>${item.negative = 0}%</span>`;

  });

  return calculation;
}