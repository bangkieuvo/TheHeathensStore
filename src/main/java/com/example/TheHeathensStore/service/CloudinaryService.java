package com.example.TheHeathensStore.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Service
public class CloudinaryService {
	@Autowired
	private Cloudinary cloudinary;

	public Map<?, ?> upload(MultipartFile file, String folder) throws IOException {
		return cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap("folder", "the_heathens/" + folder));
	}
}
