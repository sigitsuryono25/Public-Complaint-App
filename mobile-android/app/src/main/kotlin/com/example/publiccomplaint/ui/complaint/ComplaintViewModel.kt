package com.example.publiccomplaint.ui.complaint

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.publiccomplaint.data.model.Complaint
import com.example.publiccomplaint.data.model.ComplaintListResponse
import com.example.publiccomplaint.data.repository.AppRepository
import kotlinx.coroutines.launch

class ComplaintViewModel(private val repository: AppRepository) : ViewModel() {

    private val _complaints = MutableLiveData<Result<List<Complaint>>>()
    val complaints: LiveData<Result<List<Complaint>>> = _complaints

    fun fetchComplaints(token: String) {
        viewModelScope.launch {
            try {
                val response = repository.getComplaints(token)
                if (response.isSuccessful) {
                    _complaints.postValue(Result.success(response.body()?.data ?: emptyList()))
                } else {
                    _complaints.postValue(Result.failure(Exception("Failed to fetch: ${response.message()}")))
                }
            } catch (e: Exception) {
                _complaints.postValue(Result.failure(e))
            }
        }
    }
}
