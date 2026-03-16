package com.example.publiccomplaint.ui.complaint

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.viewModelScope
import com.example.publiccomplaint.data.model.Complaint
import com.example.publiccomplaint.data.repository.AppRepository
import com.example.publiccomplaint.ui.base.BaseViewModel
import com.example.publiccomplaint.utils.extensions.AnyExt.emit
import kotlinx.coroutines.launch

class ComplaintViewModel(private val repository: AppRepository) : BaseViewModel() {

    private val _complaints = MutableLiveData<Result<List<Complaint>>>()
    val complaints: LiveData<Result<List<Complaint>>> = _complaints

    private val _stepperPosition = MutableLiveData<Int>()
    val stepperPosition: LiveData<Int> = _stepperPosition

    fun fetchComplaints(token: String) {
        viewModelScope.launch {
            setLoading(true)
            try {
                val response = repository.getComplaints(token)
                if (response.isSuccessful) {
                    _complaints.postValue(Result.success(response.body()?.data ?: emptyList()))
                } else {
                    _complaints.postValue(Result.failure(Exception("Failed to fetch: ${response.message()}")))
                }
            } catch (e: Exception) {
                _complaints.postValue(Result.failure(e))
            } finally {
                setLoading(false)
            }
        }
    }

    fun updateStepperPosition(newPosition: Int){
        _stepperPosition.emit(newPosition)
    }
}
