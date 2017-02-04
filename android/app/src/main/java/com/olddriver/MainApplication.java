package com.olddriver;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import com.olddriver.dialog.DialogLoadPackage;
import com.olddriver.material.ReactMaterialKitPackage;
import com.olddriver.spinkit.RNSpinkitPackage;
import com.olddriver.splash.SplashScreenReactPackage;
import com.olddriver.vector.VectorIconsPackage;
import com.olddriver.webview.WebViewBridgePackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new SplashScreenReactPackage(),
          new WebViewBridgePackage(),
          new VectorIconsPackage(),
          new ReactMaterialKitPackage(),
          new RNSpinkitPackage(),
          new DialogLoadPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
