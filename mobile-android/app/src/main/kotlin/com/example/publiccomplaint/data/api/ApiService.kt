package com.example.publiccomplaint.data.api

import com.example.publiccomplaint.data.model.*
import com.google.gson.annotations.SerializedName
import retrofit2.Response
import retrofit2.http.*

interface ApiService {
    @POST("users/login")
    suspend fun login(@Body request: LoginRequest): Response<LoginResponse>

    @GET("complaints")
    suspend fun getComplaints(
        @Header("Authorization") token: String,
        @Query("status") status: String? = null
    ): Response<ComplaintListResponse>

    @GET("admin/categories")
    suspend fun getCategories(): Response<CategoryListResponse>

    @POST("complaints")
    suspend fun submitComplaint(
        @Header("Authorization") token: String,
        @Body complaint: ComplaintRequest
    ): Response<ComplaintResponse>
}

data class ComplaintRequest(
    @SerializedName("title") val title: String,
    @SerializedName("description") val description: String,
    @SerializedName("category_id") val categoryId: String,
    @SerializedName("latitude") val latitude: Double,
    @SerializedName("longitude") val longitude: Double,
    @SerializedName("photo_url") val photoUrl: String?
)

data class ComplaintResponse(
    @SerializedName("success") val success: Boolean,
    @SerializedName("message") val message: String,
    @SerializedName("data") val data: Complaint?
)
