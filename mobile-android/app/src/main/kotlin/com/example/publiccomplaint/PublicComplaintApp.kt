package com.example.publiccomplaint

import android.app.Application
import com.example.publiccomplaint.di.appModule
import com.example.publiccomplaint.di.networkModule
import org.koin.android.ext.koin.androidContext
import org.koin.android.ext.koin.androidLogger
import org.koin.core.context.startKoin

class PublicComplaintApp : Application() {
    override fun onCreate() {
        super.onCreate()
        startKoin {
            androidLogger()
            androidContext(this@PublicComplaintApp)
            modules(listOf(networkModule, appModule))
        }
    }
}
