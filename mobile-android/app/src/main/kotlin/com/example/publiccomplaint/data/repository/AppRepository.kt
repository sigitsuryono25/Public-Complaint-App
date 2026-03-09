package com.example.publiccomplaint.data.repository

import com.example.publiccomplaint.data.api.ApiService
import com.example.publiccomplaint.data.model.*

class AppRepository(private val apiService: ApiService) {
    suspend fun login(request: LoginRequest) = apiService.login(request)
    suspend fun getComplaints(token: String, status: String? = null) = apiService.getComplaints("Bearer $token", status)
    suspend fun getCategories() = apiService.getCategories()
    suspend fun submitComplaint(token: String, request: com.example.publiccomplaint.data.api.ComplaintRequest) = 
        apiService.submitComplaint("Bearer $token", request)
}
