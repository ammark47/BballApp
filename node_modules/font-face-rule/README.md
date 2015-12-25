# font-face-rule

Initial pass on a simple @font-face rule maker:

```javascript
var fontFace = require('font-face-rule');

var rule = fontFace('Super Font', {
  src: ['url(super_font.woff)'],
  'font-weight': 'normal',
  'font-style': 'normal'
});

/* rule now equals:

@font-face {
  font-family: Super Font;
  src: local("☺︎"), url(super_font.woff);
  font-weight: normal;
  font-style: normal;
}

*/
```

On npm: [font-face-rule](https://www.npmjs.com/package/font-face-rule).
