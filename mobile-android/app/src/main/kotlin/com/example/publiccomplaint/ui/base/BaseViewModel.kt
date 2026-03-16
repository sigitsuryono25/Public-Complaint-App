package com.example.publiccomplaint.ui.base

import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharedFlow
import kotlinx.coroutines.flow.StateFlow

open class BaseViewModel : ViewModel() {

    private val _loading = MutableStateFlow(false)
    val loading: StateFlow<Boolean> = _loading

    private val _error = MutableSharedFlow<String>()
    val error: SharedFlow<String> = _error

    protected fun setLoading(value: Boolean) {
        _loading.value = value
    }

    protected suspend fun sendError(message: String) {
        _error.emit(message)
    }
}