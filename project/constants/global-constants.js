"use strict";

import React, {
  Dimensions,
  Platform,
  PixelRatio,
} from 'react-native';


module.exports = {
  bgColor:'#efeff4',
  statusBarColor:'#00796B',
  navTintColor:'#009688',
  titleTintColor:'#FFFFFF',
  accentColor:'#3f51b5',
  primaryDarkColor:'#00796B',
  primaryColor:'#009688',
  secondColor:'#757575',
  dividerColor:'#BDBDBD',
  textPrimaryColor:'#212121',
  titleTintSize:20,
  titleTextSize:16,
  primaryTextSize:14,
  descText:12,
  screenWidth: Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height,
  statusBarHeight: (Platform.OS === 'ios') ? 20 : 0,
  statusHeight: (Platform.OS === 'android' && Platform.Version >= '21') ? 24 : 0,
  searchBarMarginTop: (Platform.OS === 'android') ? 32 : 0,

  RefreshLayoutConsts: (Platform.OS === 'android') ? require('UIManager').AndroidSwipeRefreshLayout.Constants : {SIZE: {}},

  DrawLeftMenuPercentage: 0.6,
  DrawLeftMenuPostRatio: 5/3.0,
  DefaultMovieCollectionCellMargin: 4/ PixelRatio.get(),
  DefaultMovieListCellRatio: 0.4416,
  DefaultMovieCollectionCellRatio: 1.858,
  DefaultMovieCollectionCellPosterPercentage: 0.744,
  DefaultMoviePosterRatio: 0.7134,
  DefaultCornerRadius: 1,
  DefaultMarginValue: 7.5,
  DefaultTitleTextColor: 'rgb(47,47,47)',
  DefaultTitleTextFontSize: 14,
  DefaultRateScoresTextColor: 'rgb(255,88,62)',
  DefaultRateScoresTextFontSize: 12,
  GlobalTintColor: 'rgb(42,100,255)'
};

