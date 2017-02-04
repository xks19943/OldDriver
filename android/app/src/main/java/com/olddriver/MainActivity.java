package com.olddriver;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.olddriver.splash.SplashScreen;

public class MainActivity extends ReactActivity {

    //当主界面创建的时候显示对应的splash页面
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this,true);
        super.onCreate(savedInstanceState);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "OldDriver";
    }
}
