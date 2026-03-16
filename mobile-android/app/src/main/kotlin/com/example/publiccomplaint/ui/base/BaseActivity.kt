package com.example.publiccomplaint.ui.base

import android.content.Context
import android.os.Bundle
import android.view.inputmethod.InputMethodManager
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import androidx.lifecycle.lifecycleScope
import androidx.viewbinding.ViewBinding
import com.google.android.material.snackbar.Snackbar
import kotlinx.coroutines.launch

abstract class BaseActivity<VB : ViewBinding> : AppCompatActivity() {

    protected lateinit var binding: VB
    protected open val viewModel: BaseViewModel? = null

    abstract fun inflateBinding(): VB

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = inflateBinding()
        setContentView(binding.root)

        setupView()
        setupObserver()
    }

    /**
     * Override in child activity if needed
     */
    open fun setupView() {}

    /**
     * Override in child activity if needed
     */
    open fun setupObserver() {

        val vm = viewModel ?: return

        lifecycleScope.launch {
            vm.loading.collect {
                if (it) showLoading()
                else hideLoading()
            }
        }

        lifecycleScope.launch {
            vm.error.collect {
                showMessage(it)
            }
        }
    }

    /**
     * Snackbar helper
     */
    protected fun showMessage(message: String) {
        Snackbar.make(binding.root, message, Snackbar.LENGTH_SHORT).show()
    }

    /**
     * Hide keyboard safely
     */
    protected fun hideKeyboard() {
        currentFocus?.let {
            val imm = getSystemService(INPUT_METHOD_SERVICE) as InputMethodManager
            imm.hideSoftInputFromWindow(it.windowToken, 0)
        }
    }

    /**
     * Toolbar setup helper
     */
    protected fun setupToolbar(
        toolbar: Toolbar,
        title: String,
        enableBack: Boolean = true
    ) {
        setSupportActionBar(toolbar)
        supportActionBar?.title = title

        if (enableBack) {
            supportActionBar?.setDisplayHomeAsUpEnabled(true)
            toolbar.setNavigationOnClickListener { onBackPressedDispatcher.onBackPressed() }
        }
    }

    /**
     * Simple loading flag (override if using custom loading UI)
     */
    open fun showLoading() {}

    open fun hideLoading() {}

    open fun clickListener() {}

    companion object {

        fun hideKeyboard(context: Context, view: android.view.View?) {
            view ?: return
            val imm =
                context.getSystemService(INPUT_METHOD_SERVICE) as InputMethodManager
            imm.hideSoftInputFromWindow(view.windowToken, 0)
        }
    }
}