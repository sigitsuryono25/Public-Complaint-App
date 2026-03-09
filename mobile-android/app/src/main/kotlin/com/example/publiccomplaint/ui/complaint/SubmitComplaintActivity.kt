package com.example.publiccomplaint.ui.complaint

import android.Manifest
import android.annotation.SuppressLint
import android.content.pm.PackageManager
import android.os.Bundle
import android.view.View
import android.widget.ArrayAdapter
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import com.example.publiccomplaint.data.SessionManager
import com.example.publiccomplaint.data.api.ComplaintResponse
import com.example.publiccomplaint.data.model.Category
import com.example.publiccomplaint.databinding.ActivitySubmitComplaintBinding
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices
import com.google.android.gms.location.Priority
import org.koin.android.ext.android.inject
import org.koin.androidx.viewmodel.ext.android.viewModel

class SubmitComplaintActivity : AppCompatActivity() {

    private lateinit var binding: ActivitySubmitComplaintBinding
    private val viewModel: SubmitComplaintViewModel by viewModel()
    private val sessionManager: SessionManager by inject()
    private lateinit var fusedLocationClient: FusedLocationProviderClient
    
    private var categoryList: List<Category> = emptyList()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySubmitComplaintBinding.inflate(layoutInflater)
        setContentView(binding.root)

        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)

        setupUI()
        observeViewModel()
        requestLocation()
        viewModel.fetchCategories()
    }

    private fun setupUI() {
        binding.toolbar.setNavigationOnClickListener { finish() }

        binding.btnSubmit.setOnClickListener {
            val title = binding.titleEditText.text.toString()
            val desc = binding.descEditText.text.toString()
            val selectedPos = binding.categorySpinner.selectedItemPosition

            if (title.isEmpty() || desc.isEmpty() || selectedPos < 0) {
                Toast.makeText(this, "Mohon lengkapi semua data", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            val token = sessionManager.fetchAuthToken() ?: return@setOnClickListener
            val categoryId = categoryList[selectedPos].id
            
            binding.btnSubmit.isEnabled = false
            viewModel.submit(token, title, desc, categoryId)
        }
    }

    private fun observeViewModel() {
        viewModel.categories.observe(this) { result ->
            result.onSuccess { list ->
                categoryList = list
                val adapter = ArrayAdapter(this, android.R.layout.simple_spinner_dropdown_item, list.map { it.name })
                binding.categorySpinner.adapter = adapter
            }
            result.onFailure {
                Toast.makeText(this, "Gagal memuat kategori", Toast.LENGTH_SHORT).show()
            }
        }

        viewModel.submitResult.observe(this) { result ->
            binding.btnSubmit.isEnabled = true
            result.onSuccess {
                Toast.makeText(this, "Laporan berhasil terkirim!", Toast.LENGTH_LONG).show()
                finish()
            }
            result.onFailure { error ->
                Toast.makeText(this, error.message ?: "Gagal mengirim laporan", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun requestLocation() {
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.ACCESS_FINE_LOCATION), 100)
            return
        }
        getLocation()
    }

    @SuppressLint("MissingPermission")
    private fun getLocation() {
        fusedLocationClient.getCurrentLocation(Priority.PRIORITY_HIGH_ACCURACY, null)
            .addOnSuccessListener { location ->
                if (location != null) {
                    viewModel.latitude = location.latitude
                    viewModel.longitude = location.longitude
                    binding.tvLocationCoords.text = "${String.format("%.5f", location.latitude)}, ${String.format("%.5f", location.longitude)}"
                    binding.locationProgressBar.visibility = View.GONE
                } else {
                    binding.tvLocationCoords.text = "Gagal menjangkau lokasi"
                }
            }
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == 100 && grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
            getLocation()
        } else {
            binding.tvLocationCoords.text = "Izin lokasi ditolak"
            binding.locationProgressBar.visibility = View.GONE
        }
    }
}
