package com.example.publiccomplaint

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.publiccomplaint.data.SessionManager
import com.example.publiccomplaint.databinding.ActivityMainBinding
import com.example.publiccomplaint.ui.complaint.ComplaintListActivity
import com.example.publiccomplaint.ui.login.LoginActivity
import org.koin.android.ext.android.inject

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private val sessionManager: SessionManager by inject()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btnViewComplaints.setOnClickListener {
            startActivity(Intent(this, ComplaintListActivity::class.java))
        }

        binding.btnSubmitComplaint.setOnClickListener {
            startActivity(Intent(this, com.example.publiccomplaint.ui.complaint.SubmitComplaintActivity::class.java))
        }

        binding.logoImage.setOnClickListener {
            // Secret logout for testing
            sessionManager.clearSession()
            startActivity(Intent(this, LoginActivity::class.java))
            finish()
        }
    }
}
