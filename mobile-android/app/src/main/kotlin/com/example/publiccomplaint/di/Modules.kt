package com.example.publiccomplaint.di

import com.example.publiccomplaint.data.api.ApiService
import com.example.publiccomplaint.data.repository.AppRepository
import com.example.publiccomplaint.ui.login.LoginViewModel
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import org.koin.androidx.viewmodel.dsl.viewModel
import org.koin.dsl.module
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.concurrent.TimeUnit

val networkModule = module {
    single {
        HttpLoggingInterceptor().apply {
            level = HttpLoggingInterceptor.Level.BODY
        }
    }

    single {
        OkHttpClient.Builder()
            .addInterceptor(get<HttpLoggingInterceptor>())
            .connectTimeout(30, TimeUnit.SECONDS)
            .readTimeout(30, TimeUnit.SECONDS)
            .build()
    }

    single {
        Retrofit.Builder()
            .baseUrl("http://10.0.2.2:5001/api/")
            .client(get<OkHttpClient>())
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }

    single { get<Retrofit>().create(ApiService::class.java) }
}

val appModule = module {
    single { com.example.publiccomplaint.data.SessionManager(get()) }
    single { AppRepository(get()) }
    viewModel { LoginViewModel(get()) }
    viewModel { com.example.publiccomplaint.ui.complaint.ComplaintViewModel(get()) }
    viewModel { com.example.publiccomplaint.ui.complaint.SubmitComplaintViewModel(get()) }
}
