package com.example.publiccomplaint.ui.complaint

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.publiccomplaint.data.api.ComplaintRequest
import com.example.publiccomplaint.data.api.ComplaintResponse
import com.example.publiccomplaint.data.model.Category
import com.example.publiccomplaint.data.model.CategoryListResponse
import com.example.publiccomplaint.data.repository.AppRepository
import kotlinx.coroutines.launch

class SubmitComplaintViewModel(private val repository: AppRepository) : ViewModel() {

    private val _categories = MutableLiveData<Result<List<Category>>>()
    val categories: LiveData<Result<List<Category>>> = _categories

    private val _submitResult = MutableLiveData<Result<ComplaintResponse>>()
    val submitResult: LiveData<Result<ComplaintResponse>> = _submitResult

    var latitude: Double? = null
    var longitude: Double? = null

    fun fetchCategories() {
        viewModelScope.launch {
            try {
                val response = repository.getCategories()
                if (response.isSuccessful) {
                    _categories.postValue(Result.success(response.body()?.data ?: emptyList()))
                } else {
                    _categories.postValue(Result.failure(Exception("Failed to fetch categories")))
                }
            } catch (e: Exception) {
                _categories.postValue(Result.failure(e))
            }
        }
    }

    fun submit(token: String, title: String, description: String, categoryId: String) {
        if (latitude == null || longitude == null) {
            _submitResult.postValue(Result.failure(Exception("Lokasi belum terdeteksi")))
            return
        }

        val request = ComplaintRequest(
            title = title,
            description = description,
            categoryId = categoryId,
            latitude = latitude!!,
            longitude = longitude!!,
            photoUrl = "https://picsum.photos/400/300" // Placeholder for now
        )

        viewModelScope.launch {
            try {
                val response = repository.submitComplaint(token, request)
                if (response.isSuccessful) {
                    _submitResult.postValue(Result.success(response.body()!!))
                } else {
                    _submitResult.postValue(Result.failure(Exception("Gagal mengirim laporan: ${response.message()}")))
                }
            } catch (e: Exception) {
                _submitResult.postValue(Result.failure(e))
            }
        }
    }
}
