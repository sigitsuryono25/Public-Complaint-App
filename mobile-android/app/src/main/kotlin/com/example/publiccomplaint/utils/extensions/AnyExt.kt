package com.example.publiccomplaint.utils.extensions

import androidx.lifecycle.MutableLiveData
import android.os.Looper

object AnyExt {
    fun <T> MutableLiveData<T>.emit(value: T) {
        if (Looper.myLooper() == Looper.getMainLooper()) {
            this.value = value
        } else {
            this.postValue(value)
        }
    }
}