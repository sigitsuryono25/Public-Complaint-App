package com.example.publiccomplaint.data.model

import com.google.gson.annotations.SerializedName

data class LoginRequest(
    @SerializedName("email") val email: String,
    @SerializedName("password") val password: String
)

data class LoginResponse(
    @SerializedName("success") val success: Boolean,
    @SerializedName("message") val message: String?,
    @SerializedName("data") val data: User?
)

data class User(
    @SerializedName("id") val id: String,
    @SerializedName("name") val name: String,
    @SerializedName("email") val email: String,
    @SerializedName("role") val role: String,
    @SerializedName("token") val token: String?
)

data class Complaint(
    @SerializedName("id") val id: String,
    @SerializedName("title") val title: String,
    @SerializedName("description") val description: String,
    @SerializedName("status") val status: String,
    @SerializedName("photo_url") val photoUrl: String?,
    @SerializedName("latitude") val latitude: Double,
    @SerializedName("longitude") val longitude: Double,
    @SerializedName("created_at") val createdAt: String,
    @SerializedName("category") val category: Category?,
    @SerializedName("skpd") val skpd: Skpd?
)

data class Category(
    @SerializedName("id") val id: String,
    @SerializedName("name") val name: String
)

data class Skpd(
    @SerializedName("id") val id: String,
    @SerializedName("name") val name: String
)

data class ComplaintListResponse(
    @SerializedName("success") val success: Boolean,
    @SerializedName("count") val count: Int?,
    @SerializedName("data") val data: List<Complaint>?
)

data class CategoryListResponse(
    @SerializedName("success") val success: Boolean,
    @SerializedName("data") val data: List<Category>?
)

