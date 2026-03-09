package com.example.publiccomplaint.ui.complaint

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.publiccomplaint.data.SessionManager
import com.example.publiccomplaint.databinding.ActivityComplaintListBinding
import org.koin.android.ext.android.inject
import org.koin.androidx.viewmodel.ext.android.viewModel

class ComplaintListActivity : AppCompatActivity() {

    private lateinit var binding: ActivityComplaintListBinding
    private val viewModel: ComplaintViewModel by viewModel()
    private val sessionManager: SessionManager by inject()
    private lateinit var adapter: ComplaintAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityComplaintListBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupRecyclerView()
        observeViewModel()

        val token = sessionManager.fetchAuthToken()
        if (token != null) {
            binding.complaintProgressBar.visibility = View.VISIBLE
            viewModel.fetchComplaints(token)
        } else {
            Toast.makeText(this, "Session expired", Toast.LENGTH_SHORT).show()
            finish()
        }

        binding.fabAddComplaint.setOnClickListener {
            startActivity(Intent(this, SubmitComplaintActivity::class.java))
        }
    }

    private fun setupRecyclerView() {
        adapter = ComplaintAdapter { complaint ->
            // TODO: Open ComplaintDetailsActivity
            Toast.makeText(this, "Clicked: ${complaint.title}", Toast.LENGTH_SHORT).show()
        }
        binding.rvComplaints.layoutManager = LinearLayoutManager(this)
        binding.rvComplaints.adapter = adapter
    }

    private fun observeViewModel() {
        viewModel.complaints.observe(this) { result ->
            binding.complaintProgressBar.visibility = View.GONE
            result.onSuccess { list ->
                adapter.setList(list)
                if (list.isEmpty()) {
                    Toast.makeText(this, "No reports found", Toast.LENGTH_SHORT).show()
                }
            }
            result.onFailure { error ->
                Toast.makeText(this, error.message ?: "Failed to fetch reports", Toast.LENGTH_SHORT).show()
            }
        }
    }
}
