package com.example.publiccomplaint.ui.complaint

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.publiccomplaint.data.model.Complaint
import com.example.publiccomplaint.databinding.ItemComplaintBinding

class ComplaintAdapter(private val onClick: (Complaint) -> Unit) : RecyclerView.Adapter<ComplaintAdapter.ViewHolder>() {

    private var items = mutableListOf<Complaint>()

    fun setList(list: List<Complaint>) {
        items.clear()
        items.addAll(list)
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val binding = ItemComplaintBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return ViewHolder(binding)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bind(items[position])
    }

    override fun getItemCount() = items.size

    inner class ViewHolder(private val binding: ItemComplaintBinding) : RecyclerView.ViewHolder(binding.root) {
        fun bind(item: Complaint) {
            binding.itemTitle.text = item.title
            binding.itemStatus.text = item.status
            binding.itemDate.text = item.createdAt.substringBefore("T")
            binding.itemCategory.text = item.category?.name ?: "No Category"
            binding.root.setOnClickListener { onClick(item) }
        }
    }
}
