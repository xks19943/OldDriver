package com.olddriver.dialog;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.olddriver.R;


import java.util.Timer;
import java.util.TimerTask;


public class DialogLoadModule extends ReactContextBaseJavaModule implements ActivityEventListener {

    private final ReactApplicationContext mReactContext;

    private ProgressDialog dialog;

    public DialogLoadModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(this);
        mReactContext = reactContext;
    }
    @Override
    public String getName() {
        return "DialogLoadModule";
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {

    }

    @Override
    public void onNewIntent(Intent intent) {

    }

    @ReactMethod
    public void showLoading(final ReadableMap options, final Callback callback) {
        dialog= new ProgressDialog(getCurrentActivity(),options.getString("msg"),true);
        dialog.show();
    }

    @ReactMethod
    public void showInfo(final ReadableMap options) {

        ProgressDialog progressDialog= new ProgressDialog(getCurrentActivity(),options.getString("msg"),false);
        progressDialog.setToastImage(R.drawable.wechat_fav);
        progressDialog.show();
        new Timer().schedule(new DissMissTimerTask(progressDialog),800);

//        ToastView.showToastCenter(this.getCurrentActivity(),options.getString("msg"));
//        Toast.makeText(this.getCurrentActivity(),options.getString("msg"),Toast.LENGTH_LONG).show();
    }

    @ReactMethod
    public void showError(final ReadableMap options, final Callback callback) {
        ProgressDialog progressDialog= new ProgressDialog(getCurrentActivity(),options.getString("msg"),false);
        progressDialog.setToastImage(R.drawable.wechat_fav);
        progressDialog.show();
        new Timer().schedule(new DissMissTimerTask(progressDialog),800);
    }

    @ReactMethod
    public void dismiss(final ReadableMap options, final Callback callback) {
        if (dialog!=null && dialog.isShowing()){
            dialog.dismiss();
        }
    }

    @ReactMethod
    public void clearRNCache(){
//        Log.i(this.getClass().getName(),"************:clear");
    }

    class DissMissTimerTask  extends TimerTask{

        private ProgressDialog progressDialog;

        public DissMissTimerTask(ProgressDialog progressDialog){
            super();
            this.progressDialog=progressDialog;
        }
        @Override
        public void run() {
            if (progressDialog!=null && progressDialog.isShowing()){
                progressDialog.dismiss();
            }
        }
    }

}