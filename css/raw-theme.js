import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';
import zIndex from 'material-ui/lib/styles/zIndex';

export default {
  spacing: Spacing,
  zIndex: zIndex,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: "#1690DB",
    primary2Color: "#2173B3",
    primary3Color: "#A9D2EB",
    accent1Color: "#ED3B3B",
    accent2Color: "#ED2B2B",
    accent3Color: "#F58C8C",
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,
    canvasColor: Colors.pinkA200,
    borderColor: Colors.grey300,
    disabledColor: ColorManipulator.fade(Colors.pinkA200, 0.3),
    pickerHeaderColor: Colors.cyan500,
  }
};