import Hammer from 'hammerjs';

import './slider.css';

function Slider(slider, config) {
  const self = this;
  self.config = (
    (
      init = 0,
      total = 100,
      step = 0,
      loop = false,
      swipeLeft = false,
      swipeRight = false,
      onChange = () => {},
      colors = [
        () => '#333',
        () => '#ccc',
      ],
    ) => { // eslint-disable-line arrow-body-style
      return {
        init,
        total,
        step,
        loop,
        swipeLeft,
        swipeRight,
        onChange,
        colors,
      };
    }
  )(
    ...(
      userConfig => (
        [
          userConfig.init,
          userConfig.total,
          userConfig.step,
          userConfig.loop,
          userConfig.swipeLeft,
          userConfig.swipeRight,
          userConfig.onChange,
          userConfig.colors,
        ]
      )
    )(
      config === undefined ? {} : config,
    ),
  );

  const mask = document.createElement('div');
  mask.classList.add('--slider-mask');
  const value = document.createElement('div');
  value.classList.add('--slider-value');
  slider.classList.add('--slider');
  slider.append(mask);
  slider.append(value);

  const handler = new Hammer(mask);
  let lastValue = self.config.init / self.config.total;

  const destroy = (direction, callback) => {
    handler.destroy();
    slider.style.transition = 'all 0.3s linear';
    slider.style.opacity = 0;
    slider.style.transform = direction > 0 ? 'translateX(100%)' : 'translateX(-100%)';
    setTimeout(callback, 330);
  };

  const mod = (x, y) => {
    let result = x;
    while (result > y) {
      result -= y;
    }
    while (result < 0) {
      result += y;
    }
    return result;
  };

  self.getValue = () => lastValue;
  self.setValue = (r) => {
    if (r < 0) {
      if (self.config.swipeLeft) {
        slider.style.transform = `translateX(${r * 100 * 2}%)`;
        slider.style.opacity = (1 + (2 * r)).toString();
      } else {
        slider.style.transform = `translateX(${(Math.exp(r) * 50 * 0.5) - 25}%)`;
      }
    } else if (r > 1) {
      if (self.config.swipeRight) {
        slider.style.transform = `translateX(${(r - 1) * 100 * 2}%)`;
        slider.style.opacity = (1 - (2 * (r - 1))).toString();
      } else {
        slider.style.transform = `translateX(${25 - (Math.exp(1 - r) * 50 * 0.5)}%)`;
      }
    } else {
      slider.style.transform = 'translateX(0)';
      slider.style.opacity = '1';
    }
    value.style.background = self.config.colors[0](r);
    slider.style.background = self.config.colors[1](r);
    const val = Math.min(Math.max(r, 0), 1) * 100;
    value.style.width = `${val}%`;
    self.config.onChange((val * self.config.total) / 100);
  };

  self.setValue(self.config.init / self.config.total);

  handler.on('doubletap press', (e) => {
    lastValue = e.changedPointers[0].offsetX / slider.offsetWidth;
    self.setValue(lastValue);
  });

  let lastDelta = 0;
  let transitionBackup = '';
  handler.on('panstart', (e) => {
    lastDelta = e.deltaX;
    transitionBackup = slider.style.transition;
    slider.style.transition = 'none';
  });

  handler.on('panend', (e) => {
    lastValue = Math.min(Math.max(lastValue, 0), 1);
    slider.style.transform = 'translateX(0)';
    slider.style.opacity = '1';
    if (self.config.swipeLeft) {
      if (lastValue === 0 && e.velocityX < 0) {
        destroy(-1, self.config.swipeLeft);
      }
    }
    if (self.config.swipeRight) {
      if (lastValue === 1 && e.velocityX > 0) {
        destroy(1, self.config.swipeRight);
      }
    }
    slider.style.transition = transitionBackup;
    self.setValue(lastValue);
  });

  handler.on('pan', (e) => {
    lastValue += (e.deltaX - lastDelta) / slider.offsetWidth;
    if (self.config.loop) {
      lastValue = mod(lastValue, 1);
    }
    lastDelta = e.deltaX;
    self.setValue(lastValue);
  });

  // TODO
  // step move
  // navigation key bindings: arrow keys home end
  // inertia?
  // scale?
  // grids in css?
  // examples: time picker after step move is finished
}

module.exports = Slider;
