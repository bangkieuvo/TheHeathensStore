package com.example.TheHeathensStore.controller;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.example.TheHeathensStore.service.CloudinaryService;

@RestController
@RequestMapping("/api/v1/images")
@CrossOrigin(origins = "*") // Cho phép React gọi API này mà không bị lỗi CORS
public class ImageController {

	@Autowired
	private CloudinaryService cloudinaryService;

	@PostMapping("/upload")
	public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file,
			@RequestParam(value = "folder", defaultValue = "products") String folder) {
		try {
			Map<?, ?> result = cloudinaryService.upload(file, folder);

			return ResponseEntity.ok(result);

		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.internalServerError()

					.body("Không thể upload ảnh: " + e.getMessage());
		}
	}
}