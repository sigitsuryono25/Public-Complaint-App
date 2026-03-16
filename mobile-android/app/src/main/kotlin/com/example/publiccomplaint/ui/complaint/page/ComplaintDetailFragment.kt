package com.example.publiccomplaint.ui.complaint.page

import android.Manifest
import android.annotation.SuppressLint
import android.content.pm.PackageManager
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.Toast
import androidx.core.app.ActivityCompat
import androidx.fragment.app.Fragment
import com.example.publiccomplaint.data.SessionManager
import com.example.publiccomplaint.data.model.Category
import com.example.publiccomplaint.databinding.FragmentComplaintDetailBinding
import com.example.publiccomplaint.ui.complaint.ComplaintViewModel
import com.example.publiccomplaint.ui.complaint.SubmitComplaintViewModel
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices
import org.koin.android.ext.android.inject
import org.koin.androidx.viewmodel.ext.android.activityViewModel

class ComplaintDetailFragment : Fragment() {
    private lateinit var binding: FragmentComplaintDetailBinding
    private val viewModel: SubmitComplaintViewModel by activityViewModel()
    private val complaintViewModel: ComplaintViewModel by activityViewModel()
    private val sessionManager: SessionManager by inject()
    private lateinit var fusedLocationClient: FusedLocationProviderClient

    private var categoryList: List<Category> = emptyList()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        binding = FragmentComplaintDetailBinding.inflate(layoutInflater)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(requireActivity())

        setupUI()
        observeViewModel()
        requestLocation()
        viewModel.fetchCategories()
    }

    private fun setupUI() {
//        binding.btnSubmit.setOnClickListener {
//            val title = binding.titleEditText.text.toString()
//            val desc = binding.descEditText.text.toString()
//            val selectedPos = binding.categorySpinner.selectedItemPosition
//
//            if (title.isEmpty() || desc.isEmpty() || selectedPos < 0) {
//                Toast.makeText(activity, "Mohon lengkapi semua data", Toast.LENGTH_SHORT).show()
//                return@setOnClickListener
//            }
//
//            val token = sessionManager.fetchAuthToken() ?: return@setOnClickListener
//            val categoryId = categoryList[selectedPos].id
//
//            binding.btnSubmit.isEnabled = false
//            viewModel.submit(token, title, desc, categoryId)
//        }
        binding.btnNext.setOnClickListener {
            complaintViewModel.updateStepperPosition(1)
        }
    }

    private fun observeViewModel() {
        viewModel.categories.observe(viewLifecycleOwner) { result ->
            result.onSuccess { list ->
                categoryList = list
                val adapter = ArrayAdapter(
                    requireActivity(),
                    android.R.layout.simple_spinner_dropdown_item,
                    list.map { it.name })
                binding.categorySpinner.adapter = adapter
            }
            result.onFailure {
                Toast.makeText(activity, "Gagal memuat kategori", Toast.LENGTH_SHORT).show()
            }
        }

        viewModel.submitResult.observe(viewLifecycleOwner) { result ->
//            binding.btnSubmit.isEnabled = true
            result.onSuccess {
                Toast.makeText(context, "Laporan berhasil terkirim!", Toast.LENGTH_LONG).show()
                activity?.finish()
            }
            result.onFailure { error ->
                Toast.makeText(
                    activity,
                    error.message ?: "Gagal mengirim laporan",
                    Toast.LENGTH_SHORT
                ).show()
            }
        }
    }

    private fun requestLocation() {
        if (ActivityCompat.checkSelfPermission(
                requireActivity(),
                Manifest.permission.ACCESS_FINE_LOCATION
            ) != PackageManager.PERMISSION_GRANTED
        ) {
            ActivityCompat.requestPermissions(
                requireActivity(),
                arrayOf(Manifest.permission.ACCESS_FINE_LOCATION),
                100
            )
            return
        }
        getLocation()
    }

    @SuppressLint("MissingPermission")
    private fun getLocation() {
//        fusedLocationClient.getCurrentLocation(Priority.PRIORITY_HIGH_ACCURACY, null)
//            .addOnSuccessListener { location ->
//                if (location != null) {
//                    viewModel.latitude = location.latitude
//                    viewModel.longitude = location.longitude
//                    binding.tvLocationCoords.text = "${String.format("%.5f", location.latitude)}, ${
//                        String.format(
//                            "%.5f",
//                            location.longitude
//                        )
//                    }"
//                    binding.locationProgressBar.visibility = View.GONE
//                } else {
//                    binding.tvLocationCoords.text = "Gagal menjangkau lokasi"
//                }
//            }
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == 100 && grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
            getLocation()
        } else {
//            binding.tvLocationCoords.text = "Izin lokasi ditolak"
//            binding.locationProgressBar.visibility = View.GONE
        }
    }
}