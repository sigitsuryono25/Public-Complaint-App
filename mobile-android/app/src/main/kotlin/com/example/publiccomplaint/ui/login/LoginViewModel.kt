package com.example.publiccomplaint.ui.login

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.publiccomplaint.data.model.LoginRequest
import com.example.publiccomplaint.data.model.LoginResponse
import com.example.publiccomplaint.data.repository.AppRepository
import kotlinx.coroutines.launch

class LoginViewModel(private val repository: AppRepository) : ViewModel() {

    private val _loginResult = MutableLiveData<Result<LoginResponse>>()
    val loginResult: LiveData<Result<LoginResponse>> = _loginResult

    fun login(request: LoginRequest) {
        viewModelScope.launch {
            try {
                val response = repository.login(request)
                if (response.isSuccessful) {
                    _loginResult.postValue(Result.success(response.body()!!))
                } else {
                    _loginResult.postValue(Result.failure(Exception("Login Failed: ${response.message()}")))
                }
            } catch (e: Exception) {
                _loginResult.postValue(Result.failure(e))
            }
        }
    }
}
