package com.olddriver.dialog;

import android.app.Dialog;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;
import android.widget.TextView;

import com.olddriver.R;


public class ProgressDialog {
	
	public Dialog mDialog;
	private ImageView loadingImage;
	
	public ProgressDialog(Context context, String message,boolean isAnimation) {
		
		LayoutInflater inflater = LayoutInflater.from(context);
		View view = inflater.inflate(R.layout.progress_view, null);

		TextView text = (TextView) view.findViewById(R.id.progress_message);
		text.setText(message);
		 loadingImage = (ImageView) view.findViewById(R.id.progress_view);

		if (isAnimation){
			Animation hyperspaceJumpAnimation = AnimationUtils.loadAnimation(
					context, R.anim.load_animation);
			// 使用ImageView显示动画
			loadingImage.startAnimation(hyperspaceJumpAnimation);
		}

		mDialog = new Dialog(context, R.style.dialog);
		mDialog.setContentView(view);
		mDialog.setCanceledOnTouchOutside(false);
		
	}

	public void setToastImage(int resId) {
		loadingImage.setImageResource(resId);
	}


	public void show() {
		mDialog.show();
	}
	
	public void setCanceledOnTouchOutside(boolean cancel) {
		mDialog.setCanceledOnTouchOutside(cancel);
	}
	
	public void dismiss() {
		if(mDialog.isShowing()) {
			mDialog.dismiss();
		}
	}

    public boolean isShowing(){
        if(mDialog.isShowing()) {
            return true;
        }
        return false;
    }
}
