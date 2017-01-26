# Slider
A slider input UI implement. [Demo](https://simonmysun.github.io/slider)

## Usage

Include the script and style in your web page or install from npm first. 

HTML: 
```html
<div id="my-slider"></div>
```
JavaScript:
```js
var mySlider = new Slider(mySlider, config);
```
`config` is an Object and contains attributes below(optional):

| Option | Description | Default |
|---|---|---|
| `init` | The initial value of the slider | `0` |
| `total` | The maximum value of the slider | `100` |
| `step` | The size of each movement | `false` (no step) |
| `loop` | Whether the slider loops(Att. If configured `true`, this will conflict with `swipeLeft` and `swipeRight` options and disable them. ) | `false` |
| `swipeLeft` | The callback function after the slider is totally swiped left(Att. The slider will not be swiped away when `loop` is enabled. ) | `null` |
| `swipeRight` | The callback function after the slider is totally swiped right(Att. The slider will not be swiped away when `loop` is enabled. ) | `null` |
| `onChange` | The callback function when the value of the sider has changed | an empty function |
| `colors` | The colors of the user interface. If configured, it must be an array of two functions, which take a ratio between 0 and 1 as input, and return a valid css color expression | An array of two functions returning `#ccc` and `#333` |

