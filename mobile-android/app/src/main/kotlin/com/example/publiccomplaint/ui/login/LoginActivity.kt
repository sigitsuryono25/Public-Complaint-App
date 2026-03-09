package com.example.publiccomplaint.ui.login

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.publiccomplaint.MainActivity
import com.example.publiccomplaint.data.SessionManager
import com.example.publiccomplaint.data.model.LoginRequest
import com.example.publiccomplaint.databinding.ActivityLoginBinding
import org.koin.android.ext.android.inject
import org.koin.androidx.viewmodel.ext.android.viewModel

class LoginActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding
    private val viewModel: LoginViewModel by viewModel()
    private val sessionManager: SessionManager by inject()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Auto-login if token exists
        if (sessionManager.fetchAuthToken() != null) {
            startActivity(Intent(this, MainActivity::class.java))
            finish()
        }

        binding.btnLogin.setOnClickListener {
            val email = binding.emailEditText.text.toString()
            val password = binding.passwordEditText.text.toString()

            if (email.isNotEmpty() && password.isNotEmpty()) {
                binding.btnLogin.visibility = View.INVISIBLE
                binding.loginProgressBar.visibility = View.VISIBLE
                viewModel.login(LoginRequest(email, password))
            } else {
                Toast.makeText(this, "Please fill all fields", Toast.LENGTH_SHORT).show()
            }
        }

        viewModel.loginResult.observe(this) { result ->
            binding.btnLogin.visibility = View.VISIBLE
            binding.loginProgressBar.visibility = View.GONE
            
            result.onSuccess { response ->
                if (response.success && response.data?.token != null) {
                    sessionManager.saveAuthToken(response.data.token)
                    Toast.makeText(this, "Welcome, ${response.data.name}", Toast.LENGTH_SHORT).show()
                    val intent = Intent(this, MainActivity::class.java)
                    startActivity(intent)
                    finish()
                } else {
                    Toast.makeText(this, response.message ?: "Login failed", Toast.LENGTH_SHORT).show()
                }
            }
            
            result.onFailure { error ->
                Toast.makeText(this, error.message ?: "An error occurred", Toast.LENGTH_SHORT).show()
            }
        }
    }
}
