package com.example.publiccomplaint.ui.complaint

import androidx.fragment.app.Fragment
import com.example.publiccomplaint.R
import com.example.publiccomplaint.databinding.ActivitySubmitComplaintBinding
import com.example.publiccomplaint.ui.base.BaseActivity
import com.example.publiccomplaint.ui.complaint.page.ComplaintDetailFragment
import org.koin.androidx.viewmodel.ext.android.viewModel

class SubmitComplaintActivity : BaseActivity<ActivitySubmitComplaintBinding>() {

    companion object {
        const val MAX_STEPPER = 2
    }

    override val viewModel: ComplaintViewModel by viewModel()
    override fun inflateBinding(): ActivitySubmitComplaintBinding =
        ActivitySubmitComplaintBinding.inflate(layoutInflater)

    override fun setupView() {
        super.setupView()
        changeFragment(ComplaintDetailFragment())
    }

    private fun changeFragment(fragment: Fragment) {
        supportFragmentManager.beginTransaction()
            .replace(R.id.frameLayout, fragment)
            .commit()
    }


    override fun setupObserver() {
        super.setupObserver()
        viewModel.stepperPosition.observe(this) {
            mappingUI(it)
        }
    }

    private fun mappingUI(position: Int) {
        binding.overAllStep.text = setupOverAllStep(position)
        when (position) {
            0 -> {
                binding.title.text = "Complaint Details"
                changeFragment(ComplaintDetailFragment())
            }

            1 -> binding.title.text = "Description & Evidence"
            2 -> binding.title.text = "Complaint Location"
        }

    }

    private fun setupOverAllStep(position: Int) = "Langkah $position dari $MAX_STEPPER"
}
